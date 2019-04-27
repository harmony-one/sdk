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

console.log('--- hint: please write these down');
console.log('-------------------------------------');
console.log(`${mne}`);
console.log('-------------------------------------');

console.log('--- hint: we use this private key to as default account to test');
console.log('-------------------------------------');
console.log(`${acc.privateKey}`);
console.log('-------------------------------------');

// now it is async time

async function main() {
  const latestBlock = await harmony.blockchain.getBlockByNumber({
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getBlockNumber');
  console.log('-------------------------------------');
  console.log(latestBlock);
  console.log('-------------------------------------');

  const sameLatestBlock = await harmony.blockchain.getBlockByHash({
    blockHash: latestBlock.hash,
  });
  console.log('--- testing: hmy_getBlockByHash');
  console.log('-------------------------------------');
  console.log(sameLatestBlock);
  console.log('-------------------------------------');

  const latestBalance = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: latestBlock.number,
  });
  console.log('--- testing: hmy_getBalance');
  console.log('-------------------------------------');
  console.log(latestBalance);
  console.log('-------------------------------------');
}

main();
