import { isAddress, isBech32Address, isBech32TestNetAddress } from '@harmony-js/utils';

import { toChecksumAddress } from './keyTool';
import { fromBech32, toBech32, HRP, tHRP } from './bech32';

export class HarmonyAddress {
  // static validator
  static isValidBasic(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.basic;
  }

  // static validator
  static isValidChecksum(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.checksum;
  }

  // static validator
  static isValidBech32(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.bech32;
  }
  // static validator
  static isValidBech32TestNet(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.bech32TestNet;
  }

  raw: string;
  basic: string;
  get basicHex() {
    return `0x${this.basic}`;
  }
  get checksum() {
    return toChecksumAddress(`0x${this.basic}`);
  }

  get bech32() {
    return toBech32(this.basic, HRP);
  }
  get bech32TestNet() {
    return toBech32(this.basic, tHRP);
  }

  constructor(raw: string) {
    this.raw = raw;
    this.basic = this.getBasic(this.raw);
  }

  private getBasic(addr: string) {
    const basicBool = isAddress(addr);
    const bech32Bool = isBech32Address(addr);
    const bech32TestNetBool = isBech32TestNetAddress(addr);

    if (basicBool) {
      return addr.replace('0x', '').toLowerCase();
    }

    if (bech32Bool) {
      const fromB32 = fromBech32(addr, HRP);
      return fromB32.replace('0x', '').toLowerCase();
    }

    if (bech32TestNetBool) {
      const fromB32TestNet = fromBech32(addr, tHRP);
      return fromB32TestNet.replace('0x', '').toLowerCase();
    }

    throw new Error(`"${addr}" is an invalid address format`);
  }
}

export function getAddress(address: string) {
  try {
    return new HarmonyAddress(address);
  } catch (error) {
    throw error;
  }
}
