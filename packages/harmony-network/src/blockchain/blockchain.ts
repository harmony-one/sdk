import { RPCMethod } from './rpc';
import { Messenger } from '../messenger/messenger';

class Blockchain {
  messenger: Messenger;

  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }

  getBalance = async (address: string) => {
    const result = await this.messenger.send(RPCMethod.GetBalance, address);
    return result;
  };

  getLatestBlock = async () => {
    const result = await this.messenger.send(RPCMethod.GetLatestBlock, '');
    return result;
  };
}

export { Blockchain };
