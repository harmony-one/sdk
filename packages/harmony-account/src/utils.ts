import { Transaction, TxParams } from '@harmony/transaction';
import { sign, keccak256, Signature } from '@harmony/crypto';

export const RLPSign = (
  transaction: Transaction,
  prv: string,
): [Signature, string] => {
  const [unsignedTxnHash, raw] = transaction.getRLPUnsigned();
  const regroup: TxParams = {
    ...transaction.txParams,
    unsignedTxnHash,
  };
  transaction.setParams(regroup);
  const signature = sign(keccak256(unsignedTxnHash), prv);
  const signed = transaction.getRLPSigned(raw, signature);
  return [signature, signed];
};
