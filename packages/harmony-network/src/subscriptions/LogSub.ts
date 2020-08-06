/**
 * @packageDocumentation
 * @module harmony-network
 */

import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';
import { RPCMethod } from '../rpcMethod/rpc';

export class LogSub extends SubscriptionMethod {
  constructor(options: any, messenger: Messenger, shardID: number = 0) {
    super('logs', options, messenger, shardID);
    this.preprocess();
  }

  async preprocess() {
    if (
      (this.options.fromBlock && this.options.fromBlock !== 'latest') ||
      this.options.fromBlock === 0 ||
      this.options.fromBlock === '0x'
    ) {
      try {
        const getPastLogs = await this.messenger.send(
          RPCMethod.GetPastLogs,
          [...this.options],
          this.messenger.chainType,
          this.shardID,
        );

        if (getPastLogs.isError()) {
          this.emitter.emit('error', getPastLogs.error.message);
        } else {
          const logs = getPastLogs.result;
          logs.forEach((log: any) => {
            const formattedLog = this.onNewSubscriptionItem(log);
            this.emitter.emit('data', formattedLog);
          });
        }
        delete this.options.fromBlock;
        // const sub = this.start();
        return this.start();
      } catch (error) {
        this.emitter.emit('error', error);
        throw error;
      }
    }
    return this.start();
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
