/**
 * @packageDocumentation
 * @module harmony-transaction
 * @hidden
 */

import { Messenger } from '@harmony-js/network';
import { TxStatus } from './types';

export abstract class AbstractTransaction {
  abstract setMessenger(messenger: Messenger): void;
  abstract setTxStatus(txStatus: TxStatus): void;
  abstract getTxStatus(): TxStatus;
  abstract isInitialized(): boolean;
  abstract isSigned(): boolean;
  abstract isPending(): boolean;
  abstract isRejected(): boolean;
  abstract isConfirmed(): boolean;
  abstract async trackTx(txHash: string, shardID: number | string): Promise<boolean>;
  abstract async txConfirm(
    txHash: string,
    maxAttempts: number | undefined,
    interval: number | undefined,
    shardID: string | number,
  ): Promise<any>;
  abstract async socketConfirm(
    txHash: string,
    maxAttempts: number,
    shardID: number | string,
  ): Promise<any>;
  abstract async getBlockNumber(shardID: number | string): Promise<any>;
  abstract async getBlockByNumber(blockNumber: string): Promise<any>;
}
