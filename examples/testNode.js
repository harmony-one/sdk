const { Account, Wallet } = require('@harmony/account');
const { isAddress, isPrivateKey, numberToHex } = require('@harmony/utils');
const { HttpProvider, Messenger } = require('@harmony/network');

async function testEncrypt() {
  const wallet = new Wallet();

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

testEncrypt();
