export const enum ChainType {
  Harmony = 'hmy',
  Ethereum = 'eth',
}

export const enum ChainID {
  Default = 0,
  EthMainnet = 1,
  Morden = 2,
  Ropsten = 3,
  Rinkeby = 4,
  RootstockMainnet = 30,
  RootstockTestnet = 31,
  Kovan = 42,
  EtcMainnet = 61,
  EtcTestnet = 62,
  Geth = 1337,
}

export abstract class HarmonyCore {
  chainType: ChainType;
  chainId: ChainID;
  constructor(chainType: ChainType, chainId: ChainID = ChainID.Default) {
    this.chainType = chainType;
    this.chainId = chainId;
  }
  get chainPrefix(): string {
    switch (this.chainType) {
      case ChainType.Ethereum: {
        return 'eth';
      }
      case ChainType.Harmony: {
        return 'hmy';
      }
      default: {
        return 'hmy';
      }
    }
  }
  get getChainId(): ChainID {
    return this.chainId;
  }
}
