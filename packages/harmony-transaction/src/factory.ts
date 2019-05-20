import { getContractAddress } from '@harmony-js/crypto';
import { Messenger } from '@harmony-js/network';
import { Transaction } from './transaction';
import { TxParams, TxStatus } from './types';

class TransactionFactory {
  static getContractAddress(tx: Transaction) {
    const { from, nonce } = tx.txParams;
    return getContractAddress(from, Number.parseInt(`${nonce}`, 10));
  }

  messenger: Messenger;
  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  newTx(txParams?: TxParams | any): Transaction {
    return new Transaction(txParams, this.messenger, TxStatus.INTIALIZED);
  }

  clone(transaction: Transaction): Transaction {
    return new Transaction(
      transaction.txParams,
      this.messenger,
      TxStatus.INTIALIZED,
    );
  }

  recover(txHash: string): Transaction {
    const newTxn = new Transaction(
      undefined,
      this.messenger,
      TxStatus.INTIALIZED,
    );
    newTxn.recover(txHash);
    return newTxn;
  }
}

export { TransactionFactory };
