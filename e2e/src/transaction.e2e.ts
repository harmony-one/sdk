import fetch from 'jest-fetch-mock';
import { harmony, checkCalledMethod } from './harmony';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, TxStatus } from '@harmony-js/transaction';
// tslint:disable-next-line: no-implicit-dependencies
import { isHash, numberToHex } from '@harmony-js/utils';
import txnJsons from '../fixtures/transactions.json';
import demoAccounts from '../fixtures/testAccount.json';
import { RPCMethod } from '@harmony-js/network';

const receiver = demoAccounts.Accounts[3];
jest.useRealTimers();

describe('test Transaction using SDK', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  let signed: Transaction;
  let sent: Transaction;
  let txId: string;

  it('should test recover signedTransaction', () => {
    const txns = txnJsons.transactions;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txns.length; i += 1) {
      const newTxn = harmony.transactions.newTx();

      newTxn.recover(txns[i].rawTransaction);
      expect(newTxn.txParams.from).toEqual(txns[i].senderAddress);
      expect(newTxn.txParams.to).toEqual(txns[i].receiverAddress);
      expect(`0x${newTxn.txParams.gasLimit.toString(16)}`).toEqual(txns[i].gasLimit);
      expect(`0x${newTxn.txParams.gasPrice.toString(16)}`).toEqual(txns[i].gasPrice);
      expect(`0x${newTxn.txParams.value.toString(16)}`).toEqual(txns[i].value);
      expect(`${numberToHex(newTxn.txParams.nonce)}`).toEqual(txns[i].nonce);
    }
  });
  it('should test signTransaction', async () => {
    const txnObject = {
      to: harmony.crypto.getAddress(receiver.Address).bech32,
      value: '0x64',
      gasLimit: '210000',
      gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
    };

    const txn = harmony.transactions.newTx(txnObject);
    signed = await harmony.wallet.signTransaction(txn, undefined, undefined, false);

    expect(signed.isSigned()).toEqual(true);
  });
  it('should send transaction', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        "jsonrpc": "2.0", "id": 1,
        "result": "0x323A2B2C81d8948E5109FC32f9d0e4e6d178d14cC732C8E0a7Af74E81C7653eA"
      }),
    );
    const [sentTxn, id] = await signed.sendTransaction();
    expect(sentTxn.isPending()).toEqual(true);
    expect(harmony.utils.isHash(id)).toEqual(true);
    expect(checkCalledMethod(0, RPCMethod.SendRawTransaction)).toEqual(true);
    txId = id;
    sent = sentTxn;
  });
  it('should confirm a transaction', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
        { status: 200 },
      ],
      [
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x2"}),
        { status: 200 },
      ],
      [
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "contractAddress": null,
            "blockNumber": harmony.utils.numberToHex(2),
            "from": harmony.wallet.accounts[0],
            "gasUsed": harmony.utils.numberToHex(5),
            "cumulativeGasUsed": harmony.utils.numberToHex(5),
            "logs": [],
            "logsBloom": harmony.utils.numberToHex(5),
            "shardID": 0,
            "to": demoAccounts.Accounts[3].Address,
            "transactionHash": "0x8c26EFdb6e4cAC6F8BeACE59F52fd95beD4Bfbfa8fF30F4a7cEd511fE5f869d9",
            "transactionIndex": harmony.utils.numberToHex(10),
            "blockHash": "0xFECCCCBFd5AC71902BcfE65dDB0b88EEbbD15AD6cDAE7A9FAEb773bF827320fd",
          }
        }),
        {status: 200},
      ]
    )
    const toConfirm = await sent.confirm(txId, 20, 1000);
    expect(toConfirm.receipt !== undefined).toEqual(true);
    expect(checkTransactionReceipt(toConfirm.receipt)).toEqual(true);
    if (toConfirm.isConfirmed()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.CONFIRMED);
    } else if (toConfirm.isRejected()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.REJECTED);
    }
    expect(checkCalledMethod(0, RPCMethod.BlockNumber)).toEqual(true);
    expect(checkCalledMethod(1, RPCMethod.BlockNumber)).toEqual(true);
    expect(checkCalledMethod(2, RPCMethod.GetTransactionReceipt)).toEqual(true);
  });
  it('should test transaction observed events', async () => {
    const txnObject = {
      to: harmony.crypto.getAddress(receiver.Address).bech32,
      value: new harmony.utils.Unit('100').asGwei().toWei(),
      gasLimit: new harmony.utils.Unit('210000').asWei().toWei(),
      gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
    };

    const txn = harmony.transactions.newTx(txnObject);
    txn
      .observed()
      .on('transactionHash', (transactionHash) => {
        expect(isHash(transactionHash)).toEqual(true);
      })
      .on('receipt', (receipt) => {
        expect(checkTransactionReceipt(receipt)).toEqual(true);
      })
      .on('confirmation', (confirmation) => {
        expect(confirmation === TxStatus.REJECTED || confirmation === TxStatus.CONFIRMED).toBe(
          true,
        );
      })
      .on('error', (error) => {
        expect(error).toBeTruthy();
      });
    const txnSigned = await harmony.wallet.signTransaction(txn, undefined, undefined, false);
    fetch.mockResponseOnce(
      JSON.stringify({
        "jsonrpc": "2.0", "id": 1,
        "result": "0x323A2B2C81d8948E5109FC32f9d0e4e6d178d14cC732C8E0a7Af74E81C7653eA"
      }),
    );
    const [txnSent, id] = await txnSigned.sendTransaction();
    expect(txnSent.txStatus).toEqual(TxStatus.PENDING);
    expect(checkCalledMethod(0, RPCMethod.SendRawTransaction)).toEqual(true);
    console.log('Here');
    fetch.mockResponses(
      [
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x1"}),
        { status: 200 },
      ],
      [
        JSON.stringify({"jsonrpc": "2.0", "id": 1, "result": "0x2"}),
        { status: 200 },
      ],
      [
        JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "contractAddress": null,
            "blockNumber": harmony.utils.numberToHex(2),
            "from": harmony.wallet.accounts[0],
            "gasUsed": harmony.utils.numberToHex(5),
            "cumulativeGasUsed": harmony.utils.numberToHex(5),
            "logs": [],
            "logsBloom": harmony.utils.numberToHex(5),
            "shardID": 0,
            "to": demoAccounts.Accounts[3].Address,
            "transactionHash": "0x8c26EFdb6e4cAC6F8BeACE59F52fd95beD4Bfbfa8fF30F4a7cEd511fE5f869d9",
            "transactionIndex": harmony.utils.numberToHex(10),
            "blockHash": "0xFECCCCBFd5AC71902BcfE65dDB0b88EEbbD15AD6cDAE7A9FAEb773bF827320fd",
            "status": "0x1",
          }
        }),
        {status: 200},
      ]
    );
    await txnSigned.confirm(id);
    expect(checkCalledMethod(1, RPCMethod.BlockNumber)).toEqual(true);
    expect(checkCalledMethod(2, RPCMethod.BlockNumber)).toEqual(true);
    expect(checkCalledMethod(3, RPCMethod.GetTransactionReceipt)).toEqual(true);
  });
});

function checkTransactionReceipt(data: any) {
  return harmony.utils.validateArgs(
    data,
    {
      blockHash: [harmony.utils.isHash],
      blockNumber: [harmony.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || harmony.utils.isValidAddress,
      ],
      cumulativeGasUsed: [harmony.utils.isHex],
      from: [harmony.utils.isValidAddress],
      gasUsed: [harmony.utils.isHex],
      logs: [harmony.utils.isArray],
      logsBloom: [harmony.utils.isHex],

      shardID: [harmony.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || harmony.utils.isValidAddress],
      transactionHash: [harmony.utils.isHash],
      transactionIndex: [harmony.utils.isHex],
    },
    { root: [harmony.utils.isHash] },
  );
}
