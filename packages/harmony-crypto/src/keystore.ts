/**
 * @packageDocumentation
 * @module harmony-crypto
 */

import aes from 'aes-js';
// import scrypt from 'scrypt.js';
import scrypt from 'scrypt-shim';
import { pbkdf2Sync } from 'pbkdf2';
import uuid from 'uuid';
import { isPrivateKey } from '@harmony-js/utils';
import { randomBytes } from './random';
import { getAddressFromPrivateKey } from './keyTool';
import { concat, hexToIntArray } from './bytes';
import { keccak256 } from './keccak256';
import { KDF, KDFParams, EncryptOptions, PBKDF2Params, ScryptParams, Keystore } from './types';

/** @hidden */
const DEFAULT_ALGORITHM = 'aes-128-ctr';

/**
 * getDerivedKey
 *
 * NOTE: only scrypt and pbkdf2 are supported.
 *
 * @param {Buffer} key - the passphrase
 * @param {KDF} kdf - the key derivation function to be used
 * @param {KDFParams} params - params for the kdf
 *
 * @returns {Promise<Buffer>}
 */
async function getDerivedKey(key: Buffer, kdf: KDF, params: KDFParams): Promise<Buffer> {
  const salt = Buffer.from(params.salt, 'hex');

  if (kdf === 'pbkdf2') {
    const { c, dklen } = params as PBKDF2Params;
    return pbkdf2Sync(key, salt, c, dklen, 'sha256');
  }

  if (kdf === 'scrypt') {
    const { n, r, p, dklen } = params as ScryptParams;
    return scrypt(key, salt, n, r, p, dklen);
  }

  throw new Error('Only pbkdf2 and scrypt are supported');
}

/**
 * This method will map the current Account object to V3Keystore object.
 *
 * @method encrypt
 *
 * @param {string} privateKey
 * @param {string} password
 * @param {object} options
 *
 * @return {{version, id, address, crypto}}
 */
export const encrypt = async (
  privateKey: string,
  password: string,
  options?: EncryptOptions,
): Promise<string> => {
  if (!isPrivateKey(privateKey)) {
    throw new Error('privateKey is not correct');
  }
  if (typeof password !== 'string') {
    throw new Error('password is not found');
  }
  const address = getAddressFromPrivateKey(privateKey);

  const salt = randomBytes(32);
  const iv = Buffer.from(randomBytes(16), 'hex');
  const kdf = options !== undefined ? (options.kdf ? options.kdf : 'scrypt') : 'scrypt';
  const level = options !== undefined ? (options.level ? options.level : 8192) : 8192;

  const uuidRandom = options !== undefined ? options.uuid : undefined;

  const n = kdf === 'pbkdf2' ? 262144 : level;
  const kdfparams = {
    salt,
    n,
    r: 8,
    p: 1,
    dklen: 32,
  };

  const derivedKey = await getDerivedKey(Buffer.from(password), kdf, kdfparams);
  const cipher = new aes.ModeOfOperation.ctr(derivedKey.slice(0, 16), new aes.Counter(iv));

  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const ciphertext = Buffer.from(cipher.encrypt(Buffer.from(privateKey.replace('0x', ''), 'hex')));

  const mac = keccak256(concat([derivedKey.slice(16, 32), ciphertext]));

  return JSON.stringify({
    version: 3,
    id: uuid.v4({ random: uuidRandom || hexToIntArray(randomBytes(16)) }),
    address: address.toLowerCase().replace('0x', ''),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: DEFAULT_ALGORITHM,
      kdf,
      kdfparams,
      mac: mac.replace('0x', ''),
    },
  });
};

/**
 * @function decrypt
 * @param  {Keystore} keystore - Keystore file
 * @param  {string} password - password string
 * @return {string} privateKey
 */
export const decrypt = async (keystore: Keystore, password: string): Promise<string> => {
  const ciphertext = Buffer.from(keystore.crypto.ciphertext, 'hex');
  const iv = Buffer.from(keystore.crypto.cipherparams.iv, 'hex');
  const { kdfparams } = keystore.crypto;

  const derivedKey = await getDerivedKey(Buffer.from(password), keystore.crypto.kdf, kdfparams);

  const mac = keccak256(concat([derivedKey.slice(16, 32), ciphertext])).replace('0x', '');

  if (mac.toUpperCase() !== keystore.crypto.mac.toUpperCase()) {
    return Promise.reject(new Error('Failed to decrypt.'));
  }

  const CTR = aes.ModeOfOperation.ctr;

  const cipher = new CTR(derivedKey.slice(0, 16), new aes.Counter(iv));

  const decrypted = '0x' + Buffer.from(cipher.decrypt(ciphertext)).toString('hex');
  return decrypted;
};

/**
 * encrypt Phrase
 */
export const encryptPhrase = async (
  phrase: string,
  password: string,
  options?: EncryptOptions,
): Promise<string> => {
  if (typeof password !== 'string') {
    throw new Error('password is not found');
  }
  const salt = randomBytes(32);
  const iv = Buffer.from(randomBytes(16), 'hex');
  const kdf = options !== undefined ? (options.kdf ? options.kdf : 'scrypt') : 'scrypt';
  const level = options !== undefined ? (options.level ? options.level : 8192) : 8192;

  const uuidRandom = options !== undefined ? options.uuid : undefined;

  const n = kdf === 'pbkdf2' ? 262144 : level;
  const kdfparams = {
    salt,
    n,
    r: 8,
    p: 1,
    dklen: 32,
  };
  const derivedKey = await getDerivedKey(Buffer.from(password), kdf, kdfparams);
  const cipher = new aes.ModeOfOperation.ctr(derivedKey.slice(0, 16), new aes.Counter(iv));

  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const ciphertext = Buffer.from(cipher.encrypt(Buffer.from(phrase)));

  const mac = keccak256(concat([derivedKey.slice(16, 32), ciphertext]));
  return JSON.stringify({
    version: 3,
    id: uuid.v4({ random: uuidRandom || hexToIntArray(randomBytes(16)) }),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: DEFAULT_ALGORITHM,
      kdf,
      kdfparams,
      mac: mac.replace('0x', ''),
    },
  });
};

/**
 * decrypt phrase
 */
export const decryptPhrase = async (keystore: Keystore, password: string): Promise<string> => {
  const result = await decrypt(keystore, password);
  return Buffer.from(result.replace('0x', ''), 'hex').toString();
};
