/**
 * # @harmony-js/staking

This package provides a collection of apis to create, sign/send staking transaction, and receive confirm/receipt.

## Installation

```
npm install @harmony-js/staking
```

## Usage

Create a Harmony instance connecting to testnet

```javascript
* const { Harmony } = require('@harmony-js/core');
* const {
*   ChainID,
*   ChainType,
*   hexToNumber,
*   numberToHex,
*   fromWei,
*   Units,
*   Unit,
* } = require('@harmony-js/utils');

* const hmy = new Harmony(
*     'https://api.s0.b.hmny.io/',
*     {
*         chainType: ChainType.Harmony,
*         chainId: ChainID.HmyTestnet,
*     },
* );
```
Below, examples show how to send delegate, undelegate, and collect rewards staking transactions. First, set the chainId, gasLimit, gasPrice for all subsequent staking transactions
```javascript
* hmy.stakings.setTxParams({
*   gasLimit: 25000,
*   gasPrice: numberToHex(new hmy.utils.Unit('1').asGwei().toWei()),
*   chainId: 2
* });
```
<span style="color:red">Note: create and edit validator transactions are not fully supported in the sdk</span>

Create delegate staking transaction
```javascript
* const delegate = hmy.stakings.delegate({
*   delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
*   validatorAddress: 'one1vfqqagdzz352mtvdl69v0hw953hm993n6v26yl',
*   amount: numberToHex(new Unit(1000).asOne().toWei())
* });
* const delegateStakingTx = delegate.build();
```

Sign and send the delegate transaction and receive confirmation
```javascript
* // key corresponds to one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
* hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

* hmy.wallet.signStaking(delegateStakingTx).then(signedTxn => {
*   signedTxn.sendTransaction().then(([tx, hash]) => {
*     console.log(hash);
*     signedTxn.confirm(hash).then(response => {
*       console.log(response.receipt);
*     });
*   });
* });
```

Similarily, undelegate and collect reward transactions can be composed, signed and sent
Create undelegate staking transaction
```javascript
* const undelegate = hmy.stakings.undelegate({
*   delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
*   validatorAddress: 'one1vfqqagdzz352mtvdl69v0hw953hm993n6v26yl',
*   amount: numberToHex(new Unit(1000).asOne().toWei())
* });
* const undelegateStakingTx = undelegate.build();
```

Create collect rewards staking transaction
```javascript
* const collectRewards = hmy.stakings.collectRewards({
*   delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
* });
* const collectRewardsStakingTx = collectRewards.build();
```

Also, similar to normal transaction, signing and sending can be performed asynchronously.
 * @packageDocumentation
 * @module harmony-staking
 */

// tslint:disable: max-classes-per-file

import {
  arrayify,
  BN,
  encode,
  hexlify,
  keccak256,
  sign,
  Signature,
  splitSignature,
  stripZeros,
} from '@harmony-js/crypto';
import { Messenger, RPCMethod } from '@harmony-js/network';
import { defaultMessenger, TransactionBase, TxStatus } from '@harmony-js/transaction';
import { numberToHex, Unit } from '@harmony-js/utils';
import { TextEncoder } from 'text-encoding';

/** @hidden */
export class StakingSettings {
  public static PRECISION = 18;
  public static MAX_DECIMAL = 1000000000000000000;
}

/** @hidden */
export enum Directive {
  DirectiveCreateValidator,
  DirectiveEditValidator,
  DirectiveDelegate,
  DirectiveUndelegate,
  DirectiveCollectRewards,
}

export class StakingTransaction extends TransactionBase {
  private directive: Directive;
  private stakeMsg: CreateValidator | EditValidator | Delegate | Undelegate | CollectRewards;
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
    stakeMsg: CreateValidator | EditValidator | Delegate | Undelegate | CollectRewards,
    nonce: number | string,
    gasPrice: number | string,
    gasLimit: number | string,
    chainID: number,
    messenger: Messenger = defaultMessenger,
    txStatus = TxStatus.INTIALIZED,
  ) {
    super(messenger, txStatus);

    this.directive = directive;
    this.stakeMsg = stakeMsg;
    this.nonce = nonce;
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
    this.rawTransaction = '0x';
    this.unsignedRawTransaction = '0x';
    this.signature = {
      r: '',
      s: '',
      recoveryParam: 0,
      v: 0,
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
    if (!this.nonce) {
      raw.push('0x');
    } else {
      raw.push(hexlify(this.nonce));
    }
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
    this.setUnsigned(unsignedRawTransaction);
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

  public async sendTransaction(): Promise<[StakingTransaction, string]> {
    if (this.rawTransaction === 'tx' || this.rawTransaction === undefined) {
      throw new Error('Transaction not signed');
    }
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }

    const res = await this.messenger.send(
      RPCMethod.SendRawStakingTransaction,
      this.rawTransaction,
      this.messenger.chainType,
      this.messenger.currentShard,
      // 0, // Staking tx always sent to shard 0
    );

    if (res.isResult()) {
      this.id = res.result;
      this.emitTransactionHash(this.id);
      this.setTxStatus(TxStatus.PENDING);
      return [this, res.result];
    } else if (res.isError()) {
      this.emitConfirm(`transaction failed:${res.error.message}`);
      this.setTxStatus(TxStatus.REJECTED);
      return [this, `transaction failed:${res.error.message}`];
    } else {
      this.emitError('transaction failed');
      throw new Error('transaction failed');
    }
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
  async confirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
    shardID: number | string = this.messenger.currentShard,
    toShardID: number | string = 0,
  ) {
    const txConfirmed = await this.txConfirm(txHash, maxAttempts, interval, shardID);
    if (shardID === toShardID) {
      return txConfirmed;
    }
    if (txConfirmed.isConfirmed()) {
      const cxConfirmed = await this.cxConfirm(txHash, maxAttempts, interval, toShardID);
      return cxConfirmed;
    } else {
      return txConfirmed;
    }
  }
}

