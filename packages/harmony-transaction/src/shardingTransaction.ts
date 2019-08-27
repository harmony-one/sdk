import { Messenger } from '@harmony-js/network';
import { AddressSuffix } from '@harmony-js/utils';
import { Transaction } from './transaction';
import { TxParams, TxStatus } from './types';
import { defaultMessenger } from './utils';

export class ShardingTransaction extends Transaction {
  constructor(
    params?: TxParams | any,
    messenger: Messenger = defaultMessenger,
    txStatus = TxStatus.INTIALIZED,
  ) {
    const fromAddress = params.from;
    const toAddress = params.to;
    const fromExtraction =
      fromAddress !== undefined ? fromAddress.split(AddressSuffix) : ['0x', undefined];
    const toExtraction =
      toAddress !== undefined ? toAddress.split(AddressSuffix) : ['0x', undefined];
    const from = fromExtraction[0];
    const shardID = Number.parseInt(fromExtraction[1], 10);
    const to = toExtraction[0];
    const toShardID = Number.parseInt(toExtraction[1], 10);

    const reParams = {
      ...params,
      from,
      to,
      shardID,
      toShardID,
      crossShard: true,
    };

    super(reParams, messenger, txStatus);
  }
}
