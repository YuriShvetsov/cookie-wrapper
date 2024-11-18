import { Singleton } from '../utils/singleton';
import { ICookieWrapper, ICookieOptions } from './types';

const DEFAULT_PATH = '/';

@Singleton
class CookieWrapper implements ICookieWrapper {
  constructor() {}

  get(name?: string | RegExp | any) {
    if (!document) return;

    if (!name) {
      return this.getAll();
    }

    if (typeof name === 'string') {
      return this.getByString(name);
    }

    if (name instanceof RegExp) {
      return this.getByRegexp(name);
    }

    throw new Error('Invalid name parameter');
  }

  set(name: string, value: any, options = {}) {
    if (!document) return;

    const modifiedOptions = {
      path: DEFAULT_PATH,
      ...options,
    } as ICookieOptions;

    if (modifiedOptions.expires && modifiedOptions.expires instanceof Date) {
      modifiedOptions.expires = modifiedOptions.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (const optionKey in modifiedOptions) {
      updatedCookie += '; ' + optionKey;

      const optionValue = modifiedOptions[optionKey];

      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  remove(name: string | RegExp | any, options: ICookieOptions = {}) {
    if (name instanceof RegExp) {
      this.removeByRegexp(name, options);
      return;
    }

    this.set(name, '', { ...options, 'max-age': -1 });
  }

  private getAll() {
    if (!document) return;

    const allCookies = document.cookie.split('; ').map((item) => item.split('='));

    return allCookies.map(([name, value]) => ({ name, value }));
  }

  private getByString(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }

    return undefined;
  }

  private getByRegexp(regexp: RegExp) {
    if (!document) return;

    const allCookies = this.getAll();

    return allCookies.filter(({ name }) => name.match(regexp));
  }

  private removeByRegexp(regexp: RegExp, options = {}) {
    const foundCookies = this.getByRegexp(regexp);

    for (const { name } of foundCookies) {
      this.remove(name, options);
    }
  }
}

export const cookieWrapper = new CookieWrapper();
