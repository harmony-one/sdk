/**
 # @harmony-js/contract

This package provides a collection of apis to create, deploy, and interact with smart contracts. In Harmony, smart contracts all fully EVM compatible and the formats and terminologies match 1-to-1 with EVM smart contracts.

## Installation

```
npm install @harmony-js/contract
```

## Usage

Deploying a contract using `contractConstructor`
```javascript
const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

* const wallet = new Wallet(
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
* const factory = new ContractFactory(wallet);

* const contractJson = require("./Counter.json");
* const contract = factory.createContract(contractJson.abi);

* const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
* let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

* const options3 = { data: contractJson.bytecode }; // contractConstructor needs contract bytecode to deploy

* contract.wallet.addByPrivateKey('1f054c21a0f57ebc402c00e14bd1707ddf45542d4ed9989933dbefc4ea96ca68');

* contract.methods.contractConstructor(options3).estimateGas(options1).then(gas => {
*   options2 = {...options2, gasLimit: hexToNumber(gas)};
*   contract.methods.contractConstructor(options3).send(options2).then(response => {
*     console.log('contract deployed at ' + response.transaction.receipt.contractAddress);
*   });
* });
```
Instead of `contract.methods.contractConstructor`, `contract.deploy` could be used and it will work.

Loading a contract object using the contract json and contract address for interacting with it
```javascript
* const { Harmony } = require("@harmony-js/core");
* const { ChainID, ChainType } = require("@harmony-js/utils");
* const hmy = new Harmony("https://api.s0.b.hmny.io", {
*   chainType: ChainType.Harmony,
*   chainId: ChainID.HmyTestnet,
* });

const contractJson = require("./Counter.json");
const contractAddr = "0x19f64050e6b2d376e52AC426E366c49EEb0724B1";

const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);
console.log(contract.methods);
```

Directly loading contract using `ContractFactory`
```javascript
const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

* const wallet = new Wallet(new Messenger(
*   new HttpProvider('https://api.s0.b.hmny.io'),
*   ChainType.Harmony,
*   ChainID.HmyTestnet,
* ));
const factory = new ContractFactory(wallet);
const contract = factory.createContract(contractJson.abi, contractAddr);
```

Estimate gas for contract methods
```javascript
* const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000

* contract.methods.getCount().estimateGas(options1).then(gas => {
*   console.log('gas required for getCount is ' + hexToNumber(gas));
* });
```

Call contract read-only methods. Harmony uses 1 Gwei gas price and gas limit of 21000 by default. Use the estimate gas api to correctly set the gas limit.
```javascript
* const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
* let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

* contract.methods.getCount().estimateGas(options1).then(gas => {
*   options2 = {...options2, gasLimit: hexToNumber(gas)};
*   contract.methods.getCount().call(options2).then(count => {
*     console.log('counter value: ' + count);
*   });
* });
```

Invoking contract modification methods using `send` api. Need to add a signing account to the contract wallet, otherwise `send` api will not work.
```javascript
* const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
* let options2 = { gasPrice: 1000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

* contract.wallet.addByPrivateKey('1f054c21a0f57ebc402c00e14bd1707ddf45542d4ed9989933dbefc4ea96ca68');

* contract.methods.incrementCounter().estimateGas(options1).then(gas => {
*   options2 = {...options2, gasLimit: hexToNumber(gas)};
*   contract.methods.incrementCounter().send(options2).then(response => {
*     console.log(response.transaction.receipt);
*   });
* });
```

All the above apis can also be asynchronously executed using `async` and `await`.

Subscribing to the contract events requires web socket based messenger.
```javascript
* const { ContractFactory } = require('@harmony-js/contract');
* const { Wallet } = require('@harmony-js/account');
* const { Messenger, WSProvider } = require('@harmony-js/network');
* const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
* const ws = new WSProvider('wss://ws.s0.b.hmny.io');

* const wallet = new Wallet(
*   new Messenger(
*     ws,
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
* const factory = new ContractFactory(wallet);

* const contractJson = require("./Counter.json");
* const contractAddr = '0x8ada52172abda19b9838eb00498a40952be6a019';

* const contract = factory.createContract(contractJson.abi, contractAddr);

* contract.events
*   .IncrementedBy()
*   .on('data', (event) => {
*     console.log(event);
*   })
*   .on('error', console.error);
```
 *
 * @packageDocumentation
 * @module harmony-contract
 */

// this file is mainly ported from `ethers.js`, but done some fixes
// 1. added bytesPadRight support
// 2. ts-lint
// 3. use BN as default Bignumber instance

import {
  BN,
  info,
  throwError,
  INVALID_ARGUMENT,
  arrayify,
  hexlify,
  padZeros,
  concat,
  toChecksumAddress,
  checkArgumentCount,
  checkNormalize,
  Arrayish,
  checkNew,
  bytesPadRight,
} from '@harmony-js/crypto';
import { hexToBN, defineReadOnly } from '@harmony-js/utils';

