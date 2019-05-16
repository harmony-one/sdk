import { AbiItemModel } from '../models/types';
import { AbiCoderClass } from '../abi/api';

export const methodEncoder = (
  abiCoder: AbiCoderClass,
  abiItemModel: AbiItemModel,
  deployData: string,
) => {
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
