import { ChainType, ChainID } from '@harmony-js/utils';

export interface HarmonyConfig {
  chainUrl: string;
  chainType: ChainType;
  chainId: ChainID;
}
