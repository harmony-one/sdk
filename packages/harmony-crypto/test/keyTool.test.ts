/**
 * @packageDocumentation
 * @ignore
 */

import * as keys from '../src/keyTool';
import { isPrivateKey, isAddress, isPublicKey } from '@harmony-js/utils';

describe('test keyTools', () => {
  it('test keygen', () => {
    const prv = keys.generatePrivateKey();
    const pub = keys.getPubkeyFromPrivateKey(prv);
    const addr = keys.getAddressFromPublicKey(pub);
    const addrPrv = keys.getAddressFromPrivateKey(prv);
    expect(isPrivateKey(prv)).toEqual(true);
    expect(isPublicKey(pub)).toEqual(true);
    expect(isAddress(addr)).toEqual(true);
    expect(isAddress(addrPrv)).toEqual(true);
    expect(addr).toEqual(addrPrv);
  });

  it('should test sign', () => {
    const unsigned = '0xdc80808080809401234567890123456789012345678901234567898080';
    const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    const pub = keys.getPubkeyFromPrivateKey(privateKey);
    const signature = keys.sign(unsigned, privateKey);
    expect(keys.verifySignature(unsigned, signature, pub)).toEqual(true);
    try {
      keys.sign(unsigned, '111');
    } catch (error) {
      expect(error.message).toEqual(`111 is not PrivateKey`);
    }
  });
});
