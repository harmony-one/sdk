/**
 * @packageDocumentation
 * @module harmony-utils
 */

import {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isJsonString,
  isHex,
  isObject,
  isFunction,
  isPublicKey,
  isPrivateKey,
  isAddress,
  isBech32Address,
  isBech32TestNetAddress,
  isValidAddress,
  isHash,
  isBlockNumber,
} from './validators';

/** @hidden */
export enum AssertType {
  required = 'required',
  optional = 'optional',
}

/** @hidden */
export const validatorArray: any = {
  isNumber: [isNumber],
  isString: [isString],
  isBoolean: [isBoolean],
  isArray: [isArray],
  isJsonString: [isJsonString],
  isObject: [isObject],
  isFunction: [isFunction],
  isHex: [isHex],
  isPublicKey: [isPublicKey],
  isPrivateKey: [isPrivateKey],
  isAddress: [isAddress],
  isHash: [isHash],
  isBlockNumber: [isBlockNumber],
  isBech32Address: [isBech32Address],
  isBech32TestNetAddress: [isBech32TestNetAddress],
  isValidAddress: [isValidAddress],
};

export function validateArgs(args: any, requiredArgs: any, optionalArgs: any): boolean {
  for (const key in requiredArgs) {
    if (args[key] !== undefined) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < requiredArgs[key].length; i += 1) {
        if (typeof requiredArgs[key][i] !== 'function') {
          throw new Error('Validator is not a function');
        }

        if (!requiredArgs[key][i](args[key])) {
          throw new Error(
            `Validation failed for ${key},should be validated by ${requiredArgs[key][i].validator}`,
          );
        }
      }
    } else {
      throw new Error(`Key not found: ${key}`);
    }
  }

  for (const key in optionalArgs) {
    if (args[key]) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < optionalArgs[key].length; i += 1) {
        if (typeof optionalArgs[key][i] !== 'function') {
          throw new Error('Validator is not a function');
        }

        if (!optionalArgs[key][i](args[key])) {
          throw new Error(
            `Validation failed for ${key},should be validated by ${optionalArgs[key][i].validator}`,
          );
        }
      }
    }
  }
  return true;
}

export function generateValidateObjects(validatorObject: { [x: string]: any[] }) {
  const requiredArgs: any = {};
  const optionalArgs: any = {};
  for (const index in validatorObject) {
    if (index !== undefined) {
      const newObjectKey = index;
      const newObjectValid = validatorObject[index][0];
      const isRequired = validatorObject[index][1];
      if (isRequired === AssertType.required) {
        requiredArgs[newObjectKey] = validatorArray[newObjectValid];
      } else {
        optionalArgs[newObjectKey] = validatorArray[newObjectValid];
      }
    }
  }
  return { requiredArgs, optionalArgs };
}

const assertObject = (input: any) => (target: any, key: any, descriptor: PropertyDescriptor) => {
  const { requiredArgs, optionalArgs } = generateValidateObjects(input);
  const original = descriptor.value;
  function interceptor(this: any, ...args: any[]) {
    validateArgs(args[0], requiredArgs, optionalArgs);
    return original.apply(this, args);
  }
  descriptor.value = interceptor;
  return descriptor;
};

export { assertObject };
