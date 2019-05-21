import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewPendingTransactions extends SubscriptionMethod {
  constructor(
    params: any[] = ['newPendingTransactions'],
    messenger: Messenger,
  ) {
    super(params, messenger);
  }
}
