/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import { Messenger } from '../messenger/messenger';
import { WSProvider } from '../providers/ws';
import { BaseBlockTracker } from './baseTracker';
import { RPCMethod } from '../rpcMethod/rpc';

export class SubscribeBlockTracker extends BaseBlockTracker {
  messenger: Messenger;
  subscriptionId: any;
  // tslint:disable-next-line: variable-name

  constructor(messenger: Messenger, opts = {}) {
    // parse + validate args
    if (!messenger) {
      throw new Error('SubscribeBlockTracker - no provider specified.');
    }
    if (!(messenger.provider instanceof WSProvider)) {
      throw new Error('This provider not supported');
    }
    // BaseBlockTracker constructor
    super(opts);
    // config
    this.messenger = messenger;
    this.subscriptionId = null;
  }

  async checkForLatestBlock() {
    const result = await this.getLatestBlock();
    return result;
  }

  async _start() {
    try {
      const blockNumber = await this.messenger.send(RPCMethod.BlockNumber, []);

      if (blockNumber.isError()) {
        throw blockNumber.message;
      } else if (blockNumber.isResult()) {
        const subs = await this.messenger.subscribe(RPCMethod.Subscribe, ['newHeads']);
        this.subscriptionId = subs;
        subs[0].onData(this._handleSubData);

        this._newPotentialLatest(blockNumber);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  async _end() {
    if (this.subscriptionId != null) {
      this.messenger.unsubscribe(RPCMethod.UnSubscribe, [this.subscriptionId]);
      delete this.subscriptionId;
    }
  }

  _handleSubData(data: any) {
    if (
      // data.method === 'eth_subscription' &&
      data.params.subscription === this.subscriptionId
    ) {
      this._newPotentialLatest(data.params.result.number);
    }
  }
}
