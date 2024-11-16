import { ICookieWrapper, ICookieOptions } from './cookie-wrapper.interface';
declare class CookieWrapper implements ICookieWrapper {
    constructor();
    get(key: string, options: ICookieOptions): string;
}
export declare const cookieWrapper: CookieWrapper;
export {};
