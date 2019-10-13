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

export const enum TxStatus {
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
