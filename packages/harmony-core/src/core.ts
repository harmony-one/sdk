import * as crypto from '@harmony/crypto';
import * as utils from '@harmony/utils';

import { HttpProvider, Messenger } from '@harmony/network';
import { TransactionFactory } from '@harmony/transaction';
import { Wallet } from '@harmony/account';

class Harmony {
  messenger: Messenger;
  transactions: TransactionFactory;
  wallet: Wallet;
  crypto: any;
  utils: any;
  private provider: HttpProvider;

  constructor(url: string) {
    this.provider = new HttpProvider(url);
    this.messenger = new Messenger(this.provider);
    this.transactions = new TransactionFactory(this.messenger);
    this.wallet = new Wallet(this.messenger);
    this.crypto = crypto;
    this.utils = utils;
  }
}

export { Harmony };
