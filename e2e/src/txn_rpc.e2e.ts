import { harmony } from './harmony';
import txnJsons from '../fixtures/transactions.json';

const messenger = harmony.messenger;

interface TransactionInfo {
  blockHash: string;
  index: string;
  blockNumber: string;
}

describe('e2e test transactions by RPC Method', () => {
  const txnHashesFixtures: any = [];
  const transactionInfoList: any = [];
  // net_*
  it('should test hmy_sendRawTransaction', async () => {
    const { transactions } = txnJsons;

    for (const txn of transactions) {
      const sent = await messenger.send('hmy_sendRawTransaction', txn.rawTransaction);
      expect(harmony.utils.isHash(sent.result)).toEqual(true);
      txnHashesFixtures.push(sent.result);
    }
  });
  it('should test hmy_getTransactionByHash', async () => {
    for (const txnHash of txnHashesFixtures) {
      const txnDetail = await harmony.blockchain.getTransactionByHash({
        txnHash,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.hash).toEqual(txnHash);

        const transactionInfo = {
          blockHash: txnDetail.result.blockHash,
          blockNumber: txnDetail.result.blockNumber,
          index: txnDetail.result.transactionIndex,
        };
        transactionInfoList.push(transactionInfo);
      }
    }
  });
  it('should test hmy_getTransactionByBlockHashAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await harmony.blockchain.getTransactionByBlockHashAndIndex({
        blockHash: transactionInfo.blockHash,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockHash).toEqual(transactionInfo.blockHash);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test hmy_getTransactionByBlockNumberAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await harmony.blockchain.getTransactionByBlockNumberAndIndex({
        blockNumber: transactionInfo.blockNumber,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockNumber).toEqual(transactionInfo.blockNumber);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test hmy_getTransactionCountByHash', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await harmony.blockchain.getBlockTransactionCountByHash({
        blockHash: transactionInfo.blockHash,
      });
      expect(harmony.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test hmy_getTransactionCountByNumber', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await harmony.blockchain.getBlockTransactionCountByNumber({
        blockNumber: transactionInfo.blockNumber,
      });
      expect(harmony.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test hmy_getTransactionReceipt', async () => {
    const { transactions } = txnJsons;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnHashesFixtures.length; i += 1) {
      const txnHash = txnHashesFixtures[i];
      const receipt: any = await harmony.blockchain.getTransactionReceipt({
        txnHash,
      });

      if (receipt.result !== null) {
        expect(checkTransactionReceipt(receipt.result)).toEqual(true);
        expect(harmony.crypto.getAddress(receipt.result.from).checksum).toEqual(
          transactions[i].senderAddress,
        );
        expect(harmony.crypto.getAddress(receipt.result.to).checksum).toEqual(
          transactions[i].receiverAddress,
        );
        expect(receipt.result.blockHash).toEqual(transactionInfoList[i].blockHash);
        expect(receipt.result.blockNumber).toEqual(transactionInfoList[i].blockNumber);
        expect(receipt.result.transactionIndex).toEqual(transactionInfoList[i].index);
      }
    }
  });
  it('should test hmy_getTransactionCount', async () => {
    const { transactions } = txnJsons;

    for (let i = 0; i < transactionInfoList; i += 1) {
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
