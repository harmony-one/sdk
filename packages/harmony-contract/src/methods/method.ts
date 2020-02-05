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
      this.transaction = this.transaction.map((tx: any) => {
        return { ...tx, ...params };
      });

      const updateNonce: boolean = params.nonce !== undefined ? false : true;

      this.signTransaction(updateNonce).then((signed) => {
        this.sendTransaction(signed).then((sent) => {
          const [txn, id] = sent;
          this.transaction = txn;
          this.contract.transaction = this.transaction;
          this.confirm(id).then(() => {
            this.transaction.emitter.resolve(this.contract);
          });
        });
      });
      return this.transaction.emitter;
    } catch (error) {
      throw error;
    }
  }
  async call(options: any, blockNumber: any = 'latest') {
    try {
      const shardID =
        options !== undefined && options.shardID !== undefined
          ? options.shardID
          : this.contract.shardID;
      const nonce =
        this.wallet.signer || (options !== undefined && options.from)
          ? getResultForData(
              await this.wallet.messenger.send(
                RPCMethod.GetTransactionCount,
                [this.wallet.signer ? this.wallet.signer.address : options.from, blockNumber],
                shardID,
              ),
            )
          : '0x0';

      let gasLimit: any;
      // tslint:disable-next-line: prefer-conditional-expression
      if (options !== undefined) {
        gasLimit = options.gas || options.gasLimit;
      } else {
        gasLimit = hexToBN(await this.estimateGas());
      }
      let from: string;
      // tslint:disable-next-line: prefer-conditional-expression
      if (this.wallet.signer) {
        from = options && options.from ? options.from : this.wallet.signer.address;
      } else {
        from =
          options && options.from ? options.from : '0x0000000000000000000000000000000000000000';
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
  async estimateGas() {
    try {
      const result = getResultForData(
        // tslint:disable-line
        await (<Wallet>this.wallet).messenger.send(RPCMethod.EstimateGas, [
          {
            to: this.transaction.txParams.to,
            data: this.transaction.txParams.data,
          },
        ]),
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
      this.contract.address = TransactionFactory.getContractAddress(signed);
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
        ...this.params[0],
        to: this.contract.address === '0x' ? '0x' : getAddress(this.contract.address).checksum,
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
    if (!response || response === '0x') {
      return null;
    }

    const outputs = this.abiItem.getOutputs();
    if (outputs.length > 1) {
      return this.contract.abiCoder.decodeParameters(outputs, response);
    }
    return this.contract.abiCoder.decodeParameter(outputs[0], response);
    // return outputs;
  }
}
