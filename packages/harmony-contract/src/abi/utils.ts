/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { isObject, isArray } from '@harmony-js/utils';
import { BN } from '@harmony-js/crypto';

export const jsonInterfaceMethodToString = (json: any): string => {
  if (isObject(json) && json.name && json.name.includes('(')) {
    return json.name;
  }

  return `${json.name}(${flattenTypes(false, json.inputs).join(',')})`;
};

export const flattenTypes = (includeTuple: any, puts: any[]) => {
  // console.log("entered _flattenTypes. inputs/outputs: " + puts)
  const types: any[] = [];

  puts.forEach((param: any) => {
    if (typeof param.components === 'object') {
      if (param.type.substring(0, 5) !== 'tuple') {
        throw new Error('components found but type is not tuple; report on GitHub');
      }
      let suffix = '';
      const arrayBracket = param.type.indexOf('[');
      if (arrayBracket >= 0) {
        suffix = param.type.substring(arrayBracket);
      }
      const result = flattenTypes(includeTuple, param.components);
      // console.log("result should have things: " + result)
      if (isArray(result) && includeTuple) {
        // console.log("include tuple word, and its an array. joining...: " + result.types)
        types.push(`tuple(${result.join(',')})${suffix}`);
      } else if (!includeTuple) {
        // console.log("don't include tuple, but its an array. joining...: " + result)
        types.push(`(${result.join(',')})${suffix}`);
      } else {
        // console.log("its a single type within a tuple: " + result.types)
        types.push(`(${result})`);
      }
    } else {
      // console.log("its a type and not directly in a tuple: " + param.type)
      types.push(param.type);
    }
  });

  return types;
};

export function bnToString(result: any): string | any {
  if (BN.isBN(result)) {
    return result.toString();
  } else {
    return result;
  }
}
