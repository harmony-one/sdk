/**
 * @packageDocumentation
 * @ignore
 */

import { AbiCoder } from '../src/abi/abiCoder';
import { BN } from '@harmony-js/crypto';
import { isArray } from '@harmony-js/utils';
import { abis } from './fixtures/abiv2';

function getValues(object: any, format?: any, named?: any): any {
  if (isArray(object)) {
    // tslint:disable-next-line: no-shadowed-variable
    const result: any[] = [];
    // tslint:disable-next-line: no-shadowed-variable
    object.forEach((object: any) => {
      result.push(getValues(object, format, named));
    });
    return result;
  }

  switch (object.type) {
    case 'number':
      return new BN(object.value);
    case 'boolean':
    case 'string':
      return object.value;

    case 'buffer':
      return object.value;

    case 'tuple':
      const result = getValues(object.value, format, named);
      if (named) {
        const namedResult: any = {};
        result.forEach((value: any, index: number) => {
          namedResult['r' + String(index)] = value;
        });
        return namedResult;
      }
      return result;

    default:
      throw new Error('invalid type - ' + object.type);
  }
}

describe('test abiv2', () => {
  it('should encode abiv2', () => {
    const coder = new AbiCoder();
    for (const abiItem of abis) {
      const test: any = abiItem;
      const values = getValues(JSON.parse(test.values));
      const types = JSON.parse(test.types);
      const expected = test.result;
      const encoded = coder.encode(types, values);

      expect(JSON.stringify(encoded)).toEqual(JSON.stringify(expected));

      const namedEncoded = coder.encode(types, values);

      expect(JSON.stringify(namedEncoded)).toEqual(JSON.stringify(expected));
    }
  });
  it('should decode abiv2', () => {
    const coder = new AbiCoder();
    for (const abiItem of abis) {
      const test = abiItem;
      const values = getValues(JSON.parse(test.values));
      const types = JSON.parse(test.types);
      const expected = test.result;
      const decoded = coder.decode(types, expected);
      expect(JSON.stringify(decoded)).toEqual(JSON.stringify(values));
    }
  });
});
