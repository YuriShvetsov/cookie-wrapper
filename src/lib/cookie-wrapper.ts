import { Singleton } from '../utils/singleton';
import { ICookieWrapper, ICookieOptions } from './cookie-wrapper.interface';

@Singleton
class CookieWrapper implements ICookieWrapper {
  constructor() {}

  get(key: string, options: ICookieOptions) {
    return '' + key;
  }
}

export const cookieWrapper = new CookieWrapper();
