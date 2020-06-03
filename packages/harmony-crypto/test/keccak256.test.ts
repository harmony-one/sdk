/**
 * @packageDocumentation
 * @ignore
 */

import * as hash from '../src/keccak256';

import hashes from './fixtures/hashes.json';

describe('should test keccak256', () => {
  it('should test keccak256 hashing', () => {
    hashes.forEach((testcase) => {
      expect(hash.keccak256(testcase.data)).toEqual(testcase.keccak256);
    });
  });
});
