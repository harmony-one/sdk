import { RPCMethod } from './rpc';
import { Messenger } from '../messenger/messenger';
import {
  assertObject,
  AssertType,
  HarmonyCore,
  ChainType,
} from '@harmony/utils';

class Blockchain extends HarmonyCore {
  messenger: Messenger;
  chainType: ChainType;

  constructor(messenger: Messenger, chainType: ChainType = ChainType.Harmony) {
    super(chainType);
    this.messenger = messenger;
    this.chainType = chainType;
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   *
   */
  @assertObject({
    address: ['isAddress', AssertType.required],
    blockNumber: ['isHex', AssertType.optional],
    tag: ['isString', AssertType.optional],
  })
  async getBalance({
    address,
    blockNumber,
    tag = 'latest',
  }: {
    address: string;
    blockNumber: string;
    tag: string;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBalance,
      [address, blockNumber || tag],
      this.chainPrefix,
    );
    return result;
  }

  @assertObject({
    hash: ['isHash', AssertType.required],
    returnObject: ['isBoolean', AssertType.optional],
  })
  async getBlockByHash({
    hash,
    returnObject = true,
  }: {
    hash: string;
    returnObject: boolean;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByHash,
      [hash, returnObject],
      this.chainPrefix,
    );
    return result;
  }

  /**
   *
   */
  @assertObject({
    hash: ['isString', AssertType.required],
  })
  async getTransactionReceipt({ hash }: { hash: string }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      [hash],
      this.chainPrefix,
    );
    return result;
  }
}

export { Blockchain };
