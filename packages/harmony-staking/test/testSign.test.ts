import { getAddressFromPrivateKey } from '@harmony-js/crypto';
import { isValidAddress } from '@harmony-js/utils';

import {
  NewValidator,
  EditValidator,
  Delegate,
  Redelegate,
  Undelegate,
  Directive,
  StakingTransaction,
  Description,
  CommissionRate,
  Decimal,
} from '../src/stakingTransaction';

import testTransactions from './transactions.json';

describe('test sign staking transaction', () => {
  it('should test sign new validator staking transaction', () => {
    const testTx: any = testTransactions[0];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const desc: Description = new Description(
      testTx.description.name,
      testTx.description.identity,
      testTx.description.website,
      testTx.description.securityContact,
      testTx.description.details,
    );
    const commission: CommissionRate = new CommissionRate(
      new Decimal(testTx.commission.rate, 0),
      new Decimal(testTx.commission.maxRate, 0),
      new Decimal(testTx.commission.maxChangeRate, 0),
    );
    const stakeMsg: NewValidator = new NewValidator(
      desc,
      commission,
      testTx.minSelfDelegation,
      testTx.stakingAddress,
      testTx.pubKey,
      testTx.amount,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveNewValidator,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign edit validator staking transaction', () => {
    const testTx: any = testTransactions[1];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const desc: Description = new Description(
      testTx.description.name,
      testTx.description.identity,
      testTx.description.website,
      testTx.description.securityContact,
      testTx.description.details,
    );
    const stakeMsg: EditValidator = new EditValidator(
      desc,
      testTx.stakingAddress,
      new Decimal(testTx.commissionRate, 0),
      testTx.minSelfDelegation,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveEditValidator,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign delegate staking transaction', () => {
    const testTx: any = testTransactions[2];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakeMsg: Delegate = new Delegate(
      testTx.delegatorAddress,
      testTx.validatorAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveDelegate,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign redelegate staking transaction', () => {
    const testTx: any = testTransactions[3];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakeMsg: Redelegate = new Redelegate(
      testTx.delegatorAddress,
      testTx.validatorSrcAddress,
      testTx.validatorDstAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveRedelegate,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign undelegate staking transaction', () => {
    const testTx: any = testTransactions[4];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakeMsg: Undelegate = new Undelegate(
      testTx.delegatorAddress,
      testTx.validatorAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveUndelegate,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
});
