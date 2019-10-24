// tslint:disable: max-classes-per-file

import {
  encode,
  arrayify,
  hexlify,
  stripZeros,
  Signature,
  splitSignature,
  getAddress,
  HarmonyAddress,
  keccak256,
  sign,
  BN,
} from '@harmony-js/crypto';
import { TextEncoder } from 'text-encoding';
import { Unit, numberToHex } from '@harmony-js/utils';

export class StakingSettings {
  public static PRECISION = 18;
}

export const enum Directive {
  DirectiveNewValidator,
  DirectiveEditValidator,
  DirectiveDelegate,
  DirectiveRedelegate,
  DirectiveUndelegate,
}

export class StakingTransaction {
  private directive: Directive;
  private stakeMsg: NewValidator | EditValidator | Delegate | Redelegate | Undelegate;
  private nonce: number | string;
  private gasLimit: number | string;
  private gasPrice: number | string;
  private chainId: number;
  private rawTransaction: string;
  private unsignedRawTransaction: string;
  private signature: Signature;
  private from: string;

  constructor(
    directive: Directive,
    stakeMsg: NewValidator | EditValidator | Delegate | Redelegate | Undelegate,
    nonce: number | string,
    gasPrice: number | string,
    gasLimit: number | string,
    chainID: number,
    v: number,
    r: string,
    s: string,
  ) {
    this.directive = directive;
    this.stakeMsg = stakeMsg;
    this.nonce = nonce;
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
    this.rawTransaction = '0x';
    this.unsignedRawTransaction = '0x';
    this.signature = {
      r,
      s,
      recoveryParam: 0,
      v,
    };
    this.chainId = chainID;
    this.from = '0x';
  }

  encode(): [string, any[]] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    // TODO: temporary hack for converting 0x00 to 0x
    if (!this.directive) {
      raw.push('0x');
    } else {
      raw.push(hexlify(this.directive));
    }
    raw.push(this.stakeMsg.encode());
    raw.push(hexlify(this.nonce));
    raw.push(hexlify(this.gasPrice));
    raw.push(hexlify(this.gasLimit));
    if (this.chainId != null && this.chainId !== 0) {
      raw.push(hexlify(this.chainId));
      raw.push('0x');
      raw.push('0x');
    }
    return [encode(raw), raw];
  }

  rlpSign(prv: string): [Signature, string] {
    const [unsignedRawTransaction, raw] = this.encode();
    const signature = sign(keccak256(unsignedRawTransaction), prv);
    const signed = this.getRLPSigned(raw, signature);
    return [signature, signed];
  }

  getRLPSigned(raw: any[], signature: Signature): string {
    const sig = splitSignature(signature);
    let v = 27 + (sig.recoveryParam || 0);
    raw.pop();
    raw.pop();
    raw.pop();
    v += this.chainId * 2 + 8;

    raw.push(hexlify(v));
    raw.push(stripZeros(arrayify(sig.r) || []));
    raw.push(stripZeros(arrayify(sig.s) || []));

    return encode(raw);
  }
  setUnsigned(unSigned: string) {
    this.unsignedRawTransaction = unSigned;
  }
  setRawTransaction(rawTransaction: string) {
    this.rawTransaction = rawTransaction;
  }
  setSignature(signature: Signature) {
    this.signature = {
      r: signature.r,
      s: signature.s,
      v: signature.v,
      recoveryParam: signature.recoveryParam,
    };
  }
  setNonce(nonce: number) {
    this.nonce = nonce;
  }
  setFromAddress(address: string) {
    this.from = address;
  }
  getUnsignedRawTransaction() {
    return this.unsignedRawTransaction;
  }
  getRawTransaction() {
    return this.rawTransaction;
  }
  getSignature() {
    return this.signature;
  }

  getFromAddress() {
    return this.from;
  }
}

export class Description {
  name: string;
  identity: string;
  website: string;
  securityContact: string;
  details: string;

  constructor(
    name: string,
    identity: string,
    website: string,
    securityContact: string,
    details: string,
  ) {
    this.name = name;
    this.identity = identity;
    this.website = website;
    this.securityContact = securityContact;
    this.details = details;
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    const enc = new TextEncoder();
    raw.push(enc.encode(this.name));
    raw.push(enc.encode(this.identity));
    raw.push(enc.encode(this.website));
    raw.push(enc.encode(this.securityContact));
    raw.push(enc.encode(this.details));
    return raw;
  }
}

