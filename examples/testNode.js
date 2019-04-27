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

  const blockTransactionCount = await harmony.blockchain.getBlockTransactionCountByHash(
    {
      blockHash: latestBlock.hash,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByHash');
  console.log('-------------------------------------');
  console.log(blockTransactionCount);
  console.log('-------------------------------------');

  const sameBlockTransactionCount = await harmony.blockchain.getBlockTransactionCountByNumber(
    {
      blockNumber: latestBlock.number,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByNumber');
  console.log('-------------------------------------');
  console.log(sameBlockTransactionCount);
  console.log('-------------------------------------');

  const transaction = await harmony.blockchain.getTransactionByBlockHashAndIndex(
    {
      blockHash: latestBlock.hash,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockHashAndIndex');
  console.log('-------------------------------------');
  console.log(transaction);
  console.log('-------------------------------------');

  const sameTransaction = await harmony.blockchain.getTransactionByBlockNumberAndIndex(
    {
      blockNumber: latestBlock.number,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockNumberAndIndex');
  console.log('-------------------------------------');
  console.log(sameTransaction);
  console.log('-------------------------------------');

  const sameTransaction2 = await harmony.blockchain.getTransactionByHash({
    txnHash: transaction.hash,
  });
  console.log('--- testing: hmy_getTransactionByHash');
  console.log('-------------------------------------');
  console.log(sameTransaction2);
  console.log('-------------------------------------');

  const latestBalance = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: latestBlock.number,
  });
  console.log('--- testing: hmy_getBalance');
  console.log('-------------------------------------');
  console.log({ balance: harmony.utils.hexToNumber(latestBalance) });
  console.log('-------------------------------------');

  const nonce = await harmony.blockchain.getTransactionCount({
    address: acc.address,
    blockNumber: latestBlock.number,
  });
  console.log('--- testing: hmy_getTransactionCount');
  console.log('-------------------------------------');
  console.log({ nonce: Number.parseInt(harmony.utils.hexToNumber(nonce), 10) });
  console.log('-------------------------------------');

  const balanceOfAccount = await acc.getBalance();
  console.log('--- testing: Account.getBalance');
  console.log('-------------------------------------');
  console.log(balanceOfAccount);
  console.log('-------------------------------------');
}

main();
