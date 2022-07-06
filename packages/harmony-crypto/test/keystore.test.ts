/**
 * @packageDocumentation
 * @ignore
 */

import * as keys from '../src/keyTool';
import * as keystore from '../src/keystore';

describe('Keystore', () => {
  const privateKey = keys.generatePrivateKey();
  const publicKey = keys.getPubkeyFromPrivateKey(privateKey);
  const address = keys.getAddressFromPublicKey(publicKey).substring(2); // remove "0x" prefix
  const password = 'password123';
  const phrase = 'some phrase';

  it('check encrypt', async () => {
    try {
      const encrypted = await keystore.encrypt(privateKey, password);
      const parsedData = JSON.parse(encrypted);
      expect(parsedData.address).toEqual(address);
      expect(parsedData.id.length).toBe(36);
    } catch (error) {
      expect(error.message).toEqual('privateKey is not correct');
    }
  });

  it('check encrypt (kdf=scrypt)', async () => {
    try {
      const encrypted = await keystore.encrypt(privateKey, password, {
        kdf: 'scrypt',
        level: 16,
      });
      const parsedData = JSON.parse(encrypted);
      expect(parsedData.address).toEqual(address);
      expect(parsedData.id.length).toBe(36);
    } catch (error) {
      expect(error.message).toEqual('privateKey is not correct');
    }
  });

  it('check encrypt (invalid "level" option)', async () => {
    try {
      await keystore.encrypt(privateKey, password, {
        kdf: 'scrypt',
        level: 15,
      });
    } catch (error) {
      expect(error.message).toEqual('N must be > 0 and a power of 2');
    }
  });

  it('check encrypt (kdf=pbkdf2)', async () => {
    try {
      await keystore.encrypt(privateKey, password, {
        kdf: 'pbkdf2',
      });
    } catch (error) {
      expect(error.message).toEqual('Iterations not a number');
    }
  });

  it('check encrypt (private key and password are undefined)', async () => {
    try {
      // @ts-ignore
      await keystore.encrypt(undefined, undefined);
    } catch (error) {
      expect(error.message).toEqual("Cannot read properties of undefined (reading 'replace')");
    }
  });

  it('check encryptPhrase', async () => {
    try {
      const encrypted = await keystore.encryptPhrase(phrase, password);
      const parsedData = JSON.parse(encrypted);
      expect(parsedData.version).toEqual(3);
      expect(parsedData.crypto.cipher).toEqual('aes-128-ctr');
    } catch (error) {
      expect(error.message).toEqual('privateKey is not correct');
    }
  });

  it('check encryptPhrase (kdf=scrypt)', async () => {
    try {
      const encrypted = await keystore.encryptPhrase(phrase, password, {
        kdf: 'scrypt',
        level: 16,
      });
      const parsedData = JSON.parse(encrypted);
      expect(parsedData.version).toEqual(3);
      expect(parsedData.crypto.cipher).toEqual('aes-128-ctr');
    } catch (error) {
      expect(error.message).toEqual('privateKey is not correct');
    }
  });

  it('check decrypt', async () => {
    try {
      const encrypted = await keystore.encrypt(privateKey, password);
      const decrypted = await keystore.decrypt(JSON.parse(encrypted), password);
      expect(decrypted).toEqual(privateKey);
    } catch (error) {
      expect(error.message).toEqual('Failed to decrypt.');
    }
  });

  it('check decrypt (wrong password)', async () => {
    try {
      const encrypted = await keystore.encrypt(privateKey, password);
      await keystore.decrypt(JSON.parse(encrypted), 'wrong_password');
    } catch (error) {
      expect(error.message).toEqual('Failed to decrypt.');
    }
  });

  it('check decryptPhrase', async () => {
    try {
      const encrypted = await keystore.encryptPhrase(phrase, password);
      const decrypted = await keystore.decryptPhrase(JSON.parse(encrypted), password);
      expect(decrypted).toEqual(phrase);
    } catch (error) {
      expect(error.message).toEqual('Failed to decrypt.');
    }
  });
});
