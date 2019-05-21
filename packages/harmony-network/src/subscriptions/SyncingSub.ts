import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class Syncing extends SubscriptionMethod {
  isSyncing: boolean | null;
  constructor(params: any[] = ['syncing'], messenger: Messenger) {
    super(params, messenger);
    this.isSyncing = null;
  }

  onNewSubscriptionItem(subscriptionItem: any) {
    const isSyncing = subscriptionItem.result.syncing;

    if (this.isSyncing === null) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    }

    if (this.isSyncing === true && isSyncing === false) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    }

    if (this.isSyncing === false && isSyncing === true) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    }
    // todo formatter
    return subscriptionItem;
  }
}
