// tslint:disable-next-line: no-implicit-dependencies
import { Harmony } from '@harmony-js/core';
// tslint:disable-next-line: no-implicit-dependencies
import { ChainType } from '@harmony-js/utils';
// tslint:disable-next-line: no-implicit-dependencies
import { Account } from '@harmony-js/account';

const CHAIN_ID: number = parseInt(process.env.CHAIN_ID as string, 10);
const CHAIN_TYPE: string = process.env.CHAIN_TYPE as string;
const HTTP_PROVIDER: string = process.env.HTTP_PROVIDER as string;
const GENESIS_PRIV_KEY: string = process.env.GENESIS_PRIV_KEY as string;

let chainType: ChainType = ChainType.Harmony;

if (CHAIN_TYPE === 'hmy') {
  chainType = ChainType.Harmony;
} else if (CHAIN_TYPE === 'eth') {
  chainType = ChainType.Ethereum;
}

export const harmony: Harmony = new Harmony(HTTP_PROVIDER, {
  chainId: CHAIN_ID,
  chainType,
  chainUrl: HTTP_PROVIDER,
});

export const myAccount: Account = harmony.wallet.addByPrivateKey(
  GENESIS_PRIV_KEY,
);
