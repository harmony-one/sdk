/**
 * @packageDocumentation
 * @module harmony-contract
 */

import { Wallet } from '@harmony-js/account';
import { TransactionFactory, Transaction, TxStatus } from '@harmony-js/transaction';
import { RPCMethod, getResultForData, Emitter } from '@harmony-js/network';
import { hexToNumber, hexToBN } from '@harmony-js/utils';
import { getAddress } from '@harmony-js/crypto';
import { AbiItemModel } from '../models/types';
import { Contract } from '../contract';
import { methodEncoder } from '../utils/encoder';
import { ContractStatus } from '../utils/status';

// todo: have to judge if it is contractConstructor

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
    try {
      let gasLimit: any;
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

      // tslint:disable-next-line: prefer-conditional-expression
      if (params !== undefined) {
        gasLimit = params.gas || params.gasLimit;
      }
      if (gasLimit === undefined) {
        this.estimateGas().then((gas) => {
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
    try {
      options = { ...this.contract.options, data: this.transaction.txParams.data, ...options };
      const shardID =
        options !== undefined && options.shardID !== undefined
          ? options.shardID
          : this.contract.shardID;
      const nonce = '0x0';

      let gasLimit: any = '21000000';
      if (options !== undefined && (options.gas || options.gasLimit)) {
        gasLimit = options.gas || options.gasLimit;
      }
      let from: string = this.wallet.signer
        ? this.wallet.signer.address
        : '0x0000000000000000000000000000000000000000';
      if (options && options.from) {
        from = options.from;
      }
      this.transaction = this.transaction.map((tx: any) => {
        return {
          ...tx,
          ...options,
          from: from || tx.from,
          gasPrice: options ? options.gasPrice : tx.gasPrice,
          gasLimit: gasLimit || tx.gasLimit,
          nonce: Number.parseInt(hexToNumber(nonce), 10),
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

  async estimateGas(
    params: {
      from?: string;
      to?: string;
      gas?: string;
      gasPrice?: string;
      value?: string;
      data?: string;
    } = {},
  ) {
    try {
      if (params.from === undefined && this.contract.options.from !== undefined) {
        params.from = this.contract.options.from;
      }
      if (params.to === undefined && this.transaction.txParams.to !== undefined) {
        params.to = this.transaction.txParams.to;
      }
      if (params.data === undefined) {
        params.data = this.transaction.txParams.data;
      }
      if (params.gasPrice === undefined && this.contract.options.gasPrice !== undefined) {
        params.gasPrice = this.contract.options.gasPrice;
      }

      if (this.methodKey === 'contractConstructor') {
        delete params.to;
      }
      const result = getResultForData(
        // tslint:disable-line
        await (<Wallet>this.wallet).messenger.send(RPCMethod.EstimateGas, [params]),
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
      if (this.methodKey === 'contractConstructor') {
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
        if (this.methodKey === 'contractConstructor') {
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
      if (this.methodKey === 'contractConstructor') {
        // tslint:disable-next-line: no-string-literal
        this.contract.data = this.params[0]['data'] || '0x';

        this.abiItem.contractMethodParameters =
          // tslint:disable-next-line: no-string-literal
          this.params[0]['arguments'] || [];
      } else {
        this.abiItem.contractMethodParameters = this.params || [];
      }
      const txObject = {
        ...this.contract.options,
        ...this.params[0],
        to:
          this.methodKey === 'contractConstructor'
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

    if (this.methodKey === 'contractConstructor') {
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
