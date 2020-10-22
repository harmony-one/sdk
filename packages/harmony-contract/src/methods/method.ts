/**
 * @packageDocumentation
 * @module harmony-contract
 */

import { Wallet } from '@harmony-js/account';
import { TransactionFactory, Transaction, TxStatus } from '@harmony-js/transaction';
import { RPCMethod, getResultForData, Emitter } from '@harmony-js/network';
import { hexToBN, Unit } from '@harmony-js/utils';
import { getAddress } from '@harmony-js/crypto';
import { AbiItemModel } from '../models/types';
import { Contract } from '../contract';
import { methodEncoder } from '../utils/encoder';
import { ContractStatus } from '../utils/status';

export class ContractMethod {
  contract: Contract;
  params: any;
  methodKey: string;
  wallet: Wallet | any;
  abiItem: AbiItemModel;
  callResponse?: any;
  callPayload?: any;

  protected transaction: Transaction;
  constructor(methodKey: string, params: any, abiItem: AbiItemModel, contract: Contract) {
    this.methodKey = methodKey;
    this.contract = contract;
    this.wallet = contract.wallet;
    this.params = params;
    this.abiItem = abiItem;
    this.transaction = this.createTransaction();
    this.callPayload = undefined;
    this.callResponse = undefined;
  }
  send(params: any): Emitter {
    if (params && !params.gasLimit) {
      params.gasLimit = params.gas;
    }
    try {
      let gasLimit: any = params.gasLimit; // change by estimateGas
      const signTxs = () => {
        this.transaction = this.transaction.map((tx: any) => {
          return { ...tx, ...params, gasLimit };
        });

        const waitConfirm: boolean = params && params.waitConfirm === false ? false : true;
        const updateNonce: boolean = params && params.nonce !== undefined ? false : true;
        this.signTransaction(updateNonce)
          .then((signed) => {
            this.sendTransaction(signed).then((sent) => {
              const [txn, id] = sent;
              this.transaction = txn;
              this.contract.transaction = this.transaction;
              if (this.transaction.isRejected()) {
                this.transaction.emitter.reject(id); // in this case, id is error message
              } else if (waitConfirm) {
                this.confirm(id).then(() => {
                  this.transaction.emitter.resolve(this.contract);
                });
              } else {
                this.transaction.emitter.resolve(this.contract);
              }
            });
          })
          .catch((error) => {
            this.transaction.emitter.reject(error);
          });
      };

      if (gasLimit === undefined) {
        this.estimateGas(params).then((gas) => {
          gasLimit = hexToBN(gas);
          signTxs();
        });
      } else {
        signTxs();
      }
      return this.transaction.emitter;
    } catch (error) {
      throw error;
    }
  }
  async call(options: any, blockNumber: any = 'latest') {
    if (options && !options.gasLimit) {
      options.gasLimit = options.gas;
    }
    try {
      const shardID =
        options !== undefined && options.shardID !== undefined
          ? options.shardID
          : this.contract.shardID;

      this.transaction = this.transaction.map((tx: any) => {
        return {
          ...tx,
          ...options,
          nonce: 0,
        };
      });
      const keys: string[] = Object.keys(this.transaction.txPayload);

      interface TxPayload {
        [key: string]: any;
        from?: string;
        to?: string;
        shardID?: string;
        gas?: string;
        gasPrice?: string;
        value?: string;
        data?: string;
        nonce?: string;
      }
      interface SendPayload {
        [key: string]: any;
        from?: string;
        to?: string;
        shardID?: string;
        gas?: string;
        gasPrice?: string;
        value?: string;
        data?: string;
        nonce?: string;
      }

      const txPayload: TxPayload = this.transaction.txPayload;
      const sendPayload: SendPayload = {};

      for (const key of keys) {
        // tslint:disable-next-line: no-unused-expression
        if (txPayload[key] !== '0x') {
          sendPayload[key] = txPayload[key];
        }
      }

      const result =
        // tslint:disable-line
        await (<Wallet>this.wallet).messenger.send(
          RPCMethod.Call,
          [sendPayload, blockNumber],
          // tslint:disable-line
          (<Wallet>this.wallet).messenger.chainPrefix,
          shardID,
        );
      this.callPayload = sendPayload;
      this.callResponse = result;
      if (result.isError()) {
        throw result.message;
      } else if (result.isResult()) {
        if (result.result === null) {
          return this.afterCall(undefined);
        } else {
          return this.afterCall(result.result);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async estimateGas(options: any) {
    try {
      interface Payload {
        [key: string]: any;
      }

      const estPayload: Payload = {};
      const txPayload: Payload = this.transaction.txPayload;
      const keys: string[] = ['from', 'to', 'gasPrice', 'value', 'data'];
      for (const key of keys) {
        if (options && options[key]) {
          estPayload[key] = options[key];
        } else if (txPayload[key] !== '0x') {
          estPayload[key] = txPayload[key];
        }
      }

      if (this.abiItem.isOfType('constructor')) {
        delete estPayload.to;
      }
      const result = getResultForData(
        // tslint:disable-line
        await (<Wallet>this.wallet).messenger.send(RPCMethod.EstimateGas, [estPayload]),
      );

      if (result.responseType === 'error') {
        throw result.message;
      } else if (result.responseType === 'raw') {
        throw new Error('Get estimateGas fail');
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  encodeABI() {
    return methodEncoder(this.contract.abiCoder, this.abiItem, this.contract.data);
  }

  public debug() {
    return {
      callResponse: this.callResponse,
      callPayload: this.callPayload,
    };
  }

  protected async signTransaction(updateNonce: boolean) {
    try {
      let signed;
      signed = this.wallet.signer
        ? await this.wallet.signTransaction(
            this.transaction,
            this.wallet.signer,
            undefined,
            updateNonce,
            'rlp',
            'latest', // 'pending',
          )
        : await this.wallet.signTransaction(
            this.transaction,
            updateNonce,
            'rlp',
            'latest', // 'pending',
          );
      if (this.abiItem.isOfType('constructor')) {
        this.contract.address = TransactionFactory.getContractAddress(signed);
      }
      this.contract.setStatus(ContractStatus.SIGNED);
      return signed;
    } catch (error) {
      throw error;
    }
  }
  protected async sendTransaction(signed: Transaction) {
    try {
      const result = await signed.sendTransaction();
      this.contract.setStatus(ContractStatus.SENT);
      return result;
    } catch (error) {
      throw error;
    }
  }
  protected async confirm(id: string) {
    try {
      const result = await this.transaction.confirm(
        id,
        20,
        1000,
        this.transaction ? this.transaction.txParams.shardID : this.contract.shardID,
      );

      if (result.receipt && result.txStatus === TxStatus.CONFIRMED) {
        if (this.abiItem.isOfType('constructor')) {
          this.contract.setStatus(ContractStatus.DEPLOYED);
        } else {
          this.contract.setStatus(ContractStatus.CALLED);
        }
      } else {
        this.contract.setStatus(ContractStatus.REJECTED);
      }
    } catch (error) {
      throw error;
    }
  }

  protected createTransaction() {
    if (this.wallet.messenger) {
      if (this.abiItem.isOfType('constructor')) {
        // tslint:disable-next-line: no-string-literal
        this.contract.data = this.params[0]['data'] || '0x';

        this.abiItem.contractMethodParameters =
          // tslint:disable-next-line: no-string-literal
          this.params[0]['arguments'] || [];
      } else {
        this.abiItem.contractMethodParameters = this.params || [];
      }
      const defaultOptions = {
        gasLimit: new Unit(21000000).asWei().toWei(),
        gasPrice: new Unit(1).asGwei().toWei(),
      };
      const txObject = {
        ...defaultOptions,
        ...this.contract.options,
        ...this.params[0],
        to: this.abiItem.isOfType('constructor')
          ? '0x'
          : getAddress(this.contract.address).checksum,
        data: this.encodeABI(),
      };
      // tslint:disable-line
      const result = new TransactionFactory((<Wallet>this.wallet).messenger).newTx(txObject);

      return result;
    } else {
      throw new Error('Messenger is not found');
    }
  }

  protected afterCall(response: any) {
    // length of `0x${methodSig}` is 2+4*2=10
    if (response.length % 32 === 10 && response.startsWith(this.contract.errorFuncSig)) {
      const errmsg = this.contract.abiCoder.decodeParameters(
        [{ type: 'string' }],
        '0x' + response.slice(10),
      );
      throw { revert: errmsg[0] };
    }

    if (
      this.abiItem.isOfType('constructor') ||
      this.abiItem.isOfType('fallback') ||
      this.abiItem.isOfType('receive')
    ) {
      return response;
    }

    const outputs = this.abiItem.getOutputs();
    if (outputs.length === 0) {
      // if outputs is empty, we can't know the call is revert or not
      return response;
    }
    if (!response || response === '0x') {
      // if outputs isn't empty, treat it as revert
      throw { revert: response };
    }
    if (outputs.length > 1) {
      return this.contract.abiCoder.decodeParameters(outputs, response);
    }
    return this.contract.abiCoder.decodeParameter(outputs[0], response);
    // return outputs;
  }
}
