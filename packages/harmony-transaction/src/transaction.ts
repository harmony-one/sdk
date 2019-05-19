import {
  BN,
  encode,
  arrayify,
  hexlify,
  stripZeros,
  Signature,
  splitSignature,
} from '@harmony-js/crypto';
import { add0xToString, numberToHex } from '@harmony-js/utils';
import {
  Messenger,
  RPCMethod,
  Emitter,
  HttpProvider,
  SubscribeReturns,
} from '@harmony-js/network';
import { TxParams, TxStatus, TransasctionReceipt } from './types';
import {
  recover,
  transactionFields,
  sleep,
  TransactionEvents,
  defaultMessenger,
} from './utils';

class Transaction {
  emitter: Emitter;
  messenger: Messenger;
  txStatus: TxStatus;
  blockNumbers: string[] = [];
  confirmationCheck: number = 0;
  receipt?: TransasctionReceipt;
  private id: string;
  private from: string;
  private nonce: number | string;
  private to: string;
  private gasLimit: BN;
  private gasPrice: BN;
  private data: string;
  private value: BN;
  private chainId: number;
  private txnHash: string;
  private unsignedTxnHash: string;
  private signature: Signature;

  // constructor
  constructor(
    params?: TxParams,
    messenger: Messenger = defaultMessenger,
    txStatus = TxStatus.INTIALIZED,
  ) {
    this.messenger = messenger;
    this.txStatus = txStatus;
    this.emitter = new Emitter();

    // intialize transaction
    this.id = params ? params.id : '0x';
    this.from = params ? params.from : '0x';
    this.nonce = params ? params.nonce : 0;
    this.gasPrice = params ? params.gasPrice : new BN(0);
    this.gasLimit = params ? params.gasLimit : new BN(0);
    this.to = params ? params.to : '0x';
    this.value = params ? params.value : new BN(0);
    this.data = params ? params.data : '0x';
    // chainid should change with different network settings
    this.chainId = params ? params.chainId : this.messenger.chainId;
    this.txnHash = params ? params.txnHash : '0x';
    this.unsignedTxnHash = params ? params.unsignedTxnHash : '0x';
    this.signature = params
      ? params.signature
      : {
          r: '',
          s: '',
          recoveryParam: 0,
          v: 0,
        };
    this.receipt = params ? params.receipt : undefined;
  }

  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  getRLPUnsigned(): [string, any[]] {
    const raw: Array<string | Uint8Array> = [];

    transactionFields.forEach((field: any) => {
      let value = (<any>this.txParams)[field.name] || [];
      value = arrayify(
        hexlify(
          field.transform === 'hex' ? add0xToString(value.toString(16)) : value,
        ),
      );
      // Fixed-width field
      if (
        field.fix === true &&
        field.length &&
        value.length !== field.length &&
        value.length > 0
      ) {
        throw new Error(`invalid length for ${field.name}`);
      }

      // Variable-width (with a maximum)
      if (field.fix === false && field.length) {
        value = stripZeros(value);
        if (value.length > field.length) {
          throw new Error(`invalid length for ${field.name}`);
        }
      }

      raw.push(hexlify(value));
    });

    if (this.txParams.chainId != null && this.txParams.chainId !== 0) {
      raw.push(hexlify(this.txParams.chainId));
      raw.push('0x');
      raw.push('0x');
    }

    return [encode(raw), raw];
  }

  getRLPSigned(raw: any[], signature: Signature): string {
    const sig = splitSignature(signature);
    let v = 27 + (sig.recoveryParam || 0);
    if (raw.length === 9) {
      raw.pop();
      raw.pop();
      raw.pop();
      v += this.chainId * 2 + 8;
    }

    raw.push(hexlify(v));
    raw.push(stripZeros(arrayify(sig.r) || []));
    raw.push(stripZeros(arrayify(sig.s) || []));

    return encode(raw);
  }

  recover(txnHash: string): Transaction {
    this.setParams(recover(txnHash));
    return this;
  }
  // use when using eth_sendTransaction
  get txPayload() {
    return {
      from: this.txParams.from || '0x',
      to: this.txParams.to || '0x',
      gas: this.txParams.gasLimit ? numberToHex(this.txParams.gasLimit) : '0x',
      gasPrice: this.txParams.gasPrice
        ? numberToHex(this.txParams.gasPrice)
        : '0x',
      value: this.txParams.value ? numberToHex(this.txParams.value) : '0x',
      data: this.txParams.data || '0x',
      nonce: this.txParams.nonce ? numberToHex(this.nonce) : '0x',
    };
  }

  get txParams(): TxParams {
    return {
      id: this.id || '0x',
      from: this.from || '',
      nonce: this.nonce || 0,
      gasPrice: this.gasPrice || new BN(0),
      gasLimit: this.gasLimit || new BN(0),
      to: this.to || '0x',
      value: this.value || new BN(0),
      data: this.data || '0x',
      chainId: this.chainId || 0,
      txnHash: this.txnHash || '0x',
      unsignedTxnHash: this.unsignedTxnHash || '0x',
      signature: this.signature || '0x',
    };
  }
  setParams(params: TxParams) {
    this.id = params ? params.id : '0x';
    this.from = params ? params.from : '0x';
    this.nonce = params ? params.nonce : 0;
    this.gasPrice = params ? params.gasPrice : new BN(0);
    this.gasLimit = params ? params.gasLimit : new BN(0);
    this.to = params ? params.to : '0x';
    this.value = params ? params.value : new BN(0);
    this.data = params ? params.data : '0x';
    this.chainId = params ? params.chainId : 0;
    this.txnHash = params ? params.txnHash : '0x';
    this.unsignedTxnHash = params ? params.unsignedTxnHash : '0x';
    this.signature = params
      ? params.signature
      : {
          r: '',
          s: '',
          recoveryParam: 0,
          v: 0,
        };
    if (this.txnHash !== '0x') {
      this.setTxStatus(TxStatus.SIGNED);
    } else {
      this.setTxStatus(TxStatus.INTIALIZED);
    }
  }

