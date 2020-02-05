/**
 * @packageDocumentation
 * @module harmony-utils
 * @ignore
 */

import * as validators from '../src/validators';
import { basicType, advanceType } from './fixture';

function expector(fun: any, val: any, bool: boolean) {
  return expect(fun(val)).toEqual(bool);
}

function mapTest(testObject: any, testTrue: string[], testFunc: any) {
  const keys = Object.keys(testObject);
  keys.forEach((k: string) => {
    if (testTrue.includes(k)) {
      expector(testFunc, testObject[k], true);
    } else {
      expector(testFunc, testObject[k], false);
    }
  });
}

describe('test validator', () => {
  it('test isNumber', () => {
    const beTrue = ['zero', 'float', 'hexNumber'];
    mapTest(basicType, beTrue, validators.isNumber);
  });
  it('test isInt', () => {
    const beTrue = ['zero', 'hexNumber'];
    mapTest(basicType, beTrue, validators.isInt);
  });
  it('test isString', () => {
    const beTrue = ['text', 'hexString', 'jsonString'];
    mapTest(basicType, beTrue, validators.isString);
  });
  it('test isBoolean', () => {
    const beTrue = ['bool'];
    mapTest(basicType, beTrue, validators.isBoolean);
  });
  it('test isArray', () => {
    const beTrue = ['array'];
    mapTest(basicType, beTrue, validators.isArray);
  });
  it('test isJsonString', () => {
    const beTrue = ['jsonString'];
    mapTest(basicType, beTrue, validators.isJsonString);
  });
  it('test isObject', () => {
    const beTrue = ['object'];
    mapTest(basicType, beTrue, validators.isObject);
  });
  it('test isFunction', () => {
    const beTrue = ['function'];
    mapTest(basicType, beTrue, validators.isFunction);
  });

  it('test isPubKey', () => {
    const beTrue = ['publicKey'];
    mapTest({ ...advanceType }, beTrue, validators.isPublicKey);
  });
  it('test isAddress', () => {
    const beTrue = ['address', 'hexAddress', 'checkSumAddress', 'byStrX'];
    mapTest({ ...advanceType }, beTrue, validators.isAddress);
  });
  it('test isPrivateKey', () => {
    const beTrue = ['privateKey', 'hash'];
    mapTest({ ...advanceType }, beTrue, validators.isPrivateKey);
  });
  it('test isHash', () => {
    const beTrue = ['privateKey', 'hash'];
    mapTest({ ...advanceType }, beTrue, validators.isHash);
  });
  it('test isHex', () => {
    const beTrue = [
      'privateKey',
      'publicKey',
      'address',
      'hexString',
      'hexAddress',
      'checkSumAddress',
      'hex',
      'byStrX',
    ];
    mapTest({ ...advanceType }, beTrue, validators.isHex);
    try {
      validators.isHex(basicType.zero);
    } catch (error) {
      expect(error.message).toEqual(`${basicType.zero} is not string`);
    }
  });
  it('test isBlockNumber', () => {
    const testResult = validators.isBlockNumber('0x1');
    expect(testResult).toEqual(true);
    const testResult2 = validators.isBlockNumber('pending');
    expect(testResult2).toEqual(true);
    const testResult3 = validators.isBlockNumber('that would be wrong');
    expect(testResult3).toEqual(false);

    try {
      validators.isBlockNumber(true);
    } catch (error) {
      expect(error.message).toEqual(`${true} is not valid blockNumber`);
    }
  });

  it('test isHttp', () => {
    expect(validators.isHttp('http://www.google.com')).toEqual(true);
    expect(validators.isHttp('https://www.google.com')).toEqual(true);
    expect(validators.isHttp('ftp://www.google.com')).toEqual(false);
    try {
      validators.isHttp(123);
    } catch (error) {
      expect(error.message).toEqual(`123 is not valid url`);
    }
  });
  it('test isWs', () => {
    expect(validators.isWs('ws://www.google.com')).toEqual(true);
    expect(validators.isWs('wss://www.google.com')).toEqual(true);
    expect(validators.isWs('ftp://www.google.com')).toEqual(false);
    try {
      validators.isWs(123);
    } catch (error) {
      expect(error.message).toEqual(`123 is not valid url`);
    }
  });

  it('test isBech32Address', () => {
    expect(validators.isBech32Address('one1au4f9jectk52k24rnk9hjuygt22q2045wcpfdp')).toEqual(true);
    expect(validators.isBech32Address('xxx')).toEqual(false);
  });
  it('test isBech32Address', () => {
    expect(
      validators.isBech32TestNetAddress('tone1au4f9jectk52k24rnk9hjuygt22q2045wcpfdp'),
    ).toEqual(true);
    expect(validators.isBech32TestNetAddress('xxx')).toEqual(false);
  });
  it('test isValidAddress', () => {
    expect(validators.isValidAddress('tone1au4f9jectk52k24rnk9hjuygt22q2045wcpfdp')).toEqual(true);
    expect(validators.isValidAddress('one1au4f9jectk52k24rnk9hjuygt22q2045wcpfdp')).toEqual(true);
    expect(validators.isValidAddress(advanceType.checkSumAddress)).toEqual(true);
    expect(validators.isValidAddress(advanceType.address)).toEqual(true);
    expect(validators.isValidAddress(advanceType.hexAddress)).toEqual(true);
    expect(validators.isValidAddress('888')).toEqual(false);
    try {
      validators.isValidAddress(<any | string>123);
    } catch (error) {
      expect(error.message).toEqual(`123 is not string`);
    }
  });
});
