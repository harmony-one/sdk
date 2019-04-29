import { isWs } from '@harmony/utils';
import mitt from 'mitt';
import { BaseProvider } from './baseProvider';

export const enum SocketConnection {
  READY = 'ready',
  CONNECT = 'connect',
  ERROR = 'error',
  CLOSE = 'close',
}

export const enum SocketState {
  SOCKET_MESSAGE = 'socket_message',
  SOCKET_READY = 'socket_ready',
  SOCKET_CLOSE = 'socket_close',
  SOCKET_ERROR = 'socket_error',
  SOCKET_CONNECT = 'socket_connect',
  SOCKET_NETWORK_CHANGED = 'socket_networkChanged',
  SOCKET_ACCOUNTS_CHANGED = 'socket_accountsChanged',
}

class BaseSocket extends BaseProvider {
  url: string;
  emitter: mitt.Emitter;
  subscriptions: any = {};
  handlers: any = {};
  constructor(url: string) {
    super(url);
    if (!isWs(url)) {
      throw new Error(`${url} is not websocket`);
    }
    this.url = url;
    this.emitter = new mitt(this.handlers);
  }
  resetHandlers() {
    // tslint:disable-next-line: forin
    for (const i in this.handlers) {
      delete this.handlers[i];
    }
  }

  once(type: string, handler: mitt.Handler) {
    this.emitter.on(type, handler);
    this.removeListener(type);
  }

  removeListener(type?: string, handler?: mitt.Handler) {
    if (!type) {
      this.handlers = {};
      return;
    }
    if (!handler) {
      delete this.handlers[type];
    } else {
      return this.emitter.off(type, handler);
    }
  }
  reset() {
    this.removeListener('*');
    // this.registerEventListeners();
  }
  removeAllSocketListeners() {
    this.removeListener(SocketState.SOCKET_MESSAGE);
    this.removeListener(SocketState.SOCKET_READY);
    this.removeListener(SocketState.SOCKET_CLOSE);
    this.removeListener(SocketState.SOCKET_ERROR);
    this.removeListener(SocketState.SOCKET_CONNECT);
  }

  onReady(event: any) {
    this.emitter.on(SocketConnection.READY, () => event);
    this.emitter.on(SocketState.SOCKET_READY, () => event);
  }
  onError(error: any) {
    this.emitter.on(SocketConnection.ERROR, () => error);
    this.emitter.on(SocketState.SOCKET_ERROR, () => error);
    this.removeAllSocketListeners();
    this.removeListener('*');
  }
  onClose(error = null) {
    this.emitter.on(SocketConnection.CLOSE, () => error);
    this.emitter.on(SocketState.SOCKET_CLOSE, () => error);
    this.removeAllSocketListeners();
    this.removeListener('*');
  }
}

export { BaseSocket };
