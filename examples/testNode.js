const { Harmony } = require('@harmony/core');
// const ganache = require('ganache-cli');

var port = 9128;

const url = `http://localhost:${port}`;

// we use ChainType=0 to indicate we are using `harmony node`
// if we set it to 1, we use `eth` as our settings.
// here 0 is by default, which means we use harmony-node by default.
const harmony = new Harmony(url, 0);

const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';

const acc = harmony.wallet.addByMnemonic(mne, 0);

console.log('--- hint: please write these down ---');
console.log(`${mne}`);

console.log(
  '--- hint: we use this private key to as default account to test ---',
);
console.log(`${acc.privateKey}`);

harmony.blockchain
  .getBlockByNumber({
    tag: 'latest',
    returnObject: false,
  })
  .then((result) => {
    console.log('--- hint: we test hmy_getBlockNumber ---');
    console.log(result);
    console.log('--------------------------------------');
  });

harmony.blockchain
  .getBalance({
    address: acc.address,
    tag: 'latest',
  })
  .then((result) => {
    console.log('--- hint: we test hmy_getBalance ---');
    console.log(result);
    console.log('-------------------------------------');
  });
