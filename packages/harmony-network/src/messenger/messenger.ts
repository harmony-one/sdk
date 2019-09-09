import { HarmonyCore, ChainType, isString, ChainID, defaultConfig } from '@harmony-js/utils';
import { JsonRpc } from '../rpcMethod/builder';
import { ResponseMiddleware } from './responseMiddleware';
import { HttpProvider } from '../providers/http';
import { WSProvider } from '../providers/ws';
// import { getResultForData } from '../util';
import { RPCMethod } from '../rpcMethod/rpc';
import { SubscribeReturns, ShardingItem } from '../types';

export interface ShardingProvider {
  current: boolean;
  shardID: number;
  http: HttpProvider;
  ws: WSProvider;
}

/**
 * @class Messenger
 * @description Messenger instance
 * @param  {HttpProvider} provider HttpProvider
 * @param  {Object}  config config object
 * @return {Messenger} Messenger instance
 */
class Messenger extends HarmonyCore {
  provider: HttpProvider | WSProvider;
  config?: object;
  // tslint:disable-next-line: variable-name
  Network_ID: string = 'Default';
  shardProviders: Map<number, ShardingProvider>;

  JsonRpc: JsonRpc;
  defaultShardID?: number;

  constructor(
    provider: HttpProvider | WSProvider,
    chainType: ChainType = defaultConfig.Default.Chain_Type,
    chainId: ChainID = defaultConfig.Default.Chain_ID,
    config: object = defaultConfig,
  ) {
    super(chainType, chainId);

    /**
     * @var {Provider} provider
     * @memberof Messenger.prototype
     * @description Provider instance
     */
    this.provider = provider;

    /**
     * @var {Object} config
     * @memberof Messenger.prototype
     * @description Messenger config
     */
    this.config = config;
    /**
     * @var {Number} Network_ID
     * @memberof Messenger.prototype
     * @description Network ID for current provider
     */

    /**
     * @var {JsonRpc} JsonRpc
     * @memberof Messenger.prototype
     * @description JsonRpc instance
     */
    this.JsonRpc = new JsonRpc();

    // set Network ID
    this.setNetworkID(defaultConfig.Default.Network_ID);

    // set shardingProviders

    this.shardProviders = new Map();
    // this.setShardingProviders();
  }
  get currentShard(): number {
    return this.getCurrentShardID() || this.defaultShardID || 0;
  }

