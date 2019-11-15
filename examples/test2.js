const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const {
  randomBytes,
  generatePrivateKey,
  getAddress,
  getAddressFromPrivateKey,
  encryptPhrase,
  decryptPhrase,
} = require('@harmony-js/crypto');

const harmony = new Harmony('http://localhost:9500', { chainId: 2, chainType: 'hmy' });
const myPhrase = harmony.wallet.newMnemonic();
const pwd = '1234';

async function encryptThePhrase(phrase, pass) {
  const result = await encryptPhrase(phrase, pass);
  return result;
}

async function decryptThePhrase(keystore, pass) {
  const result = await decryptPhrase(keystore, pass);
  return result;
}

async function phraseKeyStore() {
  const keyStore = await encryptThePhrase(myPhrase, pwd);
  const recoveredPhrase = await decryptThePhrase(JSON.parse(keyStore), pwd);
  return { myPhrase, keyStore, recoveredPhrase };
}

phraseKeyStore().then((result) => {
  const { myPhrase, keyStore, recoveredPhrase } = result;

  const anotherPhrase = 'wall public vague under poem acid jaguar describe net scene sponsor neck';
  harmony.wallet.addByMnemonic(myPhrase);
  harmony.wallet.addByMnemonic(anotherPhrase);
  console.log({ myPhrase, keyStore, recoveredPhrase });
  console.log(harmony.wallet);
});
