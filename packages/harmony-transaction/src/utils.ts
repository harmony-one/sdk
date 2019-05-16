import {
  hexToNumber,
  isHex,
  isAddress,
  strip0x,
  ChainType,
} from '@harmony/utils';
import {
  decode,
  encode,
  keccak256,
  hexlify,
  BN,
  hexZeroPad,
  recoverAddress,
} from '@harmony/crypto';
import { HttpProvider, Messenger } from '@harmony/network';
import { TxParams } from './types';

export const transactionFields = [
  { name: 'nonce', length: 32, fix: false },
  { name: 'gasPrice', length: 32, fix: false, transform: 'hex' },
  { name: 'gasLimit', length: 32, fix: false, transform: 'hex' },
  { name: 'to', length: 20, fix: true },
  { name: 'value', length: 32, fix: false, transform: 'hex' },
  { name: 'data', fix: false },
];

export const handleNumber = (value: string) => {
  if (isHex(value) && value === '0x') {
    return hexToNumber('0x00');
  } else if (isHex(value) && value !== '0x') {
    return hexToNumber(value);
  } else {
    return value;
  }
};

export const handleAddress = (value: string): string => {
  if (value === '0x') {
    return '0x';
  } else if (isAddress(value)) {
    return value;
  } else {
    return '0x';
  }
};

export const recover = (rawTransaction: string) => {
  const transaction = decode(rawTransaction);
  if (transaction.length !== 9 && transaction.length !== 6) {
    throw new Error('invalid rawTransaction');
  }

  const tx: TxParams = {
    id: '0x',
    from: '0x',
    txnHash: '0x',
    unsignedTxnHash: '0x',
    nonce: new BN(strip0x(handleNumber(transaction[0]))).toNumber(),
    gasPrice: new BN(strip0x(handleNumber(transaction[1]))),
    gasLimit: new BN(strip0x(handleNumber(transaction[2]))),
    to: handleAddress(transaction[3]),
    value: new BN(strip0x(handleNumber(transaction[4]))),
    data: transaction[5],
    chainId: 0,
    signature: {
      r: '',
      s: '',
      recoveryParam: 0,
      v: 0,
    },
  };

  // Legacy unsigned transaction
  if (transaction.length === 6) {
    tx.unsignedTxnHash = rawTransaction;
    return tx;
  }

  try {
    tx.signature.v = new BN(strip0x(handleNumber(transaction[6]))).toNumber();
  } catch (error) {
    throw error;
  }

  tx.signature.r = hexZeroPad(transaction[7], 32);
  tx.signature.s = hexZeroPad(transaction[8], 32);

  if (
    new BN(strip0x(handleNumber(tx.signature.r))).isZero() &&
    new BN(strip0x(handleNumber(tx.signature.s))).isZero()
  ) {
    // EIP-155 unsigned transaction
    tx.chainId = tx.signature.v;
    tx.signature.v = 0;
  } else {
    // Signed Tranasaction

    tx.chainId = Math.floor((tx.signature.v - 35) / 2);
    if (tx.chainId < 0) {
      tx.chainId = 0;
    }

    let recoveryParam = tx.signature.v - 27;

    const raw = transaction.slice(0, 6);

    if (tx.chainId !== 0) {
      raw.push(hexlify(tx.chainId));
      raw.push('0x');
      raw.push('0x');
      recoveryParam -= tx.chainId * 2 + 8;
    }

    const digest = keccak256(encode(raw));
    try {
      tx.from = recoverAddress(digest, {
        r: hexlify(tx.signature.r),
        s: hexlify(tx.signature.s),
        recoveryParam,
      });
    } catch (error) {
      throw error;
    }

    tx.txnHash = keccak256(rawTransaction);
  }

  return tx;
};

export const sleep = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export enum TransactionEvents {
  transactionHash = 'transactionHash',
  error = 'error',
  confirmation = 'confirmation',
  receipt = 'receipt',
}

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:8545'),
  ChainType.Harmony,
);
