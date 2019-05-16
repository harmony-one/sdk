import * as crypto from '@harmony/crypto';
import * as utils from '@harmony/utils';

import { HttpProvider, Messenger, WSProvider } from '@harmony/network';
import { TransactionFactory, Transaction } from '@harmony/transaction';
import { ContractFactory, Contract } from '@harmony/contract';
import { Wallet, Account } from '@harmony/account';
import { Blockchain } from './blockchain';

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
    url: string,
    chainType: utils.ChainType = utils.ChainType.Harmony,
    chainId: utils.ChainID = utils.ChainID.Default,
  ) {
    super(chainType, chainId);

    this.provider = utils.isHttp(url)
      ? new HttpProvider(url)
      : utils.isWs(url)
      ? new WSProvider(url)
      : new HttpProvider('http://localhost:9128');
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
}
