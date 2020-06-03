/**
 * @packageDocumentation
 * @module harmony-network
 */

import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';

/**
 * ### Description:
 * Subscribes to incoming block headers. This can be used as timer to check for changes on the blockchain.
 */
export class NewHeaders extends SubscriptionMethod {
  constructor(messenger: Messenger, shardID: number = 0) {
    super('newHeads', undefined, messenger, shardID);
    this.start();
  }
}
