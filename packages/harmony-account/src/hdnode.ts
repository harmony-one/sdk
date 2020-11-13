/**
 * @packageDocumentation
 * @module harmony-account
 */

import { bip39, hdkey, getAddress, BN, Signature } from '@harmony-js/crypto';
import {
  HDPath,
  // defineReadOnly,
  isHttp,
  isWs,
  ChainID,
  ChainType,
  Unit,
  isHex,
  hexToNumber,
} from '@harmony-js/utils';
import { Messenger, HttpProvider, WSProvider, RPCMethod } from '@harmony-js/network';
import { Transaction, TxStatus, TransasctionReceipt } from '@harmony-js/transaction';
import { Account } from './account';

/** @hidden */
export interface WalletsInterfaces {
  [key: string]: Account;
}

/** @hidden */
export interface Web3TxPrams {
  id?: string;
  from?: string;
  to?: string;
  nonce?: number | string;
  gasLimit?: BN | number | string;
  gasPrice?: BN | number | string;
  shardID?: number | string;
  toShardID?: number | string;
  data?: string;
  value?: BN;
  chainId?: number;
  rawTransaction?: string;
  unsignedRawTransaction?: string;
  signature?: Signature | string;
  receipt?: TransasctionReceipt;
}

export class HDNode {
  static isValidMnemonic(phrase: string): boolean {
    if (phrase.trim().split(/\s+/g).length < 12) {
      return false;
    }
    return bip39.validateMnemonic(phrase);
  }

  static generateMnemonic(): string {
    return bip39.generateMnemonic();
  }

  public provider: HttpProvider | WSProvider;
  public gasLimit: string;
  public gasPrice: string;
  public messenger: Messenger;

  /** @hidden */
  private shardID: number;
  /** @hidden */
  private hdwallet: hdkey | undefined;
  /** @hidden */
  private path: string;
  /** @hidden */
  private index: number;
  /** @hidden */
  private addressCount: number;
  /** @hidden */
  private addresses: string[];
  /** @hidden */
  private wallets: WalletsInterfaces;

  constructor(
    provider: string | HttpProvider | WSProvider = 'http://localhost:9500',
    menmonic?: string,
    index: number = 0,
    addressCount: number = 1,
    shardID: number = 0,
    chainType: ChainType = ChainType.Harmony,
    chainId: ChainID = ChainID.Default,
    gasLimit = '1000000',
    gasPrice = '2000000000',
  ) {
    this.provider = this.setProvider(provider);
    this.shardID = shardID;
    this.messenger = new Messenger(this.provider, chainType, chainId);
    this.messenger.setDefaultShardID(this.shardID);
    this.hdwallet = undefined;
    this.addresses = [];
    this.wallets = {};
    this.path = chainType === ChainType.Harmony ? HDPath : `m/44'/60'/0'/0/`;
    this.index = index;
    this.addressCount = addressCount;
    this.getHdWallet(menmonic || HDNode.generateMnemonic());
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
  }

  normalizePrivateKeys(mnemonic: string | string[]) {
    if (Array.isArray(mnemonic)) {
      return mnemonic;
    } else if (mnemonic && !mnemonic.includes(' ')) {
      return [mnemonic];
    } else {
      return false;
    }
  }

  setProvider(provider: string | HttpProvider | WSProvider) {
    if (isHttp(provider) && typeof provider === 'string') {
      return new HttpProvider(provider);
    } else if (provider instanceof HttpProvider) {
      return provider;
    } else if (isWs(provider) && typeof provider === 'string') {
      return new WSProvider(provider);
    } else if (provider instanceof WSProvider) {
      return provider;
    } else {
      throw new Error('provider is not recognized');
    }
  }

  getHdWallet(mnemonic: string) {
    if (!HDNode.isValidMnemonic(mnemonic)) {
      throw new Error('Mnemonic invalid or undefined');
    }
    this.hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

    for (let i = this.index; i < this.index + this.addressCount; i++) {
      if (!this.hdwallet) {
        throw new Error('hdwallet is not found');
      }
      const childKey = this.hdwallet.derive(`${this.path}${i}`);
      const prv = childKey.privateKey.toString('hex');
      const account = new Account(prv);
      const addr = account.checksumAddress;
      this.addresses.push(addr);
      this.wallets[addr] = account;
    }
  }

