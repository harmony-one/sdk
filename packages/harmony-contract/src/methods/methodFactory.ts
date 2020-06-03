/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { AbiCoderClass } from '../abi/api';
import { AbiModel } from '../models/types';
import { Contract } from '../contract';
import { ContractMethod } from './method';

export class MethodFactory {
  contract: Contract;
  abiModel: any | AbiModel;
  abiCoder: AbiCoderClass;
  private methodKeys: string[];

  // constructor
  constructor(contract: Contract) {
    this.contract = contract;
    this.abiModel = this.contract.abiModel;
    this.abiCoder = this.contract.abiCoder;
    this.methodKeys = this.mapMethodKeys();
  }

  addMethodsToContract() {
    this.methodKeys.forEach((key: string) => {
      const newObject: any = {};
      newObject[key] = (...params: any[]) =>
        new ContractMethod(key, params, this.abiModel.getMethod(key), this.contract);

      Object.assign(this.contract.methods, newObject);
    });
    return this.contract;
  }
  /**
   * @function mapMethodKeys
   * @return {string[]} {description}
   */
  private mapMethodKeys(): string[] {
    return Object.keys(this.abiModel.abi.methods);
  }
}
