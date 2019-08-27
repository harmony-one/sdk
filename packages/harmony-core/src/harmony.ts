import * as crypto from '@harmony-js/crypto';
import * as utils from '@harmony-js/utils';

import { Provider, HttpProvider, Messenger, WSProvider, ShardingItem } from '@harmony-js/network';
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

    this.provider = new Provider(providerUrl).provider;
    this.messenger = new Messenger(this.provider, this.chainType, this.chainId);
    this.blockchain = new Blockchain(this.messenger);
    this.transactions = new TransactionFactory(this.messenger);
    this.wallet = new Wallet(this.messenger);
    this.contracts = new ContractFactory(this.wallet);
    this.crypto = crypto;
    this.utils = utils;
  }
  public setProvider(provider: string | HttpProvider | WSProvider): void {
    this.provider = new Provider(provider).provider;
    this.messenger.setProvider(this.provider);
    this.setMessenger(this.messenger);
  }

  public setChainId(chainId: utils.ChainID) {
    this.chainId = chainId;
    this.messenger.setChainId(this.chainId);
    this.setMessenger(this.messenger);
  }
  public setChainType(chainType: utils.ChainType) {
    this.chainType = chainType;
    this.messenger.setChainType(this.chainType);
    this.setMessenger(this.messenger);
  }

  public shardingStructures(shardingStructures: ShardingItem[]) {
    for (const shard of shardingStructures) {
      this.messenger.shardProviders.set(shard.shardID, {
        shardID: shard.shardID,
        http: new HttpProvider(shard.http),
        ws: new WSProvider(shard.ws),
      });
    }
    this.setMessenger(this.messenger);
  }
  private setMessenger(messenger: Messenger) {
    this.blockchain.setMessenger(messenger);
    this.wallet.setMessenger(messenger);
    this.transactions.setMessenger(messenger);
  }
}
