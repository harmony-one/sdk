/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { isArray } from '@harmony-js/utils';
import { AbiItemModel } from '../models/types';
import { AbiCoderClass } from '../abi/api';

export const methodEncoder = (
  abiCoder: AbiCoderClass,
  abiItemModel: AbiItemModel,
  deployData: string,
) => {
  if (abiItemModel.isOfType('receive')) {
    return undefined;
  }
  if (abiItemModel.isOfType('fallback')) {
    return abiItemModel.contractMethodParameters.length
      ? abiItemModel.contractMethodParameters[0]
      : undefined;
  }

  let encodedParameters = abiCoder.encodeParameters(
    abiItemModel.getInputs(),
    abiItemModel.contractMethodParameters,
  );

  if (encodedParameters.startsWith('0x')) {
    encodedParameters = encodedParameters.slice(2);
  }

  if (abiItemModel.isOfType('constructor')) {
    if (!deployData) {
      throw new Error(
        'The contract has no contract data option set. This is necessary to append the constructor parameters.',
      );
    }

    return deployData + encodedParameters;
  }

  if (abiItemModel.isOfType('function')) {
    return abiItemModel.signature + encodedParameters;
  }

  return encodedParameters;
};

export const eventFilterEncoder = (
  abiCoder: AbiCoderClass,
  abiItemModel: AbiItemModel,
  filter: any,
) => {
  const topics: any[] = [];

  abiItemModel.getIndexedInputs().forEach((input) => {
    if (filter[input.name]) {
      let filterItem = filter[input.name];

      if (isArray(filterItem)) {
        filterItem = filterItem.map((item: any) => {
          return abiCoder.encodeParameter(input.type, item);
        });

        topics.push(filterItem);

        return;
      }

      topics.push(abiCoder.encodeParameter(input.type, filterItem));

      return;
    }

    topics.push(null);
  });

  return topics;
};
