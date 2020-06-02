/**
 * @packageDocumentation
 * @module harmony-crypto
 * @ignore
 */

export type KDF = 'pbkdf2' | 'scrypt';

export interface PBKDF2Params {
  salt: string;
  dklen: number;
  c: number;
}

export interface ScryptParams {
  salt: string;
  dklen: number;
  n: number;
  r: number;
  p: number;
}

export type KDFParams = PBKDF2Params | ScryptParams;

export interface EncryptOptions {
  kdf?: KDF;
  level?: number;
  uuid?: number[];
}

export interface Keystore {
  address?: string;
  crypto: {
    cipher: string;
    cipherparams: {
      iv: string;
    };
    ciphertext: string;
    kdf: KDF;
    kdfparams: KDFParams;
    mac: string;
  };
  id: string;
  version: 3;
}
