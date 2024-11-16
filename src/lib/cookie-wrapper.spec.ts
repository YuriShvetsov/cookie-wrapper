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
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the correct value of the cookies item', async () => {
    const cookieName = 'test_cookie_1';
    const cookieValue = 'test_value_1';

    document.cookie = `${cookieName}=${cookieValue}; domain=site.com`;

    const foundCookieValue = cookieWrapper.get('test_cookie_1');

    expect(foundCookieValue).toEqual(cookieValue);
  });

  it('returns an empty string', () => {
    document.cookie = 'test_cookie_2=test-value-2';

    const cookieValue = cookieWrapper.get('some_cookie');

    expect(cookieValue).toEqual('');
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
    const dateAfterOneSecond = new Date(Date.now() + 2000);

    cookieWrapper.set(cookieName, cookieValue, {
      expires: dateAfterOneSecond
    });

    let foundCookie = cookieWrapper.get(cookieName);

    await delay(1000);

    expect(foundCookie).toEqual(cookieValue);

    await delay(2000);

    foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toEqual('');
  });

  it('adds a new cookie with max-age option', async () => {
    const cookieName = 'test_cookie_5';
    const cookieValue = 'test_value_5';
    const maxAge = 2;
    
    cookieWrapper.set(cookieName, cookieValue, {
      'max-age': maxAge
    });

    let foundCookie = cookieWrapper.get(cookieName);

    await delay(1000);

    expect(foundCookie).toEqual(cookieValue);

    await delay(2000);

    foundCookie = cookieWrapper.get(cookieName);

    expect(foundCookie).toEqual('');
  });

  // TODO: write tests for methods: remove, getByRegexp, removeByRegexp
});
