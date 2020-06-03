/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

import { hexlify, isHexString, keccak256, toChecksumAddress } from '@harmony-js/crypto';
import {
  numberToHex,
  isArray,
  // hexToNumber,
  isString,
  isAddress,
  hexToBN,
} from '@harmony-js/utils';
import { toUtf8Bytes } from '../abi/abiCoder';

export const inputLogFormatter = (options: any) => {
  if (options.fromBlock) {
    options.fromBlock = inputBlockNumberFormatter(options.fromBlock);
  }

  if (options.toBlock) {
    options.toBlock = inputBlockNumberFormatter(options.toBlock);
  }

  // make sure topics, get converted to hex
  options.topics = options.topics || [];
  options.topics = options.topics.map((topic: any) => {
    return isArray(topic) ? topic.map(toTopic) : toTopic(topic);
  });

  if (options.address) {
    if (isArray(options.address)) {
      options.address = options.address.map((addr: string) => {
        return inputAddressFormatter(addr);
      });
    } else {
      options.address = inputAddressFormatter(options.address);
    }
  }

  return options;
};

/**
 * Formats the output of a log
 *
 * @method outputLogFormatter
 *
 * @param {Object} log object
 *
 * @returns {Object} log
 */
export const outputLogFormatter = (log: any) => {
  // generate a custom log id
  if (
    typeof log.blockHash === 'string' &&
    typeof log.transactionHash === 'string' &&
    typeof log.logIndex === 'string'
  ) {
    const shaId = keccak256(
      '0x' +
        log.blockHash.replace('0x', '') +
        log.transactionHash.replace('0x', '') +
        log.logIndex.replace('0x', ''),
    );

    shaId.replace('0x', '').substr(0, 8);

    log.id = `log_${shaId}`;
  } else if (!log.id) {
    log.id = null;
  }

  if (log.blockNumber !== null) {
    log.blockNumber = hexToBN(log.blockNumber).toNumber();
  }

  if (log.transactionIndex !== null) {
    log.transactionIndex = hexToBN(log.transactionIndex).toNumber();
  }

  if (log.logIndex !== null) {
    log.logIndex = hexToBN(log.logIndex).toNumber();
  }

  if (log.address) {
    log.address = toChecksumAddress(log.address);
  }

  return log;
};

export const inputBlockNumberFormatter = (blockNumber: any) => {
  if (blockNumber === undefined || blockNumber === null || isPredefinedBlockNumber(blockNumber)) {
    return blockNumber;
  }

  if (isHexString(blockNumber)) {
    if (isString(blockNumber)) {
      return blockNumber.toLowerCase();
    }

    return blockNumber;
  }

  return numberToHex(blockNumber);
};

export const isPredefinedBlockNumber = (blockNumber: string) => {
  return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
};

export const inputAddressFormatter = (address: string) => {
  if (isAddress(address)) {
    return `0x${address.toLowerCase().replace('0x', '')}`;
  }

  throw new Error(
    `Provided address "${address}" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted.`,
  );
};

export const toTopic = (value: any) => {
  if (value === null || typeof value === 'undefined') {
    return null;
  }

  value = String(value);

  if (value.indexOf('0x') === 0) {
    return value;
  }

  return hexlify(toUtf8Bytes(value));
};
