import {
  RPCMethod,
  Messenger,
  ResponseMiddleware,
  WSProvider,
  SubscribeReturns,
} from '@harmony-js/network';

import {
  assertObject,
  AssertType,
  HarmonyCore,
  DefaultBlockParams,
} from '@harmony-js/utils';

import { Transaction } from '@harmony-js/transaction';

class Blockchain extends HarmonyCore {
  messenger: Messenger;

  constructor(messenger: Messenger) {
    super(messenger.chainType);
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
    address: ['isAddress', AssertType.required],
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
      [address, blockNumber],
      this.chainPrefix,
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
      this.chainPrefix,
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
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    blockHash: ['isHash', AssertType.required],
  })
  async getBlockTransactionCountByHash({ blockHash }: { blockHash: string }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByHash,
      [blockHash],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.required],
  })
  async getBlockTransactionCountByNumber({
    blockNumber,
  }: {
    blockNumber: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByNumber,
      [blockNumber],
      this.chainPrefix,
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
      this.chainPrefix,
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
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    txnHash: ['isHash', AssertType.required],
  })
  async getTransactionByHash({ txnHash }: { txnHash: string }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByHash,
      [txnHash],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   *
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
  })
  async getTransactionReceipt({ txnHash }: { txnHash: string }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      [txnHash],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }
  /**
   *
   */
  @assertObject({
    address: ['isAddress', AssertType.required],
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
      [address, blockNumber],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   *
   */
  async syncing() {
    const result = await this.messenger.send(
      RPCMethod.Syncing,
      [],
      this.chainPrefix,
    );

    return this.getRpcResult(result);
  }

  async net_peerCount() {
    const result = await this.messenger.send(RPCMethod.PeerCount, [], 'net');

    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isAddress', AssertType.required],
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
      [address, position, blockNumber],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  @assertObject({
    address: ['isAddress', AssertType.required],
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
      [address, blockNumber],
      this.chainPrefix,
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
      this.chainPrefix,
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
  @assertObject({
    to: ['isAddress', AssertType.optional],
    data: ['isHex', AssertType.optional],
  })
  async estimateGas({ to, data }: { to: string; data: string }) {
    const result = await this.messenger.send(
      RPCMethod.EstimateGas,
      [{ to, data }],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  async gasPrice() {
    const result = await this.messenger.send(
      RPCMethod.GasPrice,
      [],
      this.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  newPendingTransactions() {
    if (this.messenger.provider instanceof WSProvider) {
      return this.messenger.subscribe(
        RPCMethod.Subscribe,
        ['newPendingTransactions'],
        SubscribeReturns.method,
        this.chainPrefix,
      );
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  newBlockHeaders() {
    if (this.messenger.provider instanceof WSProvider) {
      return this.messenger.subscribe(
        RPCMethod.Subscribe,
        ['newHeads'],
        SubscribeReturns.method,
        this.chainPrefix,
      );
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
}

export { Blockchain };
