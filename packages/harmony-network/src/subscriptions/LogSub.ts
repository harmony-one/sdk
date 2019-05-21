import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class LogSub extends SubscriptionMethod {
  constructor(params: any[] = ['logs'], messenger: Messenger) {
    super(params, messenger);
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
