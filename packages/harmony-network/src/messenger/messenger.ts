import { HarmonyCore, ChainType, isString } from '@harmony/utils';
import { JsonRpc } from '../blockchain/rpcbuilder';
import { ResponseMiddleware } from './responseMiddleware';
import { HttpProvider } from '../providers/http';
import { getResultForData } from '../util';
import { RPCMethod } from '../blockchain/rpc';

const defaultConfig = {
  Default: {
    CHAIN_ID: 0,
    Network_ID: 'Default',
    nodeProviderUrl: 'http://localhost:4200',
  },
  DevNet: {
    CHAIN_ID: 333,
    Network_ID: 'DevNet',
    nodeProviderUrl: 'https://devnet.harmony.one',
  },
  TestNet: {
    CHAIN_ID: 2,
    Network_ID: 'TestNet',
    nodeProviderUrl: 'https://devnet.harmony.one',
  },
  MainNet: {
    CHAIN_ID: 1,
    Network_ID: 'MainNet',
    nodeProviderUrl: 'https://mainnet.harmony.one',
  },
};

/**
 * @class Messenger
 * @description Messenger instance
 * @param  {HttpProvider} provider HttpProvider
 * @param  {Object}  config config object
 * @return {Messenger} Messenger instance
 */
class Messenger extends HarmonyCore {
  provider: HttpProvider;
  config?: object;
  // tslint:disable-next-line: variable-name
  Network_ID: string = 'Default';
  JsonRpc: JsonRpc;

  constructor(
    provider: HttpProvider,
    chainType: ChainType = ChainType.Harmony,
    config?: object,
  ) {
    super(chainType);
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
    this.config = config || defaultConfig;
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
      this.setResMiddleware((data: any) => new ResponseMiddleware(data));
      const result = await this.provider.send(payload);
      return getResultForData(result); // getResultForData(result)
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
  setProvider(provider: HttpProvider) {
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
  setReqMiddleware(middleware: any, method = '*') {
    return this.provider.middlewares.request.use(middleware, method);
  }

  /**
   * @function setResMiddleware
   * @description set response middleware
   * @memberof Messenger
   * @param  {any} middleware - middle ware for req
   * @param  {String} method  - method name
   */
  setResMiddleware(middleware: any, method = '*') {
    return this.provider.middlewares.response.use(middleware, method);
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
}
export { Messenger };
