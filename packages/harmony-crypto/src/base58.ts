import base from 'base-x';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const base58 = base(BASE58);

export const bs58Encode = (hex: string): string => {
  if (hex.startsWith('0x') || hex.startsWith('0X')) {
    hex = hex.substring(2);
  }
  const hexBuff = Buffer.from(hex, 'hex');
  return base58.encode(hexBuff);
};

export const bs58Decode = (baseString: string): string => {
  const baseBuf = base58.decode(baseString);
  return baseBuf.toString('hex');
};
