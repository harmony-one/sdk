import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';
import { RPCMethod } from '../rpcMethod/rpc';

export class LogSub extends SubscriptionMethod {
  constructor(options: any, messenger: Messenger) {
    super('logs', options, messenger);
    this.subscribe();
  }

  async subscribe() {
    // if (
    //   (this.options.fromBlock && this.options.fromBlock !== 'latest') ||
    //   this.options.fromBlock === 0
    // ) {
    try {
      const getPastLogs = await this.messenger.send(RPCMethod.GetPastLogs, [
        ...this.options,
      ]);

      if (getPastLogs.isError()) {
        this.emitter.emit('error', getPastLogs.message);
      }

      const logs = getPastLogs.result;

      logs.forEach((log: any) => {
        const formattedLog = this.onNewSubscriptionItem(log);

        this.emitter.emit('data', formattedLog);
      });

      delete this.options.fromBlock;
      super.start();
      return this;
    } catch (error) {
      this.emitter.emit('error', error);
    }
    // }
    // return this;
  }

  onNewSubscriptionItem(subscriptionItem: any) {
    // todo log formatter
    const log = subscriptionItem;

    if (log.removed) {
      this.emitter.emit('changed', log);
    }

    return log;
  }
  // todo formatter
}