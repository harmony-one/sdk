// TODO: implement Websocket Provider
import { w3cwebsocket as W3CWebsocket } from 'websocket';
import { BaseSocket } from './baseSocket';
import { isWs } from '@harmony/utils';
import { JsonRpc } from '../rpcMethod/rpcbuilder';
import { composeMiddleware } from '../rpcMethod/net';
import { RPCRequestPayload } from '../types';

class WSProvider extends BaseSocket {
  url: string;
  subscriptions: any = {};
  options: any = {};
  connection: W3CWebsocket | WebSocket;
  jsonRpc: JsonRpc;
  // ws: w3cwebsocket;
  constructor(url: string, options: any = {}) {
    super(url);
    if (!isWs(url)) {
      throw new Error(`${url} is not websocket`);
    }
    this.url = url;
    this.options = options;
    this.connection = this.createWebsocketProvider(this.url, this.options);
    this.jsonRpc = new JsonRpc();
  }

  createWebsocketProvider(url: string, options: any = {}) {
    // tslint:disable-next-line: no-string-literal
    if (typeof window !== 'undefined' && (<any>window).WebSocket) {
      // tslint:disable-next-line: no-string-literal
      return new WebSocket(url, options.protocol);
    } else {
      const headers = options.headers || {};
      const urlObject = new URL(url);

      if (!headers.authorization && urlObject.username && urlObject.password) {
        const authToken = Buffer.from(
          `${urlObject.username}:${urlObject.password}`,
        ).toString('base64');
        headers.authorization = `Basic ${authToken}`;
      }

      return new W3CWebsocket(
        url,
        options.protocol,
        undefined,
        headers,
        undefined,
        options.clientConfig,
      );
    }
  }

  get connected() {
    return this.connection.readyState === this.connection.OPEN;
  }

  isConnecting() {
    return this.connection.readyState === this.connection.CONNECTING;
  }

  send(payload: RPCRequestPayload<object>): Promise<any> {
    const [tReq, tRes] = this.getMiddleware(payload.method);
    const reqMiddleware = composeMiddleware(...tReq);
    const resMiddleware = composeMiddleware(...tRes);

    return new Promise((resolve, reject) => {
      this.connection.send(reqMiddleware(JSON.stringify(payload)));
      this.connection.onmessage = (msg: MessageEvent) => {
        if (msg && msg.data) {
          let result;
          try {
            result = JSON.parse(msg.data);
            resolve(resMiddleware(result));
          } catch (error) {
            reject(error);
          }
        } else {
          reject('provider error');
        }
      };
    });
  }
}

export { WSProvider };
