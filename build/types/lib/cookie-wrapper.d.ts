import { ICookieWrapper, ICookieOptions } from './cookie-wrapper.interface';
declare class CookieWrapper implements ICookieWrapper {
    constructor();
    get(name?: string | RegExp | any): string | {
        name: string;
        value: string;
    }[];
    set(name: string, value: any, options?: {}): void;
    remove(name: string | RegExp | any, options?: ICookieOptions): void;
    private getAll;
    private getByString;
    private getByRegexp;
    private removeByRegexp;
}
export declare const cookieWrapper: CookieWrapper;
export {};
