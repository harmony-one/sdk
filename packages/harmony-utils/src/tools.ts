/**
 * @packageDocumentation
 * @module harmony-utils
 * @hidden
 */

export function defineReadOnly(object: any, name: string, value: any): void {
  Object.defineProperty(object, name, {
    enumerable: true,
    value,
    writable: false,
  });
}
