/**
 * ## About this package
 *
 * `@harmony-js/crypot` provides a series of functions to deal with keys
 *
 * ## How to use this package
 *
 * ### Create a Harmony Instance
 * ```javascript
 * const { Harmony } = require('@harmony-js/core');
 * const { ChainID, ChainType } = require('@harmony-js/utils');
 *
 * const hmy = new Harmony(
 *   'http://localhost:9500',
 *   {
 *     chainType: ChainType.Harmony,
 *     chainId: ChainID.HmyLocal,
 *   },
 * );
 * ```
 *
 * ### Some examples
 *
 * ```javascript
 * // randomBytes
 * const bytes = hmy.crypto.randomBytes(20);
 * console.log(bytes)
 *
 * // encryptPhrase
 * const myPhrase = hmy.wallet.newMnemonic();
 * const pwd = '1234';
 * hmy.crypto.encryptPhrase(myPhrase, pwd).then((value) => {
 *   console.log(value);
 * })
 *
 * // decryptThePhrase
 * hmy.crypto.encryptPhrase(myPhrase, pwd).then((keystore) => {
 *   hmy.crypto.decryptPhrase(JSON.parse(keystore), pwd).then((value) => {
 *     console.log(value);
 *   })
 * })
 *
 * // generatePrivateKey
 * const privateKey = hmy.crypto.generatePrivateKey();
 * console.log(privateKey)
 *
 * // getPubkeyFromPrivateKey
 * const publicKey = hmy.crypto.getPubkeyFromPrivateKey(privateKey);
 * console.log(publicKey);
 *
 * // getAddressFromPrivateKey
 * const address = hmy.crypto.getAddressFromPrivateKey(privateKey);
 * console.log(address);
 *
 * // getAddressFromPublicKey
 * const address = hmy.crypto.getAddressFromPublicKey(publicKey);
 * console.log(address);
 *
 * // toChecksumAddress
 * const checksumAddr = hmy.crypto.toChecksumAddress(address);
 * console.log(checksumAddr);
 * ```
 *
 * @packageDocumentation
 * @module harmony-crypto
 */

// This file is ported from ether.js/src.ts/errors.ts

// Unknown Error
/** @hidden */
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

// Not implemented
/** @hidden */
export const NOT_IMPLEMENTED = 'NOT_IMPLEMENTED';

// Missing new operator to an object
//  - name: The name of the class
/** @hidden */
export const MISSING_NEW = 'MISSING_NEW';

// Call exception
//  - transaction: the transaction
//  - address?: the contract address
//  - args?: The arguments passed into the function
//  - method?: The Solidity method signature
//  - errorSignature?: The EIP848 error signature
//  - errorArgs?: The EIP848 error parameters
//  - reason: The reason (only for EIP848 "Error(string)")
/** @hidden */
export const CALL_EXCEPTION = 'CALL_EXCEPTION';

// Invalid argument (e.g. value is incompatible with type) to a function:
//   - argument: The argument name that was invalid
//   - value: The value of the argument
/** @hidden */
export const INVALID_ARGUMENT = 'INVALID_ARGUMENT';

// Missing argument to a function:
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
/** @hidden */
export const MISSING_ARGUMENT = 'MISSING_ARGUMENT';

// Too many arguments
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
/** @hidden */
export const UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT';

// Numeric Fault
//   - operation: the operation being executed
//   - fault: the reason this faulted
/** @hidden */
export const NUMERIC_FAULT = 'NUMERIC_FAULT';

// Insufficien funds (< value + gasLimit * gasPrice)
//   - transaction: the transaction attempted
/** @hidden */
export const INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS';

// Nonce has already been used
//   - transaction: the transaction attempted
/** @hidden */
export const NONCE_EXPIRED = 'NONCE_EXPIRED';

// The replacement fee for the transaction is too low
//   - transaction: the transaction attempted
/** @hidden */
export const REPLACEMENT_UNDERPRICED = 'REPLACEMENT_UNDERPRICED';

