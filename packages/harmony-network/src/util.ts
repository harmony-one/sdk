/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import { ResponseMiddleware } from './messenger/responseMiddleware';

/**
 * @function getResultForData
 * @description get result for data by default
 * @param  {any} data - object get from provider
 * @return {any} data result or data
 */
export function getResultForData(data: any): any {
  if (data.result) {
    return data.getResult;
  }
  if (data.error) {
    return data.getError;
  }
  return data.getRaw;
}

export function getRawForData(data: any): any {
  return data.getRaw;
}

export function onResponse(response: ResponseMiddleware) {
  if (response.responseType === 'result') {
    return response.getResult;
  } else if (response.responseType === 'error') {
    return response.getError;
  } else {
    return response.raw;
  }
}
