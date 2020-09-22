/**
 * @packageDocumentation
 * @module harmony-utils
 */

import BN from 'bn.js';
import { isString, isNumber, isHex } from './validators';

export enum Units {
  wei = 'wei',
  Kwei = 'Kwei',
  Mwei = 'Mwei',
  Gwei = 'Gwei',
  szabo = 'szabo',
  finney = 'finney',
  ether = 'ether',
  one = 'one',
  Kether = 'Kether',
  Mether = 'Mether',
  Gether = 'Gether',
  Tether = 'Tether',
}

/** @hidden */
export const unitMap = new Map([
  [Units.wei, '1'],
  [Units.Kwei, '1000'], // 1e3 wei
  [Units.Mwei, '1000000'], // 1e6 wei
  [Units.Gwei, '1000000000'], // 1e9 wei
  [Units.szabo, '1000000000000'], // 1e12 wei
  [Units.finney, '1000000000000000'], // 1e15 wei
  [Units.ether, '1000000000000000000'], // 1e18 wei
  [Units.one, '1000000000000000000'], // 1e18 wei
  [Units.Kether, '1000000000000000000000'], // 1e21 wei
  [Units.Mether, '1000000000000000000000000'], // 1e24 wei
  [Units.Gether, '1000000000000000000000000000'], // 1e27 wei
  [Units.Tether, '1000000000000000000000000000000'], // 1e30 wei
]);

/** @hidden */
const DEFAULT_OPTIONS = {
  pad: false,
};

/**
 * Convert Number to String
 */
