/**
 * @packageDocumentation
 * @module harmony-contract
 *
 */

import { Wallet } from '@harmony-js/account';
import { Messenger } from '@harmony-js/network';
import { Transaction } from '@harmony-js/transaction';
import { AbiCoder } from './abi/index';
import { abiMapper } from './utils/mapper';
import { ContractOptions } from './utils/options';
import { AbiModel } from './models/types';
import { AbiCoderClass } from './abi/api';
import { MethodFactory } from './methods/methodFactory';
import { EventFactory } from './events/eventFactory';
import { ContractStatus } from './utils/status';

// class Contract
export class Contract {
  methods: any;
  events: any;
  fallback: any = undefined;
  receive: any = undefined;
  abi: any = [];
  abiModel: any | AbiModel;
  abiCoder: AbiCoderClass;
  options: ContractOptions | any;
  wallet: Wallet | any;
  transaction?: Transaction;
  status: ContractStatus;
  shardID: number;
  errorFunc: string = 'Error(string)';
  errorFuncSig: string;

  constructor(
    abi: any = [],
    address: string = '0x',
    options: ContractOptions = {},
    wallet: Wallet,
    status: ContractStatus = ContractStatus.INITIALISED,
  ) {
    // super();
    this.abi = abi;
    this.abiCoder = AbiCoder();
    this.abiModel = abiMapper(abi, this.abiCoder);
    this.options = options;
    this.address = this.options.address || address;
    this.shardID = this.options.shardID || wallet.messenger.currentShard;
    this.wallet = wallet;
    this.methods = {};
    this.events = {};
    this.runMethodFactory();
    this.runEventFactory();
    this.status = status;
    this.errorFuncSig = this.abiCoder.encodeFunctionSignature(this.errorFunc);
    // tslint:disable-next-line: no-unused-expression
  }
  isInitialised() {
    return this.status === ContractStatus.INITIALISED;
  }
  isSigned() {
    return this.status === ContractStatus.SIGNED;
  }
  isSent() {
    return this.status === ContractStatus.SENT;
  }
  isDeployed() {
    return this.status === ContractStatus.DEPLOYED;
  }
  isRejected() {
    return this.status === ContractStatus.REJECTED;
  }
  isCalled() {
    return this.status === ContractStatus.CALLED;
  }
  setStatus(status: ContractStatus) {
    this.status = status;
  }

  get jsonInterface(): any[] {
    return this.abiModel;
  }

  set jsonInterface(value: any[]) {
    this.abiModel = abiMapper(value, this.abiCoder);
    this.runMethodFactory();
    this.runEventFactory();
  }

  get address() {
    return this.options.address || this.address;
  }

  set address(value: string) {
    this.options.address = value;
  }

  get data() {
    return this.options.data;
  }

  set data(value) {
    this.options.data = value;
  }

  // deploy
  deploy(options: any) {
    return this.methods.contractConstructor(options);
  }

  runMethodFactory(): Contract {
    return new MethodFactory(this).addMethodsToContract();
  }
  runEventFactory(): Contract {
    return new EventFactory(this).addEventsToContract();
  }
  connect(wallet: Wallet): void {
    this.wallet = wallet;
  }
  setMessegner(messenger: Messenger) {
    if (this.wallet instanceof Wallet) {
      this.wallet.setMessenger(messenger);
    } else {
      this.wallet.messenger = messenger;
    }
  }
}
