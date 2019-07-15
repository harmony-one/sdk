import { harmony } from './harmony';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, TxStatus } from '@harmony-js/transaction';

import demoAccounts from '../fixtures/testAccount.json';

const receiver = demoAccounts.Accounts[3];
jest.useRealTimers();

describe('test Transaction using SDK', () => {
  let signed: Transaction;
  let sent: Transaction;
  let txId: string;
  it('should test signTransaction', async () => {
    const txnObject = {
      to: harmony.crypto.getAddress(receiver.Address).bech32,
      value: new harmony.utils.Unit('100').asGwei().toWei(),
      gasLimit: new harmony.utils.Unit('210000').asWei().toWei(),
      gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
    };

    const txn = harmony.transactions.newTx(txnObject);
    signed = await harmony.wallet.signTransaction(txn);
    expect(signed.isSigned()).toEqual(true);
  });
  it('should send transaction', async () => {
    const [sentTxn, id] = await signed.sendTransaction();
    expect(sentTxn.isPending()).toEqual(true);
    expect(harmony.utils.isHash(id)).toEqual(true);
    txId = id;
    sent = sentTxn;
  });
  it('should confirm a transaction', async () => {
    const toConfirm = await sent.confirm(txId, 20, 1000);
    expect(toConfirm.receipt !== undefined).toEqual(true);
    expect(checkTransactionReceipt(toConfirm.receipt)).toEqual(true);
    if (toConfirm.isConfirmed()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.CONFIRMED);
    } else if (toConfirm.isRejected()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.REJECTED);
    }
  });
});

function checkTransactionReceipt(data: any) {
  return harmony.utils.validateArgs(
    data,
    {
      blockNumber: [harmony.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || harmony.utils.isAddress,
      ],
      cumulativeGasUsed: [harmony.utils.isHex],
      from: [harmony.utils.isAddress],
      gasUsed: [harmony.utils.isHex],
      logs: [harmony.utils.isArray],
      logsBloom: [harmony.utils.isHex],
      root: [harmony.utils.isHash],
      shardID: [harmony.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || harmony.utils.isAddress],
      transactionHash: [harmony.utils.isHash],
      transactionIndex: [harmony.utils.isHex],
    },
    { blockHash: [harmony.utils.isHash] },
  );
}
