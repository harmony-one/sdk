// This example shows how you extract a contract's ABI
// And how to use `Contract.deploy().send()` to deploy the contract
// Then we can use `Contract.methods.call()` to call a method

// Import Main Class
const { Harmony } = require('../packages/harmony-core/dist');
// You can import BN from `@harmony-js/crypto` or use `Harmony.utils.BN`instead
const { BN } = require('../packages/harmony-crypto/dist');
const {
  SubscribeBlockTracker,
  RPCMethod,
} = require('../packages/harmony-network/dist');
// import more utils
const {
  isArray,
  ChainType,
  ChainID,
} = require('../packages/harmony-utils/dist');
// contract specific utils
const {
  toUtf8String,
  toUtf8Bytes,
} = require('../packages/harmony-contract/dist');

// we import `fs` and `solc` to complile the contract. you can do it in another js file
// but we show it here anyway.
const fs = require('fs');
const solc = require('solc');

// consturct the input function, here the solidity file lives in `./contracts/`
// we just type the file name as inpnut
function constructInput(file) {
  const content = fs.readFileSync(`./contracts/${file}`, { encoding: 'utf8' });
  const input = {
    language: 'Solidity',
    sources: {},
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  input.sources[file] = { content };
  return JSON.stringify(input);
}

// we try to comple this solidty file
const fileName = 'MyContract.sol';

// now we get the output
const output = JSON.parse(solc.compile(constructInput(fileName)));

let abi;
let bin;

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts[fileName]) {
  let contractAbi = output.contracts[fileName][contractName].abi;
  let contractBin =
    output.contracts[fileName][contractName].evm.bytecode.object;
  if (contractAbi) {
    abi = contractAbi;
  }
  if (contractBin) {
    bin = contractBin;
  }
}

// To test with different settings, here is some config.

const Settings = {
  Ropsten: {
    http: 'https://ropsten.infura.io/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    ws: 'wss://ropsten.infura.io/ws/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    type: ChainType.Ethereum,
    id: ChainID.Ropsten,
  },
  Rinkeby: {
    http: 'https://rinkeby.infura.io/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    ws: 'wss://rinkeby.infura.io/ws/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    type: ChainType.Ethereum,
    id: ChainID.Ropsten,
  },
  Ganache: {
    http: 'http://localhost:18545',
    ws: 'ws://localhost:18545',
    type: ChainType.Ethereum,
    id: ChainID.Ganache,
  },
};

// a function that will map the setting to harmony class constructor inputs
function useSetting(setting, providerType) {
  return [setting[providerType], setting.type, setting.id];
}

// simply change `Ropsten` to `Rinkeby` to test with different testnet
// and switch `ws` or `http` as RPC provider

const harmony = new Harmony(...useSetting(Settings.Ropsten, 'ws'));

// import our preset mnes
const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';

// now we have the mnes added to wallet
const acc1 = harmony.wallet.addByMnemonic(mne, 0);

// now we create contract using extracted abi
const myContract = harmony.contracts.createContract(abi);

// harmony.messenger.send(RPCMethod.BlockNumber, []).then(console.log);

// harmony.messenger.subscribe(RPCMethod.Subscribe, ['newHeads']).then((res) => {
//   res.onData((data) => {
//     console.log(data);
//   });
// });

// first we get the account's balance to see if we have enough token on the testnet
acc1.getBalance().then((res) => {
  console.log(`-- hint: account balance of ${acc1.address}`);
  console.log(``);
  console.log({ account: res });
  console.log(``);
  console.log(``);
});

// a deploy contract function
const deployContract = async () => {
  //`Contract.deploy().send()`
  const deployed = await myContract
    .deploy({
      // the data key puts in the bin file with `0x` prefix
      data: `0x${bin}`,
      // we don't have any initial arguments to put in of this contract, so we leave blank
      arguments: [],
    })
    .send({
      // gasLimit defines the max value that blockchain will consume
      // here we show that you can use Unit as calculator
      // because we use BN as our save integer as default input
      // use Unit converter is much safer
      gasLimit: new harmony.utils.Unit('1000000').asWei().toWei(),
      // gasPrice defines how many weis should be consumed each gas
      // you can use `new BN(string)` directly,
      // if you are sure about the amount is calculated in `wei`
      gasPrice: new harmony.crypto.BN('10000'),
    })
    // we use event emitter to listen the result when event happen
    // here comes in the `transactionHash`
    .on('transactionHash', (transactionHash) => {
      console.log(`-- hint: we got Transaction Hash`);
      console.log(``);
      console.log(`${transactionHash}`);
      console.log(``);
      console.log(``);

      harmony.blockchain
        .getTransactionByHash({
          txnHash: transactionHash,
        })
        .then((res) => {
          console.log(`-- hint: we got transaction detail`);
          console.log(``);
          console.log(res);
          console.log(``);
          console.log(``);
        });
    })
    // when we get receipt, it will emmit
    .on('receipt', (receipt) => {
      console.log(`-- hint: we got transaction receipt`);
      console.log(``);
      console.log(receipt);
      console.log(``);
      console.log(``);
    })
    // the http and websocket provider will be poll result and try get confirmation from time to time.
    // when `confirmation` comes in, it will be emitted
    .on('confirmation', (confirmation) => {
      console.log(`-- hint: the transaction is`);
      console.log(``);
      console.log(confirmation);
      console.log(``);
      console.log(``);
    })
    // if something wrong happens, the error will be emitted
    .on('error', (error) => {
      console.log(`-- hint: something wrong happens`);
      console.log(``);
      console.log(error);
      console.log(``);
      console.log(``);
    });
  return deployed;
};

// now we call our deploy contract function
deployContract().then((deployed) => {
  // after the contract is deployed ,we can get contract information
  // first we can get the contract Code
  harmony.blockchain.getCode({ address: deployed.address }).then((res) => {
    if (res.result) {
      console.log(`--hint: contract :${deployed.address}--`);
      console.log(``);
      console.log(`${res.result}`);
      console.log(``);
      console.log(``);
      deployed.methods
        .myFunction()
        .call()
        .then((result) => {
          console.log(`--hint: we got contract called, this is result`);
          console.log(``);
          console.log(result);
          console.log(``);
          console.log(``);
        });
    }
  });
});
