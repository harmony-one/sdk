/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { AbiItemModel } from '../models/types';
import { AbiCoderClass } from '../abi/api';

export const decode = (abiCoder: AbiCoderClass, abiItemModel: AbiItemModel, response: any) => {
  let argumentTopics = response.topics;

  if (!abiItemModel.anonymous) {
    argumentTopics = response.topics.slice(1);
  }

  if (response.data === '0x') {
    response.data = null;
  }

  response.returnValues = abiCoder.decodeLog(
    abiItemModel.getInputs(),
    response.data,
    argumentTopics,
  );
  response.event = abiItemModel.name;
  response.signature = abiItemModel.signature;
  response.raw = {
    data: response.data,
    topics: response.topics,
  };

  if (abiItemModel.anonymous || !response.topics[0]) {
    response.signature = null;
  }

  delete response.data;
  delete response.topics;

  return response;
};
