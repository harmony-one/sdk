const { AbiCoder, toUtf8Bytes } = require('@harmony/contract');
const abiDecoder = require('abi-decoder');
const {
  keccak256,
  hexToByteArray,
  hexToIntArray,
  arrayify,
  hexlify,
  padZeros,
  bytesPadRight,
  bytesPadLeft,

  BN,
} = require('@harmony/crypto');
const { hexToBN } = require('@harmony/utils');

const abiCoder = new AbiCoder();
// console.log(arrayify('8bd02b7b'));

// const encoded = abiCoder.encodeParameter('bytes32', '0xdf3234');
// console.log(encoded);

const encoded = abiCoder.encodeParameter('uint256', '2345675643');
console.log(encoded);

const decoded = abiCoder.decodeLog(
  [
    {
      type: 'string',
      name: 'myString',
    },
    {
      type: 'uint256',
      name: 'myNumber',
      indexed: true,
    },
    {
      type: 'uint8',
      name: 'mySmallNumber',
      indexed: true,
    },
  ],
  '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
  [
    '0x000000000000000000000000000000000000000000000000000000000000f310',
    '0x0000000000000000000000000000000000000000000000000000000000000010',
  ],
);
console.log(decoded);

// const mm = hexToBN(
//   '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
// );

// const ttt = new BN(434);
// console.log(ttt.lt(new BN(0)));
// console.log(ttt.gt(mm.maskn(64)));