/** @hidden */
const NegativeOne: BN = new BN(-1);
/** @hidden */
const One: BN = new BN(1);
/** @hidden */
const Zero: BN = new BN(0);
/** @hidden */
const HashZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
/** @hidden */
const MaxUint256: BN = hexToBN(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

/** @hidden */
export type CoerceFunc = (type: string, value: any) => any;

/** @hidden */
export interface ParamType {
  name?: string;
  type: string;
  indexed?: boolean;
  components?: any[];
}

// @TODO: should this just be a combined Fragment?

/** @hidden */
export interface EventFragment {
  type: string;
  name: string;

  anonymous: boolean;

  inputs: ParamType[];
}

/** @hidden */
export interface FunctionFragment {
  type: string;
  name: string;

  constant: boolean;

  inputs: ParamType[];
  outputs: ParamType[];

  payable: boolean;
  stateMutability: string | null;

  gas: BN | null;
}

///////////////////////////////
/** @hidden */
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
/** @hidden */
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
/** @hidden */
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);

/** @hidden */
export const defaultCoerceFunc: CoerceFunc = (type: string, value: any): any => {
  const match = type.match(paramTypeNumber);
  if (match && parseInt(match[2], 10) <= 48) {
    // return value.toNumber();
    return value.toString('hex');
  }
  return value;
};

///////////////////////////////////
// Parsing for Solidity Signatures

///////////////////////////////////
// Parsing for Solidity Signatures

/** @hidden */
const regexParen = new RegExp('^([^)(]*)\\((.*)\\)([^)(]*)$');
/** @hidden */
const regexIdentifier = new RegExp('^[A-Za-z_][A-Za-z0-9_]*$');

/** @hidden */
function verifyType(type: string): string {
  // These need to be transformed to their full description
  if (type.match(/^uint($|[^1-9])/)) {
    type = 'uint256' + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = 'int256' + type.substring(3);
  }

  return type;
}

/** @hidden */
interface ParseState {
  allowArray?: boolean;
  allowName?: boolean;
  allowParams?: boolean;
  allowType?: boolean;
  readArray?: boolean;
}

/** @hidden */
interface ParseNode {
  parent?: any;
  type?: string;
  name?: string;
  state?: ParseState;
  indexed?: boolean;
  components?: any[];
}

/** @hidden */
function parseParam(param: string, allowIndexed?: boolean): ParamType {
  const originalParam = param;
  // tslint:disable-next-line: no-shadowed-variable
  function throwError(i: number) {
    throw new Error(
      'unexpected character "' +
        originalParam[i] +
        '" at position ' +
        i +
        ' in "' +
        originalParam +
        '"',
    );
  }
  param = param.replace(/\s/g, ' ');

  const parent: ParseNode = { type: '', name: '', state: { allowType: true } };
  let node = parent;

  for (let i = 0; i < param.length; i++) {
    const c = param[i];
    switch (c) {
      case '(':
        if (!node.state || !node.state.allowParams) {
          throwError(i);
        }
        if (node.state) {
          node.state.allowType = false;
        }
        if (node.type) {
          node.type = verifyType(node.type);
        }

        node.components = [{ type: '', name: '', parent: node, state: { allowType: true } }];
        node = node.components[0];
        break;

      case ')':
        delete node.state;
        if (allowIndexed && node.name === 'indexed') {
          node.indexed = true;
          node.name = '';
        }
        if (node.type) {
          node.type = verifyType(node.type);
        }

        const child = node;
        node = node.parent;
        if (!node) {
          throwError(i);
        }
        delete child.parent;
        if (node.state) {
          node.state.allowParams = false;
          node.state.allowName = true;
          node.state.allowArray = true;
        }

        break;

      case ',':
        delete node.state;
        if (allowIndexed && node.name === 'indexed') {
          node.indexed = true;
          node.name = '';
        }
        if (node.type) {
          node.type = verifyType(node.type);
        }

        const sibling: ParseNode = {
          type: '',
          name: '',
          parent: node.parent,
          state: { allowType: true },
        };
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;

      // Hit a space...
      case ' ':
        // If reading type, the type is done and may read a param or name
        if (node.state) {
          if (node.state.allowType) {
            if (node.type !== '' && node.type) {
              node.type = verifyType(node.type);
              delete node.state.allowType;
              node.state.allowName = true;
              node.state.allowParams = true;
            }
          }

          // If reading name, the name is done
          if (node.state.allowName) {
            if (node.name !== '') {
              if (allowIndexed && node.name === 'indexed') {
                node.indexed = true;
                node.name = '';
              } else {
                node.state.allowName = false;
              }
            }
          }
        }

        break;

      case '[':
        if (!node.state || !node.state.allowArray) {
          throwError(i);
        }
        if (node.state) {
          node.type += c;
          node.state.allowArray = false;
          node.state.allowName = false;
          node.state.readArray = true;
        }

        break;

      case ']':
        if (!node.state || !node.state.readArray) {
          throwError(i);
        }
        if (node.state) {
          node.type += c;

          node.state.readArray = false;
          node.state.allowArray = true;
          node.state.allowName = true;
        }

        break;

      default:
        if (node.state) {
          if (node.state.allowType) {
            node.type += c;
            node.state.allowParams = true;
            node.state.allowArray = true;
          } else if (node.state.allowName) {
            node.name += c;
            delete node.state.allowArray;
          } else if (node.state.readArray) {
            node.type += c;
          } else {
            throwError(i);
          }
        }
    }
  }

  if (node.parent) {
    throw new Error('unexpected eof');
  }

  delete parent.state;

  if (allowIndexed && node.name === 'indexed') {
    node.indexed = true;
    node.name = '';
  }

  if (parent.type) {
    parent.type = verifyType(parent.type);
  }

  return <ParamType>parent;
}

