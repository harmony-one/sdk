/**
 * @packageDocumentation
 * @module harmony-transaction
 * @ignore
 */

import { TransactionFactory, Transaction, TxStatus } from '../src';
// tslint:disable-next-line: no-implicit-dependencies
import { Wallet } from '@harmony-js/account';
import { HttpProvider, Messenger } from '@harmony-js/network';
import { ChainType, ChainID } from '@harmony-js/utils';
import { toChecksumAddress, randomBytes } from '@harmony-js/crypto';
// tslint:disable-next-line: no-implicit-dependencies
import fetch from 'jest-fetch-mock';

const http = new HttpProvider('http://mock.com');
// const ws = new WSProvider('ws://mock.com');

const addr = toChecksumAddress('0x' + randomBytes(20));

const msgHttp = new Messenger(http, ChainType.Harmony, ChainID.HmyLocal);
// const msgWs = new Messenger(ws, ChainType.Harmony, ChainID.HmyLocal);

const walletHttp = new Wallet(msgHttp);
// const walletWs = new Wallet(msgWs);

describe('test send transaction', () => {
  beforeEach(() => {
    // jest.useFakeTimers();
  });
  afterEach(() => {
    fetch.resetMocks();
    // jest.clearAllTimers();
  });
  it('should test wallet sign and send', async () => {
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: 1,
      },
      {
        jsonrpc: '2.0',
        id: 1,
        result: '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);
    const factory = new TransactionFactory(msgHttp);

    const tx: Transaction = factory.newTx(
      {
        to: addr,
        value: '1',
        gasLimit: '21000',
        gasPrice: '1',
      },
      false,
    );

    expect(tx.txStatus).toEqual(TxStatus.INTIALIZED);
    const account: any | Account = await walletHttp.createAccount();
    const signed: Transaction = await account.signTransaction(tx, true, 'rlp', 'latest');
    expect(signed.txStatus).toEqual(TxStatus.SIGNED);
    expect(signed.txParams.nonce).toEqual(1);
    expect(signed.txPayload.nonce).toEqual('0x1');
    expect(signed.txParams.signature.r).toBeTruthy();
    expect(signed.txParams.signature.s).toBeTruthy();
    expect(signed.txParams.signature.v).toBeTruthy();
    expect(signed.txParams.rawTransaction).toEqual(signed.getRawTransaction());

    const [sent, hash] = await signed.sendTransaction();
    expect(sent.txParams.id).toEqual(hash);
    expect(sent.txStatus).toEqual(TxStatus.PENDING);
  });
  it('should test wallet sign and send shardingTransaction', async () => {
    const factory = new TransactionFactory(msgHttp);

    const tx: Transaction = factory.newTx(
      {
        to: addr + '-1',
        value: '1',
        gasLimit: '21000',
        gasPrice: '1',
      },
      true,
    );
    expect(tx.cxStatus).toEqual(TxStatus.INTIALIZED);
  });

  it('should reject and confirm tx', async () => {
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            current: true,
            http: 'http://localhost',
            shardID: 0,
            ws: 'ws://localhost',
          },
          {
            current: false,
            http: 'http://localhost',
            shardID: 1,
            ws: 'ws://localhost',
          },
        ],
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x0',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      // attemp 1
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x2',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x2',
      },
      // attemp 2
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x3',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x3',
      },
      // attemp 3
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x4',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
      {
        jsonrpc: '2.0',
        id: 3,
        result: {
          blockHash: '0x7ef01c8532dbe8ae9930ebf3d38cf5f3937193c3c90680d4e9d5206552e4f6a6',
          blockNumber: '0x1d3c0',
          contractAddress: null,
          cumulativeGasUsed: '0x5208',
          from: 'one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
          gasUsed: '0x5208',
          logs: [],
          logsBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          shardID: 0,
          status: '0x1',
          to: 'one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
          transactionHash: '0x1bb3cadb2031e5ce987b0c557abe134986b9834963dd0d54f75a9c7d966606ce',
          transactionIndex: '0x0',
        },
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const hash = '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424';
    const factory = new TransactionFactory(msgHttp);
    const shardID = 0;
    const toShardID = 1;

    const tx: Transaction = factory.newTx({ shardID, toShardID }, false);
    expect(tx.cxStatus).toEqual(TxStatus.INTIALIZED);
    await tx.messenger.setShardingProviders();

    await expect(tx.txConfirm(hash, 3, 100, shardID)).rejects.toThrow(
      'The transaction is still not confirmed after 3 attempts.',
    );
    const confirmed = await tx.txConfirm(hash, 4, 100, shardID);
    expect(confirmed.txStatus).toEqual(TxStatus.CONFIRMED);
  });
  it('should reject and confirm cx', async () => {
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            current: true,
            http: 'http://localhost',
            shardID: 0,
            ws: 'ws://localhost',
          },
          {
            current: false,
            http: 'http://localhost',
            shardID: 1,
            ws: 'ws://localhost',
          },
        ],
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x0',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      // attemp 1
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x2',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x2',
      },
      // attemp 2
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x3',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: null,
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x3',
      },
      // attemp 3
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x4',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
      {
        jsonrpc: '2.0',
        id: 6,
        result: {
          blockHash: '0xd92f3610d52bde907ab42e064d73c2314c058015a7162ee8a4500bc581903cc2',
          blockNumber: '0x18465',
          hash: '0xcff4a3a6fd4eb34b9a7e48e3eca0c8c899de71a1ea21a126cc1048e65b332a72',
          from: 'one1v5fevthrnfeqjwcl5p0sfq3u34c2gmtqq095at',
          to: 'one18spwh74s5hkg2nva40scx7hwdjpup28dw4dfsg',
          shardID: 0,
          toShardID: 1,
          value: '0xde0b6b3a7640000',
        },
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const hash = '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424';
    const factory = new TransactionFactory(msgHttp);
    const shardID = 0;
    const toShardID = 1;

    const tx: Transaction = factory.newTx({ shardID, toShardID }, false);
    expect(tx.cxStatus).toEqual(TxStatus.INTIALIZED);
    await tx.messenger.setShardingProviders();

    await expect(tx.cxConfirm(hash, 3, 100, toShardID)).rejects.toThrow(
      'The transaction is still not confirmed after 3 attempts.',
    );
    const confirmed = await tx.cxConfirm(hash, 4, 100, toShardID);
    expect(confirmed.cxStatus).toEqual(TxStatus.CONFIRMED);
  });
  it('should confirm and confirm cx', async () => {
    const responses = [
      {
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            current: true,
            http: 'http://localhost',
            shardID: 0,
            ws: 'ws://localhost',
          },
          {
            current: false,
            http: 'http://localhost',
            shardID: 1,
            ws: 'ws://localhost',
          },
        ],
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x0',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      {
        jsonrpc: '2.0',
        id: 3,
        result: {
          blockHash: '0x7ef01c8532dbe8ae9930ebf3d38cf5f3937193c3c90680d4e9d5206552e4f6a6',
          blockNumber: '0x1d3c0',
          contractAddress: null,
          cumulativeGasUsed: '0x5208',
          from: 'one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
          gasUsed: '0x5208',
          logs: [],
          logsBloom:
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          shardID: 0,
          status: '0x1',
          to: 'one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
          transactionHash: '0x1bb3cadb2031e5ce987b0c557abe134986b9834963dd0d54f75a9c7d966606ce',
          transactionIndex: '0x0',
        },
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x1',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x4',
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
      {
        jsonrpc: '2.0',
        id: 6,
        result: {
          blockHash: '0xd92f3610d52bde907ab42e064d73c2314c058015a7162ee8a4500bc581903cc2',
          blockNumber: '0x18465',
          hash: '0xcff4a3a6fd4eb34b9a7e48e3eca0c8c899de71a1ea21a126cc1048e65b332a72',
          from: 'one1v5fevthrnfeqjwcl5p0sfq3u34c2gmtqq095at',
          to: 'one18spwh74s5hkg2nva40scx7hwdjpup28dw4dfsg',
          shardID: 0,
          toShardID: 1,
          value: '0xde0b6b3a7640000',
        },
      },
      {
        jsonrpc: '2.0',
        id: 5,
        result: '0x5',
      },
    ].map((res) => [JSON.stringify(res)] as [string]);

    fetch.mockResponses(...responses);

    const hash = '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424';
    const factory = new TransactionFactory(msgHttp);
    const shardID = 0;
    const toShardID = 1;

    const tx: Transaction = factory.newTx({ shardID, toShardID }, false);
    expect(tx.txStatus).toEqual(TxStatus.INTIALIZED);
    expect(tx.cxStatus).toEqual(TxStatus.INTIALIZED);
    await tx.messenger.setShardingProviders();

    tx.observed()
      .on('track', (track) => {
        expect(track).toBeTruthy();
      })
      .on('confirmation', (confirmation) => {
        expect(confirmation).toBeTruthy();
      });

    const confirmed = await tx.confirm(hash);

    expect(confirmed.isSigned()).toEqual(false);
    expect(confirmed.isPending()).toEqual(false);
    expect(confirmed.isRejected()).toEqual(false);
    expect(confirmed.isInitialized()).toEqual(false);
    expect(confirmed.isConfirmed()).toEqual(true);
    expect(confirmed.isCxPending()).toEqual(false);
    expect(confirmed.isCxRejected()).toEqual(false);
    expect(confirmed.isCxConfirmed()).toEqual(true);
    confirmed.setCxStatus(confirmed.cxStatus);
    confirmed.setTxStatus(confirmed.txStatus);
    expect(confirmed.getTxStatus()).toEqual(TxStatus.CONFIRMED);
    expect(confirmed.getCxStatus()).toEqual(TxStatus.CONFIRMED);
  });
});
