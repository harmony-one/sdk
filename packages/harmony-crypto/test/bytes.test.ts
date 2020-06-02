/**
 * @packageDocumentation
 * @ignore
 */

import * as bytes from '../src/bytes';

describe('Bytes', () => {
  it('hexlify on string of unsafe number', () => {
    [9007199254740991, 9985956830000000000].forEach((value) => {
      try {
        bytes.hexlify(value);
      } catch (error) {
        expect(error.code).toEqual('NUMERIC_FAULT');
        expect(error.fault).toEqual('out-of-safe-range');
      }
    });
  });
  it('splits a canonical signature', () => {
    const r = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';
    const s = '0xcafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7e';
    for (let v = 27; v <= 28; v++) {
      const signature = bytes.concat([r, s, [v]]);
      const sig = bytes.splitSignature(signature);
      expect(sig.r).toEqual(r);
      expect(sig.s).toEqual(s);
      expect(sig.v).toEqual(v);
    }
  });

  it('splits a legacy signature', () => {
    const r = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';
    const s = '0xcafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7ecafe1a7e';
    for (let v = 27; v <= 28; v++) {
      const signature = bytes.concat([r, s, [v - 27]]);
      const sig = bytes.splitSignature(signature);

      expect(sig.r).toEqual(r);
      expect(sig.s).toEqual(s);
      expect(sig.v).toEqual(v);
    }
  });
});
