import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewHeaders extends SubscriptionMethod {
  constructor(messenger: Messenger) {
    super('newHeads', undefined, messenger);
    this.start();
  }
}
