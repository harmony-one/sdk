/**
 * @packageDocumentation
 * @module harmony-transaction
 * @hidden
 */

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
    const shardID =
      fromExtraction[1] !== undefined
        ? Number.parseInt(fromExtraction[1], 10)
        : params.shardID !== undefined
        ? params.shardID
        : 0;
    const to = toExtraction[0];
    const toShardID =
      toExtraction[1] !== undefined
        ? Number.parseInt(toExtraction[1], 10)
        : params.toShardID !== undefined
        ? params.toShardID
        : 0;

    const reParams = {
      ...params,
      from,
      to,
      shardID,
      toShardID,
    };

    super(reParams, messenger, txStatus);
  }
}
