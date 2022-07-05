import fetch from 'jest-fetch-mock';
import { harmony, checkCalledMethod } from './harmony';
import txnJsons from '../fixtures/transactions.json';
import { RPCMethod } from '@harmony-js/network';

const messenger = harmony.messenger;

interface TransactionInfo {
  blockHash: string;
  index: string;
  blockNumber: string;
}

describe('e2e test transactions by RPC Method', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  const txnHashesFixtures: any = [];
  const transactionInfoList: any = [];
  const { transactions, hashes, blockHashes } = txnJsons;
  // net_*
  it('should test hmy_sendRawTransaction', async () => {
    for(let index = 0; index < transactions.length; index++) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": hashes[index]}),
      );
      const sent = await messenger.send('hmy_sendRawTransaction', transactions[index].rawTransaction);
      expect(harmony.utils.isHash(sent.result)).toEqual(true);
      txnHashesFixtures.push(sent.result);
      expect(checkCalledMethod(index, 'hmy_sendRawTransaction')).toEqual(true);
    }
  });
  it('should test hmy_getTransactionByHash', async () => {
    for(let index: number = 0; index < txnHashesFixtures.length; index++) {
      const txnHash = txnHashesFixtures[index];
      fetch.mockResponseOnce(
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": harmony.utils.numberToHex(index),
            "transactionIndex": harmony.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": harmony.utils.numberToHex(index),
            "r": harmony.utils.numberToHex(index),
            "s": harmony.utils.numberToHex(index),
          }
        })
      );
      const txnDetail = await harmony.blockchain.getTransactionByHash({
        txnHash
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByHash)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.hash).toEqual(txnHash);

        const transactionInfo = {
          blockHash: txnDetail.result.blockHash,
          blockNumber: txnDetail.result.blockNumber,
          index: txnDetail.result.transactionIndex,
        };
        transactionInfoList.push(transactionInfo);
      } else {
        fail(`txnDetail for ${txnHash} is null`);
      }
    }
  });
  it('should test hmy_getTransactionByBlockHashAndIndex', async () => {
    for (let index: number = 0; index < transactionInfoList.length; index++) {
      fetch.mockResponseOnce((req) => {
        if (!(Buffer.isBuffer(req.body))) {
          fail("POST request body not a buffer");
        }
        const body: any = JSON.parse(req.body.toString());
        // validate that the block hash is as expected
        if (body.params[0] !== blockHashes[index]) {
          fail(`Expected block hash ${blockHashes[index]} but got ${body.params[0]}`);
        }
        // validate that the transaction index is as expected
        let expectedTransactionIndex: string = harmony.utils.numberToHex(index);
        if (expectedTransactionIndex !== body.params[1]) {
          fail(`Expected transactionIndex ${expectedTransactionIndex} but got ${body.params[1]}`);
        }
        return Promise.resolve(JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": harmony.utils.numberToHex(index),
            "transactionIndex": harmony.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": harmony.utils.numberToHex(index),
            "r": harmony.utils.numberToHex(index),
            "s": harmony.utils.numberToHex(index),
          }
        }));
      });
      const transactionInfo: TransactionInfo = transactionInfoList[index];
      const txnDetail: any = await harmony.blockchain.getTransactionByBlockHashAndIndex({
        blockHash: transactionInfo.blockHash,
        index: transactionInfo.index,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByBlockHashAndIndex)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockHash).toEqual(transactionInfo.blockHash);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      } else {
        fail(`txnDetail for ${transactionInfo.blockHash}_${transactionInfo.index} is null`);
      }
    }
  });
  it('should test hmy_getTransactionByBlockNumberAndIndex', async () => {
    for (let index: number = 0; index < transactionInfoList.length; index++) {
      fetch.mockResponseOnce((req) => {
        if (!(Buffer.isBuffer(req.body))) {
          fail("POST request body not a buffer");
        }
        const body: any = JSON.parse(req.body.toString());
        // validate that the block number is as expected
        let expectedBlockNumber: string = harmony.utils.numberToHex(index);
        if (body.params[0] !== expectedBlockNumber) {
          fail(`Expected block number ${index} but got ${body.params[0]}`);
        }
        // validate that the transaction index is as expected
        let expectedTransactionIndex: string = harmony.utils.numberToHex(index);
        if (expectedTransactionIndex !== body.params[1]) {
          fail(`Expected transactionIndex ${expectedTransactionIndex} but got ${body.params[1]}`);
        }
        return Promise.resolve(JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "hash": hashes[index],
            "blockHash": blockHashes[index],
            "blockNumber": harmony.utils.numberToHex(index),
            "transactionIndex": harmony.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gas": transactions[index].gasLimit,
            "gasPrice": transactions[index].gasPrice,
            "input": "0x",
            "nonce": transactions[index].nonce,
            "to": transactions[index].receiverAddressBech32,
            "value": transactions[index].value,
            "v": harmony.utils.numberToHex(index),
            "r": harmony.utils.numberToHex(index),
            "s": harmony.utils.numberToHex(index),
          }
        }));
      });
      const transactionInfo: TransactionInfo = transactionInfoList[index];
      const txnDetail: any = await harmony.blockchain.getTransactionByBlockNumberAndIndex({
        blockNumber: transactionInfo.blockNumber,
        index: transactionInfo.index,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionByBlockNumberAndIndex)).toEqual(true);
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockNumber).toEqual(transactionInfo.blockNumber);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      } else {
        fail(`txnDetail for ${transactionInfo.blockNumber}_${transactionInfo.index} is null`);
      }
    }
  });
  it('should test hmy_getTransactionCountByHash', async () => {
    for (const some of transactionInfoList) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await harmony.blockchain.getBlockTransactionCountByHash({
        blockHash: transactionInfo.blockHash,
      });
      expect(checkCalledMethod(0, RPCMethod.GetBlockTransactionCountByHash)).toEqual(true);
      expect(harmony.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test hmy_getTransactionCountByNumber', async () => {
    for (const some of transactionInfoList) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await harmony.blockchain.getBlockTransactionCountByNumber({
        blockNumber: transactionInfo.blockNumber,
      });
      expect(checkCalledMethod(0, RPCMethod.GetBlockTransactionCountByNumber)).toEqual(true);
      expect(harmony.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test hmy_getTransactionReceipt', async () => {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < txnHashesFixtures.length; index += 1) {
      const txnHash = txnHashesFixtures[index];
      fetch.mockResponseOnce(
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "contractAddress": null,
            "blockNumber": harmony.utils.numberToHex(index),
            "from": transactions[index].senderAddress,
            "gasUsed": harmony.utils.numberToHex(index),
            "cumulativeGasUsed": harmony.utils.numberToHex(index),
            "logs": [],
            "logsBloom": harmony.utils.numberToHex(index),
            "shardID": 0,
            "to": transactions[index].receiverAddress,
            "transactionHash": hashes[index],
            "transactionIndex": harmony.utils.numberToHex(index),
            "blockHash": blockHashes[index]
          }
        })
      );
      const receipt: any = await harmony.blockchain.getTransactionReceipt({
        txnHash,
      });
      expect(checkCalledMethod(index, RPCMethod.GetTransactionReceipt)).toEqual(true);

      if (receipt.result !== null) {
        expect(checkTransactionReceipt(receipt.result)).toEqual(true);
        expect(harmony.crypto.getAddress(receipt.result.from).checksum).toEqual(
          transactions[index].senderAddress,
        );
        expect(harmony.crypto.getAddress(receipt.result.to).checksum).toEqual(
          transactions[index].receiverAddress,
        );
        expect(receipt.result.blockHash).toEqual(transactionInfoList[index].blockHash);
        expect(receipt.result.blockNumber).toEqual(transactionInfoList[index].blockNumber);
        expect(receipt.result.transactionIndex).toEqual(transactionInfoList[index].index);
      } else {
        fail(`receipt for ${txnHash} is null`);
      }
    }
  });
  it('should test hmy_getTransactionCount', async () => {
    for (let i = 0; i < transactionInfoList; i += 1) {
      fetch.mockResponseOnce(
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
      );
      const transactionInfo: TransactionInfo = transactionInfoList[i];
      const nonce: any = await harmony.blockchain.getTransactionCount({
        address: transactions[i].senderAddressBech32,
        blockNumber: transactionInfo.blockNumber,
      });
      expect(nonce.result).toEqual(transactions[i].nonce);
    }
  });
});

