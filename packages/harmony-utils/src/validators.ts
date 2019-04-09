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

/**
 * [isNumber verify param is a Number]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isNumber = (obj: any): boolean => {
  return obj === +obj;
};

/**
 * [isNumber verify param is a Number]
 * @param  {any}  obj [value]
 * @return {boolean}     [boolean]
 */
export const isInt = (obj: any): boolean => {
  return isNumber(obj) && Number.isInteger(obj);
};

/**
 * [isString verify param is a String]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isString = (obj: any): boolean => {
  return obj === `${obj}`;
};

/**
 * [isBoolean verify param is a Boolean]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isBoolean = (obj: any): boolean => {
  return obj === !!obj;
};

/**
 * [isArray verify param input is an Array]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isArray = (obj: any): boolean => {
  return Array.isArray(obj);
};

/**
 * [isJson verify param input is a Json]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isJsonString = (obj: any): boolean => {
  try {
    return !!JSON.parse(obj) && isObject(JSON.parse(obj));
  } catch (e) {
    return false;
  }
};

/**
 * [isObject verify param is an Object]
 * @param  {any}  obj [value]
 * @return {Boolean}     [boolean]
 */
export const isObject = (obj: any): boolean => {
  return obj !== null && !Array.isArray(obj) && typeof obj === 'object';
};

/**
 * [isFunction verify param is a Function]
 * @param  {any}  obj [value]
 * @return {Boolean}     [description]
 */

export const isFunction = (obj: any): boolean => {
  return typeof obj === 'function';
};

export const isHex = (obj: string): boolean => {
  if (!isString(obj)) {
    throw new Error(`${obj} is not string`);
  } else {
    try {
      return (
        (obj.startsWith('0x') || obj.startsWith('-0x')) &&
        isNumber(Number.parseInt(obj.toLowerCase().replace('0x', ''), 16))
      );
    } catch (error) {
      throw error;
    }
  }
};
