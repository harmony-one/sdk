/**
 * @packageDocumentation
 * @module harmony-crypto
 * @ignore
 */

// this file is ported from 'ether.js' and done some fixes
import * as sha3 from 'js-sha3';

import { arrayify, Arrayish } from './bytes';

export function keccak256(data: Arrayish): string {
  const arrayified = arrayify(data);
  if (arrayified) {
    return '0x' + sha3.keccak_256(arrayified);
  }
  throw new Error('arrayify failed');
}

// export function sha3_256(data: Arrayish): string {
//   const arrayified = arrayify(data);
//   if (arrayified) {
//     return '0x' + sha3.sha3_256(arrayified);
//   }
//   throw new Error('arrayify failed');
// }
