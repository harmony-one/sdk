import { Messenger } from '../messenger/messenger';
import { RPCMethod } from '../rpcMethod/rpc';
import { WSProvider } from '../providers/ws';
import { RPCRequestPayload } from '../types';

export class SubscriptionMethod extends WSProvider {
  params: any[];
  messenger: Messenger;

  subscriptionId: any = null;
  constructor(params: any[], messenger: Messenger) {
    super(messenger.provider.url);
    this.params = params;
    this.messenger = messenger;
    this.start();
  }

  constructPayload(method: string, payload: any): RPCRequestPayload<any> {
    let rpcMethod = method;
    rpcMethod = this.messenger.setRPCPrefix(method, this.messenger.chainPrefix);
    return this.jsonRpc.toPayload(rpcMethod, payload);
  }

  async start() {
    const subscribePayload = this.constructPayload(
      RPCMethod.Subscribe,

      this.params,
    );
    try {
      const id = await super.subscribe(subscribePayload);
      this.subscriptionId = id;
      this.on(id, (result: any) => {
        this.emitter.emit('data', result);
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
    const unsubscribePayload = this.constructPayload(RPCMethod.UnSubscribe, [
      this.subscriptionId,
    ]);
    return super.unsubscribe(unsubscribePayload);
  }
}
