export interface ICookieOptions {
  domain?: string;
  expires?: string | Date;
  'max-age'?: number;
  path?: string;
}

export interface ICookieItem {
  name: string;
  value: string;
}

export interface ICookieWrapper {
  get(name: string): string;

  set(name: string, value: any, options: ICookieOptions): void;

  remove(name: string, options: ICookieOptions): void;

  getByRegexp(regexp: RegExp): ICookieItem[];

  removeByRegexp(regexp: RegExp, options: ICookieOptions): void;
}
