const { Harmony } = require('../packages/harmony-core/dist');
// const ganache = require('ganache-cli');

var port = 9015;

const url = `http://localhost:${port}`;
// const url = `https://testnet-rpc.thundercore.com:8544`;

// we use ChainType=0 to indicate we are using `harmony node`
// if we set it to 1, we use `eth` as our settings.
// here 0 is by default, which means we use harmony-node by default.
const harmony = new Harmony(url);

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
  console.log(latestBlock.result);
  console.log('-------------------------------------');

  const sameLatestBlock = await harmony.blockchain.getBlockByHash({
    blockHash: latestBlock.result.hash,
  });
  console.log('--- testing: hmy_getBlockByHash');
  console.log('-------------------------------------');
  console.log(sameLatestBlock.result);
  console.log('-------------------------------------');

  const blockTransactionCount = await harmony.blockchain.getBlockTransactionCountByHash(
    {
      blockHash: latestBlock.result.hash,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByHash');
  console.log('-------------------------------------');
  console.log(blockTransactionCount.result);
  console.log('-------------------------------------');

  const sameBlockTransactionCount = await harmony.blockchain.getBlockTransactionCountByNumber(
    {
      blockNumber: latestBlock.result.number,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByNumber');
  console.log('-------------------------------------');
  console.log(sameBlockTransactionCount.result);
  console.log('-------------------------------------');

  const transaction = await harmony.blockchain.getTransactionByBlockHashAndIndex(
    {
      blockHash: latestBlock.result.hash,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockHashAndIndex');
  console.log('-------------------------------------');
  console.log(transaction.result);
  console.log('-------------------------------------');

  const sameTransaction = await harmony.blockchain.getTransactionByBlockNumberAndIndex(
    {
      blockNumber: latestBlock.result.number,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockNumberAndIndex');
  console.log('-------------------------------------');
  console.log(sameTransaction.result);
  console.log('-------------------------------------');

  const sameTransaction2 = await harmony.blockchain.getTransactionByHash({
    txnHash: transaction.result.hash,
  });
  console.log('--- testing: hmy_getTransactionByHash');
  console.log('-------------------------------------');
  console.log(sameTransaction2.result);
  console.log('-------------------------------------');

  const latestBalance = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: latestBlock.result.number,
  });
  console.log('--- testing: hmy_getBalance');
  console.log('-------------------------------------');
  console.log({ balance: harmony.utils.hexToNumber(latestBalance.result) });
  console.log('-------------------------------------');

  const latestBalance2 = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: 'latest',
  });
  console.log(
    '--- testing: force blockNumber to "latest", should get same result as above',
  );
  console.log('-------------------------------------');
  console.log({ balance: harmony.utils.hexToNumber(latestBalance2.result) });
  console.log('-------------------------------------');

  const nonce = await harmony.blockchain.getTransactionCount({
    address: acc.address,
    blockNumber: latestBlock.result.number,
  });
  console.log('--- testing: hmy_getTransactionCount');
  console.log('-------------------------------------');
  console.log({
    nonce: Number.parseInt(harmony.utils.hexToNumber(nonce.result), 10),
  });
  console.log('-------------------------------------');

  const balanceOfAccount = await acc.getBalance();
  console.log('--- testing: Account.getBalance');
  console.log('-------------------------------------');
  console.log(balanceOfAccount);
  console.log('-------------------------------------');
}

main();
