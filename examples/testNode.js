const {
  Account,
  Wallet,
} = require('../packages/harmony-account/dist/index.js');
const {
  getAddressFromPublicKey,
} = require('../packages/harmony-crypto/dist/index.js');
const {
  isAddress,
  isPrivateKey,
} = require('../packages/harmony-utils/dist/index.js');

const { numberToHex } = require('../packages/harmony-utils/dist/index.js');
const {
  HttpProvider,
  Messenger,
} = require('../packages/harmony-network/dist/index.js');

// const a = Account.new();

// console.log(isAddress(a.checksumAddress));

const importKey =
  '0x87b3ec80f36f9553fb63624d0805d87cfe461145c7be972d23db95fb1a53b1e7';
const importKey2 =
  '0x87b3ec80f36f9553fb63624d0805d87cfe461145c7be972d23db95fb1a53b1e7';

const d = new Wallet();

const e = d.addByPrivateKey(importKey);
const f = d.addByPrivateKey(importKey2);

const testWallet = async () => {
  await d.encryptAccount(e.address, '123');
  console.log(d.accounts);
  console.log(d.getAccount(e.address));

  console.log('---------');
  await d.decryptAccount(e.address, '123');
  console.log(d.accounts);
  console.log(d.getAccount(e.address));

  const mne = d.generateMnemonic();
  const g = d.addByMnemonic(mne, 0);
  await d.encryptAccount(g.address, '123');
  console.log('---------');
  console.log(d.accounts);
  console.log(d.getAccount(g.address));
};

testWallet();

// const c = Account.add(importKey);

// // console.log(isPrivateKey(importKey));

// c.addShard('newShard');

// console.log(c.getShardsCount);

// c.toFile('123').then((f) => {
//   console.log('---- encrypting ----');
//   console.log(f);

//   c.fromFile(f, '123').then((a) => {
//     console.log('--- decrypting and add to Account ----');
//     console.log(a);
//   });
// });

// const newProvider = new HttpProvider('https://dev-api.zilliqa.com');
// const msg = new Messenger(newProvider);

// const getBalance = async () => {
//   const res = await msg.send(
//     'GetBalance',
//     '9bfec715a6bd658fcb62b0f8cc9bfa2ade71434a',
//   );
//   console.log(res);
// };

// getBalance();
