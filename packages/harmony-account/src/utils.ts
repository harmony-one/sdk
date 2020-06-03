/**
 * @packageDocumentation
 * @module harmony-account
 * @hidden
 */

import { HttpProvider, Messenger } from '@harmony-js/network';
import { ChainType, ChainID } from '@harmony-js/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:9500'),
  ChainType.Harmony,
  ChainID.HmyLocal,
);
