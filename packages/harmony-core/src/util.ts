/**
 * @packageDocumentation
 * @module harmony-core
 * @hidden
 */

import { ChainType, ChainID, defaultConfig } from '@harmony-js/utils';
import { Harmony } from './harmony';

export interface HarmonyConfig {
  chainUrl?: string;
  chainType: ChainType;
  chainId: ChainID;
  shardID?: number;
}

// tslint:disable-next-line: variable-name
export function createWeb3(_web3: any) {
  const url: string = _web3.currentProvider.url;
  const harmony = new Harmony(url, {
    chainId: defaultConfig.Default.Chain_ID,
    chainType: defaultConfig.Default.Chain_Type,
    chainUrl: defaultConfig.Default.Chain_URL,
  });

  _web3.setProvider(harmony.messenger.provider);
  _web3.messenger = harmony.messenger;
  _web3.eth.getRpcResult = harmony.blockchain.getRpcResult;

  // map blockchain to eth
  const { blockchain } = harmony;
  _web3.eth.getBlockNumber = () => blockchain.getBlockByNumber;
  _web3.eth.getBalance = (address: string, blockNumber?: string) =>
    blockchain.getBalance({ address, blockNumber });
  _web3.eth.getBlockByHash = (blockHash: string, returnObject?: boolean) =>
    blockchain.getBlockByHash({ blockHash, returnObject });
  _web3.eth.getBlockByNumber = (blockNumber: string, returnObject?: boolean) =>
    blockchain.getBlockByNumber({ blockNumber, returnObject });
  _web3.eth.getBlockTransactionCountByHash = (blockHash: string) =>
    blockchain.getBlockTransactionCountByHash({ blockHash });
  _web3.eth.getBlockTransactionCountByNumber = (blockNumber: string) =>
    blockchain.getBlockTransactionCountByNumber({ blockNumber });
  _web3.eth.getTransactionByBlockHashAndIndex = (blockHash: string, index: string) =>
    blockchain.getTransactionByBlockHashAndIndex({ blockHash, index });
  _web3.eth.getTransactionByBlockNumberAndIndex = (blockNumber: string, index: string) =>
    blockchain.getTransactionByBlockNumberAndIndex({ blockNumber, index });
  _web3.eth.getTransactionByHash = (txnHash: string) =>
    blockchain.getTransactionByHash({ txnHash });
  _web3.eth.getTransactionReceipt = (txnHash: string) =>
    blockchain.getTransactionReceipt({ txnHash });
  _web3.eth.getCode = (address: string, blockNumber?: string) =>
    blockchain.getCode({ address, blockNumber });
  _web3.eth.net_peerCount = () => blockchain.net_peerCount();
  _web3.eth.net_version = () => blockchain.net_version();
  _web3.eth.getProtocolVersion = () => blockchain.getProtocolVersion();
  _web3.eth.getStorageAt = (address: string, position: string, blockNumber: string | undefined) =>
    blockchain.getStorageAt({ address, position, blockNumber });
  _web3.eth.getTransactionCount = (address: string, blockNumber: string | undefined) =>
    blockchain.getTransactionCount({ address, blockNumber });
  _web3.eth.estimateGas = (to: string, data: string) => blockchain.estimateGas({ to, data });
  _web3.eth.gasPrice = () => blockchain.gasPrice();
  _web3.eth.call = (payload: any, blockNumber: string | undefined) =>
    blockchain.call({ payload, blockNumber });
  _web3.eth.newPendingTransactions = () => blockchain.newPendingTransactions();
  _web3.eth.newBlockHeaders = () => blockchain.newBlockHeaders();
  _web3.eth.syncing = () => blockchain.syncing();
  _web3.eth.logs = (options: any) => blockchain.logs(options);

  // map subscribe to _web3
  _web3.eth.subscribe = harmony.messenger.subscribe;

  // map accounts to _web3
  _web3.accounts = harmony.wallet.accounts;
  _web3.eth.accounts.create = harmony.wallet.createAccount;
  _web3.eth.accounts.privateKeyToAccount = harmony.wallet.addByPrivateKey;
  _web3.eth.accounts.encrypt = async (privateKey: string, password: string) => {
    const newAcc = new harmony.Modules.Account(privateKey, harmony.messenger);
    const result = await newAcc.toFile(password);
    return result;
  };

  _web3.eth.accounts.decrypt = async (keystoreJsonV3: any, password: string) => {
    const newAcc = new harmony.Modules.Account();
    const result = await newAcc.fromFile(JSON.stringify(keystoreJsonV3), password);
    return result;
  };

  _web3.eth.accounts.signTransaction = harmony.wallet.signTransaction;

  // map transaction to web3
  _web3.eth.recoverTransaction = harmony.transactions.recover;

  // map contract to web3
  _web3.eth.Contract = harmony.contracts.createContract;

  _web3.utils = { ..._web3.utils, ...harmony.utils, ...harmony.crypto };
}
