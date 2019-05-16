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

// const harmony = new Harmony('ws://localhost:18545', 1);
const harmony = new Harmony(
  // 'https://ropsten.infura.io/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
  'wss://Ropsten.infura.io/ws/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
  // 'https://testnet-rpc.thundercore.com:8544',
  ChainType.Ethereum,
  ChainID.Ropsten,
);

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

// harmony.blockchain.newPendingTransactions().then((p) => {
//   console.log({ txns: p });
//   p.onData(async (res) => {
//     const txn = await harmony.blockchain.getTransactionByHash({
//       txnHash: res.params.result,
//     });
//     console.log(txn);
//   });
// });

// const getValue = async (address) => {
//   const newContract = harmony.contracts.createContract(abi, address);

//   const value = await newContract.methods
//     .getValue()
//     .call({ from: acc1.address });
//   return value;
// };

// async function setValue(address) {
//   const newContract = harmony.contracts.createContract(abi, address);

//   await newContract.methods.setValue('KKKK').call({
//     from: acc1.address,
//   });
// }

// async function myfunc(address) {
//   const newContract = harmony.contracts.createContract(abi, address);
//   const result = await newContract.methods
//     .myFunction()
//     .call({ from: acc1.address });
//   return result;
// }

// const contractAddress = '0xbdce52076e5d8b95cadf5086ff429e33ce641374';

// const newContract = harmony.contracts.createContract(abi, contractAddress);

// harmony.blockchain.getCode({ address: contractAddress }).then(console.log);

// newContract.methods
//   .myFunction()
//   .call({ from: acc1.address, gas: new harmony.crypto.BN(30000000) }, 'latest')
//   .then(console.log);

// deployContract().then((deployed) => {
//   deployed.methods
//     .add(1, 3)
//     .call()
//     .then(console.log);
// });

// myContract.methods
//   .getValue()
//   .call({ from: acc1.address })
//   .then((res) => {
//     console.log(res);
//   });
// myContract.methods
//   .setValue('shit!')
//   .call({ from: acc1.address })
//   .then((res) => {
//     console.log(res);
//   });

// .on('confirmation', (e) => {
//   console.log(e);
// });
// .then((res) => {
//   console.log(res);
// });
