var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { cookieWrapper } from './cookie-wrapper';
import { delay } from '../utils/delay';
describe('Cookie handling', function () {
    var mockCookie = {};
    beforeEach(function () {
        mockCookie = {};
        Object.defineProperty(document, 'cookie', {
            get: jest.fn(function () {
                var now = new Date();
                return Object.entries(mockCookie)
                    // @ts-ignore: Unreachable code error
                    .filter(function (_a) {
                    var _ = _a[0], item = _a[1];
                    return (
                    // @ts-ignore: Unreachable code error
                    (!item.expires || new Date(item.expires) > now) &&
                        (!item['max-age'] || (new Date()).setSeconds(+item['max-age']) > now.getTime()));
                })
                    // @ts-ignore: Unreachable code error
                    .map(function (_a) {
                    var name = _a[0], value = _a[1].value;
                    return "".concat(name, "=").concat(value);
                })
                    .join('; ');
            }),
            set: jest.fn(function (cookieString) {
                var _a = cookieString.split(';'), cookie = _a[0], options = _a.slice(1);
                var _b = cookie.split('='), name = _b[0], value = _b[1];
                var cookieData = { value: value, expires: null };
                options.forEach(function (option) {
                    var _a = option.trim().split('='), key = _a[0], value = _a[1];
                    if (key.toLowerCase() === 'expires') {
                        cookieData.expires = value;
                    }
                    if (key.toLowerCase() === 'max-age') {
                        cookieData.expires = (new Date(Date.now() + value * 1000)).toUTCString();
                    }
                });
                mockCookie[name] = cookieData;
            }),
            configurable: true
        });
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('throws error when name parameter is not a string, regular expression, or undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookieName, cookieValue, t;
        return __generator(this, function (_a) {
            cookieName = 'test_cookie_1';
            cookieValue = 'test_value_1';
            document.cookie = "".concat(cookieName, "=").concat(cookieValue);
            t = function () { return cookieWrapper.get(100); };
            expect(t).toThrow(Error);
            return [2 /*return*/];
        });
    }); });
    it('returns the correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookieName, cookieValue, foundCookieValue;
        return __generator(this, function (_a) {
            cookieName = 'test_cookie_1';
            cookieValue = 'test_value_1';
            document.cookie = "".concat(cookieName, "=").concat(cookieValue);
            foundCookieValue = cookieWrapper.get(cookieName);
            expect(foundCookieValue).toEqual(cookieValue);
            return [2 /*return*/];
        });
    }); });
    it('returns undefined', function () {
        document.cookie = 'test_cookie_2=test-value-2';
        var cookieValue = cookieWrapper.get('some_cookie');
        expect(cookieValue).toBeUndefined();
    });
    it('adds a new cookie', function () {
        var cookieName = 'test_cookie_3';
        var cookieValue = 'test_value_3';
        cookieWrapper.set(cookieName, cookieValue);
        var allCookies = document.cookie.split('; ');
        var foundCookie = allCookies.find(function (cookie) {
            var name = cookie.split('=')[0];
            return name === cookieName;
        });
        var _a = foundCookie.split('='), foundCookieName = _a[0], foundCookieValue = _a[1];
        expect(foundCookieName).toEqual(cookieName);
        expect(foundCookieValue).toEqual(cookieValue);
    });
    it('adds a new cookie with expires option', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookieName, cookieValue, expires, foundCookie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookieName = 'test_cookie_4';
                    cookieValue = 'test_value_4';
                    expires = new Date(Date.now() + 2000);
                    cookieWrapper.set(cookieName, cookieValue, { expires: expires });
                    foundCookie = cookieWrapper.get(cookieName);
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    expect(foundCookie).toEqual(cookieValue);
                    return [4 /*yield*/, delay(2000)];
                case 2:
                    _a.sent();
                    foundCookie = cookieWrapper.get(cookieName);
                    expect(foundCookie).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('adds a new cookie with max-age option', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookieName, cookieValue, maxAge, foundCookie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookieName = 'test_cookie_5';
                    cookieValue = 'test_value_5';
                    maxAge = 2;
                    document.cookie = "".concat(cookieName, "=").concat(cookieValue, "; max-age=").concat(maxAge);
                    foundCookie = cookieWrapper.get(cookieName);
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    expect(foundCookie).toEqual(cookieValue);
                    return [4 /*yield*/, delay(2000)];
                case 2:
                    _a.sent();
                    foundCookie = cookieWrapper.get(cookieName);
                    expect(foundCookie).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('removes cookie by name', function () {
        var cookieName = 'test_cookie_6';
        var cookieValue = 'test_value_6';
        document.cookie = "".concat(cookieName, "=").concat(cookieValue);
        cookieWrapper.remove(cookieName);
        var foundCookie = cookieWrapper.get(cookieName);
        expect(foundCookie).toBeUndefined();
    });
    it('returns all available cookies', function () {
        var cookies = [
            { name: 'test_cookie_7', value: 'test_value_7' },
            { name: 'test_cookie_8', value: 'test_value_8' }
        ];
        cookies.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            document.cookie = "".concat(name, "=").concat(value);
        });
        var allCookies = cookieWrapper.get();
        expect(allCookies).toEqual(cookies);
    });
    it('returns array of cookies when searching by regular expression', function () {
        var cookies = [
            { name: 'test_cookie_9', value: 'test_value_9' },
            { name: 'test_cookie_10', value: 'test_value_10' }
        ];
        cookies.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            document.cookie = "".concat(name, "=").concat(value);
        });
        var searchRegexp = new RegExp('^test_cookie');
        var foundCookies = cookieWrapper.get(searchRegexp);
        expect(foundCookies).toEqual(cookies);
    });
    it('removes all cookies by regular expression', function () {
        var cookies = [
            { name: 'test_cookie_11', value: 'test_value_11' },
            { name: 'test_cookie_12', value: 'test_value_12' }
        ];
        cookies.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            document.cookie = "".concat(name, "=").concat(value);
        });
        var searchRegexp = new RegExp('^test_cookie');
        cookieWrapper.remove(searchRegexp);
        var foundCookies = cookieWrapper.get(searchRegexp);
        expect(foundCookies.length).toEqual(0);
    });
});