/** @hidden */
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

/** @hidden */
export class Decimal {
  value: BN;

  constructor(value: string) {
    if (value.length === 0) {
      throw new Error(`decimal string is empty`);
    }
    let value1 = value;
    if (value[0] === '-') {
      throw new Error(`decimal fraction should be be between [0, 1]`);
    }
    if (value[0] === '+') {
      value1 = value.substr(1);
    }
    if (value1.length === 0) {
      throw new Error(`decimal string is empty`);
    }
    const spaced = value1.split(' ');
    if (spaced.length > 1) {
      throw new Error(`bad decimal string`);
    }
    const splitted = value1.split('.');
    let len = 0;
    let combinedStr = splitted[0];
    if (splitted.length === 2) {
      len = splitted[1].length;
      if (len === 0 || combinedStr.length === 0) {
        throw new Error(`bad decimal length`);
      }
      if (splitted[1][0] === '-') {
        throw new Error(`bad decimal string`);
      }
      combinedStr += splitted[1];
    } else if (splitted.length > 2) {
      throw new Error(`too many periods to be a decimal string`);
    }
    if (len > StakingSettings.PRECISION) {
      throw new Error(
        `too much precision: precision should be less than ${StakingSettings.PRECISION}`,
      );
    }
    const zerosToAdd = StakingSettings.PRECISION - len;
    combinedStr += '0'.repeat(zerosToAdd);
    combinedStr = combinedStr.replace(/^0+/, '');
    const val = new Unit(combinedStr).asWei().toWei();
    if (val.gt(new Unit(StakingSettings.MAX_DECIMAL.toString()).asWei().toWei())) {
      throw new Error(`too large decimal fraction`);
    }
    this.value = val;
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(numberToHex(this.value));
    return raw;
  }
}

/** @hidden */
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
    return raw;
  }
}

export class CreateValidator {
  validatorAddress: string;
  description: Description;
  commissionRates: CommissionRate;
  minSelfDelegation: number;
  maxTotalDelegation: number;
  slotPubKeys: string[];
  amount: number;
  constructor(
    validatorAddress: string,
    description: Description,
    commissionRates: CommissionRate,
    minSelfDelegation: number,
    maxTotalDelegation: number,
    slotPubKeys: string[],
    amount: number,
  ) {
    this.validatorAddress = validatorAddress;
    this.description = description;
    this.commissionRates = commissionRates;
    this.minSelfDelegation = minSelfDelegation;
    this.maxTotalDelegation = maxTotalDelegation;
    this.slotPubKeys = slotPubKeys;
    this.amount = amount;
  }

  encode(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    raw.push(hexlify(TransactionBase.normalizeAddress(this.validatorAddress)));
    raw.push(this.description.encode());
    raw.push(this.commissionRates.encode());
    raw.push(hexlify(this.minSelfDelegation));
    raw.push(hexlify(this.maxTotalDelegation));
    raw.push(this.encodeArr());
    raw.push(hexlify(this.amount));
    return raw;
  }

  encodeArr(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    this.slotPubKeys.forEach((pubKey) => {
      raw.push(pubKey);
    });
    return raw;
  }
}

export class EditValidator {
  validatorAddress: string;
  description: Description;
  commissionRate: Decimal;
  minSelfDelegation: number;
  maxTotalDelegation: number;
  slotKeyToRemove: string;
  slotKeyToAdd: string;
  constructor(
    validatorAddress: string,
    description: Description,
    commissionRate: Decimal,
    minSelfDelegation: number,
    maxTotalDelegation: number,
    slotKeyToRemove: string,
    slotKeyToAdd: string,
  ) {
    this.validatorAddress = validatorAddress;
    this.description = description;
    this.commissionRate = commissionRate;
    this.minSelfDelegation = minSelfDelegation;
    this.maxTotalDelegation = maxTotalDelegation;
    this.slotKeyToRemove = slotKeyToRemove;
    this.slotKeyToAdd = slotKeyToAdd;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array | Array<string | Uint8Array>> = [];
    raw.push(hexlify(TransactionBase.normalizeAddress(this.validatorAddress)));
    raw.push(this.description.encode());
    raw.push(this.commissionRate.encode());
    raw.push(hexlify(this.minSelfDelegation));
    raw.push(hexlify(this.maxTotalDelegation));
    raw.push(this.slotKeyToRemove);
    raw.push(this.slotKeyToAdd);
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
    raw.push(hexlify(TransactionBase.normalizeAddress(this.delegatorAddress)));
    raw.push(hexlify(TransactionBase.normalizeAddress(this.validatorAddress)));
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
    raw.push(hexlify(TransactionBase.normalizeAddress(this.delegatorAddress)));
    raw.push(hexlify(TransactionBase.normalizeAddress(this.validatorAddress)));
    raw.push(hexlify(this.amount));
    return raw;
  }
}

export class CollectRewards {
  delegatorAddress: string;
  constructor(delegatorAddress: string) {
    this.delegatorAddress = delegatorAddress;
  }
  encode(): any[] {
    const raw: Array<string | Uint8Array> = [];
    raw.push(hexlify(TransactionBase.normalizeAddress(this.delegatorAddress)));
    return raw;
  }
}
