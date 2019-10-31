import { getContractAddress, getAddress } from '@harmony-js/crypto';
import { Messenger } from '@harmony-js/network';
import { Transaction } from './transaction';
import { ShardingTransaction } from './shardingTransaction';
import { TxParams, TxStatus } from './types';

export class TransactionFactory {
  static getContractAddress(tx: Transaction) {
    const { from, nonce } = tx.txParams;
    return getAddress(
      getContractAddress(getAddress(from).checksum, Number.parseInt(`${nonce}`, 10)),
    ).checksum;
  }

  messenger: Messenger;
  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  newTx(txParams?: TxParams | any, sharding: boolean = false): Transaction {
    if (!sharding) {
      return new Transaction(txParams, this.messenger, TxStatus.INTIALIZED);
    }
    return new ShardingTransaction(txParams, this.messenger, TxStatus.INTIALIZED);
  }

  clone(transaction: Transaction): Transaction {
    return new Transaction(transaction.txParams, this.messenger, TxStatus.INTIALIZED);
  }

  recover(txHash: string): Transaction {
    const newTxn = new Transaction({}, this.messenger, TxStatus.INTIALIZED);
    newTxn.recover(txHash);
    return newTxn;
  }
}
