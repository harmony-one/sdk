/**
 * @packageDocumentation
 * @module harmony-core
 * @hidden
 */

import { HttpProvider, Messenger } from '@harmony-js/network';
import { TransactionFactory, Transaction } from '@harmony-js/transaction';
import { Wallet, Account } from '@harmony-js/account';
import { ChainType, ChainID } from '@harmony-js/utils';
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

export enum UrlType {
  http,
  ws,
}

export interface HarmonySetting<T extends ChainType, I extends ChainID> {
  type: T;
  id: I;
}
