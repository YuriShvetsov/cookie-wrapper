import { ICookieWrapper, ICookieOptions } from './cookie-wrapper.interface';
declare class CookieWrapper implements ICookieWrapper {
    constructor();
    get(name: string): string;
    set(name: string, value: any, options?: {}): void;
    remove(name: string, options?: ICookieOptions): void;
    getByRegexp(regexp: RegExp): {
        name: string;
        value: string;
    }[];
    removeByRegexp(regexp: RegExp, options?: {}): void;
}
export declare const cookieWrapper: CookieWrapper;
export {};
