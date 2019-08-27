import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getPubkeyFromPrivateKey,
  // toChecksumAddress,
  encrypt,
  decrypt,
  EncryptOptions,
  Keystore,
  Signature,
  getAddress,
} from '@harmony-js/crypto';

import { isPrivateKey, add0xToString, hexToNumber, AddressSuffix } from '@harmony-js/utils';
import { Transaction, RLPSign } from '@harmony-js/transaction';
import { Messenger, RPCMethod } from '@harmony-js/network';
import { Shards } from './types';
import { defaultMessenger } from './utils';

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
  shards: Shards;
  messenger: Messenger;
  encrypted: boolean = false;

  /**
   * @function checksumAddress checsumAddress getter
   * @return {string} get the checksumAddress
   */
  get checksumAddress(): string {
    return this.address ? getAddress(this.address).checksum : '';
  }
  get bech32Address(): string {
    return this.address ? getAddress(this.address).bech32 : '';
  }
  get bech32TestNetAddress(): string {
    return this.address ? getAddress(this.address).bech32TestNet : '';
  }

  /**
   * @function getShardsCount getShards number with this Account
   * @return {number} shard size
   */
  get getShardsCount(): number {
    return this.shards.size;
  }

  constructor(key?: string, messenger: Messenger = defaultMessenger) {
    this.messenger = messenger;
    if (!key) {
      this._new();
    } else {
      this._import(key);
    }
    this.shards = new Map();
    this.shards.set(0, {
      address: `${this.bech32Address}${AddressSuffix}0`,
      balance: this.balance || '0',
      nonce: this.nonce || 0,
    });
  }

  async toFile(password: string, options?: EncryptOptions): Promise<string> {
    if (this.privateKey && isPrivateKey(this.privateKey)) {
      const file = await encrypt(this.privateKey, password, options);
      this.privateKey = file;
      this.encrypted = true;
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
  async getBalance(blockNumber: string = 'latest'): Promise<object> {
    try {
      if (this.messenger) {
        const balance = await this.messenger.send(RPCMethod.GetBalance, [
          this.address,
          blockNumber,
        ]);

        const nonce = await this.messenger.send(RPCMethod.GetTransactionCount, [
          this.address,
          blockNumber,
        ]);
        if (balance.isError()) {
          throw balance.error.message;
        }
        if (nonce.isError()) {
          throw nonce.error.message;
        }

        this.balance = hexToNumber(balance.result);
        this.nonce = Number.parseInt(hexToNumber(nonce.result), 10);
      } else {
        throw new Error('No Messenger found');
      }
      return {
        balance: this.balance,
        nonce: this.nonce,
        shards: this.shards,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function updateShards
   * @return {Promise<string>} {description}
   */
  async updateBalances(): Promise<void> {
    // this.messenger.setShardingProviders();
    const shardProviders = this.messenger.shardProviders;

    if (shardProviders.size > 1) {
      for (const [name, val] of shardProviders) {
        const balanceObject = await this.getShardBalance(val.shardID);
        await this.shards.set(name === val.shardID ? name : val.shardID, balanceObject);
      }
    } else {
      const shard0 = await this.getShardBalance(0);
      this.shards.set(0, shard0);
    }
  }

  async signTransaction(
    transaction: Transaction,
    updateNonce: boolean = true,
    encodeMode: string = 'rlp',
    blockNumber: string = 'latest',
  ): Promise<Transaction> {
    if (!this.privateKey || !isPrivateKey(this.privateKey)) {
      throw new Error(`${this.privateKey} is not found or not correct`);
    }
    // let signed = '';
    if (updateNonce && transaction.txParams.crossShard === false) {
      const balanceObject: any = await this.getBalance(blockNumber);
      transaction.setParams({
        ...transaction.txParams,
        from: this.checksumAddress || '0x',
        nonce: balanceObject.nonce,
      });
    }

    if (updateNonce && transaction.txParams.crossShard === true) {
      await this.updateBalances();
      const txShardID = transaction.txParams.shardID;
      const shardBalanceObject = this.shards.get(txShardID);
      if (shardBalanceObject !== undefined) {
        const shardNonce = shardBalanceObject.nonce;
        transaction.setParams({
          ...transaction.txParams,
          from: this.checksumAddress || '0x',
          nonce: shardNonce,
        });
      } else {
        transaction.setParams({
          ...transaction.txParams,
          from: this.checksumAddress || '0x',
          nonce: 0,
        });
      }
    }

    if (encodeMode === 'rlp') {
      const [signature, rawTransaction]: [Signature, string] = RLPSign(
        transaction,
        this.privateKey,
      );
      return transaction.map((obj: any) => {
        return { ...obj, signature, rawTransaction, from: this.checksumAddress };
      });
    } else {
      // TODO: if we use other encode method, eg. protobuf, we should implement this
      return transaction;
    }
  }
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  async getShardBalance(shardID: number) {
    const balance = await this.messenger.send(
      RPCMethod.GetBalance,
      [this.address, 'latest'],
      this.messenger.chainPrefix,
      shardID,
    );
    const nonce = await this.messenger.send(
      RPCMethod.GetTransactionCount,
      [this.address, 'latest'],
      this.messenger.chainPrefix,
      shardID,
    );
    if (balance.isError()) {
      throw balance.error.message;
    }
    if (nonce.isError()) {
      throw nonce.error.message;
    }
    return {
      address: `${this.bech32Address}${AddressSuffix}${shardID}`,
      balance: hexToNumber(balance.result),
      nonce: Number.parseInt(hexToNumber(nonce.result), 10),
    };
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
    this.shards = new Map();
    this.shards.set(0, {
      address: `${this.bech32Address}${AddressSuffix}0`,
      balance: this.balance || '0',
      nonce: this.nonce || 0,
    });
    this.encrypted = false;
    return this;
  }
}

export { Account };
