import * as crypto from '@harmony-js/crypto';
import * as utils from '@harmony-js/utils';

import { HttpProvider, Messenger, WSProvider } from '@harmony-js/network';
import { TransactionFactory, Transaction } from '@harmony-js/transaction';
import { ContractFactory, Contract } from '@harmony-js/contract';
import { Wallet, Account } from '@harmony-js/account';
import { Blockchain } from './blockchain';

const defaultUrl = 'http://localhost:9500';

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
    url: string = defaultUrl,
    {
      chainType = utils.ChainType.Harmony,
      chainId = utils.ChainID.Default,
    }: { chainType: utils.ChainType; chainId: utils.ChainID },
  ) {
    super(chainType, chainId);

    const providerUrl = url;

    this.provider = utils.isHttp(providerUrl)
      ? new HttpProvider(providerUrl)
      : utils.isWs(providerUrl)
      ? new WSProvider(providerUrl)
      : new HttpProvider(defaultUrl);
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
