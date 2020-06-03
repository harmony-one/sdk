/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { AbiItemModel } from './types';

export class AbiModel {
  abi: any;

  constructor(mappedAbi: any) {
    this.abi = mappedAbi;
  }

  getMethod(name: string): AbiItemModel | false {
    if (this.hasMethod(name)) {
      return this.abi.methods[name];
    }

    return false;
  }

  getMethods(): AbiItemModel[] {
    return this.abi.methods;
  }

  getEvent(name: string): AbiItemModel | false {
    if (this.hasEvent(name)) {
      return this.abi.events[name];
    }

    return false;
  }

  getEvents(): AbiItemModel[] {
    return this.abi.events;
  }

  getEventBySignature(signature: string): AbiItemModel | undefined {
    let event;

    Object.keys(this.abi.events).forEach((key) => {
      if (this.abi.events[key].signature === signature) {
        event = this.abi.events[key];
      }
    });

    return event;
  }

  hasMethod(name: string): boolean {
    return typeof this.abi.methods[name] !== 'undefined';
  }

  hasEvent(name: string): boolean {
    return typeof this.abi.events[name] !== 'undefined';
  }
}
