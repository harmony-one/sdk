export const isKeyString = (keyString: string, lengh: number): boolean => {
  return !!keyString.replace('0x', '').match(`^[0-9a-fA-F]{${lengh}}$`);
};

export const isAddress = (address: string): boolean => {
  return isKeyString(address, 40);
};

export const isPrivateKey = (privateKey: string): boolean => {
  return isKeyString(privateKey, 64);
};

export const isPublicKey = (publicKey: string): boolean => {
  return isKeyString(publicKey, 66);
};