// @TODO: Better return type
/** @hidden */
function parseSignatureEvent(fragment: string): EventFragment {
  const abi: EventFragment = {
    anonymous: false,
    inputs: [],
    name: '',
    type: 'event',
  };

  const match = fragment.match(regexParen);
  if (!match) {
    throw new Error('invalid event: ' + fragment);
  }

  abi.name = match[1].trim();

  splitNesting(match[2]).forEach((param) => {
    param = parseParam(param, true);
    param.indexed = !!param.indexed;
    abi.inputs.push(param);
  });

  match[3].split(' ').forEach((modifier) => {
    switch (modifier) {
      case 'anonymous':
        abi.anonymous = true;
        break;
      case '':
        break;
      default:
        info('unknown modifier: ' + modifier);
    }
  });

  if (abi.name && !abi.name.match(regexIdentifier)) {
    throw new Error('invalid identifier: "' + abi.name + '"');
  }

  return abi;
}

/** @hidden */
export function parseParamType(type: string): ParamType {
  return parseParam(type, true);
}

// @TODO: Allow a second boolean to expose names
/** @hidden */
export function formatParamType(paramType: ParamType): string {
  return getParamCoder(defaultCoerceFunc, paramType).type;
}

/** @hidden */
function parseSignatureFunction(fragment: string): FunctionFragment {
  const abi: FunctionFragment = {
    constant: false,
    gas: null,
    inputs: [],
    name: '',
    outputs: [],
    payable: false,
    stateMutability: null, // @TODO: Should this be initialized to 'nonpayable'?
    type: 'function',
  };

  let comps = fragment.split('@');
  if (comps.length !== 1) {
    if (comps.length > 2) {
      throw new Error('invalid signature');
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      throw new Error('invalid signature gas');
    }
    abi.gas = new BN(comps[1]);
    fragment = comps[0];
  }

  comps = fragment.split(' returns ');
  const left = comps[0].match(regexParen);
  if (!left) {
    throw new Error('invalid signature');
  }

  abi.name = left[1].trim();
  if (!abi.name.match(regexIdentifier)) {
    throw new Error('invalid identifier: "' + left[1] + '"');
  }

  splitNesting(left[2]).forEach((param) => {
    abi.inputs.push(parseParam(param));
  });

  left[3].split(' ').forEach((modifier) => {
    switch (modifier) {
      case 'constant':
        abi.constant = true;
        break;
      case 'payable':
        abi.payable = true;
        abi.stateMutability = 'payable';
        break;
      case 'pure':
        abi.constant = true;
        abi.stateMutability = 'pure';
        break;
      case 'view':
        abi.constant = true;
        abi.stateMutability = 'view';
        break;
      case 'external':
      case 'public':
      case '':
        break;
      default:
        info('unknown modifier: ' + modifier);
    }
  });

  // We have outputs
  if (comps.length > 1) {
    const right = comps[1].match(regexParen);
    if (right === null || right[1].trim() !== '' || right[3].trim() !== '') {
      throw new Error('unexpected tokens');
    }

    splitNesting(right[2]).forEach((param) => {
      abi.outputs.push(parseParam(param));
    });
  }

  if (abi.name === 'constructor') {
    abi.type = 'constructor';

    if (abi.outputs.length) {
      throw new Error('constructor may not have outputs');
    }

    delete abi.name;
    delete abi.outputs;
  }

  return abi;
}

// @TODO: Allow a second boolean to expose names and modifiers
/** @hidden */
export function formatSignature(fragment: EventFragment | FunctionFragment): string {
  return fragment.name + '(' + fragment.inputs.map((i) => formatParamType(i)).join(',') + ')';
}

/** @hidden */
export function parseSignature(fragment: string): EventFragment | FunctionFragment {
  if (typeof fragment === 'string') {
    // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
    fragment = fragment.replace(/\s/g, ' ');
    fragment = fragment
      .replace(/\(/g, ' (')
      .replace(/\)/g, ') ')
      .replace(/\s+/g, ' ');
    fragment = fragment.trim();

    if (fragment.substring(0, 6) === 'event ') {
      return parseSignatureEvent(fragment.substring(6).trim());
    } else {
      if (fragment.substring(0, 9) === 'function ') {
        fragment = fragment.substring(9);
      }
      return parseSignatureFunction(fragment.trim());
    }
  }

  throw new Error('unknown signature');
}

///////////////////////////////////
// Coders
/** @hidden */
interface DecodedResult {
  consumed: number;
  value: any;
}

/** @hidden */
abstract class Coder {
  readonly coerceFunc: CoerceFunc;
  readonly name: string;
  readonly type: string;
  readonly localName?: string;
  readonly dynamic: boolean;
  constructor(
    coerceFunc: CoerceFunc,
    name: string,
    type: string,
    localName: string | undefined,
    dynamic: boolean,
  ) {
    this.coerceFunc = coerceFunc;
    this.name = name;
    this.type = type;
    this.localName = localName;
    this.dynamic = dynamic;
  }

  abstract encode(value: any): Uint8Array;
  abstract decode(data: Uint8Array, offset: number): DecodedResult;
}

