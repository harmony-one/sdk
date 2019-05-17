import { HttpProvider, Messenger } from '@harmony-js/network';
import { Transaction, TxParams } from '@harmony-js/transaction';
import { sign, keccak256, Signature } from '@harmony-js/crypto';
import { ChainType } from '@harmony-js/utils';

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

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:8545'),
  ChainType.Harmony,
);
