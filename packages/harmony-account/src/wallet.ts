import { bip39, hdkey, EncryptOptions } from '@harmony/crypto';
import { Messenger } from '@harmony/network';
import { isPrivateKey, isAddress } from '@harmony/utils';
import { Account } from './account';

class Wallet {
  messenger?: Messenger;
  protected defaultSigner?: string;
  /**
   * @memberof Wallet
   *
   */
  private accountMap: Map<string, Account> = new Map();
  /**
   * @memberof Wallet
   * @return {string[]} accounts addresses
   */
  get accounts(): string[] {
    return [...this.accountMap.keys()];
  }

  get signer(): Account | undefined {
    if (this.defaultSigner) {
      return this.getAccount(this.defaultSigner);
    } else if (!this.defaultSigner && this.accounts.length > 0) {
      this.setSigner(this.accounts[0]);
      return this.getAccount(this.accounts[0]);
    } else {
      return undefined;
    }
  }

  constructor(messenger?: Messenger) {
    this.messenger = messenger;
  }
  /**
   * @function generateMnemonic
   * @memberof Wallet
   * @return {string} Mnemonics
   */
  generateMnemonic(): string {
    return bip39.generateMnemonic();
  }
  /**
   * @function addByMnemonic
   * @memberof Wallet
   * @description add account using Mnemonic phrases
   * @param  {string} phrase - Mnemonic phrase
   * @param  {index} index - index to hdKey root
   */
  addByMnemonic(phrase: string, index: number = 0) {
    if (!this.isValidMnemonic(phrase)) {
      throw new Error(`Invalid mnemonic phrase: ${phrase}`);
    }
    const seed = bip39.mnemonicToSeed(phrase);
    const hdKey = hdkey.fromMasterSeed(seed);
    // TODO:hdkey should apply to Harmony's settings
    const childKey = hdKey.derive(`m/44'/313'/0'/0/${index}`);
    const privateKey = childKey.privateKey.toString('hex');
    return this.addByPrivateKey(privateKey);
  }
  /**
   * @function addByPrivateKey
   * @memberof Wallet
   * @description add an account using privateKey
   * @param  {string} privateKey - privateKey to add
   * @return {Account} return added Account
   */
  addByPrivateKey(privateKey: string): Account {
    try {
      const newAcc = Account.add(privateKey);
      newAcc.setMessenger(this.messenger);
      if (newAcc.address) {
        this.accountMap.set(newAcc.address, newAcc);
        if (!this.defaultSigner) {
          this.setSigner(newAcc.address);
        }
        return newAcc;
      } else {
        throw new Error('add account failed');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function createAccount
   * @description create a new account using Mnemonic
   * @return {Account} {description}
   */
  async createAccount(
    password?: string,
    options?: EncryptOptions,
  ): Promise<Account> {
    const words = this.generateMnemonic();
    const acc = this.addByMnemonic(words);
    if (acc.address && password) {
      const encrypted = await this.encryptAccount(
        acc.address,
        password,
        options,
      );
      return encrypted;
    } else if (acc.address && !password) {
      return acc;
    } else {
      throw new Error('create acount failed');
    }
  }
  /**
   * @function encryptAccount
   * @memberof Wallet
   * @description to encrypt an account that lives in the wallet,
   * if encrypted, returns original one, if not found, throw error
   * @param {string} address - address in accounts
   * @param {string} password - string that used to encrypt
   * @param {EncryptOptions} options - encryption options
   * @return {Promise<Account>}
   */
  async encryptAccount(
    address: string,
    password: string,
    options?: EncryptOptions,
  ): Promise<Account> {
    try {
      const foundAcc = this.getAccount(address);
      if (
        foundAcc &&
        foundAcc.privateKey &&
        isPrivateKey(foundAcc.privateKey)
      ) {
        await foundAcc.toFile(password, options);
        return foundAcc;
      } else if (
        foundAcc &&
        foundAcc.privateKey &&
        !isPrivateKey(foundAcc.privateKey)
      ) {
        return foundAcc;
      } else {
        throw new Error('encrypt account failed');
      }
    } catch (error) {
      throw error;
    }
  }
  /**
   * @function decryptAccount
   * @memberof Wallet
   * @description to decrypt an account that lives in the wallet,if not encrypted, return original,
   * if not found, throw error
   * @param {string} address - address in accounts
   * @param {string} password - string that used to encrypt
   * @return {Promise<Account>}
   */
  async decryptAccount(address: string, password: string): Promise<Account> {
    try {
      const foundAcc = this.getAccount(address);
      if (
        foundAcc &&
        foundAcc.privateKey &&
        !isPrivateKey(foundAcc.privateKey)
      ) {
        await foundAcc.fromFile(foundAcc.privateKey, password);
        return foundAcc;
      } else if (
        foundAcc &&
        foundAcc.privateKey &&
        isPrivateKey(foundAcc.privateKey)
      ) {
        return foundAcc;
      } else {
        throw new Error('decrypt account failed');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function getAccount
   * @memberof Wallet
   * @description get Account instance using address as param
   * @param  {string} address - address hex
   * @return {Account} Account instance which lives in Wallet
   */
  getAccount(address: string): Account | undefined {
    return this.accountMap.get(address);
  }

  /**
   * @function removeAccount
   * @memberof Wallet
   * @description remove Account using address as param
   * @param  {string} address: - address hex
   */
  removeAccount(address: string): void {
    this.accountMap.delete(address);
    if (this.defaultSigner === address) {
      this.defaultSigner = undefined;
    }
  }

  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  setSigner(address: string): void {
    if (!isAddress(address) || !this.getAccount(address)) {
      throw new Error('could not set signer');
    }
    this.defaultSigner = address;
  }
  /**
   * @function isValidMnemonic
   * @memberof Wallet
   * @description check if Mnemonic is valid
   * @param  {string} phrase - Mnemonic phrase
   * @return {boolean}
   */
  private isValidMnemonic(phrase: string): boolean {
    if (phrase.trim().split(/\s+/g).length < 12) {
      return false;
    }
    return bip39.validateMnemonic(phrase);
  }
}

export { Wallet };
