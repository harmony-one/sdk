import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewHeaders extends SubscriptionMethod {
  constructor(messenger: Messenger, shardID: number = 0) {
    super('newHeads', undefined, messenger, shardID);
    this.start();
  }
}
