import { HttpProvider, Messenger } from '@harmony-js/network';
import { TransactionFactory, Transaction } from '@harmony-js/transaction';
import { Wallet, Account } from '@harmony-js/account';
import { Blockchain } from './blockchain';

export interface HarmonyModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}

export const enum UrlType {
  http,
  ws,
}
