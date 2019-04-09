import BN from 'bn.js';
import { isString, isNumber, isHex } from './validators';

export const enum Units {
  wei = 'wei',
  kwei = 'kwei',
  Mwei = 'Mwei',
  Gwei = 'Gwei',
  szabo = 'szabo',
  finney = 'finney',
  ether = 'ether',
}

export const numberToString = (
  obj: BN | number | string,
  radix: number = 10,
): string => {
  if (BN.isBN(obj)) {
    return obj.toString(radix);
  } else if (isNumber(obj)) {
    return new BN(obj).toString(radix);
  } else if (isString(obj) && isNumber(Number(obj))) {
    return new BN(obj).toString(radix);
  } else {
    throw new Error(`cannot parse number:${obj} to string`);
  }
};

export const add0xToString = (obj: string): string => {
  if (isString(obj) && !obj.startsWith('-')) {
    return '0x' + obj.replace('0x', '');
  } else if (isString(obj) && obj.startsWith('-')) {
    return '-0x' + obj.replace('-', '');
  } else {
    throw new Error(`${obj} is not String`);
  }
};

export const strip0x = (obj: string): string => {
  return obj.toLowerCase().replace('0x', '');
};

export const numberToHex = (obj: any): string => {
  try {
    return add0xToString(numberToString(obj, 16));
  } catch (error) {
    throw error;
  }
};

export const hexToNumber = (hex: string): string => {
  if (isHex(hex)) {
    return new BN(strip0x(hex), 'hex').toString();
  } else {
    throw new Error(`${hex} is not hex number`);
  }
};

export const toWei = (obj: any): string => {
  return '';
};

export const fromWei = (obj: any): string => {
  return '';
};

export class Unit {}
