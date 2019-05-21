import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

export class NewHeaders extends SubscriptionMethod {
  constructor(params: any[] = ['newHeads'], messenger: Messenger) {
    super(params, messenger);
  }
}
