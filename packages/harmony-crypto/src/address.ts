import { toChecksumAddress } from './keyTool';
import { isAddress } from '@harmony-js/utils';

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

  raw: string;
  basic: string;
  get basicHex() {
    return `0x${this.basic}`;
  }
  get checksum() {
    return toChecksumAddress(this.basic);
  }
  constructor(raw: string) {
    this.raw = raw;
    this.basic = this.getBasic(this.raw);
  }

  private getBasic(addr: string) {
    const basicBool = isAddress(addr);

    if (basicBool) {
      return addr.replace('0x', '').toLowerCase();
    }

    throw new Error(`${addr} is valid address format`);
  }
}

export function getAddress(address: string) {
  try {
    return new HarmonyAddress(address);
  } catch (error) {
    throw error;
  }
}
