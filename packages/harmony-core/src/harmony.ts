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
  defaultShardID?: number;
  private provider: HttpProvider | WSProvider;

  constructor(
    url: string,
    config: HarmonyConfig = {
      chainId: utils.defaultConfig.Default.Chain_ID,
      chainType: utils.defaultConfig.Default.Chain_Type,
    },
  ) {
    super(config.chainType, config.chainId);

    const providerUrl = config.chainUrl || url || utils.defaultConfig.Default.Chain_URL;

    this.provider = new Provider(providerUrl).provider;
    this.messenger = new Messenger(this.provider, this.chainType, this.chainId);
    this.blockchain = new Blockchain(this.messenger);
    this.transactions = new TransactionFactory(this.messenger);
    this.wallet = new Wallet(this.messenger);
    this.contracts = new ContractFactory(this.wallet);
    this.crypto = crypto;
    this.utils = utils;
    this.defaultShardID = config.shardID;
    if (this.defaultShardID !== undefined) {
      this.setShardID(this.defaultShardID);
    }
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
  public setShardID(shardID: number) {
    this.defaultShardID = shardID;
    this.messenger.setDefaultShardID(this.defaultShardID);
    this.setMessenger(this.messenger);
  }
  public setChainType(chainType: utils.ChainType) {
    this.chainType = chainType;
    this.messenger.setChainType(this.chainType);
    this.setMessenger(this.messenger);
  }

  public shardingStructures(shardingStructures: ShardingItem[]) {
    for (const shard of shardingStructures) {
      const shardID =
        typeof shard.shardID === 'string' ? Number.parseInt(shard.shardID, 10) : shard.shardID;
      this.messenger.shardProviders.set(shardID, {
        current: shard.current !== undefined ? shard.current : false,
        shardID,
        http: shard.http,
        ws: shard.ws,
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