function checkTransactionDetail(data: any) {
  return harmony.utils.validateArgs(
    data,
    {
      blockHash: [harmony.utils.isHash],
      blockNumber: [harmony.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      from: [harmony.utils.isValidAddress],
      gas: [harmony.utils.isHex],
      gasPrice: [harmony.utils.isHex],
      hash: [harmony.utils.isHash],
      // tslint:disable-next-line: no-shadowed-variable
      input: [(data: any) => data === '0x' || harmony.utils.isHex(data)],
      nonce: [harmony.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || harmony.utils.isValidAddress(data)],
      transactionIndex: [harmony.utils.isHex],
      value: [harmony.utils.isHex],
      v: [harmony.utils.isHex],
      r: [harmony.utils.isHex],
      s: [harmony.utils.isHex],
    },
    {},
  );
}

function checkTransactionReceipt(data: any) {
  return harmony.utils.validateArgs(
    data,
    {
      blockNumber: [harmony.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || harmony.utils.isValidAddress,
      ],
      cumulativeGasUsed: [harmony.utils.isHex],
      from: [harmony.utils.isValidAddress],
      gasUsed: [harmony.utils.isHex],
      logs: [harmony.utils.isArray],
      logsBloom: [harmony.utils.isHex],

      shardID: [harmony.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || harmony.utils.isValidAddress],
      transactionHash: [harmony.utils.isHash],
      transactionIndex: [harmony.utils.isHex],
    },
    { blockHash: [harmony.utils.isHash], root: [harmony.utils.isHash] },
  );
}
