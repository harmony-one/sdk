import elliptic from 'elliptic';
import * as bytes from './bytes';
import * as errors from './errors';
import { keccak256 } from './keccak256';
import { randomBytes } from './random';

const secp256k1 = elliptic.ec('secp256k1');

export const generatePrivateKey = (): string => {
  const entropy: string = '0x' + randomBytes(16);
  const innerHex: string = keccak256(
    bytes.concat(['0x' + randomBytes(32), entropy || '0x' + randomBytes(32)]),
  );
  const middleHex: Uint8Array = bytes.concat([
    bytes.concat(['0x' + randomBytes(32), innerHex]),
    '0x' + randomBytes(32),
  ]);
  const outerHex: string = keccak256(middleHex);
  return outerHex;
};

export const getPubkeyFromPrivateKey = (privateKey: string): string => {
  const buffer = new Buffer(privateKey.slice(2), 'hex');
  const ecKey = secp256k1.keyFromPrivate(buffer);
  const pubK = '0x' + ecKey.getPublic(false, 'hex').slice(2);
  const publicKey = keccak256(pubK);
  return publicKey;
};

export const getAddressFromPrivateKey = (privateKey: string): string => {
  const publicKey = getPubkeyFromPrivateKey(privateKey);
  const address = '0x' + publicKey.slice(-40);
  return address;
};

export const getAddressFromPublicKey = (publicKey: string): string => {
  const address = '0x' + publicKey.slice(-40);
  return address;
};

export const toChecksumAddress = (address: string): string => {
  if (typeof address !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
    errors.throwError('invalid address', errors.INVALID_ARGUMENT, {
      arg: 'address',
      value: address,
    });
  }

  address = address.toLowerCase();

  const chars = address.substring(2).split('');

  let hashed = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    hashed[i] = chars[i].charCodeAt(0);
  }
  hashed = bytes.arrayify(keccak256(hashed));

  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }

  return '0x' + chars.join('');
};