  map(fn: any) {
    const newParams = fn(this.txParams);
    this.setParams(newParams);

    return this;
  }

  setTxStatus(txStatus: TxStatus): void {
    this.txStatus = txStatus;
  }

  getTxStatus(): TxStatus {
    return this.txStatus;
  }

  // get status
  isInitialized(): boolean {
    return this.getTxStatus() === TxStatus.INTIALIZED;
  }
  isSigned(): boolean {
    return this.getTxStatus() === TxStatus.SIGNED;
  }
  isPending(): boolean {
    return this.getTxStatus() === TxStatus.PENDING;
  }
  isRejected(): boolean {
    return this.getTxStatus() === TxStatus.REJECTED;
  }
  isConfirmed(): boolean {
    return this.getTxStatus() === TxStatus.CONFIRMED;
  }

  async sendTransaction(): Promise<[Transaction, string]> {
    // TODO: we use eth RPC setting for now, incase we have other params, we should add here
    if (this.txnHash === 'tx' || this.txnHash === undefined) {
      throw new Error('Transaction not signed');
    }
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    const res = await this.messenger.send(
      RPCMethod.SendRawTransaction,
      this.txnHash,
    );

    // temporarilly hard coded
    if (res.isResult()) {
      this.id = res.result;
      this.emitTransactionHash(this.id);
      this.setTxStatus(TxStatus.PENDING);
      return [this, res.result];
    } else if (res.isError()) {
      this.emitConfirm(`transaction failed:${res.message}`);
      this.setTxStatus(TxStatus.REJECTED);
      return [this, `transaction failed:${res.message}`];
    } else {
      this.emitError('transaction failed');
      throw new Error('transaction failed');
    }
  }

  async trackTx(txHash: string) {
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    // TODO: regex validation for txHash so we don't get garbage
    const res = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      txHash,
    );

    if (res.isResult() && res.result !== null) {
      this.receipt = res.result;
      this.emitReceipt(this.receipt);
      this.id = res.result.transactionHash;

      if (this.receipt) {
        if (this.receipt.status && this.receipt.status === '0x1') {
          this.txStatus = TxStatus.CONFIRMED;
        } else if (this.receipt.status && this.receipt.status === '0x0') {
          this.txStatus = TxStatus.REJECTED;
        }
        return true;
      } else {
        this.txStatus = TxStatus.PENDING;
        return false;
      }
    } else {
      return false;
    }
  }

  async confirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
  ) {
    if (this.messenger.provider instanceof HttpProvider) {
      this.txStatus = TxStatus.PENDING;
      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          if (await this.trackTx(txHash)) {
            this.emitConfirm(this.txStatus);
            return this;
          }
        } catch (err) {
          this.txStatus = TxStatus.REJECTED;
          this.emitConfirm(this.txStatus);
          throw err;
        }
        if (attempt + 1 < maxAttempts) {
          await sleep(interval * attempt);
        }
      }
      this.txStatus = TxStatus.REJECTED;
      this.emitConfirm(this.txStatus);
      throw new Error(
        `The transaction is still not confirmed after ${maxAttempts} attempts.`,
      );
    } else {
      await this.socketConfirm(txHash, maxAttempts, interval);
      return this;
    }
  }

  async socketConfirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
  ) {
    try {
      const [newHeads, subscriptionId] = await this.messenger.subscribe(
        RPCMethod.Subscribe,
        ['newHeads'],
        SubscribeReturns.all,
      );

      newHeads
        .onData(async (data: any) => {
          const currentBlock = await this.messenger.send(
            RPCMethod.BlockNumber,
            [],
          );

          if (currentBlock.isError()) {
            throw currentBlock.message;
          }

          if (!this.blockNumbers.includes(data.number)) {
            const tracker = await this.trackTx(txHash);
            if (tracker) {
              this.emitConfirm(this.txStatus);

              await this.messenger.unsubscribe(RPCMethod.UnSubscribe, [
                subscriptionId,
              ]);
            } else {
              this.blockNumbers.push(currentBlock.result);
              this.confirmationCheck += 1;

              if (this.confirmationCheck === maxAttempts * interval) {
                this.txStatus = TxStatus.REJECTED;
                this.emitConfirm(this.txStatus);
                await this.messenger.unsubscribe(RPCMethod.UnSubscribe, [
                  subscriptionId,
                ]);
              }
            }
          }
        })
        .onError(async (error: any) => {
          this.txStatus = TxStatus.REJECTED;
          this.emitConfirm(this.txStatus);
          this.emitError(error);
          await this.messenger.unsubscribe(RPCMethod.UnSubscribe, [
            subscriptionId,
          ]);
          throw new Error(error);
        });
    } catch (error) {
      throw error;
    }
  }

  emitTransactionHash(transactionHash: string) {
    this.emitter.emit(TransactionEvents.transactionHash, transactionHash);
  }
  emitReceipt(receipt: any) {
    this.emitter.emit(TransactionEvents.receipt, receipt);
  }
  emitError(error: any) {
    this.emitter.emit(TransactionEvents.error, error);
  }
  emitConfirm(data: any) {
    this.emitter.emit(TransactionEvents.confirmation, data);
  }
}
export { Transaction };
