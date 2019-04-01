const { Account } = require('../packages/harmony-account/lib/index.js');
const {
  getAddressFromPublicKey,
} = require('../packages/harmony-crypto/lib/index.js');
const {
  isAddress,
  isPrivateKey,
} = require('../packages/harmony-utils/lib/index.js');

// const a = Account.new();

// console.log(isAddress(a.checksumAddress));

const importKey =
  '0x87b3ec80f36f9553fb63624d0805d87cfe461145c7be972d23db95fb1a53b1e7';

const c = Account.add(importKey);

// console.log(isPrivateKey(importKey));

console.log(c);

console.log(getAddressFromPublicKey(c.publicKey));
