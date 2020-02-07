/**
 * @packageDocumentation
 * @module harmony-core
 */

import {
  RPCMethod,
  Messenger,
  ResponseMiddleware,
  WSProvider,
  NewPendingTransactions,
  NewHeaders,
  LogSub,
  Syncing,
} from '@harmony-js/network';

import {
  assertObject,
  AssertType,
  // HarmonyCore,
  DefaultBlockParams,
} from '@harmony-js/utils';

import { getAddress } from '@harmony-js/crypto';

import { Transaction } from '@harmony-js/transaction';
import { StakingTransaction } from '@harmony-js/staking';

class Blockchain {
  messenger: Messenger;

  /**
   * @hidden
   */
  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   * @hidden
   */
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   *
   * @hidden
   */
  getRpcResult(result: any) {
    if (result instanceof ResponseMiddleware) {
      return result.getRaw;
    } else {
      return result;
    }
  }

  /**
   * Get the balance of an address at a given block.
   *
   * @param address the address to get the balance of.
   * @param blockNumber (option) If you pass this parameter it will not use the default block set with `DefaultBlockParams.latest`
   * @param shardID (option) If you pass this parameter it will not use the default block set with `this.messenger.currentShard`
   *
   * @returns The current balance for the given address in wei.
   *
   * @hint
   * ```
   * the third param `shardID` is binding with the endpoint
   * shard 0: localhost:9500
   * shard 1: localhost:9501
   * ```
   *
   * @example
   * ```
   * hmy.blockchain.getBalance({
   *   address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
   *   blockNumber: 'latest'
   * }).then(value => {
   *   console.log(value.result);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBalance({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBalance,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the current block number.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `Promise` - The number of the most recent block.
   *
   * @hint
   * ```
   * the third param `shardID` is binding with the endpoint
   * shard 0: localhost:9500
   * shard 1: localhost:9501
   * ```
   *
   * @example
   * ```
   * hmy.blockchain.getBlockNumber().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async getBlockNumber(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.BlockNumber,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a block matching the block Hash.
   *
   * @param blockHash the block hash
   * @param returnObject By default it is `true`, Features in development, IGNORE it!
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - The block object
   *
   * @example
   * ```
   * hmy.blockchain.getBlockByHash({
   *   blockHash: '0x9cd821b576efdff61280e8857ef218fb2cff8db0cf0fb27dfceef7237042b79e',
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    returnObject: ['isBoolean', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockByHash({
    blockHash,
    returnObject = true,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    returnObject?: boolean;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByHash,
      [blockHash, returnObject],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a block matching the block Number.
   *
   * @param blockNumber the block number
   * @param returnObject By default it is `true`, Features in development, IGNORE it!
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - The block object
   *
   * @example
   * ```
   * hmy.blockchain.getBlockByNumber({
   *   blockNumber: '0x89',
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    returnObject: ['isBoolean', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockByNumber({
    blockNumber = DefaultBlockParams.latest,
    returnObject = true,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber?: string;
    returnObject?: boolean;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByNumber,
      [blockNumber, returnObject],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the number of transaction in a given block.
   *
   * @param blockHash the block number Hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  The number of transactions in the given block.
   *
   * @example
   * ```
   * hmy.blockchain.getBlockTransactionCountByHash({
   *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1'
   * }).then((value) => {
   *   console.log(value):
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockTransactionCountByHash({
    blockHash,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByHash,
      [blockHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the number of transaction in a given block.
   *
   * @param blockNumber the block number Hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  The number of transactions in the given block.
   *
   * @example
   * ```
   * hmy.blockchain.getBlockTransactionCountByNumber({
   *   blockNumber: '0x2403C'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockTransactionCountByNumber({
    blockNumber,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByNumber,
      [blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction based on a block hash and the transactions index position.
   *
   * @param blockHash the block number Hash
   * @param index The transactions index position. **Hex Number**
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```
   * hmy.blockchain.getTransactionByBlockHashAndIndex({
   *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1',
   *   index: '0x0'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    index: ['isHex', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByBlockHashAndIndex({
    blockHash,
    index,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    index: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockHashAndIndex,
      [blockHash, index],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction based on a block number and the transactions index position.
   *
   * @param blockNumber the block number
   * @param index The transactions index position. **Hex Number**
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```
   * hmy.blockchain.getTransactionByBlockNumberAndIndex({
   *   blockNumber: '0x2403C',
   *   index: '0x0'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    index: ['isHex', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByBlockNumberAndIndex({
    blockNumber = DefaultBlockParams.latest,
    index,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber?: string;
    index: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockNumberAndIndex,
      [blockNumber, index],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction matching the given transaction hash.
   *
   * @param txnHash The transaction hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```
   * hmy.blockchain.getTransactionByHash({
   *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isHash', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByHash({
    txnHash,
    shardID = this.messenger.currentShard,
  }: {
    txnHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByHash,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the receipt of a transaction by transaction hash.
   *
   * @param txnHash The transaction hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
   *
   * @example
   * ```
   * hmy.blockchain.getTransactionReceipt({
   *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionReceipt({
    txnHash,
    shardID = this.messenger.currentShard,
  }: {
    txnHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get transaction recepit from cross shard transaction
   *
   * @param txnHash The transaction hash
   * @param shardID the shard id of receiver's address
   * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
   *
   * @example
   * ```
   * // This transaction sends from shard 0 to shard 1
   * hmy.blockchain.getCxReceiptByHash({
   *   txnHash: '0x7fae9252fbda68d718e610bc10cf2b5c6a9cafb42d4a6b9d6e392c77d587b9ea',
   *   shardID: 1,
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
    shardID: ['isNumber', AssertType.required],
  })
  async getCxReceiptByHash({ txnHash, shardID }: { txnHash: string; shardID: number }) {
    const result = await this.messenger.send(
      RPCMethod.GetCXReceiptByHash,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the code at a specific address.
   *
   * @param address The address to get the code from (eg:smart contract)
   * @param blockNumber (OPTIONAL) If you pass this parameter it will not use the default block
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `Promise` - The data at given `address`
   *
   * @example
   * ```
   * hmy.blockchain.getCode({
   *   address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
   *   blockNumber: 'latest'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getCode({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetCode,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the number of peers connected to.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - number of peer count
   *
   * @example
   * ```
   * hmy.blockchain.net_peerCount().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async net_peerCount(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.PeerCount, [], 'net', shardID);

    return this.getRpcResult(result);
  }

  /**
   * Get the version of net.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - the current version.
   *
   * @example
   * ```
   * hmy.blockchain.net_version().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async net_version(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.NetVersion, [], 'net', shardID);

    return this.getRpcResult(result);
  }

  /**
   * Get the protocal version.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - the current protocol version.
   *
   * @example
   * ```
   * hmy.blockchain.getProtocolVersion().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async getProtocolVersion(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.ProtocolVersion,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isValidAddress', AssertType.required],
    position: ['isHex', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getStorageAt({
    address,
    position,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    position: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetStorageAt,
      [getAddress(address).checksum, position, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionCount({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionCount,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  async getShardingStructure() {
    const result = await this.messenger.send(
      RPCMethod.GetShardingStructure,
      [],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async sendTransaction(transaction: Transaction) {
    if (!transaction.isSigned() || !transaction) {
      throw new Error('transaction is not signed or not exist');
    }
    const result = await this.messenger.send(
      RPCMethod.SendRawTransaction,
      [transaction.getRawTransaction()],
      this.messenger.chainPrefix,
      typeof transaction.txParams.shardID === 'string'
        ? Number.parseInt(transaction.txParams.shardID, 10)
        : transaction.txParams.shardID,
    );
    return this.getRpcResult(result);
  }

  async sendRawTransaction(transaction: Transaction) {
    if (!transaction.isSigned() || !transaction) {
      throw new Error('transaction is not signed or not exist');
    }
    const [txn, result] = await transaction.sendTransaction();
    if (txn.isPending()) {
      return result;
    }
  }

  createObservedTransaction(transaction: Transaction) {
    try {
      transaction.sendTransaction().then((response: any) => {
        const [txReturned, TranID] = response;

        txReturned.confirm(TranID).then((txConfirmed: Transaction) => {
          transaction.emitter.resolve(txConfirmed);
        });
      });
      return transaction.emitter;
    } catch (err) {
      throw err;
    }
  }

  async sendRawStakingTransaction(staking: StakingTransaction) {
    if (!staking.isSigned() || !staking) {
      throw new Error('staking transaction is not signed or not exist');
    }
    const [txn, result] = await staking.sendTransaction();
    if (txn.isPending()) {
      return result;
    }
  }
  createObservedStakingTransaction(staking: StakingTransaction) {
    try {
      staking.sendTransaction().then((response: any) => {
        const [txReturned, TranID] = response;

        txReturned.confirm(TranID).then((txConfirmed: StakingTransaction) => {
          staking.emitter.resolve(txConfirmed);
        });
      });
      return staking.emitter;
    } catch (err) {
      throw err;
    }
  }

  @assertObject({
    to: ['isValidAddress', AssertType.optional],
    data: ['isHex', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async estimateGas({
    to,
    data,
    shardID = this.messenger.currentShard,
  }: {
    to: string;
    data: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.EstimateGas,
      [{ to: getAddress(to).checksum, data }],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  async gasPrice(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.GasPrice,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  async call({
    payload,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    payload: any;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.Call,
      [payload, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  newPendingTransactions(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewPendingTransactions(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  newBlockHeaders(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewHeaders(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  syncing(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new Syncing(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  logs(options: any, shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new LogSub(options, this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
}

export { Blockchain };
