import { Singleton } from '../utils/singleton';
import { ICookieWrapper, ICookieOptions } from './cookie-wrapper.interface';

const DEFAULT_PATH = '/';

@Singleton
class CookieWrapper implements ICookieWrapper {
  constructor() {}

  get(name: string) {
    if (!document) return;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }

    return '';
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

  remove(name: string, options: ICookieOptions = {}) {
    this.set(name, '', { ...options, 'max-age': -1 });
  }

  getByRegexp(regexp: RegExp) {
    if (!document) return;

    const allCookies: string[] = document.cookie.split(';').map((item) => item.split('=')[0].trim());
    const foundCookies: string[] = allCookies.filter((item) => item.match(regexp));

    return foundCookies.map((name: string) => ({
      name,
      value: this.get(name)
    }));
  }

  removeByRegexp(regexp: RegExp, options = {}) {
    const foundCookies = this.getByRegexp(regexp);

    for (const { name } of foundCookies) {
      this.remove(name, options);
    }
  }
}

export const cookieWrapper = new CookieWrapper();
