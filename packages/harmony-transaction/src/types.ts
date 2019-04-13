import { BN, Signature } from '@harmony/crypto';
export interface TxParams {
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
