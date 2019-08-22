import { HttpProvider, WSProvider, Messenger, Provider, RPCMethod } from '@harmony-js/network';

import * as crypto from '@harmony-js/crypto';
import * as utils from '@harmony-js/utils';

import { Transaction, TransactionFactory } from '@harmony-js/transaction';
import { Blockchain } from './blockchain';
import { ContractFactory } from '@harmony-js/contract';

export enum ExtensionType {
  MathWallet = 'MathWallet',
}

export interface ExtensionAccount {
  address: 'string';
  name: 'string';
}

export interface ExtensionNetwork {
  chain_url: string;
  net_version: number;
}

export interface ExtensionInterface {
  signTransaction: (
    transaction: Transaction,
    updateNonce: boolean,
    encodeMode: string,
    blockNumber: string,
  ) => Promise<Transaction>;
  getAccount: () => Promise<ExtensionAccount>;
  messenger?: Messenger;
  version: string;
  isMathWallet?: boolean;
  network: ExtensionNetwork;
}

export class HarmonyExtension {
  extensionType: ExtensionType | null;
  wallet: ExtensionInterface;
  provider: HttpProvider | WSProvider;
  messenger: Messenger;
  blockchain: Blockchain;
  transactions: TransactionFactory;
  contracts: ContractFactory;
  crypto: any;
  utils: any;

  constructor(wallet: ExtensionInterface) {
    this.extensionType = null;
    this.wallet = wallet;
    // check if it is mathwallet
    this.isExtension(this.wallet);
    this.provider = new Provider(wallet.network.chain_url).provider;
    this.messenger = new Messenger(this.provider, utils.ChainType.Harmony, utils.ChainID.Default);
    this.wallet.messenger = this.messenger;
    this.blockchain = new Blockchain(this.messenger);
    this.transactions = new TransactionFactory(this.messenger);
    this.contracts = new ContractFactory(this.wallet);
    this.crypto = crypto;
    this.utils = utils;
  }
  public setProvider(provider: string | HttpProvider | WSProvider): void {
    this.provider = new Provider(provider).provider;
    this.messenger.setProvider(this.provider);
    this.blockchain.setMessenger(this.messenger);
    this.wallet.messenger = this.messenger;
    this.transactions.setMessenger(this.messenger);
  }
  public isExtension(wallet: ExtensionInterface) {
    let isExtension = false;
    this.extensionType = null;
    if (wallet.isMathWallet) {
      isExtension = true;
      this.extensionType = ExtensionType.MathWallet;

      // remake signTransaction of MathWallet
      const { signTransaction } = this.wallet;
      this.wallet.signTransaction = async (
        transaction: Transaction,
        updateNonce: boolean = true,
        encodeMode: string = 'rlp',
        blockNumber: string = 'latest',
      ) => {
        const extensionAccount = await this.wallet.getAccount();

        if (updateNonce) {
          const nonce = await this.messenger.send(RPCMethod.GetTransactionCount, [
            crypto.getAddress(extensionAccount.address).checksum,
            blockNumber,
          ]);
          transaction.setParams({
            ...transaction.txParams,
            from: crypto.getAddress(extensionAccount.address).bech32,
            nonce: Number.parseInt(utils.hexToNumber(nonce.result), 10),
          });
        } else {
          transaction.setParams({
            ...transaction.txParams,
            from: crypto.getAddress(extensionAccount.address).bech32,
          });
        }

        return signTransaction(transaction, updateNonce, encodeMode, blockNumber);
      };
    }
    if (!isExtension) {
      throw new Error('Extension is not found');
    }
    return;
  }
  public async login() {
    const account = await this.wallet.getAccount();
    // Use address
    return account;
  }
}