// Unsupported operation
//   - operation
/** @hidden */
export const UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION';

// tslint:disable-next-line: variable-name
/** @hidden */
let _permanentCensorErrors = false;
// tslint:disable-next-line: variable-name
/** @hidden */
let _censorErrors = false;

// @TODO: Enum
/** @hidden */
export function throwError(message: string, code: string | null | undefined, params: any): never {
  if (_censorErrors) {
    throw new Error('unknown error');
  }

  if (!code) {
    code = UNKNOWN_ERROR;
  }
  if (!params) {
    params = {};
  }

  const messageDetails: string[] = [];
  Object.keys(params).forEach((key) => {
    try {
      messageDetails.push(key + '=' + JSON.stringify(params[key]));
    } catch (error) {
      messageDetails.push(key + '=' + JSON.stringify(params[key].toString()));
    }
  });
  messageDetails.push('version=' + '#version');

  const reason = message;
  if (messageDetails.length) {
    message += ' (' + messageDetails.join(', ') + ')';
  }

  // @TODO: Any??
  const error: any = new Error(message);
  error.reason = reason;
  error.code = code;

  Object.keys(params).forEach((key) => {
    error[key] = params[key];
  });

  throw error;
}

/** @hidden */
export function checkNew(self: any, kind: any): void {
  if (!(self instanceof kind)) {
    throwError('missing new', MISSING_NEW, { name: kind.name });
  }
}

/** @hidden */
export function checkArgumentCount(count: number, expectedCount: number, suffix?: string): void {
  if (!suffix) {
    suffix = '';
  }
  if (count < expectedCount) {
    throwError('missing argument' + suffix, MISSING_ARGUMENT, {
      count,
      expectedCount,
    });
  }
  if (count > expectedCount) {
    throwError('too many arguments' + suffix, UNEXPECTED_ARGUMENT, {
      count,
      expectedCount,
    });
  }
}

/** @hidden */
export function setCensorship(censorship: boolean, permanent?: boolean): void {
  if (_permanentCensorErrors) {
    throwError('error censorship permanent', UNSUPPORTED_OPERATION, {
      operation: 'setCensorship',
    });
  }

  _censorErrors = !!censorship;
  _permanentCensorErrors = !!permanent;
}

/** @hidden */
export function checkNormalize(): void {
  try {
    // Make sure all forms of normalization are supported
    ['NFD', 'NFC', 'NFKD', 'NFKC'].forEach((form) => {
      try {
        'test'.normalize(form);
      } catch (error) {
        throw new Error('missing ' + form);
      }
    });

    if (String.fromCharCode(0xe9).normalize('NFD') !== String.fromCharCode(0x65, 0x0301)) {
      throw new Error('broken implementation');
    }
  } catch (error) {
    throwError('platform missing String.prototype.normalize', UNSUPPORTED_OPERATION, {
      operation: 'String.prototype.normalize',
      form: error.message,
    });
  }
}

/** @hidden */
const LogLevels: { [name: string]: number } = {
  debug: 1,
  default: 2,
  info: 2,
  warn: 3,
  error: 4,
  off: 5,
};
/** @hidden */
let LogLevel = LogLevels.default;

/** @hidden */
export function setLogLevel(logLevel: string): void {
  const level = LogLevels[logLevel];
  if (level == null) {
    warn('invliad log level - ' + logLevel);
    return;
  }
  LogLevel = level;
}

/** @hidden */
function log(logLevel: string, args: [any?, ...any[]]): void {
  if (LogLevel > LogLevels[logLevel]) {
    return;
  }
  console.log.apply(console, args);
}

/** @hidden */
export function warn(...args: [any?, ...any[]]): void {
  log('warn', args);
}

/** @hidden */
export function info(...args: [any?, ...any[]]): void {
  log('info', args);
}
