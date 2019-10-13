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

class Blockchain {
  messenger: Messenger;

  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }
  getRpcResult(result: any) {
    if (result instanceof ResponseMiddleware) {
      return result.getRaw;
    } else {
      return result;
    }
  }

  /**
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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

  async net_peerCount(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.PeerCount, [], 'net', shardID);

    return this.getRpcResult(result);
  }
  async net_version(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.NetVersion, [], 'net', shardID);

    return this.getRpcResult(result);
  }

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
    if (txn.isPending) {
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
