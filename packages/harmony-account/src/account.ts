import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getPubkeyFromPrivateKey,
  toChecksumAddress,
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
    if (key === null) {
      this._new();
    }
  }

  /**
   * @function addShard add shard to this Account
   * @param  {ShardId} id - ShardId to the Account
   */
  addShard(id: ShardId): void {
    if (this.shards && this.shards.has('default')) {
      this.shards.set(id, '');
    }
    throw new Error('this account has no default shard or shard is not exist');
  }

  /**
   * @function getBalance get Account's balance
   * @return {type} {description}
   */
  getBalance() {
    // console.log()
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
    this.privateKey = prv;
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);

    return this;
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

    return this;
  }
}

export { Account };
