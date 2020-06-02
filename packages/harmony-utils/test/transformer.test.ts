/**
 * @packageDocumentation
 * @module harmony-utils
 * @ignore
 */

import { BN } from '@harmony-js/crypto';
import * as transformers from '../src/transformers';

describe('test transformers', () => {
  it('should test unit', () => {
    const { Unit } = transformers;
    const stringConst = '1';
    const unit1 = new Unit(stringConst);
    const unit2 = new Unit(1);
    const unit3 = new Unit('0x1');

    const unit4 = new Unit('0x');
    expect(unit4.unit).toEqual('0');

    const fromWei = new Unit(stringConst).asWei();
    const fromKwei = new Unit(stringConst).asKwei();
    const fromMwei = new Unit(stringConst).asMwei();
    const fromGwei = new Unit(stringConst).asGwei();
    const fromSzabo = new Unit(stringConst).asSzabo();
    const fromFinney = new Unit(stringConst).asFinney();
    const fromEther = new Unit(stringConst).asEther();
    const fromKether = new Unit(stringConst).asKether();
    const fromMether = new Unit(stringConst).asMether();
    const fromGether = new Unit(stringConst).asGether();
    const fromTether = new Unit(stringConst).asTether();

    expect(fromWei.toWei()).toEqual(new BN(stringConst));
    expect(fromWei.toWeiString()).toEqual(stringConst);
    expect(fromWei.toKwei()).toEqual(`0.00${stringConst}`);
    expect(fromWei.toMwei()).toEqual(`0.00000${stringConst}`);
    expect(fromWei.toGwei()).toEqual(`0.00000000${stringConst}`);
    expect(fromWei.toSzabo()).toEqual(`0.00000000000${stringConst}`);
    expect(fromWei.toFinney()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromWei.toEther()).toEqual(`0.00000000000000000${stringConst}`);
    expect(fromWei.toKether()).toEqual(`0.00000000000000000000${stringConst}`);
    expect(fromWei.toMether()).toEqual(`0.00000000000000000000000${stringConst}`);
    expect(fromWei.toGether()).toEqual(`0.00000000000000000000000000${stringConst}`);
    expect(fromWei.toTether()).toEqual(`0.00000000000000000000000000000${stringConst}`);
    expect(fromWei.toHex()).toEqual(`0x${new BN(stringConst).toString('hex')}`);

    expect(fromKwei.toWei()).toEqual(new BN(`${stringConst}000`));
    expect(fromKwei.toWeiString()).toEqual(`${stringConst}000`);
    expect(fromKwei.toKwei()).toEqual(`${stringConst}`);
    expect(fromKwei.toMwei()).toEqual(`0.00${stringConst}`);
    expect(fromKwei.toGwei()).toEqual(`0.00000${stringConst}`);
    expect(fromKwei.toSzabo()).toEqual(`0.00000000${stringConst}`);
    expect(fromKwei.toFinney()).toEqual(`0.00000000000${stringConst}`);
    expect(fromKwei.toEther()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromKwei.toKether()).toEqual(`0.00000000000000000${stringConst}`);
    expect(fromKwei.toMether()).toEqual(`0.00000000000000000000${stringConst}`);
    expect(fromKwei.toGether()).toEqual(`0.00000000000000000000000${stringConst}`);
    expect(fromKwei.toTether()).toEqual(`0.00000000000000000000000000${stringConst}`);
    expect(fromKwei.toHex()).toEqual(`0x${new BN(`${stringConst}000`).toString('hex')}`);

    expect(fromMwei.toWei()).toEqual(new BN(`${stringConst}000000`));
    expect(fromMwei.toWeiString()).toEqual(`${stringConst}000000`);
    expect(fromMwei.toKwei()).toEqual(`${stringConst}000`);
    expect(fromMwei.toMwei()).toEqual(`${stringConst}`);
    expect(fromMwei.toGwei()).toEqual(`0.00${stringConst}`);
    expect(fromMwei.toSzabo()).toEqual(`0.00000${stringConst}`);
    expect(fromMwei.toFinney()).toEqual(`0.00000000${stringConst}`);
    expect(fromMwei.toEther()).toEqual(`0.00000000000${stringConst}`);
    expect(fromMwei.toKether()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromMwei.toMether()).toEqual(`0.00000000000000000${stringConst}`);
    expect(fromMwei.toGether()).toEqual(`0.00000000000000000000${stringConst}`);
    expect(fromMwei.toTether()).toEqual(`0.00000000000000000000000${stringConst}`);
    expect(fromMwei.toHex()).toEqual(`0x${new BN(`${stringConst}000000`).toString('hex')}`);

    expect(fromGwei.toWei()).toEqual(new BN(`${stringConst}000000000`));
    expect(fromGwei.toWeiString()).toEqual(`${stringConst}000000000`);
    expect(fromGwei.toKwei()).toEqual(`${stringConst}000000`);
    expect(fromGwei.toMwei()).toEqual(`${stringConst}000`);
    expect(fromGwei.toGwei()).toEqual(`${stringConst}`);
    expect(fromGwei.toSzabo()).toEqual(`0.00${stringConst}`);
    expect(fromGwei.toFinney()).toEqual(`0.00000${stringConst}`);
    expect(fromGwei.toEther()).toEqual(`0.00000000${stringConst}`);
    expect(fromGwei.toKether()).toEqual(`0.00000000000${stringConst}`);
    expect(fromGwei.toMether()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromGwei.toGether()).toEqual(`0.00000000000000000${stringConst}`);
    expect(fromGwei.toTether()).toEqual(`0.00000000000000000000${stringConst}`);
    expect(fromGwei.toHex()).toEqual(`0x${new BN(`${stringConst}000000000`).toString('hex')}`);

    expect(fromSzabo.toWei()).toEqual(new BN(`${stringConst}000000000000`));
    expect(fromSzabo.toWeiString()).toEqual(`${stringConst}000000000000`);
    expect(fromSzabo.toKwei()).toEqual(`${stringConst}000000000`);
    expect(fromSzabo.toMwei()).toEqual(`${stringConst}000000`);
    expect(fromSzabo.toGwei()).toEqual(`${stringConst}000`);
    expect(fromSzabo.toSzabo()).toEqual(`${stringConst}`);
    expect(fromSzabo.toFinney()).toEqual(`0.00${stringConst}`);
    expect(fromSzabo.toEther()).toEqual(`0.00000${stringConst}`);
    expect(fromSzabo.toKether()).toEqual(`0.00000000${stringConst}`);
    expect(fromSzabo.toMether()).toEqual(`0.00000000000${stringConst}`);
    expect(fromSzabo.toGether()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromSzabo.toTether()).toEqual(`0.00000000000000000${stringConst}`);
    expect(fromSzabo.toHex()).toEqual(`0x${new BN(`${stringConst}000000000000`).toString('hex')}`);

    expect(fromFinney.toWei()).toEqual(new BN(`${stringConst}000000000000000`));
    expect(fromFinney.toWeiString()).toEqual(`${stringConst}000000000000000`);
    expect(fromFinney.toKwei()).toEqual(`${stringConst}000000000000`);
    expect(fromFinney.toMwei()).toEqual(`${stringConst}000000000`);
    expect(fromFinney.toGwei()).toEqual(`${stringConst}000000`);
    expect(fromFinney.toSzabo()).toEqual(`${stringConst}000`);
    expect(fromFinney.toFinney()).toEqual(`${stringConst}`);
    expect(fromFinney.toEther()).toEqual(`0.00${stringConst}`);
    expect(fromFinney.toKether()).toEqual(`0.00000${stringConst}`);
    expect(fromFinney.toMether()).toEqual(`0.00000000${stringConst}`);
    expect(fromFinney.toGether()).toEqual(`0.00000000000${stringConst}`);
    expect(fromFinney.toTether()).toEqual(`0.00000000000000${stringConst}`);
    expect(fromFinney.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000`).toString('hex')}`,
    );

    expect(fromEther.toWei()).toEqual(new BN(`${stringConst}000000000000000000`));
    expect(fromEther.toWeiString()).toEqual(`${stringConst}000000000000000000`);
    expect(fromEther.toKwei()).toEqual(`${stringConst}000000000000000`);
    expect(fromEther.toMwei()).toEqual(`${stringConst}000000000000`);
    expect(fromEther.toGwei()).toEqual(`${stringConst}000000000`);
    expect(fromEther.toSzabo()).toEqual(`${stringConst}000000`);
    expect(fromEther.toFinney()).toEqual(`${stringConst}000`);
    expect(fromEther.toEther()).toEqual(`${stringConst}`);
    expect(fromEther.toKether()).toEqual(`0.00${stringConst}`);
    expect(fromEther.toMether()).toEqual(`0.00000${stringConst}`);
    expect(fromEther.toGether()).toEqual(`0.00000000${stringConst}`);
    expect(fromEther.toTether()).toEqual(`0.00000000000${stringConst}`);
    expect(fromEther.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000000`).toString('hex')}`,
    );

    expect(fromKether.toWei()).toEqual(new BN(`${stringConst}000000000000000000000`));
    expect(fromKether.toWeiString()).toEqual(`${stringConst}000000000000000000000`);
    expect(fromKether.toKwei()).toEqual(`${stringConst}000000000000000000`);
    expect(fromKether.toMwei()).toEqual(`${stringConst}000000000000000`);
    expect(fromKether.toGwei()).toEqual(`${stringConst}000000000000`);
    expect(fromKether.toSzabo()).toEqual(`${stringConst}000000000`);
    expect(fromKether.toFinney()).toEqual(`${stringConst}000000`);
    expect(fromKether.toEther()).toEqual(`${stringConst}000`);
    expect(fromKether.toKether()).toEqual(`${stringConst}`);
    expect(fromKether.toMether()).toEqual(`0.00${stringConst}`);
    expect(fromKether.toGether()).toEqual(`0.00000${stringConst}`);
    expect(fromKether.toTether()).toEqual(`0.00000000${stringConst}`);
    expect(fromKether.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000000000`).toString('hex')}`,
    );

    expect(fromMether.toWei()).toEqual(new BN(`${stringConst}000000000000000000000000`));
    expect(fromMether.toWeiString()).toEqual(`${stringConst}000000000000000000000000`);
    expect(fromMether.toKwei()).toEqual(`${stringConst}000000000000000000000`);
    expect(fromMether.toMwei()).toEqual(`${stringConst}000000000000000000`);
    expect(fromMether.toGwei()).toEqual(`${stringConst}000000000000000`);
    expect(fromMether.toSzabo()).toEqual(`${stringConst}000000000000`);
    expect(fromMether.toFinney()).toEqual(`${stringConst}000000000`);
    expect(fromMether.toEther()).toEqual(`${stringConst}000000`);
    expect(fromMether.toKether()).toEqual(`${stringConst}000`);
    expect(fromMether.toMether()).toEqual(`${stringConst}`);
    expect(fromMether.toGether()).toEqual(`0.00${stringConst}`);
    expect(fromMether.toTether()).toEqual(`0.00000${stringConst}`);
    expect(fromMether.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000000000000`).toString('hex')}`,
    );

    expect(fromGether.toWei()).toEqual(new BN(`${stringConst}000000000000000000000000000`));
    expect(fromGether.toWeiString()).toEqual(`${stringConst}000000000000000000000000000`);
    expect(fromGether.toKwei()).toEqual(`${stringConst}000000000000000000000000`);
    expect(fromGether.toMwei()).toEqual(`${stringConst}000000000000000000000`);
    expect(fromGether.toGwei()).toEqual(`${stringConst}000000000000000000`);
    expect(fromGether.toSzabo()).toEqual(`${stringConst}000000000000000`);
    expect(fromGether.toFinney()).toEqual(`${stringConst}000000000000`);
    expect(fromGether.toEther()).toEqual(`${stringConst}000000000`);
    expect(fromGether.toKether()).toEqual(`${stringConst}000000`);
    expect(fromGether.toMether()).toEqual(`${stringConst}000`);
    expect(fromGether.toGether()).toEqual(`${stringConst}`);
    expect(fromGether.toTether()).toEqual(`0.00${stringConst}`);
    expect(fromGether.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000000000000000`).toString('hex')}`,
    );

    expect(fromTether.toWei()).toEqual(new BN(`${stringConst}000000000000000000000000000000`));
    expect(fromTether.toWeiString()).toEqual(`${stringConst}000000000000000000000000000000`);
    expect(fromTether.toKwei()).toEqual(`${stringConst}000000000000000000000000000`);
    expect(fromTether.toMwei()).toEqual(`${stringConst}000000000000000000000000`);
    expect(fromTether.toGwei()).toEqual(`${stringConst}000000000000000000000`);
    expect(fromTether.toSzabo()).toEqual(`${stringConst}000000000000000000`);
    expect(fromTether.toFinney()).toEqual(`${stringConst}000000000000000`);
    expect(fromTether.toEther()).toEqual(`${stringConst}000000000000`);
    expect(fromTether.toKether()).toEqual(`${stringConst}000000000`);
    expect(fromTether.toMether()).toEqual(`${stringConst}000000`);
    expect(fromTether.toGether()).toEqual(`${stringConst}000`);
    expect(fromTether.toTether()).toEqual(`${stringConst}`);
    expect(fromTether.toHex()).toEqual(
      `0x${new BN(`${stringConst}000000000000000000000000000000`).toString('hex')}`,
    );

    expect(unit1.wei).toEqual(unit2.wei);
    expect(unit2.wei).toEqual(unit3.wei);

    expect(Unit.Wei(stringConst)).toEqual(fromWei);
    expect(Unit.Kwei(stringConst)).toEqual(fromKwei);
    expect(Unit.Mwei(stringConst)).toEqual(fromMwei);
    expect(Unit.Gwei(stringConst)).toEqual(fromGwei);
    expect(Unit.Szabo(stringConst)).toEqual(fromSzabo);
    expect(Unit.Finney(stringConst)).toEqual(fromFinney);
    expect(Unit.Ether(stringConst)).toEqual(fromEther);
    expect(Unit.Kether(stringConst)).toEqual(fromKether);
    expect(Unit.Mether(stringConst)).toEqual(fromMether);
    expect(Unit.Gether(stringConst)).toEqual(fromGether);
    expect(Unit.Tether(stringConst)).toEqual(fromTether);
    expect(Unit.from(stringConst).wei).toEqual(new Unit(stringConst).wei);

    try {
      const ttt = new Unit('').asWei();
      ttt.wei = <any>undefined;
      ttt.toWei();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttts = new Unit('').asWei();
      ttts.wei = <any>undefined;
      ttts.toWeiString();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt2 = new Unit('').asWei();
      ttt2.wei = <any>undefined;
      ttt2.toKwei();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt3 = new Unit('').asWei();
      ttt3.wei = <any>undefined;
      ttt3.toMwei();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt4 = new Unit('').asWei();
      ttt4.wei = <any>undefined;
      ttt4.toGwei();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt5 = new Unit('').asWei();
      ttt5.wei = <any>undefined;
      ttt5.toSzabo();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt6 = new Unit('').asWei();
      ttt6.wei = <any>undefined;
      ttt6.toFinney();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt7 = new Unit('').asWei();
      ttt7.wei = <any>undefined;
      ttt7.toEther();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt8 = new Unit('').asWei();
      ttt8.wei = <any>undefined;
      ttt8.toKether();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt9 = new Unit('').asWei();
      ttt9.wei = <any>undefined;
      ttt9.toMether();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt10 = new Unit('').asWei();
      ttt10.wei = <any>undefined;
      ttt10.toGether();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt11 = new Unit('').asWei();
      ttt11.wei = <any>undefined;
      ttt11.toTether();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
    try {
      const ttt12 = new Unit('').asWei();
      ttt12.wei = <any>undefined;
      ttt12.toHex();
    } catch (error) {
      expect(error.message).toEqual('error transforming');
    }
  });
  it('should test numberToString', () => {
    const { numberToString } = transformers;

    const str = '123';
    const num = 123;
    const bn = new BN(123);
    expect(numberToString(str)).toEqual(str);
    expect(numberToString(num)).toEqual(str);
    expect(numberToString(bn)).toEqual(str);
    try {
      numberToString('abc');
    } catch (error) {
      expect(error.message).toEqual('cannot parse number:abc to string');
    }
  });

  it('should test numToStr', () => {
    const num = 123;
    const bigNum = new BN(123);
    const str = '123';

    const wrongStr = 'ijfkl';
    const wrongSome: any[] = [];

    expect(transformers.numToStr(num)).toEqual('123');
    expect(transformers.numToStr(bigNum)).toEqual('123');
    expect(transformers.numToStr(str)).toEqual('123');

    try {
      transformers.numToStr(wrongStr);
    } catch (error) {
      expect(error.message).toEqual(
        `while converting number to string, invalid number value '${wrongStr}', should be a number matching (^-?[0-9.]+).`,
      );
    }
    try {
      transformers.numToStr(wrongSome);
    } catch (error) {
      expect(error.message).toEqual(
        `while converting number to string, invalid number value '${wrongSome}' type ${typeof wrongSome}.`,
      );
    }
  });
  it('should test numToStr', () => {
    const num = 123;
    const bigNum = new BN(123);
    const str = '123';

    const wrongStr = 'ijfkl';
    const wrongSome: any = [];

    expect(transformers.numToStr(num)).toEqual('123');
    expect(transformers.numToStr(bigNum)).toEqual('123');
    expect(transformers.numToStr(str)).toEqual('123');

    try {
      transformers.numToStr(wrongStr);
    } catch (error) {
      expect(error.message).toEqual(
        `while converting number to string, invalid number value '${wrongStr}', should be a number matching (^-?[0-9.]+).`,
      );
    }
    try {
      transformers.numToStr(wrongSome);
    } catch (error) {
      expect(error.message).toEqual(
        `while converting number to string, invalid number value '${wrongSome}' type ${typeof wrongSome}.`,
      );
    }
  });
  it('should test add0xToString', () => {
    expect(transformers.add0xToString('123')).toEqual('0x123');
    expect(transformers.add0xToString('-123')).toEqual('-0x123');
    try {
      const obj: any | string = 123;
      transformers.add0xToString(obj);
    } catch (error) {
      expect(error.message).toEqual(`123 is not String`);
    }
  });

  it('should test numberToHex', () => {
    expect(transformers.numberToHex('1')).toEqual('0x1');
    expect(transformers.numberToHex('-1')).toEqual('-0x1');
    expect(transformers.numberToHex(1)).toEqual('0x1');
    expect(transformers.numberToHex(-1)).toEqual('-0x1');
    try {
      const obj: any | string = null;
      transformers.numberToHex(obj);
    } catch (error) {
      expect(error.message).toEqual(`cannot parse number:null to string`);
    }
  });
  it('should test hexToNumber', () => {
    expect(transformers.hexToNumber('0x1')).toEqual('1');
    expect(transformers.hexToNumber('-0x1')).toEqual('-1');
    try {
      const obj: any | string = null;
      transformers.hexToNumber(obj);
    } catch (error) {
      expect(error.message).toEqual(`null is not string`);
    }
    try {
      const obj2: any | string = '123';
      transformers.hexToNumber(obj2);
    } catch (error) {
      expect(error.message).toEqual(`123 is not hex number`);
    }
  });

  it('should test hexToBN', () => {
    expect(transformers.hexToBN('0x1').toString()).toEqual('1');
    expect(transformers.hexToBN('-0x1').toString()).toEqual('-1');
    try {
      const obj: any | string = null;
      transformers.hexToBN(obj);
    } catch (error) {
      expect(error.message).toEqual(`null is not string`);
    }
    try {
      const obj2: any | string = '123';
      transformers.hexToBN(obj2);
    } catch (error) {
      expect(error.message).toEqual(`123 is not hex number`);
    }
  });

  it('should convert Wei to Ether', () => {
    const Wei = new BN('1000000000000000000');
    const expected = '1';

    expect(transformers.fromWei(Wei, transformers.Units.ether)).toEqual(expected);
  });

  it('should convert Ether to Wei', () => {
    const zil = new BN(1);
    const expected = new BN('1000000000000000000');

    expect(transformers.toWei(zil, transformers.Units.ether).eq(expected)).toBeTruthy();
  });

  it('fromWei should should work for negative numbers', () => {
    const Wei = new BN('-1000000000000000000');
    const expected = '-1';

    expect(transformers.fromWei(Wei, transformers.Units.ether)).toEqual(expected);
  });

  it('toWei should should work for negative numbers', () => {
    const zil = new BN(-1);
    const expected = new BN('-1000000000000000000');

    expect(transformers.toWei(zil, transformers.Units.ether)).toEqual(expected);
  });
  it('fromWei errors', () => {
    try {
      transformers.fromWei('baba', transformers.Units.wei);
    } catch (error) {
      expect(error.message).toEqual('Error: Assertion failed of "[object Object]"');
    }

    try {
      const wrongType: any | transformers.Units = 'ba';
      transformers.fromWei(new BN(100), wrongType);
    } catch (error) {
      expect(error.message).toEqual('No unit of type ba exists.');
    }
    expect(transformers.fromWei(new BN(0), transformers.Units.wei, { pad: false })).toEqual('0');
  });
  it('toWei errors', () => {
    try {
      transformers.toWei('-1', transformers.Units.wei);
    } catch (error) {
      expect(error.message).toEqual('Cannot convert 1 to wei.');
    }

    try {
      const wrongType: any | transformers.Units = 'ba';
      transformers.toWei('100000', wrongType);
    } catch (error) {
      expect(error.message).toEqual('No unit of type ba exists.');
    }

    try {
      transformers.toWei('1.00', transformers.Units.wei);
    } catch (error) {
      expect(error.message).toEqual('Cannot convert 1.00 to wei.');
    }
    try {
      transformers.toWei('100.00.00', transformers.Units.wei);
    } catch (error) {
      expect(error.message).toEqual('Cannot convert 100.00.00 to wei.');
    }
    try {
      transformers.toWei('.', transformers.Units.wei);
    } catch (error) {
      expect(error.message).toEqual('Cannot convert . to wei.');
    }
  });
});
