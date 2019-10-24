import { getAddressFromPrivateKey } from '@harmony-js/crypto';
import { isValidAddress, ChainType, ChainID } from '@harmony-js/utils';
// tslint:disable-next-line: no-implicit-dependencies
import { Wallet } from '@harmony-js/account';

import { HttpProvider, Messenger } from '@harmony-js/network';

// tslint:disable-next-line: no-implicit-dependencies
import fetch from 'jest-fetch-mock';

const http = new HttpProvider('http://mock.com');
// const ws = new WSProvider('ws://mock.com');

const msgHttp = new Messenger(http, ChainType.Harmony, ChainID.HmyLocal);
// const msgWs = new Messenger(ws, ChainType.Harmony, ChainID.HmyLocal);

const walletHttp = new Wallet(msgHttp);

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
} from '../src';

import testTransactions from './transactions.json';

describe('test sign staking transaction', () => {
  afterEach(() => {
    fetch.resetMocks();
    // jest.clearAllTimers();
  });
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
  it('should test sign new validator staking transaction using wallet', async () => {
    const testTx: any = testTransactions[0];
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x666666666666',
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

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
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign edit validator staking transaction using wallet', async () => {
    const testTx: any = testTransactions[1];
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x666666666666',
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

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
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign delegate staking transaction using wallet', async () => {
    const testTx: any = testTransactions[2];
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x666666666666',
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const stakeMsg: Delegate = new Delegate(
      testTx.delegatorAddress,
      testTx.validatorAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveDelegate,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign redelegate staking transaction using wallet', async () => {
    const testTx: any = testTransactions[3];
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x666666666666',
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const stakeMsg: Redelegate = new Redelegate(
      testTx.delegatorAddress,
      testTx.validatorSrcAddress,
      testTx.validatorDstAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveRedelegate,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign undelegate staking transaction using wallet', async () => {
    const testTx: any = testTransactions[4];

    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x666666666666',
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);
    const stakeMsg: Undelegate = new Undelegate(
      testTx.delegatorAddress,
      testTx.validatorAddress,
      testTx.amount,
    );

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveUndelegate,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
      testTx.chainID,
      '',
      '',
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getFromAddress()).toEqual(account.bech32Address);
    expect(signedStaking.getSignature()).toBeTruthy();
    expect(signedStaking.getUnsignedRawTransaction()).toBeTruthy();
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
});
