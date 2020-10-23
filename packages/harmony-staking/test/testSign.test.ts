/**
 * @packageDocumentation
 * @module harmony-staking
 * @ignore
 */

import { Wallet } from '@harmony-js/account';
import { getAddressFromPrivateKey } from '@harmony-js/crypto';
import { HttpProvider, Messenger } from '@harmony-js/network';
import { ChainID, ChainType, isValidAddress } from '@harmony-js/utils';
// tslint:disable-next-line: no-implicit-dependencies
import fetch from 'jest-fetch-mock';

const http = new HttpProvider('http://mock.com');
// const ws = new WSProvider('ws://mock.com');

const msgHttp = new Messenger(http, ChainType.Harmony, ChainID.HmyLocal);
// const msgWs = new Messenger(ws, ChainType.Harmony, ChainID.HmyLocal);

const walletHttp = new Wallet(msgHttp);

import {
  CreateValidator,
  EditValidator,
  Delegate,
  Undelegate,
  CollectRewards,
  Directive,
  StakingTransaction,
  Description,
  CommissionRate,
  Decimal,
  StakingFactory,
} from '../src';

import testTransactions from './transactions.json';

describe('test sign staking transaction', () => {
  afterEach(() => {
    fetch.resetMocks();
    // jest.clearAllTimers();
  });
  it('should test sign create validator staking transaction', () => {
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
    const commissionRates: CommissionRate = new CommissionRate(
      new Decimal(testTx.commissionRates.rate),
      new Decimal(testTx.commissionRates.maxRate),
      new Decimal(testTx.commissionRates.maxChangeRate),
    );
    const stakeMsg: CreateValidator = new CreateValidator(
      testTx.validatorAddress,
      desc,
      commissionRates,
      testTx.minSelfDelegation,
      testTx.maxTotalDelegation,
      testTx.slotPubKeys,
      testTx.amount,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveCreateValidator,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign create validator staking transaction using factory', () => {
    const testTx: any = testTransactions[0];

    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakingFactory = new StakingFactory(msgHttp);
    const stakingTx = stakingFactory
      .createValidator({
        validatorAddress: testTx.validatorAddress,
        description: {
          ...testTx.description,
        },
        commissionRate: {
          ...testTx.commissionRates,
        },
        minSelfDelegation: testTx.minSelfDelegation,
        maxTotalDelegation: testTx.maxTotalDelegation,
        slotPubKeys: testTx.slotPubKeys,
        amount: testTx.amount,
      })
      .setTxParams({
        nonce: testTx.nonce,
        gasPrice: testTx.gasPrice,
        gasLimit: testTx.gasLimit,
        chainId: testTx.chainID,
        signature: {
          v: 0,
          r: '',
          s: '',
        },
      })
      .build();
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
      testTx.validatorAddress,
      desc,
      new Decimal(testTx.commissionRate),
      testTx.minSelfDelegation,
      testTx.maxTotalDelegation,
      testTx.slotKeyToRemove,
      testTx.slotKeyToAdd,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveEditValidator,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign edit validator staking transaction using factory', () => {
    const testTx: any = testTransactions[1];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakingFactory = new StakingFactory(msgHttp);
    const stakingTx = stakingFactory
      .editValidator({
        validatorAddress: testTx.validatorAddress,
        description: { ...testTx.description },
        commissionRate: testTx.commissionRate,
        minSelfDelegation: testTx.minSelfDelegation,
        maxTotalDelegation: testTx.maxTotalDelegation,
        slotKeyToRemove: testTx.slotKeyToRemove,
        slotKeyToAdd: testTx.slotKeyToAdd,
      })
      .setTxParams({
        nonce: testTx.nonce,
        gasPrice: testTx.gasPrice,
        gasLimit: testTx.gasLimit,
        chainId: testTx.chainID,
        signature: {
          v: 0,
          r: '',
          s: '',
        },
      })
      .build();
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
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign delegate staking transaction using factory', () => {
    const testTx: any = testTransactions[2];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakingFactory = new StakingFactory(msgHttp);
    const stakingTx = stakingFactory
      .delegate({
        delegatorAddress: testTx.delegatorAddress,
        validatorAddress: testTx.validatorAddress,
        amount: testTx.amount,
      })
      .setTxParams({
        nonce: testTx.nonce,
        gasPrice: testTx.gasPrice,
        gasLimit: testTx.gasLimit,
        chainId: testTx.chainID,
        signature: {
          v: 0,
          r: '',
          s: '',
        },
      })
      .build();

    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign undelegate staking transaction', () => {
    const testTx: any = testTransactions[3];
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
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign undelegate staking transaction using factory', () => {
    const testTx: any = testTransactions[3];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakingFactory = new StakingFactory(msgHttp);
    const stakingTx = stakingFactory
      .undelegate({
        delegatorAddress: testTx.delegatorAddress,
        validatorAddress: testTx.validatorAddress,
        amount: testTx.amount,
      })
      .setTxParams({
        nonce: testTx.nonce,
        gasPrice: testTx.gasPrice,
        gasLimit: testTx.gasLimit,
        chainId: testTx.chainID,
        signature: {
          v: 0,
          r: '',
          s: '',
        },
      })
      .build();
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });

  it('should test sign collect rewards staking transaction', () => {
    const testTx: any = testTransactions[4];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakeMsg: CollectRewards = new CollectRewards(testTx.delegatorAddress);

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveCollectRewards,
      stakeMsg,
      testTx.nonce,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
    );
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign collect rewards staking transaction using factory', () => {
    const testTx: any = testTransactions[4];
    const address = getAddressFromPrivateKey(testTx.privateKey);
    expect(isValidAddress(address)).toEqual(true);
    const stakingFactory = new StakingFactory(msgHttp);
    const stakingTx = stakingFactory
      .collectRewards({
        delegatorAddress: testTx.delegatorAddress,
      })
      .setTxParams({
        nonce: testTx.nonce,
        gasPrice: testTx.gasPrice,
        gasLimit: testTx.gasLimit,
        chainId: testTx.chainID,
        signature: {
          v: 0,
          r: '',
          s: '',
        },
      })
      .build();
    const signed = stakingTx.rlpSign(testTx.privateKey);
    expect(signed[1]).toEqual(testTx.encoded);
  });
  it('should test sign create validator staking transaction using wallet', async () => {
    const testTx: any = testTransactions[0];
    const responses = [
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
    const commissionRates: CommissionRate = new CommissionRate(
      new Decimal(testTx.commissionRates.rate),
      new Decimal(testTx.commissionRates.maxRate),
      new Decimal(testTx.commissionRates.maxChangeRate),
    );
    const stakeMsg: CreateValidator = new CreateValidator(
      testTx.validatorAddress,
      desc,
      commissionRates,
      testTx.minSelfDelegation,
      testTx.maxTotalDelegation,
      testTx.slotPubKeys,
      testTx.amount,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveCreateValidator,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
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
      testTx.validatorAddress,
      desc,
      new Decimal(testTx.commissionRate),
      testTx.minSelfDelegation,
      testTx.maxTotalDelegation,
      testTx.slotKeyToRemove,
      testTx.slotKeyToAdd,
    );
    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveEditValidator,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
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
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign undelegate staking transaction using wallet', async () => {
    const testTx: any = testTransactions[3];

    const responses = [
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
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getFromAddress()).toEqual(account.bech32Address);
    expect(signedStaking.getSignature()).toBeTruthy();
    expect(signedStaking.getUnsignedRawTransaction()).toBeTruthy();
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
  it('should test sign collect rewards staking transaction using wallet', async () => {
    const testTx: any = testTransactions[4];
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: testTx.nonce,
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const stakeMsg: CollectRewards = new CollectRewards(testTx.delegatorAddress);

    const stakingTx: StakingTransaction = new StakingTransaction(
      Directive.DirectiveCollectRewards,
      stakeMsg,
      0,
      testTx.gasPrice,
      testTx.gasLimit,
      testTx.chainID,
    );
    const account: any = walletHttp.addByPrivateKey(testTx.privateKey);
    const signedStaking: StakingTransaction = await account.signStaking(stakingTx);
    expect(signedStaking.getRawTransaction()).toEqual(testTx.encoded);
  });
});
