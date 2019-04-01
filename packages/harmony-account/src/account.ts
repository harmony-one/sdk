import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getPubkeyFromPrivateKey,
  toChecksumAddress,
} from '@harmony/crypto';

import { isPrivateKey } from '@harmony/utils';

class Account {
  static new(): Account {
    const newAcc = new Account()._new();
    return newAcc;
  }
  static add(key: string): Account {
    const newAcc = new Account()._import(key);
    return newAcc;
  }

  privateKey?: string;
  publicKey?: string;
  address?: string;

  get checksumAddress(): string {
    return this.address ? toChecksumAddress(this.address) : '';
  }
  constructor(key?: string) {
    if (key === null) {
      this._new();
    }
  }

  private _new(): Account {
    const prv = generatePrivateKey();
    if (!isPrivateKey(prv)) {
      throw new Error('key gen failed');
    }
    this.privateKey = prv;
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);
    return this;
  }

  private _import(key: string): Account {
    if (!isPrivateKey(key)) {
      throw new Error(`${key} is not PrivateKey`);
    }
    this.privateKey = key;
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);
    return this;
  }
}

export { Account };
