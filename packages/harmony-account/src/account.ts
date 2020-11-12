/**
 * @packageDocumentation
 * @module harmony-account
 *
 */

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

import {
  isPrivateKey,
  add0xToString,
  hexToNumber,
  AddressSuffix,
  ChainType,
} from '@harmony-js/utils';
import { Transaction, RLPSign } from '@harmony-js/transaction';
import { StakingTransaction } from '@harmony-js/staking';
import { Messenger, RPCMethod } from '@harmony-js/network';
import { Shards } from './types';
import { defaultMessenger } from './utils';

export interface Balance {
  balance?: string;
  nonce?: number;
  shardID?: number;
}

class Account {
  /**
   * static method create account
   *
   * @example
   * ```javascript
   * const account = new Account();
   * console.log(account);
   * ```
   */
  static new(): Account {
    const newAcc = new Account()._new();
    return newAcc;
  }
  /**
   * Static Method: add a private key to Account
   * @param  {string} key - private Key
   *
   * @example
   * ```javascript
   * const account = new Account.add(key_1);
   * console.log(account);
   * ```
   */
  static add(key: string): Account {
    const newAcc = new Account()._import(key);
    return newAcc;
  }

  /**@hidden */
  privateKey?: string;
  /**@hidden */
  publicKey?: string;
  /**@hidden */
  address?: string;
  /**@hidden */
  balance?: string = '0';
  /**@hidden */
  nonce?: number = 0;
  /**@hidden */
  shardID: number;
  /**@hidden */
  shards: Shards;
  /**@hidden */
  messenger: Messenger;
  /**@hidden */
  encrypted: boolean = false;

  /**
   * check sum address
   *
   * @example
   * ```javascript
   * console.log(account.checksumAddress);
   * ```
   */
  get checksumAddress(): string {
    return this.address ? getAddress(this.address).checksum : '';
  }

  /**
   * Get bech32 Address
   *
   * @example
   * ```javascript
   * console.log(account.bech32Address);
   * ```
   */
  get bech32Address(): string {
    return this.address ? getAddress(this.address).bech32 : '';
  }

  /**
   * get Bech32 TestNet Address
   *
   * @example
   * ```javascript
   * console.log(account.bech32TestNetAddress);
   * ```
   */
  get bech32TestNetAddress(): string {
    return this.address ? getAddress(this.address).bech32TestNet : '';
  }

  /**
   * get Shards number with this Account
   *
   * @example
   * ```javascript
   * console.log(account.getShardsCount);
   * ```
   */
  get getShardsCount(): number {
    return this.shards.size;
  }

