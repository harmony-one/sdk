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

import {getAddress} from '@harmony-js/crypto';

import {Transaction} from '@harmony-js/transaction';

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
  })
  async getBalance({
    address,
    blockNumber = DefaultBlockParams.latest,
  }: {
    address: string;
    blockNumber?: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBalance,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async getBlockNumber() {
    const result = await this.messenger.send(
      RPCMethod.BlockNumber,
      [],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }
  /**
   *
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    returnObject: ['isBoolean', AssertType.optional],
  })
  async getBlockByHash({
    blockHash,
    returnObject = true,
  }: {
    blockHash: string;
    returnObject?: boolean;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByHash,
      [blockHash, returnObject],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   *
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    returnObject: ['isBoolean', AssertType.optional],
  })
  async getBlockByNumber({
    blockNumber = DefaultBlockParams.latest,
    returnObject = true,
  }: {
    blockNumber?: string;
    returnObject?: boolean;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByNumber,
      [blockNumber, returnObject],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    blockHash: ['isHash', AssertType.required],
  })
  async getBlockTransactionCountByHash({blockHash}: {blockHash: string}) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByHash,
      [blockHash],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.required],
  })
  async getBlockTransactionCountByNumber({blockNumber}: {blockNumber: string}) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByNumber,
      [blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   *
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    index: ['isHex', AssertType.required],
  })
  async getTransactionByBlockHashAndIndex({
    blockHash,
    index,
  }: {
    blockHash: string;
    index: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockHashAndIndex,
      [blockHash, index],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    index: ['isHex', AssertType.required],
  })
  async getTransactionByBlockNumberAndIndex({
    blockNumber = DefaultBlockParams.latest,
    index,
  }: {
    blockNumber?: string;
    index: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockNumberAndIndex,
      [blockNumber, index],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    txnHash: ['isHash', AssertType.required],
  })
  async getTransactionByHash({txnHash}: {txnHash: string}) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByHash,
      [txnHash],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   *
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
  })
  async getTransactionReceipt({txnHash}: {txnHash: string}) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      [txnHash],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }
  /**
   *
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
  })
  async getCode({
    address,
    blockNumber = DefaultBlockParams.latest,
  }: {
    address: string;
    blockNumber?: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetCode,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async net_peerCount() {
    const result = await this.messenger.send(RPCMethod.PeerCount, [], 'net');

    return this.getRpcResult(result);
  }
  async net_version() {
    const result = await this.messenger.send(RPCMethod.NetVersion, [], 'net');

    return this.getRpcResult(result);
  }

  async getProtocolVersion() {
    const result = await this.messenger.send(
      RPCMethod.ProtocolVersion,
      [],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isValidAddress', AssertType.required],
    position: ['isHex', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
  })
  async getStorageAt({
    address,
    position,
    blockNumber = DefaultBlockParams.latest,
  }: {
    address: string;
    position: string;
    blockNumber?: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetStorageAt,
      [getAddress(address).checksum, position, blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
  })
  async getTransactionCount({
    address,
    blockNumber = DefaultBlockParams.latest,
  }: {
    address: string;
    blockNumber?: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionCount,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async sendTransaction(transaction: Transaction) {
    if (!transaction.isSigned() || !transaction) {
      throw new Error('transaction is not signed or not exist');
    }
    const result = await this.messenger.send(
      RPCMethod.SendTransaction,
      [transaction.txPayload],
      this.messenger.chainPrefix,
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
      transaction.sendTransaction().then((response) => {
        const [txReturned, TranID] = response;

        txReturned.confirm(TranID).then((txConfirmed) => {
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
  })
  async estimateGas({to, data}: {to: string; data: string}) {
    const result = await this.messenger.send(
      RPCMethod.EstimateGas,
      [{to: getAddress(to).checksum, data}],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async gasPrice() {
    const result = await this.messenger.send(
      RPCMethod.GasPrice,
      [],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async call({
    payload,
    blockNumber = DefaultBlockParams.latest,
  }: {
    payload: any;
    blockNumber?: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.Call,
      [payload, blockNumber],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  newPendingTransactions() {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewPendingTransactions(this.messenger);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  newBlockHeaders() {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewHeaders(this.messenger);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  syncing() {
    if (this.messenger.provider instanceof WSProvider) {
      return new Syncing(this.messenger);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  logs(options: any) {
    if (this.messenger.provider instanceof WSProvider) {
      return new LogSub(options, this.messenger);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
}

export {Blockchain};