// Clones the functionality of an existing Coder, but without a localName
// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderAnonymous extends Coder {
  private coder: Coder;
  constructor(coder: Coder) {
    super(coder.coerceFunc, coder.name, coder.type, undefined, coder.dynamic);
    this.coder = coder;
  }
  encode(value: any): Uint8Array {
    return this.coder.encode(value);
  }
  decode(data: Uint8Array, offset: number): DecodedResult {
    return this.coder.decode(data, offset);
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderNull extends Coder {
  constructor(coerceFunc: CoerceFunc, localName: string) {
    super(coerceFunc, 'null', '', localName, false);
  }

  encode(value: any): Uint8Array {
    const result = arrayify([]) || new Uint8Array();
    return result;
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    if (offset > data.length) {
      throw new Error('invalid null');
    }
    return {
      consumed: 0,
      value: this.coerceFunc('null', undefined),
    };
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderNumber extends Coder {
  readonly size: number;
  readonly signed: boolean;
  constructor(coerceFunc: CoerceFunc, size: number, signed: boolean, localName: string) {
    const name = (signed ? 'int' : 'uint') + size * 8;
    super(coerceFunc, name, name, localName, false);

    this.size = size;
    this.signed = signed;
  }

  encode(value: BN | number | string): Uint8Array {
    let result;
    try {
      let v: BN;
      if (typeof value == 'string' && value.startsWith('0x')) {
        v = new BN(value.slice(2), 'hex');
      } else {
        v = new BN(value);
      }
      if (this.signed) {
        let bounds = MaxUint256.maskn(this.size * 8 - 1);
        if (v.gt(bounds)) {
          throw new Error('out-of-bounds');
        }
        bounds = bounds.add(One).mul(NegativeOne);
        if (v.lt(bounds)) {
          throw new Error('out-of-bounds');
        }
      } else if (v.lt(Zero) || v.gt(MaxUint256.maskn(this.size * 8))) {
        throw new Error('out-of-bounds');
      }

      v = v.toTwos(this.size * 8).maskn(this.size * 8);
      if (this.signed) {
        v = v.fromTwos(this.size * 8).toTwos(256);
      }
      const vString = v.toString('hex');

      result = padZeros(arrayify(`0x${vString}`) || new Uint8Array(), 32);
    } catch (error) {
      throwError('invalid number value', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: this.name,
        value,
      });
    }
    return result || padZeros(new Uint8Array(), 32);
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    if (data.length < offset + 32) {
      throwError('insufficient data for ' + this.name + ' type', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: this.name,
        value: hexlify(data.slice(offset, offset + 32)),
      });
    }
    const junkLength = 32 - this.size;
    const dataValue = hexlify(data.slice(offset + junkLength, offset + 32));

    let value = hexToBN(dataValue);
    // tslint:disable-next-line: prefer-conditional-expression
    if (this.signed) {
      value = value.fromTwos(this.size * 8);
    } else {
      value = value.maskn(this.size * 8);
    }

    return {
      consumed: 32,
      value: this.coerceFunc(this.name, value),
    };
  }
}

/** @hidden */
const uint256Coder = new CoderNumber(
  (type: string, value: any) => {
    return value;
  },
  32,
  false,
  'none',
);

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderBoolean extends Coder {
  constructor(coerceFunc: CoerceFunc, localName: string) {
    super(coerceFunc, 'bool', 'bool', localName, false);
  }

  encode(value: boolean): Uint8Array {
    return uint256Coder.encode(!!value ? new BN(1) : new BN(0));
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    let result;
    try {
      result = uint256Coder.decode(data, offset);
    } catch (error) {
      if (error.reason === 'insufficient data for uint256 type') {
        throwError('insufficient data for boolean type', INVALID_ARGUMENT, {
          arg: this.localName,
          coderType: 'boolean',
          value: error.value,
        });
      }
      throw error;
    }
    return {
      consumed: result.consumed,
      value: this.coerceFunc('bool', !result.value.isZero()),
    };
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderFixedBytes extends Coder {
  readonly length: number;
  constructor(coerceFunc: CoerceFunc, length: number, localName: string) {
    const name = 'bytes' + length;
    super(coerceFunc, name, name, localName, false);
    this.length = length;
  }

  encode(value: Arrayish): Uint8Array {
    const result = new Uint8Array(this.length);

    try {
      const arrayied = arrayify(value);
      let data = null;
      if (arrayied !== null) {
        const valueToByte = hexlify(arrayied);
        data = arrayify(bytesPadRight(valueToByte, this.length));
      } else {
        throw new Error('cannot arraify data');
      }

      if (data === null || data.length !== this.length) {
        throw new Error('incorrect data length');
      }
      result.set(data);
    } catch (error) {
      throwError('invalid ' + this.name + ' value', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: this.name,
        value: error.value || value,
      });
    }
    return result;
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    if (data.length < offset + 32) {
      throwError('insufficient data for ' + name + ' type', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: this.name,
        value: hexlify(data.slice(offset, offset + 32)),
      });
    }

    return {
      consumed: 32,
      value: this.coerceFunc(this.name, hexlify(data.slice(offset, offset + this.length))),
    };
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderAddress extends Coder {
  constructor(coerceFunc: CoerceFunc, localName: string) {
    super(coerceFunc, 'address', 'address', localName, false);
  }
  encode(value: string): Uint8Array {
    const result = new Uint8Array(32);
    try {
      const addr = arrayify(toChecksumAddress(value)) || new Uint8Array();
      result.set(addr, 12);
    } catch (error) {
      throwError('invalid address', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: 'address',
        value,
      });
    }
    return result;
  }
  decode(data: Uint8Array, offset: number): DecodedResult {
    if (data.length < offset + 32) {
      throwError('insufficuent data for address type', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: 'address',
        value: hexlify(data.slice(offset, offset + 32)),
      });
    }
    return {
      consumed: 32,
      value: this.coerceFunc(
        'address',
        toChecksumAddress(hexlify(data.slice(offset + 12, offset + 32))),
      ),
    };
  }
}

/** @hidden */
function _encodeDynamicBytes(value: Uint8Array): Uint8Array {
  const dataLength = 32 * Math.ceil(value.length / 32);
  const padding = new Uint8Array(dataLength - value.length);

  return concat([uint256Coder.encode(new BN(value.length)), value, padding]);
}

/** @hidden */
function _decodeDynamicBytes(data: Uint8Array, offset: number, localName: string): DecodedResult {
  if (data.length < offset + 32) {
    throwError('insufficient data for dynamicBytes length', INVALID_ARGUMENT, {
      arg: localName,
      coderType: 'dynamicBytes',
      value: hexlify(data.slice(offset, offset + 32)),
    });
  }

  let length = uint256Coder.decode(data, offset).value;

  try {
    length = length.toNumber();
  } catch (error) {
    throwError('dynamic bytes count too large', INVALID_ARGUMENT, {
      arg: localName,
      coderType: 'dynamicBytes',
      value: length.toString(),
    });
  }

  if (data.length < offset + 32 + length) {
    throwError('insufficient data for dynamicBytes type', INVALID_ARGUMENT, {
      arg: localName,
      coderType: 'dynamicBytes',
      value: hexlify(data.slice(offset, offset + 32 + length)),
    });
  }

  return {
    consumed: 32 + 32 * Math.ceil(length / 32),
    value: data.slice(offset + 32, offset + 32 + length),
  };
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderDynamicBytes extends Coder {
  constructor(coerceFunc: CoerceFunc, localName: string) {
    super(coerceFunc, 'bytes', 'bytes', localName, true);
  }
  encode(value: Arrayish): Uint8Array {
    let result = new Uint8Array();
    try {
      result = _encodeDynamicBytes(arrayify(value) || new Uint8Array());
    } catch (error) {
      throwError('invalid bytes value', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: 'bytes',
        value: error.value,
      });
    }
    return result;
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    const result = _decodeDynamicBytes(data, offset, this.localName || '');
    result.value = this.coerceFunc('bytes', hexlify(result.value));
    return result;
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderString extends Coder {
  constructor(coerceFunc: CoerceFunc, localName: string) {
    super(coerceFunc, 'string', 'string', localName, true);
  }

  encode(value: string): Uint8Array {
    if (typeof value !== 'string') {
      throwError('invalid string value', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: 'string',
        value,
      });
    }
    return _encodeDynamicBytes(toUtf8Bytes(value));
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    const result = _decodeDynamicBytes(data, offset, this.localName || '');
    result.value = this.coerceFunc('string', toUtf8String(result.value));
    return result;
  }
}

/** @hidden */
function alignSize(size: number): number {
  return 32 * Math.ceil(size / 32);
}

/** @hidden */
function pack(coders: Coder[], values: any[]): Uint8Array {
  if (Array.isArray(values)) {
    // do nothing
  } else if (values && typeof values === 'object') {
    const arrayValues: any[] = [];
    coders.forEach((coder) => {
      arrayValues.push((<any>values)[coder.localName || '']);
    });
    values = arrayValues;
  } else {
    throwError('invalid tuple value', INVALID_ARGUMENT, {
      coderType: 'tuple',
      value: values,
    });
  }

  if (coders.length !== values.length) {
    throwError('types/value length mismatch', INVALID_ARGUMENT, {
      coderType: 'tuple',
      value: values,
    });
  }

  const parts: Array<{ dynamic: boolean; value: any }> = [];

  coders.forEach((coder, index) => {
    parts.push({ dynamic: coder.dynamic, value: coder.encode(values[index]) });
  });

  let staticSize = 0;
  let dynamicSize = 0;
  parts.forEach((part) => {
    if (part.dynamic) {
      staticSize += 32;
      dynamicSize += alignSize(part.value.length);
    } else {
      staticSize += alignSize(part.value.length);
      // todo : is it to be static size not alignSize?
    }
  });

  let offset = 0;
  let dynamicOffset = staticSize;
  const data = new Uint8Array(staticSize + dynamicSize);

  parts.forEach((part) => {
    if (part.dynamic) {
      // uint256Coder.encode(dynamicOffset).copy(data, offset);
      data.set(uint256Coder.encode(new BN(dynamicOffset)), offset);
      offset += 32;

      // part.value.copy(data, dynamicOffset);  @TODO
      data.set(part.value, dynamicOffset);
      dynamicOffset += alignSize(part.value.length);
    } else {
      // part.value.copy(data, offset);  @TODO
      data.set(part.value, offset);
      offset += alignSize(part.value.length);
    }
  });

  return data;
}

/** @hidden */
function unpack(coders: Coder[], data: Uint8Array, offset: number): DecodedResult {
  const baseOffset = offset;
  let consumed = 0;
  const value: any = [];
  coders.forEach((coder) => {
    let result: DecodedResult;
    if (coder.dynamic) {
      const dynamicOffset = uint256Coder.decode(data, offset);
      result = coder.decode(data, baseOffset + dynamicOffset.value.toNumber());
      // The dynamic part is leap-frogged somewhere else; doesn't count towards size
      result.consumed = dynamicOffset.consumed;
    } else {
      result = coder.decode(data, offset);
    }

    if (result.value !== undefined) {
      value.push(result.value);
    }

    offset += result.consumed;
    consumed += result.consumed;
  });

  coders.forEach((coder: Coder, index: number) => {
    let name: string | undefined = coder.localName;
    if (!name) {
      return;
    }

    if (name === 'length') {
      name = '_length';
    }

    if (value[name] != null) {
      return;
    }

    value[name] = value[index];
  });

  return {
    value,
    consumed,
  };
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderArray extends Coder {
  readonly coder: Coder;
  readonly length: number;
  constructor(coerceFunc: CoerceFunc, coder: Coder, length: number, localName: string) {
    const type = coder.type + '[' + (length >= 0 ? length : '') + ']';
    const dynamic = length === -1 || coder.dynamic;
    super(coerceFunc, 'array', type, localName, dynamic);

    this.coder = coder;
    this.length = length;
  }

  encode(value: any[]): Uint8Array {
    if (!Array.isArray(value)) {
      throwError('expected array value', INVALID_ARGUMENT, {
        arg: this.localName,
        coderType: 'array',
        value,
      });
    }

    let count = this.length;

    let result = new Uint8Array(0);
    if (count === -1) {
      count = value.length;
      result = uint256Coder.encode(new BN(count));
    }

    checkArgumentCount(
      count,
      value.length,
      ' in coder array' + (this.localName ? ' ' + this.localName : ''),
    );

    const coders = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < value.length; i++) {
      coders.push(this.coder);
    }

    return concat([result, pack(coders, value)]);
  }

  decode(data: Uint8Array, offset: number) {
    // @TODO:
    // if (data.length < offset + length * 32) { throw new Error('invalid array'); }

    let consumed = 0;

    let count = this.length;

    let decodedLength: DecodedResult = { consumed: 0, value: undefined };
    if (count === -1) {
      try {
        decodedLength = uint256Coder.decode(data, offset);
      } catch (error) {
        throwError('insufficient data for dynamic array length', INVALID_ARGUMENT, {
          arg: this.localName,
          coderType: 'array',
          value: error.value,
        });
      }
      try {
        count = decodedLength.value.toNumber();
      } catch (error) {
        throwError('array count too large', INVALID_ARGUMENT, {
          arg: this.localName,
          coderType: 'array',
          value: decodedLength.value.toString(),
        });
      }
      consumed += decodedLength.consumed;
      offset += decodedLength.consumed;
    }

    const coders = [];
    for (let i = 0; i < count; i++) {
      coders.push(new CoderAnonymous(this.coder));
    }

    const result = unpack(coders, data, offset);
    result.consumed += consumed;
    result.value = this.coerceFunc(this.type, result.value);
    return result;
  }
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
class CoderTuple extends Coder {
  readonly coders: Coder[];
  constructor(coerceFunc: CoerceFunc, coders: Coder[], localName: string) {
    let dynamic = false;
    const types: string[] = [];
    coders.forEach((coder) => {
      if (coder.dynamic) {
        dynamic = true;
      }
      types.push(coder.type);
    });
    const type = 'tuple(' + types.join(',') + ')';

    super(coerceFunc, 'tuple', type, localName, dynamic);
    this.coders = coders;
  }

  encode(value: any[]): Uint8Array {
    return pack(this.coders, value);
  }

  decode(data: Uint8Array, offset: number): DecodedResult {
    const result = unpack(this.coders, data, offset);
    result.value = this.coerceFunc(this.type, result.value);

    return result;
  }
}

/** @hidden */
function splitNesting(value: string): any[] {
  value = value.trim();

  const result = [];
  let accum = '';
  let depth = 0;

  // tslint:disable-next-line: prefer-for-of
  for (let offset = 0; offset < value.length; offset++) {
    const c = value[offset];
    if (c === ',' && depth === 0) {
      result.push(accum);
      accum = '';
    } else {
      accum += c;
      if (c === '(') {
        depth++;
      } else if (c === ')') {
        depth--;
        if (depth === -1) {
          throw new Error('unbalanced parenthsis');
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }

  return result;
}

// @TODO: Is there a way to return "class"?
/** @hidden */
const paramTypeSimple: { [key: string]: any } = {
  address: CoderAddress,
  bool: CoderBoolean,
  string: CoderString,
  bytes: CoderDynamicBytes,
};

/** @hidden */
function getTupleParamCoder(
  coerceFunc: CoerceFunc,
  components: any[],
  localName: string,
): CoderTuple {
  if (!components) {
    components = [];
  }
  const coders: Coder[] = [];
  components.forEach((component) => {
    coders.push(getParamCoder(coerceFunc, component));
  });

  return new CoderTuple(coerceFunc, coders, localName);
}

/** @hidden */
function getParamCoder(coerceFunc: CoerceFunc, param: ParamType | any): any {
  const coder = paramTypeSimple[param.type];
  if (coder) {
    return new coder(coerceFunc, param.name);
  }
  const matcher = param.type.match(paramTypeNumber);
  if (matcher) {
    const size = parseInt(matcher[2] || '256', 10);
    if (size === 0 || size > 256 || size % 8 !== 0) {
      throwError('invalid ' + matcher[1] + ' bit length', INVALID_ARGUMENT, {
        arg: 'param',
        value: param,
      });
    }
    return new CoderNumber(coerceFunc, size / 8, matcher[1] === 'int', param.name || '');
  }

  const matcher2 = param.type.match(paramTypeBytes);
  if (matcher2) {
    const size = parseInt(matcher2[1], 10);
    if (size === 0 || size > 32) {
      throwError('invalid bytes length', INVALID_ARGUMENT, {
        arg: 'param',
        value: param,
      });
    }
    return new CoderFixedBytes(coerceFunc, size, param.name || '');
  }

  const matcher3 = param.type.match(paramTypeArray);
  if (matcher3) {
    const size = parseInt(matcher3[2] || '-1', 10);
    param = shallowCopy(param);
    param.type = matcher3[1];
    param = deepCopy(param);
    return new CoderArray(coerceFunc, getParamCoder(coerceFunc, param), size, param.name || '');
  }

  if (param.type.substring(0, 5) === 'tuple') {
    return getTupleParamCoder(coerceFunc, param.components || [], param.name || '');
  }

  if (param.type === '') {
    return new CoderNull(coerceFunc, param.name || '');
  }

  throwError('invalid type', INVALID_ARGUMENT, {
    arg: 'type',
    value: param.type,
  });
}

/** @hidden */
export enum UnicodeNormalizationForm {
  current = '',
  NFC = 'NFC',
  NFD = 'NFD',
  NFKC = 'NFKC',
  NFKD = 'NFKD',
}

/** @hidden */
export function toUtf8Bytes(
  str: string,
  form: UnicodeNormalizationForm = UnicodeNormalizationForm.current,
): Uint8Array {
  if (form !== UnicodeNormalizationForm.current) {
    checkNormalize();
    str = str.normalize(form);
  }

  const result = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c < 0x80) {
      result.push(c);
    } else if (c < 0x800) {
      result.push((c >> 6) | 0xc0);
      result.push((c & 0x3f) | 0x80);
    } else if ((c & 0xfc00) === 0xd800) {
      i++;
      const c2 = str.charCodeAt(i);

      if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
        throw new Error('invalid utf-8 string');
      }

      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
      result.push((c >> 18) | 0xf0);
      result.push(((c >> 12) & 0x3f) | 0x80);
      result.push(((c >> 6) & 0x3f) | 0x80);
      result.push((c & 0x3f) | 0x80);
    } else {
      result.push((c >> 12) | 0xe0);
      result.push(((c >> 6) & 0x3f) | 0x80);
      result.push((c & 0x3f) | 0x80);
    }
  }

  return arrayify(result) || new Uint8Array();
}

// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
/** @hidden */
export function toUtf8String(bytes: Arrayish, ignoreErrors?: boolean): string {
  bytes = arrayify(bytes) || new Uint8Array();

  let result = '';
  let i = 0;

  // Invalid bytes are ignored
  while (i < bytes.length) {
    const c = bytes[i++];
    // 0xxx xxxx
    if (c >> 7 === 0) {
      result += String.fromCharCode(c);
      continue;
    }

    // Multibyte; how many bytes left for this character?
    let extraLength = null;
    let overlongMask = null;

    // 110x xxxx 10xx xxxx
    if ((c & 0xe0) === 0xc0) {
      extraLength = 1;
      overlongMask = 0x7f;

      // 1110 xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf0) === 0xe0) {
      extraLength = 2;
      overlongMask = 0x7ff;

      // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf8) === 0xf0) {
      extraLength = 3;
      overlongMask = 0xffff;
    } else {
      if (!ignoreErrors) {
        if ((c & 0xc0) === 0x80) {
          throw new Error('invalid utf8 byte sequence; unexpected continuation byte');
        }
        throw new Error('invalid utf8 byte sequence; invalid prefix');
      }
      continue;
    }

    // Do we have enough bytes in our data?
    if (i + extraLength > bytes.length) {
      if (!ignoreErrors) {
        throw new Error('invalid utf8 byte sequence; too short');
      }

      // If there is an invalid unprocessed byte, skip continuation bytes
      for (; i < bytes.length; i++) {
        if (bytes[i] >> 6 !== 0x02) {
          break;
        }
      }

      continue;
    }

    // Remove the length prefix from the char
    let res: number | null = c & ((1 << (8 - extraLength - 1)) - 1);

    for (let j = 0; j < extraLength; j++) {
      const nextChar = bytes[i];

      // Invalid continuation byte
      if ((nextChar & 0xc0) !== 0x80) {
        res = null;
        break;
      }

      res = (res << 6) | (nextChar & 0x3f);
      i++;
    }

    if (res === null) {
      if (!ignoreErrors) {
        throw new Error('invalid utf8 byte sequence; invalid continuation byte');
      }
      continue;
    }

    // Check for overlong seuences (more bytes than needed)
    if (res <= overlongMask) {
      if (!ignoreErrors) {
        throw new Error('invalid utf8 byte sequence; overlong');
      }
      continue;
    }

    // Maximum code point
    if (res > 0x10ffff) {
      if (!ignoreErrors) {
        throw new Error('invalid utf8 byte sequence; out-of-range');
      }
      continue;
    }

    // Reserved for UTF-16 surrogate halves
    if (res >= 0xd800 && res <= 0xdfff) {
      if (!ignoreErrors) {
        throw new Error('invalid utf8 byte sequence; utf-16 surrogate');
      }
      continue;
    }

    if (res <= 0xffff) {
      result += String.fromCharCode(res);
      continue;
    }

    res -= 0x10000;
    result += String.fromCharCode(((res >> 10) & 0x3ff) + 0xd800, (res & 0x3ff) + 0xdc00);
  }

  return result;
}

/** @hidden */
export function formatBytes32String(text: string): string {
  // Get the bytes
  const bytes = toUtf8Bytes(text);

  // Check we have room for null-termination
  if (bytes.length > 31) {
    throw new Error('bytes32 string must be less than 32 bytes');
  }

  // Zero-pad (implicitly null-terminates)
  return hexlify(concat([bytes, HashZero]).slice(0, 32));
}

/** @hidden */
export function parseBytes32String(bytes: Arrayish): string {
  const data = arrayify(bytes) || new Uint8Array();

  // Must be 32 bytes with a null-termination
  if (data.length !== 32) {
    throw new Error('invalid bytes32 - not 32 bytes long');
  }
  if (data[31] !== 0) {
    throw new Error('invalid bytes32 sdtring - no null terminator');
  }

  // Find the null termination
  let length = 31;
  while (data[length - 1] === 0) {
    length--;
  }

  // Determine the string value
  return toUtf8String(data.slice(0, length));
}

/** @hidden */
export function isType(object: any, type: string): boolean {
  return object && object._ethersType === type;
}

/** @hidden */
export function shallowCopy(object: any): any {
  const result: any = {};
  // tslint:disable-next-line: forin
  for (const key in object) {
    result[key] = object[key];
  }
  return result;
}

/** @hidden */
const opaque: { [key: string]: boolean } = {
  boolean: true,
  number: true,
  string: true,
};

/** @hidden */
export function deepCopy(object: any, frozen?: boolean): any {
  // Opaque objects are not mutable, so safe to copy by assignment
  if (object === undefined || object === null || opaque[typeof object]) {
    return object;
  }

  // Arrays are mutable, so we need to create a copy
  if (Array.isArray(object)) {
    const result = object.map((item) => deepCopy(item, frozen));
    if (frozen) {
      Object.freeze(result);
    }
    return result;
  }

  if (typeof object === 'object') {
    // Some internal objects, which are already immutable
    if (isType(object, 'BigNumber')) {
      return object;
    }
    if (isType(object, 'Description')) {
      return object;
    }
    if (isType(object, 'Indexed')) {
      return object;
    }

    const result: { [key: string]: any } = {};
    // tslint:disable-next-line: forin
    for (const key in object) {
      const value = object[key];
      if (value === undefined) {
        continue;
      }
      defineReadOnly(result, key, deepCopy(value, frozen));
    }

    if (frozen) {
      Object.freeze(result);
    }

    return result;
  }

  // The function type is also immutable, so safe to copy by assignment
  if (typeof object === 'function') {
    return object;
  }

  throw new Error('Cannot deepCopy ' + typeof object);
}

// tslint:disable-next-line: max-classes-per-file
/** @hidden */
export class AbiCoder {
  coerceFunc: CoerceFunc;
  constructor(coerceFunc?: CoerceFunc) {
    checkNew(this, AbiCoder);

    if (!coerceFunc) {
      coerceFunc = defaultCoerceFunc;
    }
    this.coerceFunc = coerceFunc;
  }

  encode(types: Array<string | ParamType>, values: any[]): string {
    if (types.length !== values.length) {
      throwError('types/values length mismatch', INVALID_ARGUMENT, {
        count: { types: types.length, values: values.length },
        value: { types, values },
      });
    }

    const coders: Coder[] = [];
    types.forEach((type) => {
      // Convert types to type objects
      //   - "uint foo" => { type: "uint", name: "foo" }
      //   - "tuple(uint, uint)" => { type: "tuple", components: [ { type: "uint" }, { type: "uint" }, ] }

      let typeObject: ParamType | null = null;
      // tslint:disable-next-line: prefer-conditional-expression
      if (typeof type === 'string') {
        typeObject = parseParam(type);
      } else {
        typeObject = type;
      }

      coders.push(getParamCoder(this.coerceFunc, typeObject));
    }, this);
    const encodedArray = new CoderTuple(this.coerceFunc, coders, '_').encode(values);
    return hexlify(encodedArray);
  }

  decode(types: Array<string | ParamType>, data: Arrayish): any {
    const coders: Coder[] = [];
    types.forEach((type) => {
      // See encode for details
      let typeObject: ParamType | null = null;
      // tslint:disable-next-line: prefer-conditional-expression
      if (typeof type === 'string') {
        typeObject = parseParam(type);
      } else {
        typeObject = deepCopy(type);
      }

      coders.push(getParamCoder(this.coerceFunc, typeObject));
    }, this);
    const result = new CoderTuple(this.coerceFunc, coders, '_').decode(
      arrayify(data) || new Uint8Array(),
      0,
    ).value;
    return result;
  }
}

/** @hidden */
export const defaultAbiCoder: AbiCoder = new AbiCoder();
