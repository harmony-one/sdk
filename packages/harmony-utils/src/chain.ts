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
  Ganache = 0,
  HmyMainnet = 1,
  HmyTestnet = 2,
  HmyLocal = 2,
  HmyPangaea = 3,
}

export const defaultConfig = {
  Default: {
    Chain_ID: ChainID.HmyLocal,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'http://localhost:9500',
    Network_ID: 'Local',
  },
  DefaultWS: {
    Chain_ID: ChainID.HmyLocal,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'ws://localhost:9800',
    Network_ID: 'LocalWS',
  },
};

export abstract class HarmonyCore {
  chainType: ChainType;
  chainId: ChainID;
  constructor(chainType: ChainType, chainId: ChainID = defaultConfig.Default.Chain_ID) {
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
  public setChainId(chainId: ChainID) {
    this.chainId = chainId;
  }
  public setChainType(chainType: ChainType) {
    this.chainType = chainType;
  }
}

export const HDPath = `m/44'/1023'/0'/0/`;

export const AddressSuffix = '-';
