/**
 * ## About this package
 *
 * `@harmony-js/transaction` provides the functions to build transactions
 *
 * Develop can use this package to:
 * - build a transaction offline!
 * - set params of transaction
 * -
 *
 * ## How to use this package
 * ### Step 1: create a Harmony Instance
 * ```javascript
 * const { Harmony } = require('@harmony-js/core');
 * const { ChainID, ChainType } = require('@harmony-js/utils');
 * const { BN } = require('@harmony-js/crypto');
 *
 * const hmy = new Harmony(
 *   'http://localhost:9500',
 *   {
 *     chainType: ChainType.Harmony,
 *     chainId: ChainID.HmyLocal,
 *   },
 * );
 * ```
 *
 * ### Step 2: build a transaction
 * ```javascript
 * const txn = hmy.transactions.newTx({
 *   to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
 *   value: '10000',
 *   gasLimit: '210000',
 *   shardID: 0,
 *   toShardID: 0,
 *   gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
 * });
 * ```
 *
 * ## some important information
 * Transaction Parameters
 * ```java
 * // interface TxParams
 * id:               string;
 * from:             string;
 * to:               string;
 * nonce:            number | string;
 * gasLimit:         number | string | BN;
 * gasPrice:         number | string | BN;
 * shardID:          number | string;
 * toShardID:        number | string;
 * data:             string;
 * value:            number | string | BN;
 * chainId:          number;
 * rawTransaction:   string;
 * unsignedRawTransaction: string;
 * signature:        Signature;
 * receipt?:         TransasctionReceipt;
 * ```
 *
 * Transaction Receipt
 * ```java
 * // interface TransasctionReceipt
 * transactionHash:   string;
 * transactionIndex:  string;
 * blockHash:         string;
 * blockNumber:       string; // 11
 * from:              string;
 * to:                string;
 * gasUsed:           string;
 * cumulativeGasUsed: string; // 13244
 * contractAddress?:  string | null; // or null, if none was created
 * logs:              any[];
 * logsBloom:         string; // 256 byte bloom filter
 * v:                 string;
 * r:                 string;
 * s:                 string;
 * responseType?:     string;
 * byzantium?:        boolean;
 * status?:           string; // post Byzantium will return `0x0` or `0x1`
 * root?:             string; // pre Byzantium will return `root`
 * ```
 *
 * @packageDocumentation
 * @module harmony-transaction
 */

import { BN, Signature } from '@harmony-js/crypto';

export interface TxParams {
  id: string;
  from: string;
  to: string;
  nonce: number | string;
  gasLimit: number | string | BN;
  gasPrice: number | string | BN;
  shardID: number | string;
  toShardID: number | string;
  data: string;
  value: number | string | BN;
  chainId: number;
  rawTransaction: string;
  unsignedRawTransaction: string;
  signature: Signature;
  receipt?: TransasctionReceipt;
}

export enum TxStatus {
  NONE = 'NONE',
  INTIALIZED = 'INITIALIZED',
  SIGNED = 'SIGNED',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

export interface TransasctionReceipt {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string; // 11
  from: string;
  to: string;
  gasUsed: string;
  cumulativeGasUsed: string; // 13244
  contractAddress?: string | null; // or null, if none was created
  logs: any[];
  logsBloom: string; // 256 byte bloom filter
  v: string;
  r: string;
  s: string;
  responseType?: string;
  byzantium?: boolean;
  status?: string; // post Byzantium will return `0x0` or `0x1`
  root?: string; // pre Byzantium will return `root`
}
