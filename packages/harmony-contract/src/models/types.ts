/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

// defined by web3.js
// fixed
export interface AbiModel {
  getMethod(name: string): AbiItemModel | false;
  getMethods(): AbiItemModel[];
  hasMethod(name: string): boolean;
  getEvent(name: string): AbiItemModel | false;
  getEvents(): AbiItemModel[];
  getEventBySignature(signature: string): AbiItemModel | undefined;
  hasEvent(name: string): boolean;
}

export interface AbiItemModel {
  name: string;
  signature: string;
  payable: boolean;
  anonymous: boolean;
  inputs: AbiInput[];
  outputs: AbiOutput[];
  type: string;
  stateMutability?: string;
  constant?: boolean;
  funcName: string;
  contractMethodParameters: any[];
  getInputLength(): number;
  getInputs(): AbiInput[];
  getIndexedInputs(): AbiInput[];
  getOutputs(): AbiOutput[];
  isOfType(value: string): boolean;
}

export interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
}

export interface AbiOutput {
  name: string;
  type: string;
  components?: AbiOutput[];
}
