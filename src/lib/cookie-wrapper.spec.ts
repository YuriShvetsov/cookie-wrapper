import { cookieWrapper } from './cookie-wrapper';
import { delay } from '../utils/delay';

describe('Cookie handling', () => {
  let mockCookie = {};

  beforeEach(() => {
    mockCookie = {};

    Object.defineProperty(document, 'cookie', {
      get: jest.fn(() => {
        const now = new Date();
        return Object.entries(mockCookie)
          // @ts-ignore: Unreachable code error
          .filter(([_, item]) => {
            return (
              // @ts-ignore: Unreachable code error
              (!item.expires || new Date(item.expires) > now) &&
              (!item['max-age'] || (new Date()).setSeconds(+item['max-age']) > now.getTime())
            )
          })
          // @ts-ignore: Unreachable code error
          .map(([name, { value }]) => `${name}=${value}`)
          .join('; ');
      }),
      set: jest.fn((cookieString) => {
        const [cookie, ...options] = cookieString.split(';');
        const [name, value] = cookie.split('=');
        const cookieData = { value, expires: null };

        options.forEach((option: any) => {
          const [key, value] = option.trim().split('=');

          if (key.toLowerCase() === 'expires') {
            cookieData.expires = value;
          }

          if (key.toLowerCase() === 'max-age') {
            cookieData.expires = (new Date(Date.now() + value * 1000)).toUTCString()
          }
        });

        mockCookie[name] = cookieData;
      }),
      configurable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws error when name parameter is not a string, regular expression, or undefined', async () => {
    const cookieName = 'test_cookie_1';
    const cookieValue = 'test_value_1';

    document.cookie = `${cookieName}=${cookieValue}`;

    const t = () => cookieWrapper.get(100);

    expect(t).toThrow(Error);
  });

  it('returns the correct value', async () => {
    const cookieName = 'test_cookie_1';
    const cookieValue = 'test_value_1';

    document.cookie = `${cookieName}=${cookieValue}`;

    const foundCookieValue = cookieWrapper.get(cookieName);

    expect(foundCookieValue).toEqual(cookieValue);
  });

  it('returns undefined', () => {
    document.cookie = 'test_cookie_2=test-value-2';

    const cookieValue = cookieWrapper.get('some_cookie');

    expect(cookieValue).toBeUndefined();
  });

  it('adds a new cookie', () => {
    const cookieName = 'test_cookie_3';
    const cookieValue = 'test_value_3';

    cookieWrapper.set(cookieName, cookieValue);

    const allCookies = document.cookie.split('; ');
    const foundCookie = allCookies.find((cookie) => {
      const name = cookie.split('=')[0];
      return name === cookieName;
    });
    const [foundCookieName, foundCookieValue] = foundCookie.split('=');

    expect(foundCookieName).toEqual(cookieName);
    expect(foundCookieValue).toEqual(cookieValue);
  });

  it('adds a new cookie with expires option', async () => {
    const cookieName = 'test_cookie_4';
    const cookieValue = 'test_value_4';
    const expires = new Date(Date.now() + 2000);

    cookieWrapper.set(cookieName, cookieValue, { expires });

    await delay(1000);

    let foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toEqual(cookieValue);

    await delay(2000);

    foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toBeUndefined();
  });

  it('adds a new cookie with max-age option', async () => {
    const cookieName = 'test_cookie_5';
    const cookieValue = 'test_value_5';
    const maxAge = 2;

    document.cookie = `${cookieName}=${cookieValue}; max-age=${maxAge}`;

    await delay(1000);

    let foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toEqual(cookieValue);

    await delay(2000);

    foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toBeUndefined();
  });

  it('removes cookie by name', () => {
    const cookieName = 'test_cookie_6';
    const cookieValue = 'test_value_6';

    document.cookie = `${cookieName}=${cookieValue}`;

    cookieWrapper.remove(cookieName);

    const foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toBeUndefined();
  });

  it('returns all available cookies', () => {
    const cookies = [
      { name: 'test_cookie_7', value: 'test_value_7' },
      { name: 'test_cookie_8', value: 'test_value_8' }
    ];

    cookies.forEach(({ name, value }) => {
      document.cookie = `${name}=${value}`;
    });

    const allCookies = cookieWrapper.get();

    expect(allCookies).toEqual(cookies);
  });

  it('returns array of cookies when searching by regular expression', () => {
    const cookies = [
      { name: 'test_cookie_9', value: 'test_value_9' },
      { name: 'test_cookie_10', value: 'test_value_10' }
    ];

    cookies.forEach(({ name, value }) => {
      document.cookie = `${name}=${value}`;
    });

    const searchRegexp = new RegExp('^test_cookie');
    const foundCookies = cookieWrapper.get(searchRegexp);

    expect(foundCookies).toEqual(cookies);
  });

  it('removes all cookies by regular expression', () => {
    const cookies = [
      { name: 'test_cookie_11', value: 'test_value_11' },
      { name: 'test_cookie_12', value: 'test_value_12' }
    ];

    cookies.forEach(({ name, value }) => {
      document.cookie = `${name}=${value}`;
    });

    const searchRegexp = new RegExp('^test_cookie');

    cookieWrapper.remove(searchRegexp);

    const foundCookies = cookieWrapper.get(searchRegexp);

    expect(foundCookies.length).toEqual(0);
  });
});
