/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { isArray } from '@harmony-js/utils';
import { AbiItemModel, AbiOutput, AbiInput } from './types';

export class AbiItem {
  abiItem: AbiItemModel;
  signature: string;
  name: string;
  payable: boolean;
  anonymous: boolean;
  type?: string;
  inputs?: AbiInput[];
  outputs?: AbiOutput[];
  contractMethodParameters: any[];

  // constructor
  constructor(abiItem: AbiItemModel | any) {
    this.abiItem = abiItem;
    this.signature = this.abiItem.signature;
    this.name = this.abiItem.name;
    this.payable = this.abiItem.payable;
    this.anonymous = this.abiItem.anonymous;
    this.type = this.abiItem.type;
    this.inputs = this.abiItem.inputs;
    this.outputs = this.abiItem.outputs;
    this.contractMethodParameters = [];
  }

  getInputLength() {
    if (isArray(this.abiItem.inputs)) {
      return this.abiItem.inputs.length;
    }

    return 0;
  }

  getInputs() {
    if (isArray(this.abiItem.inputs)) {
      return this.abiItem.inputs;
    }

    return [];
  }

  getOutputs() {
    if (isArray(this.abiItem.outputs)) {
      return this.abiItem.outputs;
    }

    return [];
  }

  getIndexedInputs() {
    return this.getInputs().filter((input) => {
      return input.indexed === true;
    });
  }

  isOfType(type: string) {
    return this.abiItem.type === type;
  }
}
