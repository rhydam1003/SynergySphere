declare module 'jsonwebtoken' {
  import type { Buffer as NodeBuffer } from 'node:buffer';
  export type Secret = string | NodeBuffer;
  export interface SignOptions {
    expiresIn?: string | number;
  }
  export interface JwtPayload {
    [key: string]: any;
  }
  export function sign(
    payload: string | object | NodeBuffer,
    secret: Secret,
    options?: SignOptions
  ): string;
  export function verify(token: string, secret: Secret): any;
  const _default: any;
  export default _default;
}
