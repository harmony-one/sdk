import { Transaction } from '../src/transaction';
import { RLPSign } from '../src/utils';
import { TxStatus } from '../src/types';
import { HttpProvider, Messenger } from '@harmony-js/network';
import { isAddress, ChainType, hexToBN, ChainID } from '@harmony-js/utils';
import { getAddressFromPrivateKey, BN, getAddress } from '@harmony-js/crypto';

import txnVectors from './transactions.fixture.json';

const provider = new HttpProvider('http://localhost:9500');

describe('test sign tranction', () => {
  it('should test sign transaction with ETH settings', () => {
    const ethMessenger = new Messenger(provider, ChainType.Ethereum, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnVectors.length; i += 1) {
      const vector = txnVectors[i];
      const address = getAddressFromPrivateKey(vector.privateKey);

      expect(isAddress(address)).toEqual(true);
      expect(address).toEqual(vector.accountAddress);

      const transaction: Transaction = new Transaction(
        {
          gasLimit:
            vector.gasLimit && vector.gasLimit !== '0x' ? hexToBN(vector.gasLimit) : new BN(0),
          gasPrice:
            vector.gasPrice && vector.gasPrice !== '0x' ? hexToBN(vector.gasPrice) : new BN(0),
          to: vector.to && vector.to !== '0x' ? getAddress(vector.to).checksum : '0x',
          value: vector.value && vector.value !== '0x' ? hexToBN(vector.value) : new BN(0),
          data: vector.data || '0x',
          nonce: vector.nonce && vector.nonce !== '0x' ? hexToBN(vector.nonce).toNumber() : 0,
        },
        ethMessenger,
        TxStatus.INTIALIZED,
      );

      const unsigned = transaction.getRLPUnsigned();
      expect(unsigned[0]).toEqual(vector.unsignedTransaction);
      const signed = RLPSign(transaction, vector.privateKey);
      expect(signed[1]).toEqual(vector.signedTransaction);
    }
  });

  it('should test recover from ETHSignedtransaction', () => {
    const ethMessenger = new Messenger(provider, ChainType.Ethereum, ChainID.Default);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnVectors.length; i += 1) {
      const vector = txnVectors[i];

      const transaction: Transaction = new Transaction({}, ethMessenger, TxStatus.INTIALIZED);

      transaction.recover(vector.signedTransaction);

      if (vector.gasLimit && vector.gasLimit !== '0x') {
        expect(transaction.txParams.gasLimit.toString()).toEqual(
          hexToBN(vector.gasLimit).toString(),
        );
      }
      if (vector.gasPrice && vector.gasPrice !== '0x') {
        expect(transaction.txParams.gasPrice.toString()).toEqual(
          hexToBN(vector.gasPrice).toString(),
        );
      }
      if (vector.nonce && vector.nonce !== '0x') {
        expect(transaction.txParams.nonce).toEqual(hexToBN(vector.nonce).toNumber());
      }
      if (vector.data) {
        expect(transaction.txParams.data).toEqual(vector.data);
      }
      if (vector.value && vector.value !== '0x') {
        expect(transaction.txParams.value.toString()).toEqual(hexToBN(vector.value).toString());
      }
      if (vector.to && vector.to !== '0x') {
        expect(transaction.txParams.to).toEqual(getAddress(vector.to).checksum);
      }
      expect(transaction.txParams.from.toLowerCase()).toEqual(vector.accountAddress.toLowerCase());
    }
  });
});
