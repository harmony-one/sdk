import { AbiCoderClass } from '../abi/api';
import { AbiModel } from '../models/types';
import { Contract } from '../contract';
import { EventMethod } from './event';

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
          params,
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
}
