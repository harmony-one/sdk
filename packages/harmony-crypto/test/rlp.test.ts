/**
 * @packageDocumentation
 * @ignore
 */

import * as rlp from '../src/rlp';
import cases from './fixtures/rlpcoder.json';

describe('rlp', () => {
  it('should test rlp encoder', () => {
    cases.forEach((testcase) => {
      expect(rlp.encode(testcase.decoded)).toEqual(testcase.encoded);
    });
  });
  it('should test rlp decoder', () => {
    cases.forEach((testcase) => {
      expect(rlp.decode(testcase.encoded)).toEqual(testcase.decoded);
    });
  });
});
