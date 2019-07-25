import * as crypto from '@harmony-js/crypto';
import * as utils from '@harmony-js/utils';

import { HttpProvider, Messenger, WSProvider } from '@harmony-js/network';
import { TransactionFactory, Transaction } from '@harmony-js/transaction';
import { ContractFactory, Contract } from '@harmony-js/contract';
import { Wallet, Account } from '@harmony-js/account';
import { Blockchain } from './blockchain';
import { HarmonyConfig } from './util';

export class Harmony extends utils.HarmonyCore {
  Modules = {
    HttpProvider,
    WSProvider,
    Messenger,
    Blockchain,
    TransactionFactory,
    Wallet,
    Transaction,
    Account,
    Contract,
  };
  messenger: Messenger;
  transactions: TransactionFactory;
  wallet: Wallet;
  blockchain: Blockchain;
  contracts: ContractFactory;
  crypto: any;
  utils: any;
  private provider: HttpProvider | WSProvider;
  constructor(
    url: string = utils.defaultConfig.Default.Chain_URL,
    config: HarmonyConfig = {
      chainUrl: utils.defaultConfig.Default.Chain_URL,
      chainId: utils.defaultConfig.Default.Chain_ID,
      chainType: utils.defaultConfig.Default.Chain_Type,
    },
  ) {
    super(config.chainType, config.chainId);

    const providerUrl = config.chainUrl || url;

    this.provider = this.onInitSetProvider(providerUrl);
    this.messenger = new Messenger(this.provider, this.chainType, this.chainId);
    this.blockchain = new Blockchain(this.messenger);
    this.transactions = new TransactionFactory(this.messenger);
    this.wallet = new Wallet(this.messenger);
    this.contracts = new ContractFactory(this.wallet);
    this.crypto = crypto;
    this.utils = utils;
  }
  setProvider(provider: string | HttpProvider | WSProvider): void {
    if (utils.isHttp(provider) && typeof provider === 'string') {
      this.provider = new HttpProvider(provider);
    } else if (provider instanceof HttpProvider) {
      this.provider = provider;
    } else if (utils.isWs(provider) && typeof provider === 'string') {
      this.provider = new WSProvider(provider);
    } else if (provider instanceof WSProvider) {
      this.provider = provider;
    }
    this.messenger.setProvider(this.provider);
    this.blockchain.setMessenger(this.messenger);
    this.wallet.setMessenger(this.messenger);
    this.transactions.setMessenger(this.messenger);
  }
  private onInitSetProvider(providerUrl: string): HttpProvider | WSProvider {
    return utils.isHttp(providerUrl)
      ? new HttpProvider(providerUrl)
      : utils.isWs(providerUrl)
      ? new WSProvider(providerUrl)
      : new HttpProvider(utils.defaultConfig.Default.Chain_URL);
  }
}
