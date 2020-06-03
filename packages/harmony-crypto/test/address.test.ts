/**
 * @packageDocumentation
 * @ignore
 */

import { getAddress, HarmonyAddress } from '../src/address';
import { randomBytes } from '../src/random';
import { toBech32, fromBech32, HRP, tHRP } from '../src/bech32';
import { toChecksumAddress, isValidChecksumAddress } from '../src/keyTool';
const bytes = randomBytes(20);
const bytesWith0x = '0x' + bytes;
const checksum = toChecksumAddress(bytesWith0x);
const bech32 = toBech32(checksum, HRP);
const bech32Testnet = toBech32(checksum, tHRP);

describe('test address', () => {
  it('should test HamonyAddress', () => {
    const hAddress = new HarmonyAddress(bytes);
    expect(hAddress.basic).toEqual(bytes);
    expect(hAddress.basicHex).toEqual(bytesWith0x);
    expect(hAddress.checksum).toEqual(checksum);
    expect(hAddress.bech32).toEqual(bech32);
    expect(hAddress.bech32TestNet).toEqual(bech32Testnet);
    expect(getAddress(bytes).basic).toEqual(bytes);
    expect(getAddress(bytes).basicHex).toEqual(bytesWith0x);
    expect(getAddress(bytes).checksum).toEqual(checksum);
    expect(getAddress(bytes).bech32).toEqual(bech32);
    expect(getAddress(bytes).bech32TestNet).toEqual(bech32Testnet);
    expect(toBech32(checksum)).toEqual(bech32);
    expect(fromBech32(bech32, HRP)).toEqual(checksum);
    expect(fromBech32(bech32)).toEqual(checksum);
    expect(fromBech32(bech32Testnet, tHRP)).toEqual(checksum);
    expect(HarmonyAddress.isValidBasic(bytes)).toEqual(true);
    expect(HarmonyAddress.isValidChecksum(checksum)).toEqual(true);
    expect(HarmonyAddress.isValidBech32(bech32)).toEqual(true);
    expect(HarmonyAddress.isValidBech32TestNet(bech32Testnet)).toEqual(true);
    expect(isValidChecksumAddress(checksum)).toEqual(true);
    try {
      // tslint:disable-next-line: no-unused-expression
      getAddress('111').checksum;
    } catch (error) {
      expect(error.message).toEqual(`"111" is an invalid address format`);
    }
    try {
      fromBech32(bech32, tHRP);
    } catch (error) {
      expect(error.message).toEqual(`Expected hrp to be ${tHRP} but got ${HRP}`);
    }
    try {
      fromBech32(checksum, tHRP);
    } catch (error) {
      expect(error.message).toEqual(`Invalid bech32 address`);
    }
    try {
      toBech32('111', tHRP);
    } catch (error) {
      expect(error.message).toEqual(`Invalid address format.`);
    }
  });
});
