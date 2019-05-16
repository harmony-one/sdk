const { Harmony } = require('@harmony/core');
const { BN } = require('@harmony/crypto');
const { isArray, ChainType, ChainID } = require('@harmony/utils');
const fs = require('fs');
const solc = require('solc');

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
const fileName = 'MyContract.sol';

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

function useSetting(setting, providerType) {
  return [setting[providerType], setting.type, setting.id];
}

const harmony = new Harmony(...useSetting(Settings.Ganache, 'ws'));

const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';
const acc1 = harmony.wallet.addByMnemonic(mne, 0);

const myContract = harmony.contracts.createContract(abi);

acc1.getBalance().then((res) => {
  console.log(`-- hint: account balance of ${acc1.address}`);
  console.log(``);
  console.log({ account: res });
  console.log(``);
  console.log(``);
});

const deployContract = async () => {
  const deployed = await myContract
    .deploy({
      data: `0x${bin}`,
      arguments: [],
    })
    .send({
      gasLimit: new harmony.crypto.BN('1000000'),
      gasPrice: new harmony.crypto.BN('10000'),
    })
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
    .on('receipt', (receipt) => {
      console.log(`-- hint: we got transaction receipt`);
      console.log(``);
      console.log(receipt);
      console.log(``);
      console.log(``);
    })
    .on('confirmation', (confirmation) => {
      console.log(`-- hint: the transaction is`);
      console.log(``);
      console.log(confirmation);
      console.log(``);
      console.log(``);
    })
    .on('error', (error) => {
      console.log(`-- hint: someting wrong happens`);
      console.log(``);
      console.log(error);
      console.log(``);
      console.log(``);
    });
  return deployed;
};

deployContract().then((deployed) => {
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
