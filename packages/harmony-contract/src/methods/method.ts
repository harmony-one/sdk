import { Wallet } from '@harmony/account';
import {
  TransactionFactory,
  Transaction,
  // TxStatus,
} from '@harmony/transaction';
import { RPCMethod, getResultForData, Emitter } from '@harmony/network';
import { hexToNumber, hexToBN } from '@harmony/utils';
import { AbiItemModel } from '../models/types';
import { Contract } from '../contract';
import { methodEncoder } from '../utils/encoder';
import { ContractStatus } from '../utils/status';

// todo: have to judge if it is contractConstructor

export class ContractMethod {
  contract: Contract;
  params: any;
  methodKey: string;
  wallet: Wallet;
  abiItem: AbiItemModel;

  protected transaction: Transaction;
  constructor(
    methodKey: string,
    params: any,
    abiItem: AbiItemModel,
    contract: Contract,
  ) {
    this.methodKey = methodKey;
    this.contract = contract;
    this.wallet = contract.wallet;
    this.params = params;
    this.abiItem = abiItem;
    this.transaction = this.createTransaction();

    // this.addEventListeners();
  }
  send(params: any): Emitter {
    try {
      this.transaction = this.transaction.map((tx: any) => {
        return { ...tx, ...params };
      });

      this.signTransaction().then((signed) => {
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
      const nonce = getResultForData(
        await this.wallet.messenger.send(RPCMethod.GetTransactionCount, [
          this.wallet.signer ? this.wallet.signer.address : options.from,
          blockNumber,
        ]),
      );

      let gasLimit: any;
      // tslint:disable-next-line: prefer-conditional-expression
      if (options) {
        gasLimit = options.gas || options.gasLimit;
      } else {
        gasLimit = hexToBN(await this.estimateGas());
      }

      this.transaction = this.transaction.map((tx: any) => {
        return {
          ...tx,
          ...options,
          from: options
            ? options.from
            : this.wallet.signer
            ? this.wallet.signer.address
            : tx.from,
          gasPrice: options ? options.gasPrice : tx.gasPrice,
          gasLimit: gasLimit || tx.gasLimit,
          nonce: Number.parseInt(hexToNumber(nonce), 10),
        };
      });

      const result = await this.wallet.messenger.send(RPCMethod.Call, [
        this.transaction.txPayload,
        blockNumber,
      ]);

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
        await this.wallet.messenger.send(RPCMethod.EstimateGas, [
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
    return methodEncoder(
      this.contract.abiCoder,
      this.abiItem,
      this.contract.data,
    );
  }

  protected async signTransaction() {
    try {
      const signed = await this.wallet.signTransaction(
        this.transaction,
        undefined,
        undefined,
        true,
        'rlp',
        'pending',
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
      const result = await this.transaction.confirm(id);
      if (result.receipt && result.receipt.status === '0x1') {
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
        to: this.contract.address,
        data: this.encodeABI(),
      };

      const result = new TransactionFactory(this.wallet.messenger).newTx(
        txObject,
      );
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
