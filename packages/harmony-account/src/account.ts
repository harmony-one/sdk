import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getPubkeyFromPrivateKey,
  toChecksumAddress,
  encrypt,
  decrypt,
  EncryptOptions,
  Keystore,
} from '@harmony/crypto';

import { isPrivateKey } from '@harmony/utils';
import { Shards, ShardId } from './types';

class Account {
  /**
   * @function new static method create account
   * @return {Account} Account instance
   */
  static new(): Account {
    const newAcc = new Account()._new();
    return newAcc;
  }
  /**
   * @function add static method add a private key to Account
   * @param  {string} key - private Key
   * @return {Account} Account instance
   */
  static add(key: string): Account {
    const newAcc = new Account()._import(key);
    return newAcc;
  }

  privateKey?: string;
  publicKey?: string;
  address?: string;
  shards: Shards = new Map().set('default', '');

  /**
   * @function checksumAddress checsumAddress getter
   * @return {string} get the checksumAddress
   */
  get checksumAddress(): string {
    return this.address ? toChecksumAddress(this.address) : '';
  }

  /**
   * @function getShardsCount getShards number with this Account
   * @return {number} shard size
   */
  get getShardsCount(): number {
    return this.shards.size;
  }

  constructor(key?: string) {
    if (!key) {
      this._new();
    } else {
      this._import(key);
    }
  }

  /**
   * @function addShard add shard to this Account
   * @param  {ShardId} id - ShardId to the Account
   */
  addShard(id: ShardId): void {
    if (this.shards && this.shards.has('default')) {
      this.shards.set(id, '');
    } else {
      throw new Error(
        'This account has no default shard or shard is not exist',
      );
    }
  }

  async toFile(password: string, options?: EncryptOptions): Promise<string> {
    if (this.privateKey && isPrivateKey(this.privateKey)) {
      const file = await encrypt(this.privateKey, password, options);
      this.privateKey = file;
      return file;
    } else {
      throw new Error('Encryption failed because PrivateKey is not correct');
    }
  }

  async fromFile(keyStore: string, password: string): Promise<Account> {
    try {
      if (!password) {
        throw new Error('you must provide password');
      }
      const file: Keystore = JSON.parse(keyStore);
      const decyptedPrivateKey = await decrypt(file, password);
      if (isPrivateKey(decyptedPrivateKey)) {
        return this._import(decyptedPrivateKey);
      } else {
        throw new Error('decrypted failed');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function getBalance get Account's balance
   * @return {type} {description}
   */
  async getBalance(): Promise<string> {
    // console.log()
    return '';
  }

  /**
   * @function updateShards
   * @return {Promise<string>} {description}
   */
  async updateShards(): Promise<string> {
    return '';
  }
  /**
   * @function signTransaction
   * @return {Promise<void>} sign transaction
   */
  async signTransaction(): Promise<void> {
    console.log('sign transaction');
  }
  /**
   * @function _new private method create Account
   * @return {Account} Account instance
   */
  private _new(): Account {
    const prv = generatePrivateKey();
    if (!isPrivateKey(prv)) {
      throw new Error('key gen failed');
    }
    return this._import(prv);
  }

  /**
   * @function _import private method import a private Key
   * @param  {string} key - private key
   * @return {Account} Account instance
   */
  private _import(key: string): Account {
    if (!isPrivateKey(key)) {
      throw new Error(`${key} is not PrivateKey`);
    }
    this.privateKey = key;
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);
    this.shards = new Map().set('default', '');
    return this;
  }
}

export { Account };
