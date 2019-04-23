const enum ChainType {
  Harmony,
  Ethereum,
}

abstract class HarmonyCore {
  chainType: ChainType;
  constructor(chainType: ChainType) {
    this.chainType = chainType;
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
}

export { HarmonyCore, ChainType };
