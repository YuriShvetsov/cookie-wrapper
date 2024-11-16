export interface ICookieOptions {
  domain?: string;
}

export interface ICookieWrapper {
  get(key: string, options: ICookieOptions): string | null;
}
