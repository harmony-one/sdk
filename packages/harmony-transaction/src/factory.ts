import { getContractAddress } from '@harmony/crypto';
import { Messenger } from '@harmony/network';
import { Transaction } from './transaction';
import { TxParams, TxStatus } from './types';
class TransactionFactory {
  messenger: Messenger;

  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }
  getContractAddress(tx: Transaction) {
    const { from, nonce } = tx.txParams;
    return getContractAddress(from, Number.parseInt(`${nonce}`, 10));
  }
  newTx(txParams: TxParams): Transaction {
    return new Transaction(txParams, this.messenger, TxStatus.INTIALIZED);
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
