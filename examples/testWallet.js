const { Harmony } = require('../packages/harmony-core/dist');

const harmony = new Harmony('https://localhost:9015');

async function createAndEncrypt(words, index, password) {
  for (let i = 0; i < index; i++) {
    const newAcc = harmony.wallet.addByMnemonic(words, i);
    await harmony.wallet.encryptAccount(newAcc.address, password);
  }
}

async function main() {
  // const mne = harmony.wallet.generateMnemonic();
  const mne =
    'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';
  const password = '1234567890123';
  console.log('---hint: please write these down');
  console.log(`${mne}`);

  console.log('---hint: we use simple password to encrypt your wallet');
  console.log(`${password}`);

  await createAndEncrypt(mne, 10, password);
  console.log('---hint:we added 10 accounts for you');

  console.log(harmony.wallet.accounts);

  console.log('---hint:now the signer has been encrypted');
  console.log(harmony.wallet.signer.privateKey);
}

main();
