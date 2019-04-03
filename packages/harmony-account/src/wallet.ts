import { bip39, hdkey, EncryptOptions } from '@harmony/crypto';
import { isPrivateKey } from '@harmony/utils';
import { Account } from './account';

class Wallet {
  private accountMap: Map<string, Account> = new Map();
  get accounts(): string[] {
    return [...this.accountMap.keys()];
  }
  generateMnemonic(): string {
    return bip39.generateMnemonic();
  }
  addByMnemonic(phrase: string, index: number = 0) {
    if (!this.isValidMnemonic(phrase)) {
      throw new Error(`Invalid mnemonic phrase: ${phrase}`);
    }
    const seed = bip39.mnemonicToSeed(phrase);
    const hdKey = hdkey.fromMasterSeed(seed);
    const childKey = hdKey.derive(`m/44'/313'/0'/0/${index}`);
    const privateKey = childKey.privateKey.toString('hex');
    return this.addByPrivateKey(privateKey);
  }
  addByPrivateKey(privateKey: string): Account {
    try {
      const newAcc = Account.add(privateKey);
      if (newAcc.address) {
        this.accountMap.set(newAcc.address, newAcc);
        return newAcc;
      } else {
        throw new Error('add account failed');
      }
    } catch (error) {
      throw error;
    }
  }
  async encryptAccount(
    address: string,
    password: string,
    options?: EncryptOptions,
  ): Promise<Account> {
    try {
      const foundAcc = this.getAccount(address);
      if (
        foundAcc &&
        foundAcc.privateKey &&
        isPrivateKey(foundAcc.privateKey)
      ) {
        await foundAcc.toFile(password, options);
        return foundAcc;
      } else if (
        foundAcc &&
        foundAcc.privateKey &&
        !isPrivateKey(foundAcc.privateKey)
      ) {
        return foundAcc;
      } else {
        throw new Error('encrypt account failed');
      }
    } catch (error) {
      throw error;
    }
  }

  async decryptAccount(address: string, password: string): Promise<Account> {
    try {
      const foundAcc = this.getAccount(address);
      if (
        foundAcc &&
        foundAcc.privateKey &&
        !isPrivateKey(foundAcc.privateKey)
      ) {
        await foundAcc.fromFile(foundAcc.privateKey, password);
        return foundAcc;
      } else if (
        foundAcc &&
        foundAcc.privateKey &&
        isPrivateKey(foundAcc.privateKey)
      ) {
        return foundAcc;
      } else {
        throw new Error('decrypt account failed');
      }
    } catch (error) {
      throw error;
    }
  }

  getAccount(address: string): Account | undefined {
    return this.accountMap.get(address);
  }

  removeAccount(address: string): void {
    this.accountMap.delete(address);
  }

  private isValidMnemonic(phrase: string): boolean {
    if (phrase.trim().split(/\s+/g).length < 12) {
      return false;
    }
    return bip39.validateMnemonic(phrase);
  }
}

export { Wallet };
