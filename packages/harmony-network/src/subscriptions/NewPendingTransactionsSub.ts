import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewPendingTransactions extends SubscriptionMethod {
  constructor(messenger: Messenger) {
    super('newPendingTransactions', undefined, messenger);
    this.start();
  }
}
