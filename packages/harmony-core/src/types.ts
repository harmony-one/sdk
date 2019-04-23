import { HttpProvider, Messenger } from '@harmony/network';
import { TransactionFactory, Transaction } from '@harmony/transaction';
import { Wallet, Account } from '@harmony/account';
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
