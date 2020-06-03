/**
 * @packageDocumentation
 * @module harmony-contract
 */

import { LogSub } from '@harmony-js/network';
import { AbiItemModel } from '../models/types';
import { Contract } from '../contract';
import { decode as eventLogDecoder } from '../utils/decoder';
import { inputLogFormatter, outputLogFormatter } from '../utils/formatter';
export class EventMethod extends LogSub {
  params: any;
  methodKey: string;
  contract: Contract;
  abiItem: AbiItemModel;
  constructor(methodKey: string, params: any, abiItem: AbiItemModel, contract: Contract) {
    super(inputLogFormatter(params), contract.wallet.messenger, contract.shardID);
    this.methodKey = methodKey;
    this.contract = contract;
    this.params = params;
    this.abiItem = abiItem;
    // this.subscribe();
  }

  // call() {}
  // estimateGas() {}
  // encodeABI() {}

  onNewSubscriptionItem(subscriptionItem: any) {
    const formatted = outputLogFormatter(
      subscriptionItem.method !== undefined ? subscriptionItem.params.result : subscriptionItem,
    );
    const log = eventLogDecoder(this.contract.abiCoder, this.abiItem, formatted);

    if (log.removed && this.emitter) {
      this.emitter.emit('changed', log);
    }

    return log;
  }
}
