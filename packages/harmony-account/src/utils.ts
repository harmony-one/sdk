import { HttpProvider, Messenger } from '@harmony-js/network';
import { ChainType } from '@harmony-js/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:8545'),
  ChainType.Harmony,
);
