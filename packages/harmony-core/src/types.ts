import { HttpProvider, Messenger, Blockchain } from '@harmony/network';
import { TransactionFactory, Transaction } from '@harmony/transaction';
import { Wallet, Account } from '@harmony/account';

export interface HarmonyModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}
