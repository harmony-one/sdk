/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class Syncing extends SubscriptionMethod {
  isSyncing: boolean | null;
  constructor(messenger: Messenger, shardID: number = 0) {
    super('syncing', undefined, messenger, shardID);
    this.isSyncing = null;
    this.start();
  }

  onNewSubscriptionItem(subscriptionItem: any) {
    const isSyncing = subscriptionItem.params.result.syncing;

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
