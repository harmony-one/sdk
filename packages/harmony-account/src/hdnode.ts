import {bip39, hdkey, getAddress, BN, Signature} from '@harmony-js/crypto';
import {
  HDPath,
  // defineReadOnly,
  isHttp,
  isWs,
  ChainID,
  ChainType,
  Unit,
  isHex,
  numberToHex,
} from '@harmony-js/utils';
import {
  Messenger,
  HttpProvider,
  WSProvider,
  RPCRequestPayload,
} from '@harmony-js/network';
import {
  Transaction,
  TxStatus,
  RLPSign,
  TransasctionReceipt,
} from '@harmony-js/transaction';
import {Account} from './account';

interface WalletsInterfaces {
  [key: string]: Account;
}

interface Web3TxPrams {
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
  private messenger: Messenger;
  private hdwallet: hdkey | undefined;
  private path: string;
  private index: number;
  private addressCount: number;
  private addresses: string[];
  private wallets: WalletsInterfaces;

  constructor(
    provider: string | HttpProvider | WSProvider = 'http://localhost:9500',
    menmonic?: string,
    index: number = 0,
    addressCount: number = 1,
    chainType: ChainType = ChainType.Harmony,
    chainId: ChainID = ChainID.Default,
  ) {
    this.provider = this.setProvider(provider);
    this.messenger = new Messenger(this.provider, chainType, chainId);
    this.hdwallet = undefined;
    this.addresses = [];
    this.wallets = {};
    this.path = HDPath;
    this.index = index;
    this.addressCount = addressCount;
    this.getHdWallet(menmonic || HDNode.generateMnemonic());
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
  send(...args: [RPCRequestPayload<any>, any]) {
    const method = args[0].method;
    let newMethod: string = method;
    if (method.startsWith('eth')) {
      newMethod = method.replace('eth', 'hmy');
    }
    args[0].method = newMethod;

    this.provider.send(args[0], args[1]);
  }

  sendAsync(...args: [RPCRequestPayload<any>, any]) {
    this.send(...args);
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
  signTransaction(txParams: any | Web3TxPrams, cb: Function) {
    const from: string = getAddress(txParams.from).checksum;
    const to: string = getAddress(txParams.to).checksum;
    const gasLimit = isHex(txParams.gasLimit)
      ? txParams.gasLimit
      : new Unit(txParams.gasLimit).asWei().toWei();
    const gasPrice = isHex(txParams.gasPrice)
      ? txParams.gasPrice
      : new Unit(txParams.gasPrice).asWei().toWei();
    const value = isHex(txParams.value)
      ? txParams.value
      : numberToHex(txParams.value);
    const nonce = isHex(txParams.nonce)
      ? txParams.nonce
      : numberToHex(txParams.nonce);
    const prv = this.wallets[from].privateKey;

    const tx = new Transaction(
      {...txParams, from, to, gasLimit, gasPrice, value, nonce},
      this.messenger,
      TxStatus.INTIALIZED,
    );
    tx.getRLPUnsigned();
    if (prv) {
      const rawTransaction = RLPSign(tx, prv)[1];
      if (cb) {
        cb(null, rawTransaction);
      }
      return rawTransaction;
    }
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
}
