import { BN, Signature } from '@harmony-js/crypto';
export interface TxParams {
  id: string;
  from: string;
  to: string;
  nonce: number | string;
  gasLimit: BN;
  gasPrice: BN;
  shardID: number | string;
  toShardID: number | string;
  data: string;
  value: BN;
  chainId: number;
  txnHash: string;
  unsignedTxnHash: string;
  signature: Signature;
  receipt?: TransasctionReceipt;
}

export const enum TxStatus {
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
  status: string;
  logsBloom: string; // 256 byte bloom filter
  v: string;
  r: string;
  s: string;
  responseType?: string;
}
