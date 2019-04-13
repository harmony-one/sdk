import { BN, Signature } from '@harmony/crypto';
export interface TxParams {
  id: string;
  from: string;
  to: string;
  nonce: number | string;
  gasLimit: BN;
  gasPrice: BN;
  data: string;
  value: BN;
  chainId: number;
  txnHash: string;
  unsignedTxnHash: string;
  signature: Signature;
}

export const enum TxStatus {
  INTIALIZED = 'INITIALIZED',
  SIGNED = 'SIGNED',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}