  /**
   * Generate an account object
   *
   * @param key import an existing privateKey, or create a random one
   * @param messenger you can setMessage later, or set message on `new`
   *
   * @example
   * ```javascript
   * // import the Account class
   * const { Account } = require('@harmony-js/account');
   *
   * // Messenger is optional, by default, we have a defaultMessenger
   * // If you like to change, you will import related package here.
   * const { HttpProvider, Messenger } = require('@harmony-js/network');
   * const { ChainType, ChainID } = require('@harmony-js/utils');
   *
   * // create a custom messenger
   * const customMessenger = new Messenger(
   *   new HttpProvider('http://localhost:9500'),
   *   ChainType.Harmony, // if you are connected to Harmony's blockchain
   *   ChainID.HmyLocal, // check if the chainId is correct
   * )
   *
   * // setMessenger later
   * const randomAccount = new Account()
   * randomAccount.setMessenger(customMessenger)
   *
   * // or you can set messenger on `new`
   * const randomAccountWithCustomMessenger = new Account(undefined, customMessenger)
   *
   * // NOTED: Key with or without `0x` are accepted, makes no different
   * // NOTED: DO NOT import `mnemonic phrase` using `Account` class, use `Wallet` instead
   * const myPrivateKey = '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930'
   * const myAccountWithMyPrivateKey = new Account(myPrivateKey)
   * ```
   */
  constructor(key?: string, messenger: Messenger = defaultMessenger) {
    this.messenger = messenger;
    if (!key) {
      this._new();
    } else {
      this._import(key);
    }
    this.shardID = this.messenger.currentShard || 0;
    this.shards = new Map();
    this.shards.set(this.shardID, {
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
      if (typeof password !== 'string') {
        throw new Error('you must provide password');
      }
      const file: Keystore = JSON.parse(keyStore.toLowerCase());
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
   * Get the account balance
   *
   * @param blockNumber by default, it's `latest`
   *
   * @example
   * ```javascript
   * account.getBalance().then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async getBalance(blockNumber: string = 'latest'): Promise<Balance> {
    try {
      if (this.messenger) {
        const balance = await this.messenger.send(
          RPCMethod.GetBalance,
          [this.address, blockNumber],
          this.messenger.chainPrefix,
          this.messenger.currentShard || 0,
        );

        const nonce = await this.messenger.send(
          RPCMethod.GetTransactionCount,
          [this.address, blockNumber],
          this.messenger.chainPrefix,
          this.messenger.currentShard || 0,
        );
        if (balance.isError()) {
          throw balance.error.message;
        }
        if (nonce.isError()) {
          throw nonce.error.message;
        }

        this.balance = hexToNumber(balance.result);
        this.nonce = Number.parseInt(hexToNumber(nonce.result), 10);
        this.shardID = this.messenger.currentShard || 0;
      } else {
        throw new Error('No Messenger found');
      }
      return {
        balance: this.balance,
        nonce: this.nonce,
        shardID: this.shardID,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function updateShards
   */
  async updateBalances(blockNumber: string = 'latest'): Promise<void> {
    // this.messenger.setShardingProviders();
    const shardProviders = this.messenger.shardProviders;
    if (shardProviders.size > 1) {
      for (const [name, val] of shardProviders) {
        const balanceObject = await this.getShardBalance(val.shardID, blockNumber);
        await this.shards.set(name === val.shardID ? name : val.shardID, balanceObject);
      }
    } else {
      const currentShard = await this.getShardBalance(
        this.messenger.currentShard || 0,
        blockNumber,
      );
      this.shards.set(this.messenger.currentShard || 0, currentShard);
    }
  }

  /**
   * @function signTransaction
   */
  async signTransaction(
    transaction: Transaction,
    updateNonce: boolean = true,
    encodeMode: string = 'rlp',
    blockNumber: string = 'latest',
  ): Promise<Transaction> {
    if (!this.privateKey || !isPrivateKey(this.privateKey)) {
      throw new Error(`${this.privateKey} is not found or not correct`);
    }

    if (updateNonce) {
      // await this.updateBalances(blockNumber);
      const txShardID = transaction.txParams.shardID;
      const shardNonce = await this.getShardNonce(
        typeof txShardID === 'string' ? Number.parseInt(txShardID, 10) : txShardID,
        blockNumber,
      );
      transaction.setParams({
        ...transaction.txParams,
        from:
          this.messenger.chainPrefix === ChainType.Harmony
            ? this.bech32Address
            : this.checksumAddress || '0x',
        nonce: shardNonce,
      });
    }

    if (encodeMode === 'rlp') {
      const [signature, rawTransaction]: [Signature, string] = RLPSign(
        transaction,
        this.privateKey,
      );
      return transaction.map((obj: any) => {
        return {
          ...obj,
          signature,
          rawTransaction,
          from:
            this.messenger.chainPrefix === ChainType.Harmony
              ? this.bech32Address
              : this.checksumAddress || '0x',
        };
      });
    } else {
      // TODO: if we use other encode method, eg. protobuf, we should implement this
      return transaction;
    }
  }

  /**
   * This function is still in development, coming soon!
   *
   * @param staking
   * @param updateNonce
   * @param encodeMode
   * @param blockNumber
   * @param shardID
   */
  async signStaking(
    staking: StakingTransaction,
    updateNonce: boolean = true,
    encodeMode: string = 'rlp',
    blockNumber: string = 'latest',
    shardID: number = this.messenger.currentShard,
  ): Promise<StakingTransaction> {
    if (!this.privateKey || !isPrivateKey(this.privateKey)) {
      throw new Error(`${this.privateKey} is not found or not correct`);
    }

    if (updateNonce) {
      // await this.updateBalances(blockNumber);
      const txShardID = shardID;
      const shardNonce = await this.getShardNonce(
        typeof txShardID === 'string' ? Number.parseInt(txShardID, 10) : txShardID,
        blockNumber,
      );
      staking.setFromAddress(
        this.messenger.chainPrefix === ChainType.Harmony
          ? this.bech32Address
          : this.checksumAddress || '0x',
      );
      staking.setNonce(shardNonce);
    }

    if (encodeMode === 'rlp') {
      const [signature, rawTransaction]: [Signature, string] = staking.rlpSign(this.privateKey);
      staking.setRawTransaction(rawTransaction);
      staking.setSignature(signature);
      staking.setFromAddress(
        this.messenger.chainPrefix === ChainType.Harmony
          ? this.bech32Address
          : this.checksumAddress || '0x',
      );

      return staking;
    } else {
      // TODO: if we use other encode method, eg. protobuf, we should implement this
      return staking;
    }
  }

  /**
   * @param messenger
   *
   * @example
   * ```javascript
   * // create a custom messenger
   * const customMessenger = new Messenger(
   *   new HttpProvider('http://localhost:9500'),
   *   ChainType.Harmony, // if you are connected to Harmony's blockchain
   *   ChainID.HmyLocal, // check if the chainId is correct
   * )
   *
   * // to create an Account with random privateKey
   * // and you can setMessenger later
   * const randomAccount = new Account()
   * randomAccount.setMessenger(customMessenger)
   * ```
   */
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   * Get account address from shard ID
   * @param shardID
   *
   * @example
   * ```javascript
   * console.log(account.getAddressFromShardID(0));
   *
   * > one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7-0
   * ```
   */
  getAddressFromShardID(shardID: number) {
    const shardObject = this.shards.get(shardID);
    if (shardObject) {
      return shardObject.address;
    } else {
      return undefined;
    }
  }

  /**
   * Get all shards' addresses from the account
   *
   * @example
   * ```javascript
   * console.log(account.getAddresses());
   * ```
   */
  getAddresses(): string[] {
    const addressArray: string[] = [];
    for (const [name, val] of this.shards) {
      const index: number = typeof name === 'string' ? Number.parseInt(name, 10) : name;
      addressArray[index] = val.address;
    }
    return addressArray;
  }

  /**
   * Get the specific shard's balance
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @param blockNumber by default, it's `latest`
   *
   * @example
   * ```
   * account.getShardBalance().then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async getShardBalance(shardID: number, blockNumber: string = 'latest') {
    const balance = await this.messenger.send(
      RPCMethod.GetBalance,
      [this.address, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );

    const nonce = await this.messenger.send(
      RPCMethod.GetTransactionCount,
      [this.address, blockNumber],
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
   * Get the specific shard's nonce
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @param blockNumber by default, it's `latest`
   *
   * @example
   * ```
   * account.getShardNonce().then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async getShardNonce(shardID: number, blockNumber: string = 'latest') {
    const nonce = await this.messenger.send(
      RPCMethod.GetAccountNonce,
      [this.address, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    if (nonce.isError()) {
      throw nonce.error.message;
    }
    return nonce.result;
  }

  /**
   * @function _new private method create Account
   * @return {Account} Account instance
   * @ignore
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
   * @ignore
   */
  private _import(key: string): Account {
    if (!isPrivateKey(key)) {
      throw new Error(`${key} is not PrivateKey`);
    }
    this.privateKey = add0xToString(key);
    this.publicKey = getPubkeyFromPrivateKey(this.privateKey);
    this.address = getAddressFromPrivateKey(this.privateKey);
    this.shardID = this.messenger.currentShard || 0;
    this.shards = new Map();
    this.shards.set(this.shardID, {
      address: `${this.bech32Address}${AddressSuffix}0`,
      balance: this.balance || '0',
      nonce: this.nonce || 0,
    });
    this.encrypted = false;
    return this;
  }
}

/**
 * This comment _supports_ [Markdown](https://marked.js.org/)
 */
export { Account };
