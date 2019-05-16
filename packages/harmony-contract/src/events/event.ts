import { AbiItemModel } from '../models/types';
import { Messenger, RPCMethod, WSProvider } from '@harmony/network';
import { Contract } from '../contract';
import { decode as eventLogDecoder } from '../utils/decoder';
import { inputLogFormatter, outputLogFormatter } from '../utils/formatter';
export class EventMethod {
  params: any;
  methodKey: string;
  contract: Contract;
  messenger?: Messenger;
  abiItem: AbiItemModel;
  constructor(
    methodKey: string,
    params: any,
    abiItem: AbiItemModel,
    contract: Contract,
  ) {
    this.methodKey = methodKey;
    this.contract = contract;
    this.messenger = contract.wallet.messenger;
    this.params = params;
    this.abiItem = abiItem;
  }
  send() {}
  call() {}
  estimateGas() {}
  encodeABI() {}
  subscribe(options: any) {
    if (
      options &&
      typeof options.filter !== 'undefined' &&
      typeof options.topics !== 'undefined'
    ) {
      throw new Error(
        'Invalid subscription options: Only filter or topics are allowed and not both',
      );
    }
    if (this.emitter && this.messenger) {
      const messenger = this.messenger;
      const emitter = this.emitter;
      const inputOptions = inputLogFormatter(options);
      // 1. getLog
      // 2. subscribe pastlog
      // 3. emit data
      messenger
        .send(RPCMethod.GetPastLogs, [inputOptions])
        .then((logs: any) => {
          logs.forEach((log: any) => {
            const formattedLog = this.onNewSubscriptionItem(log);
            emitter.emit('data', formattedLog);
          });
          messenger.subscribe('logs', [inputOptions] || []);
        })
        .catch((error) => {
          emitter.emit('error', error);
        });
    }
    return this.contract;
    // return this.eventSubscriptionFactory
    //   .createEventLogSubscription(
    //     this.eventLogDecoder,
    //     this.contract,
    //     this.eventOptionsMapper.map(abiItemModel, this.contract, options),
    //     abiItemModel,
    //   )
    //   .subscribe(callback);
    // this.messenger.subscribe()
  }
  onNewSubscriptionItem(subscriptionItem: any) {
    // const log = outputLogFormatter(subscriptionItem);
    const log = eventLogDecoder(
      this.contract.abiCoder,
      this.abiItem,
      outputLogFormatter(subscriptionItem),
    );

    if (log.removed && this.emitter) {
      this.emitter.emit('changed', log);
    }

    return log;
  }
  get emitter() {
    if (this.messenger && this.messenger.provider instanceof WSProvider) {
      return this.messenger.provider.emitter;
    } else {
      return undefined;
    }
  }
}
