import { RPCResponseBody } from '../types';
/**
 * @class ResponseMiddleware
 * @description Response middleware of RPC
 * @param  {Object}  ResponseBody - response from rpc
 * @return {ResponseMiddleware} response middleware instance
 */
class ResponseMiddleware {
  result: any;
  error: any;
  raw: any;
  constructor(ResponseBody: RPCResponseBody<any, any>) {
    this.result = ResponseBody.result;
    this.error = ResponseBody.error;
    this.raw = ResponseBody;
  }

  get getResult() {
    return typeof this.result === 'string'
      ? this.result
      : { ...this.result, responseType: 'result' };
  }

  get getError() {
    return typeof this.error === 'string'
      ? this.error
      : { ...this.error, responseType: 'error' };
  }

  get getRaw() {
    return { ...this.raw, responseType: 'raw' };
  }
}
export { ResponseMiddleware };
