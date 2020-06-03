/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { AbiCoder as ABICoder, ParamType, toUtf8Bytes } from './abiCoder';
import { isObject, isArray } from '@harmony-js/utils';
import { keccak256, Arrayish } from '@harmony-js/crypto';
import { jsonInterfaceMethodToString, bnToString } from './utils';

export class AbiCoderClass {
  coder: ABICoder;
  constructor(coder: ABICoder) {
    this.coder = coder;
  }
  encodeFunctionSignature(functionName: any) {
    if (isObject(functionName)) {
      functionName = jsonInterfaceMethodToString(functionName);
    }
    const result = keccak256(toUtf8Bytes(functionName));
    return result.slice(0, 10);
  }
  encodeEventSignature(functionName: any) {
    if (isObject(functionName)) {
      functionName = jsonInterfaceMethodToString(functionName);
    }
    const result = keccak256(toUtf8Bytes(functionName));
    return result;
  }
  encodeParameter(types: string | ParamType, param: any) {
    return this.encodeParameters([types], [param]);
  }
  encodeParameters(types: Array<string | ParamType>, params: any[]) {
    return this.coder.encode(types, params);
  }
  encodeFunctionCall(jsonInterface: any, params: any[]) {
    return (
      this.encodeFunctionSignature(jsonInterface) +
      this.encodeParameters(jsonInterface.inputs, params).replace('0x', '')
    );
  }
  decodeParameter(type: ParamType, bytes: Arrayish) {
    return this.decodeParameters([type], bytes)[0];
  }
  decodeParameters(outputs: ParamType[], bytes: Arrayish) {
    if (isArray(outputs) && outputs.length === 0) {
      throw new Error('Empty outputs array given!');
    }

    if (!bytes || bytes === '0x' || bytes === '0X') {
      throw new Error(`Invalid bytes string given: ${bytes}`);
    }

    const result = this.coder.decode(outputs, bytes);

    const returnValues: any = {};
    let decodedValue;

    if (isArray(result)) {
      if (outputs.length > 1) {
        outputs.forEach((output: any, i) => {
          decodedValue = result[i];

          if (decodedValue === '0x') {
            decodedValue = null;
          }

          returnValues[i] = bnToString(decodedValue);

          if (isObject(output) && output.name) {
            returnValues[output.name] = bnToString(decodedValue);
          }
        });

        return returnValues;
      }

      return bnToString(result);
    }

    if (isObject(outputs[0]) && outputs[0].name) {
      returnValues[outputs[0].name] = bnToString(result);
    }

    returnValues[0] = bnToString(result);

    return returnValues;
  }

  decodeLog(inputs: any, data = '', topics: any) {
    const returnValues: any = {};
    let topicCount = 0;
    let value;
    const nonIndexedInputKeys: any[] = [];
    const nonIndexedInputItems: any[] = [];

    if (!isArray(topics)) {
      topics = [topics];
    }

    inputs.forEach((input: any, i: number) => {
      if (input.indexed) {
        if (input.type === 'string') {
          return;
        }

        value = topics[topicCount];

        if (this.isStaticType(input.type)) {
          value = this.decodeParameter(input.type, topics[topicCount]);
        }

        returnValues[i] = bnToString(value);
        returnValues[input.name] = bnToString(value);
        topicCount++;

        return;
      }

      nonIndexedInputKeys.push(i);
      nonIndexedInputItems.push(input);
    });

    if (data) {
      const values = this.decodeParameters(nonIndexedInputItems, data);

      let decodedValue;
      nonIndexedInputKeys.forEach((itemKey, index) => {
        decodedValue = values[index];

        returnValues[itemKey] = bnToString(decodedValue);
        returnValues[nonIndexedInputItems[index].name] = bnToString(decodedValue);
      });
    }

    return returnValues;
  }
  isStaticType(type: any) {
    if (type === 'bytes') {
      return false;
    }

    if (type === 'string') {
      return false;
    }

    if (type.indexOf('[') && type.slice(type.indexOf('[')).length === 2) {
      return false;
    }

    return true;
  }
}
