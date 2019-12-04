// import or require Harmony class
const { Harmony } = require('@harmony-js/core');

// import or require settings
const { ChainID, ChainType } = require('@harmony-js/utils');

const URL_TESTNET = `https://api.s0.b.hmny.io`;
const URL_MAINNET = `https://api.s0.t.hmny.io`;
const URL_PANGAEA = 'https://api.s0.pga.hmny.io';

// 1. initialize the Harmony instance

const harmony = new Harmony(
  // rpc url
  URL_PANGAEA,
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyPangaea,
  },
);

// 2. get wallet ready
// one18n8e7472pg5fqvcfcr5hg0npquha24wsxmjheg
const phrase = 'genius cable radar memory high catch blossom correct middle wish gentle fiscal';
// const phrase =
//   'resemble rent deposit unique garment ripple burst negative else decorate menu theme';

// one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
// surge welcome lion goose gate consider taste injury health march debris kick

// add privateKey to wallet

const privateKey = '63e35b761e9df0d50ddcdaa8e33c235b60c991bfed22925a12768b0c08ef822f';

const sender = harmony.wallet.addByMnemonic(phrase);
const sender2 = harmony.wallet.addByPrivateKey(privateKey);

harmony.wallet.setSigner(sender2.address);

console.log('sender2Address is : ', sender2.bech32Address);

// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local testnet
  // We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();

  harmony.shardingStructures(res.result);
}

// 4. get transaction payload ready

async function transfer(receiver) {
  // run set sharding first, if you want to make a cross-shard transaction
  await setSharding();

  //1e18
  const txn = harmony.transactions.newTx({
    //  token send to
    to: receiver,
    // amount to send
    value: '100000000',
    // gas limit, you can use string
    gasLimit: '210000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 1,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new harmony.utils.Unit('10').asGwei().toWei(),
  });

  // sign the transaction use wallet;

  // This will happen at the chrome extension.
  const signedTxn = await harmony.wallet.signTransaction(txn);

  // Now you can use `Transaction.observed()` to listen events

  // Frontend received back the signedTxn and do the followings to Send transaction.
  signedTxn
    .observed()
    .on('transactionHash', (txnHash) => {
      console.log('');
      console.log('--- hash ---');
      console.log('');
      console.log(txnHash);
      console.log('');
    })
    .on('receipt', (receipt) => {
      console.log('');
      console.log('--- receipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('cxReceipt', (receipt) => {
      console.log('');
      console.log('--- cxReceipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('error', (error) => {
      console.log('');
      console.log('--- error ---');
      console.log('');
      console.log(error);
      console.log('');
    });

  // send the txn, get [Transaction, transactionHash] as result

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();

  // to confirm the result if it is already there

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (!confiremdTxn.isCrossShard()) {
    if (confiremdTxn.isConfirmed()) {
      console.log('--- Result ---');
      console.log('');
      console.log('Normal transaction');
      console.log(`${txnHash} is confirmed`);
      console.log('');
      console.log('please see detail in explorer:');
      console.log('');
      console.log('https://explorer.harmony.one/#/tx/' + txnHash);
      console.log('');
      process.exit();
    }
  }
  if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Cross-Shard transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    console.log('please see detail in explorer:');
    console.log('');
    console.log('https://explorer.harmony.one/#/tx/' + txnHash);
    console.log('');
    process.exit();
  }
}

// sending from one18n8e7472pg5fqvcfcr5hg0npquha24wsxmjheg to  one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
(async () => await transfer('one1pf75h0t4am90z8uv3y0dgunfqp4lj8wr3t5rsp'))();
