/**
 * ## About this package
 *
 * `@harmony-js/util` provides utility functions for Harmony dapps and other `harmony-js` packages
 *
 * Develop can use this package to:
 * - Transform the unit of token (fromWei, toWei...)
 * - Convert variable to different type (hexToBN, numberToHex...)
 * - Check validators information (isAddress, isPublicKey, isBlockNumber...)
 *
 * ## How to use this package
 *
 * ### Step 1: create a Harmony Instance
 * ```javascript
 * const { Harmony } = require('@harmony-js/core');
 * const { ChainID, ChainType } = require('@harmony-js/utils');
 * const { BN } = require('@harmony-js/crypto');
 *
 * const hmy = new Harmony(
 *   'http://localhost:9500',
 *   {
 *     chainType: ChainType.Harmony,
 *     chainId: ChainID.HmyLocal,
 *   },
 * );
 * ```
 *
 * ### Step 2: Select and call functions
 * Here are some examples:
 *
 * ```javascript
 * // numberToString
 * const num = 123;
 * const str = hmy.utils.numberToString(num)
 * console.log(str);
 *
 * // add0xToString
 * const str = '12345';
 * const expected = hmy.utils.add0xToString(str)
 * console.log(expected);
 *
 * // fromWei
 * const Wei = new BN('1000000000000000000');
 * const expected = hmy.utils.fromWei(Wei, hmy.utils.Units.one);
 * console.log(expected);
 *
 * // toWei
 * const one = new BN('1');
 * const expected = hmy.utils.toWei(one, hmy.utils.Units.one);
 * const num = hmy.utils.numToStr(expected);
 * console.log(num);
 * ```
 *
 * ### Step 3: Using unit class to convet the token unit
 * ```javascript
 * // convert one to Gwei
 * const one = new hmy.utils.Unit('1').asOne();
 * const oneToGwei = one.toGwei();
 * console.log(oneToGwei);
 * ```
 *
 * ## Some Important consts and Enums
 * ### Chain Type
 * ```javascript
 * Harmony = 'hmy',
 * Ethereum = 'eth',
 * ```
 *
 * ### Chain ID
 * ```javascript
 * Default = 0,
  EthMainnet = 1,
  Morden = 2,
  Ropsten = 3,
  Rinkeby = 4,
  RootstockMainnet = 30,
  RootstockTestnet = 31,
  Kovan = 42,
  EtcMainnet = 61,
  EtcTestnet = 62,
  Geth = 1337,
  Ganache = 0,
  HmyMainnet = 1,
  HmyTestnet = 2,
  HmyLocal = 2,
  HmyPangaea = 3,
 * ```
 *
 * ### Default Config
 * ```javascript
 * export const defaultConfig = {
 *   Default: {
 *     Chain_ID: ChainID.HmyLocal,
 *     Chain_Type: ChainType.Harmony,
 *     Chain_URL: 'http://localhost:9500',
 *     Network_ID: 'Local',
 * },
 *   DefaultWS: {
 *     Chain_ID: ChainID.HmyLocal,
 *     Chain_Type: ChainType.Harmony,
 *     Chain_URL: 'ws://localhost:9800',
 *     Network_ID: 'LocalWS',
 *   },
 * };
 * ```
 *
 * ### Unit Map
 * ```
 * [Units.wei, '1'], // 1 wei
 * [Units.Kwei, '1000'], // 1e3 wei
 * [Units.Mwei, '1000000'], // 1e6 wei
 * [Units.Gwei, '1000000000'], // 1e9 wei
 * [Units.szabo, '1000000000000'], // 1e12 wei
 * [Units.finney, '1000000000000000'], // 1e15 wei
 * [Units.ether, '1000000000000000000'], // 1e18 wei
 * [Units.one, '1000000000000000000'], // 1e18 wei
 * [Units.Kether, '1000000000000000000000'], // 1e21 wei
 * [Units.Mether, '1000000000000000000000000'], // 1e24 wei
 * [Units.Gether, '1000000000000000000000000000'], // 1e27 wei
 * [Units.Tether, '1000000000000000000000000000000'], // 1e30 wei
 * ```
 *
 * @packageDocumentation
 * @module harmony-utils
 */

export enum ChainType {
  Harmony = 'hmy',
  Ethereum = 'eth',
}

export enum ChainID {
  Default = 0,
  EthMainnet = 1,
  Morden = 2,
  Ropsten = 3,
  Rinkeby = 4,
  RootstockMainnet = 30,
  RootstockTestnet = 31,
  Kovan = 42,
  EtcMainnet = 61,
  EtcTestnet = 62,
  Geth = 1337,
  Ganache = 0,
  HmyMainnet = 1,
  HmyTestnet = 2,
  HmyLocal = 2,
  HmyPangaea = 3,
}

/** @hidden */
export const defaultConfig = {
  Default: {
    Chain_ID: ChainID.HmyLocal,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'http://localhost:9500',
    Network_ID: 'Local',
  },
  DefaultWS: {
    Chain_ID: ChainID.HmyLocal,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'ws://localhost:9800',
    Network_ID: 'LocalWS',
  },
};

/** @hidden */
export abstract class HarmonyCore {
  chainType: ChainType;
  chainId: ChainID;
  constructor(chainType: ChainType, chainId: ChainID = defaultConfig.Default.Chain_ID) {
    this.chainType = chainType;
    this.chainId = chainId;
  }
  get chainPrefix(): string {
    switch (this.chainType) {
      case ChainType.Ethereum: {
        return 'eth';
      }
      case ChainType.Harmony: {
        return 'hmy';
      }
      default: {
        return 'hmy';
      }
    }
  }
  get getChainId(): ChainID {
    return this.chainId;
  }
  public setChainId(chainId: ChainID) {
    this.chainId = chainId;
  }
  public setChainType(chainType: ChainType) {
    this.chainType = chainType;
  }
}

/** @hidden */
export const HDPath = `m/44'/1023'/0'/0/`;

/** @hidden */
export const AddressSuffix = '-';