export class Decimal {
  value: BN;
  constructor(value: number, precision: number) {
    if (precision > StakingSettings.PRECISION) {
      throw new Error(
        `too much precision: ${precision}, should be less than ${StakingSettings.PRECISION}`,
      );
    }
    const zerosToAdd = StakingSettings.PRECISION - precision;
    const multiplier = Math.pow(10, zerosToAdd);
    // (value * multiplier).toString();
    this.value = new Unit((value * multiplier).toString()).asWei().toWei();
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(numberToHex(this.value));
    return raw;
  }
}

export class CommissionRate {
  rate: Decimal;
  maxRate: Decimal;
  maxChangeRate: Decimal;
  constructor(rate: Decimal, maxRate: Decimal, maxChangeRate: Decimal) {
    this.rate = rate;
    this.maxRate = maxRate;
    this.maxChangeRate = maxChangeRate;
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    raw.push(this.rate.encode());
    raw.push(this.maxRate.encode());
    raw.push(this.maxChangeRate.encode());
    // console.log(decode(encode(raw)));
    return raw;
  }
}

export class NewValidator {
  description: Description;
  commission: CommissionRate;
  minSelfDelegation: number;
  stakingAddress: string;
  pubKey: string;
  amount: number;
  constructor(
    description: Description,
    commission: CommissionRate,
    minSelfDelegation: number,
    stakingAddress: string,
    pubKey: string,
    amount: number,
  ) {
    this.description = description;
    this.commission = commission;
    this.minSelfDelegation = minSelfDelegation;
    this.stakingAddress = stakingAddress;
    this.pubKey = pubKey;
    this.amount = amount;
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    raw.push(this.description.encode());
    raw.push(this.commission.encode());
    raw.push(hexlify(this.minSelfDelegation));
    raw.push(hexlify(normalizeAddress(this.stakingAddress)));
    raw.push(this.pubKey);
    raw.push(hexlify(this.amount));
    return raw;
  }
}

export class EditValidator {
  description: Description;
  stakingAddress: string;
  commissionRate: Decimal;
  minSelfDelegation: number;
  constructor(
    description: Description,
    stakingAddress: string,
    commissionRate: Decimal,
    minSelfDelegation: number,
  ) {
    this.description = description;
    this.stakingAddress = stakingAddress;
    this.commissionRate = commissionRate;
    this.minSelfDelegation = minSelfDelegation;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    raw.push(this.description.encode());
    raw.push(hexlify(normalizeAddress(this.stakingAddress)));
    raw.push(this.commissionRate.encode());
    raw.push(hexlify(this.minSelfDelegation));
    return raw;
  }
}

export class Delegate {
  delegatorAddress: string;
  validatorAddress: string;
  amount: number;
  constructor(delegatorAddress: string, validatorAddress: string, amount: number) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
    this.amount = amount;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(hexlify(normalizeAddress(this.delegatorAddress)));
    raw.push(hexlify(normalizeAddress(this.validatorAddress)));
    raw.push(hexlify(this.amount));
    return raw;
  }
}

export class Redelegate {
  delegatorAddress: string;
  validatorSrcAddress: string;
  validatorDstAddress: string;
  amount: number;
  constructor(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: number,
  ) {
    this.delegatorAddress = delegatorAddress;
    this.validatorSrcAddress = validatorSrcAddress;
    this.validatorDstAddress = validatorDstAddress;
    this.amount = amount;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(hexlify(normalizeAddress(this.delegatorAddress)));
    raw.push(hexlify(normalizeAddress(this.validatorSrcAddress)));
    raw.push(hexlify(normalizeAddress(this.validatorDstAddress)));
    raw.push(hexlify(this.amount));
    return raw;
  }
}

export class Undelegate {
  delegatorAddress: string;
  validatorAddress: string;
  amount: number;
  constructor(delegatorAddress: string, validatorAddress: string, amount: number) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
    this.amount = amount;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(hexlify(normalizeAddress(this.delegatorAddress)));
    raw.push(hexlify(normalizeAddress(this.validatorAddress)));
    raw.push(hexlify(this.amount));
    return raw;
  }
}

export function normalizeAddress(address: string) {
  if (address === '0x') {
    return '0x';
  } else if (
    HarmonyAddress.isValidChecksum(address) ||
    HarmonyAddress.isValidBech32(address) ||
    HarmonyAddress.isValidBech32TestNet(address)
  ) {
    return getAddress(address).checksum;
  } else {
    throw new Error(`Address format is not supported`);
  }
}
