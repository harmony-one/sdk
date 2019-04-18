import { RPCMethod } from './rpc';
import { Messenger } from '../messenger/messenger';
import { assertObject, AssertType } from '@harmony/utils';

class Blockchain {
  messenger: Messenger;

  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }

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
    const result = await this.messenger.send(RPCMethod.GetBalance, [
      address,
      blockNumber || tag,
    ]);
    return result;
  }
}

export { Blockchain };
