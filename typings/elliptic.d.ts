import BN from 'bn.js';
import hash from 'hash.js';

declare namespace Elliptic {
  type HexEnc = 'hex';
  type Utf8Enc = 'utf8';
  type CurveTypes = 'short' | 'edwards' | 'mont';
  type PrivateKey =
    | string
    | Buffer
    | { x: Buffer; y: Buffer }
    | { x: string; y: string };

  interface Curve {
    type: CurveTypes;
    n: BN;
    g: Point;
    decodePoint(msg: Buffer | Array<any> | string, enc?: string): Point;
    validate(point: Point): boolean;
  }

  interface Point {
    x: BN;
    y: BN;
    inf: boolean;
    encode(enc: string, compressed?: boolean): Array<number>;
    encodeCompressed(enc?: string): Array<number>;
    isInfinity(): boolean;
    add(k: BN | Number | Point): Point;
    mul(k: BN | Number | Point): Point;
  }

  interface EC {
    recoverPubKey(
      arg0: Uint8Array | null,
      rs: { r: Uint8Array | null; s: Uint8Array | null },
      recoveryParam: number | undefined,
    ): any;
    curve: Curve;
    genKeyPair(opt?: GenKeyPairOpt): KeyPair;
    keyFromPrivate(priv: string, enc: string): KeyPair;
    keyFromPublic(pub: string, enc: string): KeyPair;
  }

  interface GenKeyPairOpt {
    entropy?: string | Buffer;
    entropyEnc?: HexEnc | Utf8Enc;
    pers?: string | Buffer;
    persEnc?: HexEnc | Utf8Enc;
  }

  interface KeyPair {
    sign(arg0: Uint8Array | null, arg1: { canonical: boolean }): any;
    fromPublic(ec: Curve, pub: BN, enc: string): KeyPair;
    fromPrivate(ec: Curve, priv: BN, enc: string): KeyPair;
    // this is broken, but we can't fix it without changing the upstream
    // library; compact is optional, but optional parameters should always
    // _follow_ mandatory ones.
    getPublic(compact: boolean, enc: string): string;
    getPrivate<T = undefined>(enc?: T): T extends HexEnc ? string : BN;
    validate(): { result: boolean; reason: string | null };
  }

  export function ec(curve: string): EC;
}

export = Elliptic;
