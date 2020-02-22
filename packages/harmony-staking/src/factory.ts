/**
 * @packageDocumentation
 * @module harmony-staking
 */

import { Messenger } from '@harmony-js/network';
import { Signature } from '@harmony-js/crypto';

import {
  Directive,
  CreateValidator,
  EditValidator,
  Delegate,
  Undelegate,
  CollectRewards,
  Description,
  CommissionRate,
  Decimal,
  StakingTransaction,
} from './stakingTransaction';
import { Unit } from '@harmony-js/utils';
import { TxStatus } from '@harmony-js/transaction';

/** @hidden */
export interface DescriptionInterface {
  name: string;
  identity: string;
  website: string;
  securityContact: string;
  details: string;
}

/** @hidden */
export interface CommissionRateInterface {
  rate: string;
  maxRate: string;
  maxChangeRate: string;
}

export class StakingFactory {
  public messenger: Messenger;
  public stakeMsg?: CreateValidator | EditValidator | Delegate | Undelegate | CollectRewards;
  public directive?: Directive;
  public nonce: number | string;
  public gasPrice: number | string;
  public gasLimit: number | string;
  public chainId: number;
  public signature: Signature;
  constructor(messenger: Messenger) {
    this.messenger = messenger;
    this.nonce = 0;
    this.gasPrice = new Unit('100').asGwei().toHex();
    this.gasLimit = new Unit('210000').asWei().toHex();
    this.chainId = 1;
    this.signature = {
      v: 0,
      r: '',
      s: '',
    };
  }

  createValidator({
    validatorAddress,
    description,
    commissionRate,
    minSelfDelegation,
    maxTotalDelegation,
    slotPubKeys,
    amount,
  }: {
    validatorAddress: string;
    description: DescriptionInterface;
    commissionRate: CommissionRateInterface;
    minSelfDelegation: number;
    maxTotalDelegation: number;
    slotPubKeys: string[];
    amount: number;
  }) {
    this.stakeMsg = new CreateValidator(
      validatorAddress,
      new Description(
        description.name,
        description.identity,
        description.website,
        description.securityContact,
        description.details,
      ),
      new CommissionRate(
        new Decimal(commissionRate.rate),
        new Decimal(commissionRate.maxRate),
        new Decimal(commissionRate.maxChangeRate),
      ),
      minSelfDelegation,
      maxTotalDelegation,
      slotPubKeys,
      amount,
    );
    this.directive = Directive.DirectiveCreateValidator;
    return this;
  }

  editValidator({
    validatorAddress,
    description,
    commissionRate,
    minSelfDelegation,
    maxTotalDelegation,
    slotKeyToRemove,
    slotKeyToAdd,
  }: {
    validatorAddress: string;
    description: DescriptionInterface;
    commissionRate: string;
    minSelfDelegation: number;
    maxTotalDelegation: number;
    slotKeyToRemove: string;
    slotKeyToAdd: string;
  }) {
    this.stakeMsg = new EditValidator(
      validatorAddress,
      new Description(
        description.name,
        description.identity,
        description.website,
        description.securityContact,
        description.details,
      ),
      new Decimal(commissionRate),
      minSelfDelegation,
      maxTotalDelegation,
      slotKeyToRemove,
      slotKeyToAdd,
    );
    this.directive = Directive.DirectiveEditValidator;
    return this;
  }

  delegate({
    delegatorAddress,
    validatorAddress,
    amount,
  }: {
    delegatorAddress: string;
    validatorAddress: string;
    amount: number;
  }) {
    this.stakeMsg = new Delegate(delegatorAddress, validatorAddress, amount);
    this.directive = Directive.DirectiveDelegate;
    return this;
  }

  undelegate({
    delegatorAddress,
    validatorAddress,
    amount,
  }: {
    delegatorAddress: string;
    validatorAddress: string;
    amount: number;
  }) {
    this.stakeMsg = new Undelegate(delegatorAddress, validatorAddress, amount);
    this.directive = Directive.DirectiveUndelegate;
    return this;
  }

  collectRewards({ delegatorAddress }: { delegatorAddress: string }) {
    this.stakeMsg = new CollectRewards(delegatorAddress);
    this.directive = Directive.DirectiveCollectRewards;
    return this;
  }

  setTxParams({
    nonce,
    gasPrice,
    gasLimit,
    chainId,
    signature,
  }: {
    nonce: number | string;
    gasPrice: number | string;
    gasLimit: number | string;
    chainId: number;
    signature: Signature;
  }) {
    this.nonce = nonce;
    this.gasPrice = gasPrice;
    this.gasLimit = gasLimit;
    this.chainId = chainId;
    this.signature = signature;
    return this;
  }

  build() {
    if (this.directive === undefined) {
      throw new Error('cannot build stakingTransaction without Directive');
    }
    if (this.stakeMsg === undefined) {
      throw new Error('cannot build stakingTransaction without stakeMsg');
    }

    return new StakingTransaction(
      this.directive,
      this.stakeMsg,
      this.nonce !== undefined ? this.nonce : 0,
      this.gasPrice !== undefined ? this.gasPrice : new Unit('100').asGwei().toHex(),
      this.gasLimit !== undefined ? this.gasLimit : new Unit('210000').asWei().toHex(),
      this.chainId !== undefined ? this.chainId : 1,
      this.messenger,
      TxStatus.INTIALIZED,
    );
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }
}
