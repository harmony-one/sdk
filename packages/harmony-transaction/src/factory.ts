/**
 * ## hhahaha
 *
 * @packageDocumentation
 * @module harmony-transaction
 */

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

  /**
   * Create a new Transaction
   * @params
   * ```
   * // to: Address of the receiver
   * // value: value transferred in wei
   * // gasLimit: the maximum gas would pay, can use string
   * // shardID: send token from shardID
   * // toShardId: send token to shardID
   * // gasPrice: you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
   * ```
   *
   * @example
   * ```javascript
   * const txn = hmy.transactions.newTx({
   *   to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
   *   value: '10000',
   *   gasLimit: '210000',
   *   shardID: 0,
   *   toShardID: 0,
   *   gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
   * });
   * ```
   */
  newTx(txParams?: TxParams | any, sharding: boolean = false): Transaction {
    if (!sharding) {
      return new Transaction(txParams, this.messenger, TxStatus.INTIALIZED);
    }
    return new ShardingTransaction(txParams, this.messenger, TxStatus.INTIALIZED);
  }

  /**
   * clone the transaction
   *
   * @param transaction
   *
   * @example
   * ```javascript
   * const cloneTxn = hmy.transactions.clone(txn);
   * console.log(cloneTxn)
   * ```
   */
  clone(transaction: Transaction): Transaction {
    return new Transaction(transaction.txParams, this.messenger, TxStatus.INTIALIZED);
  }

  /**
   *
   * @example
   * ```javascript
   * txHash = '0xf8698085174876e8008252088080949d72989b68777a1f3ffd6f1db079f1928373ee52830186a08027a0ab8229ff5d5240948098f26372eaed9ab2e9be23e8594b08e358ca56a47f8ae9a0084e5c4d1fec496af444423d8a714f65c079260ff01a1be1de7005dd424adf44'
   *
   * const recoverTx = hmy.transactions.recover(txHash);
   * console.log(recoverTx);
   * ```
   */
  recover(txHash: string): Transaction {
    const newTxn = new Transaction({}, this.messenger, TxStatus.INTIALIZED);
    newTxn.recover(txHash);
    return newTxn;
  }
}
