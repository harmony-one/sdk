import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getPubkeyFromPrivateKey,
  toChecksumAddress,
  encrypt,
  decrypt,
  EncryptOptions,
  Keystore,
  Signature,
} from '@harmony/crypto';

import { isPrivateKey, add0xToString, hexToNumber } from '@harmony/utils';
import { Transaction } from '@harmony/transaction';
import { Messenger, RPCMethod } from '@harmony/network';
import { Shards } from './types';
import { RLPSign } from './utils';

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
  balance?: string = '0';
  nonce?: number = 0;
  shards: Shards = new Map().set('default', '');
  messenger?: Messenger;

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

  constructor(key?: string, messenger?: Messenger) {
    this.messenger = messenger;
    if (!key) {
      this._new();
    } else {
      this._import(key);
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
  async getBalance(): Promise<object> {
    if (this.messenger) {
      const result = await this.messenger.send(RPCMethod.GetBalance, [
        this.address,
        'latest',
      ]);
      if (result.responseType === 'result') {
        this.balance = hexToNumber(result.balance);
        this.nonce = Number.parseInt(hexToNumber(result.nonce), 10);
      }
    }
    return {
      balance: this.balance,
      nonce: this.nonce,
      shards: this.shards,
    };
  }

  /**
   * @function updateShards
   * @return {Promise<string>} {description}
   */
  async updateShards(): Promise<string> {
    return '';
  }

  async signTransaction(
    transaction: Transaction,
    updateNonce: boolean = true,
    encodeMode: string = 'rlp',
  ): Promise<Transaction> {
    if (!this.privateKey || !isPrivateKey(this.privateKey)) {
      throw new Error(`${this.privateKey} is not found or not correct`);
    }
    // let signed = '';
    if (updateNonce) {
      const balanceObject: any = await this.getBalance();
      transaction.setParams({
        ...transaction.txParams,
        from: this.address || '0x',
        nonce: balanceObject.nonce + 1,
      });
    }
    if (encodeMode === 'rlp') {
      const [signature, txnHash]: [Signature, string] = RLPSign(
        transaction,
        this.privateKey,
      );
      return transaction.map((obj: any) => {
        return { ...obj, signature, txnHash, from: this.address };
      });
    } else {
      // TODO: if we use other encode method, eg. protobuf, we should implement this
      return transaction;
    }
  }
  setMessenger(messenger?: Messenger) {
    this.messenger = messenger;
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
    this.privateKey = add0xToString(key);
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);
    this.shards = new Map().set('default', '');
    return this;
  }

  // /**
  //  * @function addShard add shard to this Account
  //  * @param  {ShardId} id - ShardId to the Account
  //  */
  // private addShard(id: ShardId): void {
  //   if (this.shards && this.shards.has('default')) {
  //     this.shards.set(id, '');
  //   } else {
  //     throw new Error(
  //       'This account has no default shard or shard is not exist',
  //     );
  //   }
  // }
}

export { Account };
