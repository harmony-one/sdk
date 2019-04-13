const { Account, Wallet } = require('@harmony/account');
const {
  isAddress,
  isPrivateKey,
  numberToHex,
  numToStr,
  hexToNumber,
  Unit,
  strip0x,
} = require('@harmony/utils');
const { HttpProvider, Messenger } = require('@harmony/network');
const { Transaction, TransactionFactory } = require('@harmony/transaction');
const {
  arrayify,
  hexlify,
  BN,
  encode,
  decode,
  getContractAddress,
  recoverAddress,
  recoverPublicKey,
  keccak256,
  hexZeroPad,
  getAddressFromPublicKey,
} = require('@harmony/crypto');

const { Harmony } = require('@harmony/core');

const msgr = new Messenger(new HttpProvider('https://dev-api.zilliqa.com'));
const wallet = new Wallet(msgr);
const transactions = new TransactionFactory(msgr);

async function testEncrypt() {
  const mne = wallet.generateMnemonic();

  console.log('---hint: please write these down');
  console.log(`${mne}`);

  const newAcc = wallet.addByMnemonic(mne);

  const password = '123456';
  console.log('---hint: we use this dump password to encrypt, lol');
  console.log(`${password}`);

  await wallet.encryptAccount(newAcc.address, password);

  console.log('---hint: Encrypting...');
  console.log('---hint: Done!');
  console.log('---hint: Your account address is:');
  const encrypted = wallet.getAccount(newAcc.address);
  console.log(`${encrypted.address}`);
  console.log('---hint: here is your keyStore file:');
  console.log(`${encrypted.privateKey}`);
}

// testEncrypt();

async function testSign(prvKey, data) {
  const newAcc = wallet.addByPrivateKey(prvKey);

  const result = await newAcc.sign(data);
  console.log(result);
}

// testSign(
//   '0x0123456789012345678901234567890123456789012345678901234567890123',
//   '0x06',
// );

const txn = new Transaction({
  to: '0xaa4cf82d745c3ead6c8275d782d6cb0a6beac617',
  data: '0x',
  gasLimit: '0xbfa8a6d03fa6',
  gasPrice: '0x',
  value: '0x7a92fecc67512737',
  nonce: '0xf8',
  chainId: 0,
});

const acc = wallet.addByPrivateKey(
  '0xc3886f791236bf31fe8fd7522a7b12808700deb9c159826fc99236c74614118b',
);

// console.log(txn.getRLPUnsigned()[0]);

// const signed = wallet
//   .getAccount(acc.address)
//   .signTransaction(txn, false)
//   .then((tx) => {
//     const newTx = tx.recover(tx.unsignedTxnHash);
//     // console.log(newTx);
//     acc.signTransaction(newTx, false, 'rlp').then((signed) => {
//       const ttt = transactions.recover(signed.txnHash);
//       console.log(ttt);
//     });
//   });

// recoverAddress();
// console.log(wallet.messenger);
// console.log(hexlify(0));

// 0xda8003049401234567890123456789012345678901234567890580;
// 0xda8003049401234567890123456789012345678901234567890580;
/**
 * { name: 'nonce', length: 32, fix: false },
 { name: 'gasPrice', length: 32, fix: false, transform: 'hex' },
 { name: 'gasLimit', length: 32, fix: false, transform: 'hex' },
 { name: 'to', length: 20, fix: true },
 { name: 'value', length: 32, fix: false, transform: 'hex' },
 { name: 'data', fix: false },
 */
// const [nonce, gasPrice, gasLimit, to, value, data] = decode(
//   txn.getRLPUnsigned()[0],
// );

// console.log({
//   nonce: new BN(strip0x(hexToNumber(nonce))).toNumber(),
//   gasPrice: hexToNumber(gasPrice !== '0x' ? gasPrice : '0x00'),
//   gasLimit: hexToNumber(gasLimit !== '0x' ? gasLimit : '0x00'),
//   to: hexToNumber(to !== '0x' ? to : '0x00'),
//   value: hexToNumber(value !== '0x' ? value : '0x00'),
//   data: hexToNumber(data !== '0x' ? data : '0x00'),
// });

// console.log(getContractAddress(acc.publicKey, 248));

const harmony = new Harmony('https://devnet.harmony.one');
console.log(harmony.blockchain);
