import { bs58Decode, bs58Encode } from '../src/base58';
import { fixtures, testData } from './base58fixture';

describe('test bs58', () => {
  it('should test encode', () => {
    fixtures.valid.forEach((f: any) => {
      const actual = bs58Encode(f.hex);
      expect(actual).toEqual(f.string);
    });
  });
  it('should test decode', () => {
    fixtures.valid.forEach((f: any) => {
      const actual = bs58Decode(f.string);
      expect(actual).toEqual(f.hex);
    });
  });
  it('should throw error', () => {
    fixtures.invalid.forEach((f: any) => {
      try {
        bs58Decode(f.string);
      } catch (error) {
        expect(error.message).toEqual('Non-base58 character');
      }
    });
  });
  it('another test', () => {
    testData.forEach((f: any) => {
      const actual = bs58Encode(f.raw);
      expect(actual).toEqual(f.res);
      const actualDecode = bs58Decode(f.res);
      expect(actualDecode).toEqual(f.raw);
    });
  });
  it('manual test', () => {
    const raw = '0x';
    const actual = bs58Encode(raw);
    expect(actual).toEqual('');
  });
});
