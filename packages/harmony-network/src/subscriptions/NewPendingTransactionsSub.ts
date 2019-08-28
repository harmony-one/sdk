import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewPendingTransactions extends SubscriptionMethod {
  constructor(messenger: Messenger, shardID: number = 0) {
    super('newPendingTransactions', undefined, messenger, shardID);
    this.start();
  }
}
