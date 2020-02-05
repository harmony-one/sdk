/**
 * @packageDocumentation
 * @module harmony-network
 */

import { Messenger } from '../messenger/messenger';
import { RPCMethod } from '../rpcMethod/rpc';
import { WSProvider } from '../providers/ws';
import { RPCRequestPayload } from '../types';

export class SubscriptionMethod extends WSProvider {
  param: any;
  options: any;
  shardID: number;
  messenger: Messenger;

  subscriptionId: any = null;
  constructor(param: any, options: any, messenger: Messenger, shardID: number = 0) {
    super(shardID !== 0 ? messenger.getShardProvider(shardID).url : messenger.provider.url);
    this.shardID = shardID;
    this.param = param;
    this.options = options;
    this.messenger = messenger;
  }

  constructPayload(method: string, param: any, options?: any): RPCRequestPayload<any> {
    let rpcMethod = method;
    const payload: any = [];
    payload.push(param);
    if (options) {
      payload.push(options);
    }
    rpcMethod = this.messenger.setRPCPrefix(method, this.messenger.chainPrefix);
    return this.jsonRpc.toPayload(rpcMethod, payload);
  }

  async start() {
    const subscribePayload = this.constructPayload(RPCMethod.Subscribe, this.param, this.options);
    try {
      const id = await super.subscribe(subscribePayload);
      this.subscriptionId = id;
      this.on(id, (result: any) => {
        const output = this.onNewSubscriptionItem(result);

        this.emitter.emit('data', output);
      });
      this.once('error', (error) => {
        this.removeEventListener(id);
        this.emitter.emit('error', error);
        this.removeEventListener('*');
      });
    } catch (error) {
      this.emitter.emit('error', error);
      this.removeEventListener('*');
    }
    return this;
  }
  unsubscribe() {
    const unsubscribePayload = this.constructPayload(RPCMethod.UnSubscribe, this.subscriptionId);
    return super.unsubscribe(unsubscribePayload);
  }
  onNewSubscriptionItem(subscriptionItem: any) {
    return subscriptionItem;
  }
}
