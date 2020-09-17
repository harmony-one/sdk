/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { isArray } from '@harmony-js/utils';
import { AbiItem } from '../models/AbiItemModel';
import { AbiModel } from '../models/AbiModel';
import { AbiItemModel } from '../models/types';
import { jsonInterfaceMethodToString } from '../abi/utils';
import { AbiCoderClass } from '../abi/api';

export const abiMapper = (abi: any[], abiCoder: AbiCoderClass): AbiModel => {
  const mappedAbiItems: any = {
    methods: {},
    events: {},
    fallback: undefined,
    receive: undefined,
  };
  let hasConstructor = false;

  abi.forEach((abiItem: AbiItemModel) => {
    abiItem.constant = isConstant(abiItem);
    abiItem.payable = isPayable(abiItem);

    if (abiItem.name) {
      abiItem.funcName = jsonInterfaceMethodToString(abiItem);
    }

    let abiItemModel;

    if (abiItem.type === 'function') {
      abiItem.signature = abiCoder.encodeFunctionSignature(abiItem.funcName);

      abiItemModel = new AbiItem(abiItem);

      // Check if an method already exists with this name and if it exists than create an array and push this abiItem
      // into it. This will be used if there are methods with the same name but with different arguments.
      if (!mappedAbiItems.methods[abiItem.name]) {
        mappedAbiItems.methods[abiItem.name] = abiItemModel;
      } else {
        if (isArray(mappedAbiItems.methods[abiItem.name])) {
          mappedAbiItems.methods[abiItem.name].push(abiItemModel);
        } else {
          mappedAbiItems.methods[abiItem.name] = [
            mappedAbiItems.methods[abiItem.name],
            abiItemModel,
          ];
        }
      }

      mappedAbiItems.methods[abiItem.signature] = abiItemModel;
      mappedAbiItems.methods[abiItem.funcName] = abiItemModel;

      return;
    }

    if (abiItem.type === 'event') {
      abiItem.signature = abiCoder.encodeEventSignature(abiItem.funcName);

      abiItemModel = new AbiItem(abiItem);

      if (
        !mappedAbiItems.events[abiItem.name] ||
        mappedAbiItems.events[abiItem.name].name === 'bound '
      ) {
        mappedAbiItems.events[abiItem.name] = abiItemModel;
      }

      mappedAbiItems.events[abiItem.signature] = abiItemModel;
      mappedAbiItems.events[abiItem.funcName] = abiItemModel;
    }

    if (abiItem.type === 'fallback' || abiItem.type === 'receive') {
      abiItem.signature = abiItem.type;
      mappedAbiItems[abiItem.type] = new AbiItem(abiItem);
    }

    if (abiItem.type === 'constructor') {
      abiItem.signature = abiItem.type;
      // tslint:disable-next-line: no-string-literal
      mappedAbiItems.methods['contractConstructor'] = new AbiItem(abiItem);

      hasConstructor = true;
    }
  });
  if (!hasConstructor) {
    // tslint:disable-next-line: no-string-literal
    mappedAbiItems.methods['contractConstructor'] = new AbiItem({
      inputs: [],
      payable: false,
      constant: false,
      type: 'constructor',
    });
  }
  return new AbiModel(mappedAbiItems);
};

export const isConstant = (abiItem: AbiItemModel) => {
  return (
    abiItem.stateMutability === 'view' || abiItem.stateMutability === 'pure' || abiItem.constant
  );
};

export const isPayable = (abiItem: AbiItemModel) => {
  return abiItem.stateMutability === 'payable' || abiItem.payable;
};
