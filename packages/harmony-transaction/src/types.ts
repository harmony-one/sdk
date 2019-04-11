import { BN, Signature } from '@harmony/crypto';
export interface TxParams {
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
