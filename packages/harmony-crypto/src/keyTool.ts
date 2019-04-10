import elliptic from 'elliptic';
import * as bytes from './bytes';
import * as errors from './errors';

import { keccak256 } from './keccak256';
import { randomBytes } from './random';
import { isPrivateKey, strip0x } from '@harmony/utils';

const secp256k1 = elliptic.ec('secp256k1');

/**
 * @function generatePrivateKey
 * @description generatePrivate key using `eth-lib` settings
 * @return {string}
 */
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

/**
 * @function getPubkeyFromPrivateKey
 * @param  {string} privateKey - private key String
 * @return {string}
 */
export const getPubkeyFromPrivateKey = (privateKey: string): string => {
  return '0x' + getPublic(privateKey, true);
};

/**
 * @function getAddressFromPrivateKey
 * @param  {string} privateKey - private key string
 * @return {string} address with `length = 40`
 */
export const getAddressFromPrivateKey = (privateKey: string): string => {
  const publicHash = '0x' + getPublic(privateKey).slice(2);
  const publicKey = keccak256(publicHash);
  const address = '0x' + publicKey.slice(-40);
  return address;
};

export const getPublic = (privateKey: string, compress?: boolean): string => {
  if (!isPrivateKey(privateKey)) {
    throw new Error(`${privateKey} is not PrivateKey`);
  }
  const ecKey = secp256k1.keyFromPrivate(strip0x(privateKey), 'hex');
  return ecKey.getPublic(compress || false, 'hex');
};

/**
 * @function getAddressFromPublicKey
 * @param  {string} publicKey - public key string
 * @return {string} address with `length = 40`
 */
export const getAddressFromPublicKey = (publicKey: string): string => {
  const ecKey = secp256k1.keyFromPublic(publicKey.slice(2), 'hex');
  const publickHash = ecKey.getPublic(false, 'hex');
  const address = '0x' + keccak256('0x' + publickHash.slice(2)).slice(-40);
  return address;
};

/**
 * @function toChecksumAddress
 * @param  {string} address - raw address
 * @return {string} checksumed address
 */
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
  hashed = bytes.arrayify(keccak256(hashed)) || hashed;

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

export const sign = (
  digest: bytes.Arrayish | string,
  privateKey: string,
): bytes.Signature => {
  if (!isPrivateKey(privateKey)) {
    throw new Error(`${privateKey} is not PrivateKey`);
  }
  const keyPair = secp256k1.keyFromPrivate(strip0x(privateKey), 'hex');
  const signature = keyPair.sign(bytes.arrayify(digest), { canonical: true });
  return {
    recoveryParam: signature.recoveryParam,
    r: bytes.hexZeroPad('0x' + signature.r.toString(16), 32),
    s: bytes.hexZeroPad('0x' + signature.s.toString(16), 32),
    v: 27 + signature.recoveryParam,
  };
};