  // tslint:disable-next-line: ban-types
  getAccounts(cb?: Function) {
    if (cb) {
      cb(null, this.addresses);
    }
    return this.addresses;
  }
  // tslint:disable-next-line: ban-types
  getPrivateKey(address: string, cb?: Function) {
    if (!cb) {
      if (!this.wallets[address]) {
        throw new Error('Account not found');
      } else {
        return this.wallets[address].privateKey;
      }
    }
    if (!this.wallets[address]) {
      return cb('Account not found');
    } else {
      cb(null, this.wallets[address].privateKey);
    }
  }
  // tslint:disable-next-line: ban-types
  async signTransaction(txParams: any | Web3TxPrams) {
    const from: string = txParams.from ? getAddress(txParams.from).checksum : '0x';
    const accountNonce = await this.messenger.send(
      RPCMethod.GetAccountNonce,
      [from, 'latest'],
      'hmy',
      this.shardID,
    );

    const to: string = txParams.to ? getAddress(txParams.to).checksum : '0x';

    let gasLimit = new Unit('0').asWei().toWei();

    if (txParams.gas !== undefined && isHex(txParams.gas)) {
      gasLimit = new Unit(txParams.gas)
        .asWei()
        .toWei()
        .lt(new Unit(this.gasLimit).asWei().toWei())
        ? new Unit(txParams.gas).asWei().toWei()
        : new Unit(this.gasLimit).asWei().toWei();
    }
    if (txParams.gasLimit !== undefined && isHex(txParams.gasLimit)) {
      gasLimit = new Unit(txParams.gasLimit)
        .asWei()
        .toWei()
        .lt(new Unit(this.gasLimit).asWei().toWei())
        ? new Unit(txParams.gasLimit).asWei().toWei()
        : new Unit(this.gasLimit).asWei().toWei();
    }

    let gasPrice = new Unit('0').asWei().toWei();
    if (txParams.gasPrice !== undefined && isHex(txParams.gasPrice)) {
      gasPrice = new Unit(txParams.gasPrice)
        .asWei()
        .toWei()
        .lt(new Unit(this.gasPrice).asWei().toWei())
        ? new Unit(txParams.gasPrice).asWei().toWei()
        : new Unit(this.gasPrice).asWei().toWei();
    }

    const value = txParams.value !== undefined && isHex(txParams.value) ? txParams.value : '0';
    const nonce =
      txParams.nonce !== undefined && isHex(txParams.nonce)
        ? Number.parseInt(hexToNumber(txParams.nonce), 10)
        : accountNonce.result;
    const data = txParams.data !== undefined && isHex(txParams.data) ? txParams.data : '0x';
    const prv = this.wallets[from].privateKey;

    const signerAccount = new Account(prv, this.messenger);

    const tx = new Transaction(
      {
        ...txParams,
        from,
        to,
        gasLimit,
        gasPrice,
        value,
        nonce,
        data,
        shardID: this.shardID,
        chainId: this.messenger.chainId,
      },
      this.messenger,
      TxStatus.INTIALIZED,
    );

    const signed = await signerAccount.signTransaction(tx);

    return signed.getRawTransaction();
  }
  getAddress(idx?: number) {
    if (!idx) {
      return this.addresses[0];
    } else {
      return this.addresses[idx];
    }
  }
  getAddresses() {
    return this.addresses;
  }
  addByPrivateKey(privateKey: string) {
    const account = new Account(privateKey);
    const addr = account.checksumAddress;
    this.addresses.push(addr);
    this.wallets[addr] = account;
    return addr;
  }

  setSigner(address: string) {
    const foundIndex = this.addresses.findIndex((value) => value === address);
    this.addresses.slice(foundIndex, foundIndex + 1);
    this.addresses.unshift(address);
  }
}