export const numberToString = (obj: BN | number | string, radix: number = 10): string => {
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

/**
 * Convert Number to String
 */
export const numToStr = (input: any) => {
  if (typeof input === 'string') {
    if (!input.match(/^-?[0-9.]+$/)) {
      throw new Error(
        `while converting number to string, invalid number value '${input}', should be a number matching (^-?[0-9.]+).`,
      );
    }
    return input;
  } else if (typeof input === 'number') {
    return String(input);
  } else if (BN.isBN(input)) {
    return input.toString(10);
  }

  throw new Error(
    `while converting number to string, invalid number value '${input}' type ${typeof input}.`,
  );
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

/**
 * Convert number to hex
 */
export const numberToHex = (obj: any): string => {
  try {
    return add0xToString(numberToString(obj, 16));
  } catch (error) {
    throw error;
  }
};

/**
 * Convert hex to Decimal number
 */
export const hexToNumber = (hex: string): string => {
  if (isHex(hex) && hex[0] !== '-') {
    return new BN(strip0x(hex), 'hex').toString();
  } else if (isHex(hex) && hex[0] === '-') {
    const result: BN = new BN(hex.substring(3), 16);
    return result.mul(new BN(-1)).toString();
  } else {
    throw new Error(`${hex} is not hex number`);
  }
};

/**
 * Convert hex to Big Number
 */
export const hexToBN = (hex: string): BN => {
  if (isHex(hex) && hex[0] !== '-') {
    return new BN(strip0x(hex), 'hex');
  } else if (isHex(hex) && hex[0] === '-') {
    const result: BN = new BN(hex.substring(3), 16);
    return result.mul(new BN(-1));
  } else {
    throw new Error(`${hex} is not hex number`);
  }
};

/**
 * Converts any ONE value into wei
 */
export const toWei = (input: BN | string, unit: Units): BN => {
  try {
    let inputStr = numToStr(input);
    const baseStr = unitMap.get(unit);

    if (!baseStr) {
      throw new Error(`No unit of type ${unit} exists.`);
    }

    const baseNumDecimals = baseStr.length - 1;
    const base = new BN(baseStr, 10);

    // Is it negative?
    const isNegative = inputStr.substring(0, 1) === '-';
    if (isNegative) {
      inputStr = inputStr.substring(1);
    }

    if (inputStr === '.') {
      throw new Error(`Cannot convert ${inputStr} to wei.`);
    }

    // Split it into a whole and fractional part
    const comps = inputStr.split('.'); // eslint-disable-line
    if (comps.length > 2) {
      throw new Error(`Cannot convert ${inputStr} to wei.`);
    }

    let [whole, fraction] = comps;

    if (!whole) {
      whole = '0';
    }
    if (!fraction) {
      fraction = '0';
    }
    if (fraction.length > baseNumDecimals) {
      throw new Error(`Cannot convert ${inputStr} to wei.`);
    }

    while (fraction.length < baseNumDecimals) {
      fraction += '0';
    }

    const wholeBN = new BN(whole);
    const fractionBN = new BN(fraction);
    let wei = wholeBN.mul(base).add(fractionBN);

    if (isNegative) {
      wei = wei.neg();
    }

    return new BN(wei.toString(10), 10);
  } catch (error) {
    throw error;
  }
};

/**
 * Converts any wei value into a ONE value.
 */
export const fromWei = (wei: BN | string, unit: Units, options: any = DEFAULT_OPTIONS): string => {
  try {
    const weiBN: BN = !BN.isBN(wei) ? new BN(wei) : wei;

    if (unit === 'wei') {
      return weiBN.toString(10);
    }

    const baseStr = unitMap.get(unit);

    if (!baseStr) {
      throw new Error(`No unit of type ${unit} exists.`);
    }

    const base = new BN(baseStr, 10);
    const baseNumDecimals = baseStr.length - 1;

    let fraction = weiBN
      .abs()
      .mod(base)
      .toString(10);

    // prepend 0s to the fraction half
    while (fraction.length < baseNumDecimals) {
      fraction = `0${fraction}`;
    }

    if (!options.pad) {
      /* eslint-disable prefer-destructuring */
      const matchFraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
      fraction = matchFraction ? matchFraction[1] : '0';
    }

    const whole = weiBN.div(base).toString(10);

    return fraction === '0' ? `${whole}` : `${whole}.${fraction}`;
  } catch (error) {
    throw error;
  }
};

export class Unit {
  static from(str: BN | string) {
    return new Unit(str);
  }

  static Wei(str: BN | string) {
    return new Unit(str).asWei();
  }
  static Kwei(str: BN | string) {
    return new Unit(str).asKwei();
  }
  static Mwei(str: BN | string) {
    return new Unit(str).asMwei();
  }
  static Gwei(str: BN | string) {
    return new Unit(str).asGwei();
  }
  static Szabo(str: BN | string) {
    return new Unit(str).asSzabo();
  }
  static Finney(str: BN | string) {
    return new Unit(str).asFinney();
  }
  static Ether(str: BN | string) {
    return new Unit(str).asEther();
  }
  static One(str: BN | string) {
    return new Unit(str).asOne();
  }
  static Kether(str: BN | string) {
    return new Unit(str).asKether();
  }
  static Mether(str: BN | string) {
    return new Unit(str).asMether();
  }
  static Gether(str: BN | string) {
    return new Unit(str).asGether();
  }
  static Tether(str: BN | string) {
    return new Unit(str).asTether();
  }

  wei: BN;
  unit: BN | string;

  constructor(str: BN | string | number) {
    if (!BN.isBN(str) && typeof str !== 'number' && isHex(str)) {
      this.unit = hexToNumber(str);
    } else if (!BN.isBN(str) && typeof str === 'number') {
      this.unit = str.toString();
    } else if (str === '0x') {
      this.unit = hexToNumber('0x0');
    } else {
      this.unit = str;
    }

    this.wei = new BN(this.unit);
  }

  asWei() {
    this.wei = new BN(this.unit);
    return this;
  }
  asKwei() {
    this.wei = toWei(this.unit, Units.Kwei);
    return this;
  }
  asMwei() {
    this.wei = toWei(this.unit, Units.Mwei);
    return this;
  }
  asGwei() {
    this.wei = toWei(this.unit, Units.Gwei);
    return this;
  }
  asSzabo() {
    this.wei = toWei(this.unit, Units.szabo);
    return this;
  }
  asFinney() {
    this.wei = toWei(this.unit, Units.finney);
    return this;
  }
  asEther() {
    this.wei = toWei(this.unit, Units.ether);
    return this;
  }
  asOne() {
    this.wei = toWei(this.unit, Units.one);
    return this;
  }
  asKether() {
    this.wei = toWei(this.unit, Units.Kether);
    return this;
  }
  asMether() {
    this.wei = toWei(this.unit, Units.Mether);
    return this;
  }
  asGether() {
    this.wei = toWei(this.unit, Units.Gether);
    return this;
  }
  asTether() {
    this.wei = toWei(this.unit, Units.Tether);
    return this;
  }

  toWei() {
    if (this.wei) {
      return this.wei;
    } else {
      throw new Error('error transforming');
    }
  }

  toKwei() {
    if (this.wei) {
      return fromWei(this.wei, Units.Kwei);
    } else {
      throw new Error('error transforming');
    }
  }
  toGwei() {
    if (this.wei) {
      return fromWei(this.wei, Units.Gwei);
    } else {
      throw new Error('error transforming');
    }
  }
  toMwei() {
    if (this.wei) {
      return fromWei(this.wei, Units.Mwei);
    } else {
      throw new Error('error transforming');
    }
  }
  toSzabo() {
    if (this.wei) {
      return fromWei(this.wei, Units.szabo);
    } else {
      throw new Error('error transforming');
    }
  }
  toFinney() {
    if (this.wei) {
      return fromWei(this.wei, Units.finney);
    } else {
      throw new Error('error transforming');
    }
  }
  toEther() {
    if (this.wei) {
      return fromWei(this.wei, Units.ether);
    } else {
      throw new Error('error transforming');
    }
  }
  toOne() {
    if (this.wei) {
      return fromWei(this.wei, Units.one);
    } else {
      throw new Error('error transforming');
    }
  }
  toKether() {
    if (this.wei) {
      return fromWei(this.wei, Units.Kether);
    } else {
      throw new Error('error transforming');
    }
  }
  toMether() {
    if (this.wei) {
      return fromWei(this.wei, Units.Mether);
    } else {
      throw new Error('error transforming');
    }
  }
  toGether() {
    if (this.wei) {
      return fromWei(this.wei, Units.Gether);
    } else {
      throw new Error('error transforming');
    }
  }
  toTether() {
    if (this.wei) {
      return fromWei(this.wei, Units.Tether);
    } else {
      throw new Error('error transforming');
    }
  }

  toWeiString() {
    if (this.wei) {
      return this.wei.toString();
    } else {
      throw new Error('error transforming');
    }
  }
  toHex() {
    if (this.wei) {
      return numberToHex(this.wei);
    } else {
      throw new Error('error transforming');
    }
  }
}
