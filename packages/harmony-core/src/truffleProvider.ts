/**
 * @packageDocumentation
 * @module harmony-core
 * @hidden
 */

import {
  HttpProvider,
  WSProvider,
  RPCRequestPayload,
  ResponseMiddleware,
} from '@harmony-js/network';

import { ChainID, ChainType, Unit, isBech32Address } from '@harmony-js/utils';
import { HDNode } from '@harmony-js/account';
import { fromBech32, HRP } from '@harmony-js/crypto';

const packageInfo = { version: '1.0.0' };

export interface ArgsResolver {
  newArgs: any;
  id: number;
  params: any;
  newMethod: string;
  callback: (error: any, res?: any) => void;
}

export interface HDOptions {
  menmonic?: string;
  index: number;
  addressCount: number;
}

export interface ChainOptions {
  shardID: number;
  chainType: ChainType;
  chainId: ChainID;
}

export interface TransactionOptions {
  gasLimit: string;
  gasPrice: string;
}

export class TruffleProvider extends HDNode {
  constructor(
    provider: string | HttpProvider | WSProvider = 'http://localhost:9500',
    hdOptions: HDOptions = {
      menmonic: undefined,
      index: 0,
      addressCount: 1,
    },
    chainOptions: ChainOptions = {
      shardID: 0,
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyLocal,
    },
    transactionOptions: TransactionOptions = {
      gasLimit: '10000000',
      gasPrice: '20000000000',
    },
  ) {
    super(
      provider,
      hdOptions.menmonic,
      hdOptions.index,
      hdOptions.addressCount,
      chainOptions.shardID,
      chainOptions.chainType,
      chainOptions.chainId,
      transactionOptions.gasLimit,
      transactionOptions.gasPrice,
    );
  }
  async send(...args: [RPCRequestPayload<any>, any]) {
    const { newArgs, id, params, newMethod, callback } = this.resolveArgs(...args);

    switch (newMethod) {
      case 'hmy_accounts': {
        const accounts = this.getAccounts();
        callback(null, {
          result: accounts,
          id,
          jsonrpc: '2.0',
        });
        return {
          result: accounts,
          id,
          jsonrpc: '2.0',
        };
        // break;
      }
      case 'hmy_sendTransaction': {
        const txObj = params[0];
        const rawTxn = await this.signTransaction(txObj);
        const result = await this.provider.send(
          {
            id,
            method: 'hmy_sendRawTransaction',
            params: [rawTxn],
            jsonrpc: '2.0',
          },
          (err: any, res: ResponseMiddleware | any) => this.resolveCallback(err, res, callback),
        );
        return this.resolveResult(result);

        //  break;
      }
      case 'hmy_getTransactionReceipt': {
        const result = await this.provider.send(
          {
            id,
            method: 'hmy_getTransactionReceipt',
            params: [params[0]],
            jsonrpc: '2.0',
          },
          (err: any, res: any) => {
            try {
              if (err) {
                callback(err);
              }
              const response = this.resolveResult(res);

              if (response.result !== null) {
                response.result.status = '0x1';
              }
              callback(null, response);
            } catch (error) {
              throw error;
            }
          },
        );
        return this.resolveResult(result);
      }
      case 'net_version': {
        callback(null, {
          result: String(this.messenger.chainId),
          id,
          jsonrpc: '2.0',
        });
        return {
          result: String(this.messenger.chainId),
          id,
          jsonrpc: '2.0',
        };
      }
      case 'web3_clientVersion': {
        callback(null, {
          result: `Harmony/${packageInfo.version}/@harmony-js`,
          id,
          jsonrpc: '2.0',
        });
        return {
          result: `Harmony/${packageInfo.version}/@harmony-js`,
          id,
          jsonrpc: '2.0',
        };
      }
      case 'hmy_getBlockByNumber': {
        const result = await this.provider.send(newArgs, (err: any, res: any) => {
          try {
            if (err) {
              callback(err);
            }
            const response = this.resolveResult(res);
            if (response.error) {
              callback(response.error);
              return;
            }

            if (
              new Unit(response.result.gasLimit)
                .asWei()
                .toWei()
                .gt(new Unit(this.gasLimit).asWei().toWei())
            ) {
              response.result.gasLimit = `0x${new Unit(this.gasLimit)
                .asWei()
                .toWei()
                .toString('hex')}`;
            }
            if (isBech32Address(response.result.miner)) {
              response.result.miner = fromBech32(response.result.miner, HRP);
            }
            callback(null, response);
          } catch (error) {
            throw error;
          }
        });
        return this.resolveResult(result);
      }

      default: {
        // hmy_getBlockByNumber

        const result = await this.provider.send(
          newArgs,
          (err: any, res: ResponseMiddleware | any) => this.resolveCallback(err, res, callback),
        );

        return this.resolveResult(result);
        //  break;
      }
    }
  }

  sendAsync(...args: [RPCRequestPayload<any>, any]) {
    return this.send(...args);
  }

  resolveArgs(...args: [RPCRequestPayload<any>, any]): ArgsResolver {
    const method = args[0].method;
    const params = args[0].params;
    let newMethod: string = method;
    if (method.startsWith('eth')) {
      newMethod = method.replace('eth', 'hmy');
    }
    args[0].method = newMethod;

    const { id } = args[0];

    return {
      newArgs: args[0],
      id,
      params,
      newMethod,
      callback: args[1],
    };
  }

  resolveResult = (response: ResponseMiddleware | any) => {
    const final = response.getRaw || response;
    delete final.req;
    delete final.responseType;
    return final;
  };
  resolveCallback = (
    err: any,
    res: any,
    callback: (error: any, res?: ResponseMiddleware | any) => void,
  ) => {
    try {
      if (err) {
        callback(err);
      }
      const response = this.resolveResult(res);
      callback(null, response);
    } catch (error) {
      throw error;
    }
  };
}
