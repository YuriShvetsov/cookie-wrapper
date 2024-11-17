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
    get(name?: string | RegExp | any): string | undefined | ICookieItem[];
    set(name: string, value: any, options: ICookieOptions): void;
    remove(name: string | RegExp | any, options: ICookieOptions): void;
}
