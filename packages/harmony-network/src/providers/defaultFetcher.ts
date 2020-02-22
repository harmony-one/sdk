/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import fetch from 'cross-fetch';
import { RPCRequest, RPCResponseBody, RPCError, RPCResult } from '../types';

export const fetchRPC = {
  requestHandler: (request: RPCRequest<any[]>, headers: any) =>
    fetch(request.url, {
      method: request.options && request.options.method ? request.options.method : 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(request.payload),
      headers: {
        ...headers,
        ...(request.options && request.options.headers ? request.options.headers : {}),
      },
    }),
  responseHandler: (response: Response, request: RPCRequest<any>, handler: any) =>
    response
      .json()
      .then((body: RPCResponseBody<RPCResult, RPCError>) => {
        return { ...body, req: request };
      })
      .then(handler),
};