  get shardCount(): number {
    return this.shardProviders.size;
  }
  /**
   * @function send
   * @memberof Messenger.prototype
   * @param  {String} method - RPC method
   * @param  {Object} params - RPC method params
   * @return {Object} RPC result
   */
  send = async (
    method: RPCMethod | string,
    params?: string | any[] | undefined,
    rpcPrefix?: string,
    shardID: number = this.currentShard,
  ) => {
    this.providerCheck();
    let rpcMethod = method;
    if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, rpcPrefix);
    } else if (!rpcPrefix || rpcPrefix === this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, this.chainPrefix);
    }
    try {
      const payload = this.JsonRpc.toPayload(rpcMethod, params);
      const provider = this.getShardProvider(shardID);
      this.setResMiddleware(
        (data: any) => {
          if (!(data instanceof ResponseMiddleware)) {
            return new ResponseMiddleware(data);
          } else {
            return data;
          }
        },
        '*',
        provider,
      );

      const result = await provider.send(payload);
      return result;
      // return getResultForData(result); // getResultForData(result)
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * @function setProvider
   * @memberof Messenger
   * @description provider setter
   * @param  {Provider} provider - provider instance
   */
  setProvider(provider: HttpProvider | WSProvider) {
    this.provider = provider;
  }

  /**
   * @function providerCheck
   * @memberof Messenger
   * @description provider checker
   * @return {Error|null} provider validator
   */
  providerCheck() {
    if (!this.provider) {
      throw new Error('provider is not found');
    }
  }

  /**
   * @function setReqMiddleware
   * @description set request middleware
   * @memberof Messenger
   * @param  {any} middleware - middle ware for req
   * @param  {String} method  - method name
   */
  setReqMiddleware(middleware: any, method = '*', provider: HttpProvider | WSProvider) {
    provider.middlewares.request.use(middleware, method);
  }

  /**
   * @function setResMiddleware
   * @description set response middleware
   * @memberof Messenger
   * @param  {any} middleware - middle ware for req
   * @param  {String} method  - method name
   */
  setResMiddleware(middleware: any, method = '*', provider: HttpProvider | WSProvider) {
    provider.middlewares.response.use(middleware, method);
  }

  /**
   * @function setNetworkID
   * @description set network id
   * @memberof Messenger
   * @param  {String} id network id string
   */
  setNetworkID(id: string) {
    this.Network_ID = id;
  }

  setRPCPrefix(method: RPCMethod | string, prefix: string): string {
    const stringArray: string[] = method.split('_');
    if (stringArray.length !== 2) {
      throw new Error(`could not set prefix with ${method}`);
    }
    stringArray[0] = prefix;
    return stringArray.join('_');
  }

  subscribe = async (
    method: RPCMethod | string,
    params?: string | any[] | undefined,
    returnType: SubscribeReturns = SubscribeReturns.all,
    rpcPrefix: string = this.chainPrefix,
    shardID: number = this.currentShard,
  ) => {
    let rpcMethod = method;
    if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, rpcPrefix);
    } else if (!rpcPrefix || rpcPrefix === this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, this.chainPrefix);
    }
    let id: any = null;
    const provider = this.getShardProvider(shardID);
    if (provider instanceof WSProvider) {
      const reProvider = provider;

      try {
        const payload = this.JsonRpc.toPayload(rpcMethod, params);
        id = await reProvider.subscribe(payload);
        reProvider.on(id, (result: any) => {
          reProvider.emitter.emit('data', result);
        });
        reProvider.once('error', (error) => {
          reProvider.removeEventListener(id);
          reProvider.emitter.emit('error', error);
          reProvider.removeEventListener('*');
        });
      } catch (error) {
        reProvider.emitter.emit('error', error);
        reProvider.removeEventListener('*');
      }
      if (returnType === SubscribeReturns.all) {
        return [reProvider, id];
      } else if (returnType === SubscribeReturns.method) {
        return reProvider;
      } else if (returnType === SubscribeReturns.id) {
        return id;
      } else {
        throw new Error('Invalid returns');
      }
    } else {
      throw new Error('HttpProvider does not support this');
    }
  };

  unsubscribe = async (
    method: RPCMethod | string,
    params?: string | any[] | undefined,
    rpcPrefix?: string,
    shardID: number = this.currentShard,
  ) => {
    let rpcMethod = method;
    if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, rpcPrefix);
    } else if (!rpcPrefix || rpcPrefix === this.chainPrefix) {
      rpcMethod = this.setRPCPrefix(method, this.chainPrefix);
    }
    const provider = this.getShardProvider(shardID);
    if (provider instanceof WSProvider) {
      const reProvider = this.provider;
      try {
        const payload = this.JsonRpc.toPayload(rpcMethod, params);
        const response = await reProvider.unsubscribe(payload);
        return response;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('HttpProvider does not support this');
    }
  };

  async setShardingProviders() {
    if (this.chainPrefix !== ChainType.Harmony) {
      return;
    }
    try {
      const response = await this.send(RPCMethod.GetShardingStructure, [], this.chainPrefix);

      if (response.result) {
        const shardingStructures: ShardingItem[] = response.result;
        for (const shard of shardingStructures) {
          const shardID =
            typeof shard.shardID === 'string' ? Number.parseInt(shard.shardID, 10) : shard.shardID;
          this.shardProviders.set(shardID, {
            current: shard.current,
            shardID,
            http: new HttpProvider(shard.http),
            ws: new WSProvider(shard.ws),
          });
        }
      }
    } catch (error) {
      return;
    }
  }
  getShardProvider(shardID: number): HttpProvider | WSProvider {
    const provider = this.shardProviders.get(shardID);
    if (provider) {
      return this.provider instanceof HttpProvider ? provider.http : provider.ws;
    }
    return this.provider;
  }
  getCurrentShardID() {
    for (const shard of this.shardProviders) {
      if (
        shard[1].current === true ||
        shard[1].http.url === this.provider.url ||
        shard[1].ws.url === this.provider.url
      ) {
        return shard[1].shardID;
      }
    }
  }
  setDefaultShardID(shardID: number) {
    this.defaultShardID = shardID;
  }
}
export { Messenger };
