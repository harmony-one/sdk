/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { isArray } from '@harmony-js/utils';
import { AbiCoderClass } from '../abi/api';
import { AbiModel, AbiItemModel } from '../models/types';
import { Contract } from '../contract';
import { EventMethod } from './event';
import { inputBlockNumberFormatter } from '../utils/formatter';
import { eventFilterEncoder } from '../utils/encoder';

export class EventFactory {
  contract: Contract;
  abiModel: any | AbiModel;
  abiCoder: AbiCoderClass;
  private eventKeys: string[];

  // constructor
  constructor(contract: Contract) {
    this.contract = contract;
    this.abiModel = this.contract.abiModel;
    this.abiCoder = this.contract.abiCoder;
    this.eventKeys = this.mapEventKeys();
  }

  addEventsToContract() {
    this.eventKeys.forEach((key: string) => {
      const newObject: any = {};
      newObject[key] = (params: any) =>
        new EventMethod(
          key,
          // params,
          this.map(this.abiModel.getEvent(key), this.contract, params),
          this.abiModel.getEvent(key),
          this.contract,
        );
      Object.assign(this.contract.events, newObject);
    });
    return this.contract;
  }
  /**
   * @function mapMethodKeys
   * @return {string[]} {description}
   */
  private mapEventKeys(): string[] {
    return Object.keys(this.abiModel.abi.events);
  }

  private map(abiItemModel: AbiItemModel, contract: Contract, options: any) {
    if (!options) {
      options = {};
    }

    if (!isArray(options.topics)) {
      options.topics = [];
    }

    if (typeof options.fromBlock !== 'undefined') {
      options.fromBlock = inputBlockNumberFormatter(options.fromBlock);
    }
    // else if (contract.defaultBlock !== null) {
    //   options.fromBlock = contract.defaultBlock;
    // }

    if (typeof options.toBlock !== 'undefined') {
      options.toBlock = inputBlockNumberFormatter(options.toBlock);
    }

    if (typeof options.filter !== 'undefined') {
      options.topics = options.topics.concat(
        eventFilterEncoder(this.abiCoder, abiItemModel, options.filter),
      );
      delete options.filter;
    }

    if (!abiItemModel.anonymous) {
      options.topics.unshift(abiItemModel.signature);
    }

    if (!options.address) {
      options.address = contract.address;
    }

    return options;
  }
}
