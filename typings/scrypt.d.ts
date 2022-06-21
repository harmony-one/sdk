declare module 'scrypt.js' {
  export default function syncScrypt(
    password: ArrayLike<number>,
    salt: ArrayLike<number>,
    N: number,
    r: number,
    p: number,
    dkLen: number,
  ): Buffer;
}
