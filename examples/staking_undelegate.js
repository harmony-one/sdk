const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const { Undelegate, StakingTransaction, StakingFactory } = require('@harmony-js/staking'); //../packages/harmony-staking
const { TxStatus } = require('@harmony-js/transaction');

const LOCALNET = `http://localhost:9500`;

// 1. initialize the Harmony instance

const harmony = new Harmony(
  // rpc url
  LOCALNET,
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyLocal,
  },
);

// 2. get wallet ready

// one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
// surge welcome lion goose gate consider taste injury health march debris kick

// add privateKey to wallet
const private = '63e35b761e9df0d50ddcdaa8e33c235b60c991bfed22925a12768b0c08ef822f';
const sender = harmony.wallet.addByPrivateKey(private);
// const phrase =
//     'genius cable radar memory high catch blossom correct middle wish gentle
//     fiscal';

// one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
// surge welcome lion goose gate consider taste injury health march debris kick

// add privateKey to wallet
// const sender = harmony.wallet.addByMnemonic(phrase);
// let r =
//   '0xf8f180f8a4940b585f8daefbc68a311fbd4cb20d9174ad174016f83885416c69636585616c69636591616c6963652e6861726d6f6e792e6f6e6583426f6295446f6e2774206d6573732077697468206d65212121ddc988016345785d8a0000c9880c7d713b49da0000c887b1a2bc2ec500000a820bb8f1b0b9486167ab9087ab818dc4ce026edb5bf216863364c32e42df2af03c5ced1ad181e7d12f0e6dd5307a73b6224760861164008080830927c028a064b1b835f5b70a72228920db24e44c0a57d954c1d3dcac3b33c79d9593f96191a05577fd05064a37043a33ff7febb67ab126a8e1f0b67c92b7cab793a87ddf2c82';

// const undelegateMsg = new Undelegate(
//   'one1pf75h0t4am90z8uv3y0dgunfqp4lj8wr3t5rsp', // signed should match this
//   'one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
//   '0x16345785d8a0000',
// );

// const stakingTxn = new StakingTransaction(
//   '0x3',
//   undelegateMsg,
//   '0x2',
//   '0x',
//   '0x0927c0',
//   ChainID.HmyLocal,
// );

const stakingTxn = harmony.stakings
  .undelegate({
    delegatorAddress: 'one1pf75h0t4am90z8uv3y0dgunfqp4lj8wr3t5rsp',
    validatorAddress: 'one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
    amount: '0x16345785d8a0000',
  })
  .setTxParams({
    nonce: '0x2',
    gasPrice: '0x',
    gasLimit: '0x0927c0',
    chainId: ChainID.HmyLocal,
  })
  .build();

// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local
  // testnet We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();
  harmony.shardingStructures(res.result);
}

async function execute() {
  await setSharding();

  const signedTxn = await harmony.wallet.signStaking(stakingTxn);
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

  // console.log(signedTxn);

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();
  // signedTxn.sendTransaction()
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  // to confirm the result if it is already there
  // console.log(txnHash);
  console.log(sentTxn);

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (confiremdTxn.isConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Normal transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    process.exit();
  }
  // if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
  //   console.log('--- Result ---');
  //   console.log('');
  //   console.log('Cross-Shard transaction');
  //   console.log(`${txnHash} is confirmed`);
  //   console.log('');
  //   process.exit();
  // }
}
execute();
//   const delegateMsg = Delegate({
//     delegatorAddress: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//     validatorAddress: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//     amount: '0xa',
//   });

//   const stakingTxn = StakingTransaction({
//     directive: '0x2',
//     stakeMsg: delegateMsg,
//     nonce: '0x2',
//     gasPrice: '0x',
//     gasLimit: '0x64',
//     chainId: 0,
//     from: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//   });

//   stakingTxn
//     .sendTransaction()
//     .then((stakingTxn, res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
