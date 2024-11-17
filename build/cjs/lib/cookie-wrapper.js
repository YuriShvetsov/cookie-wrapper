"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieWrapper = void 0;
var singleton_1 = require("../utils/singleton");
var DEFAULT_PATH = '/';
var CookieWrapper = function () {
    var _classDecorators = [singleton_1.Singleton];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CookieWrapper = _classThis = /** @class */ (function () {
        function CookieWrapper_1() {
        }
        CookieWrapper_1.prototype.get = function (name) {
            if (!document)
                return;
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
        };
        CookieWrapper_1.prototype.set = function (name, value, options) {
            if (options === void 0) { options = {}; }
            if (!document)
                return;
            var modifiedOptions = __assign({ path: DEFAULT_PATH }, options);
            if (modifiedOptions.expires && modifiedOptions.expires instanceof Date) {
                modifiedOptions.expires = modifiedOptions.expires.toUTCString();
            }
            var updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            for (var optionKey in modifiedOptions) {
                updatedCookie += '; ' + optionKey;
                var optionValue = modifiedOptions[optionKey];
                if (optionValue !== true) {
                    updatedCookie += '=' + optionValue;
                }
            }
            document.cookie = updatedCookie;
        };
        CookieWrapper_1.prototype.remove = function (name, options) {
            if (options === void 0) { options = {}; }
            if (name instanceof RegExp) {
                this.removeByRegexp(name, options);
                return;
            }
            this.set(name, '', __assign(__assign({}, options), { 'max-age': -1 }));
        };
        CookieWrapper_1.prototype.getAll = function () {
            if (!document)
                return;
            var allCookies = document.cookie.split('; ').map(function (item) { return item.split('='); });
            return allCookies.map(function (_a) {
                var name = _a[0], value = _a[1];
                return ({ name: name, value: value });
            });
        };
        CookieWrapper_1.prototype.getByString = function (name) {
            var value = "; ".concat(document.cookie);
            var parts = value.split("; ".concat(name, "="));
            if (parts.length === 2) {
                return decodeURIComponent(parts.pop().split(';').shift());
            }
            return undefined;
        };
        CookieWrapper_1.prototype.getByRegexp = function (regexp) {
            if (!document)
                return;
            var allCookies = this.getAll();
            return allCookies.filter(function (_a) {
                var name = _a.name;
                return name.match(regexp);
            });
        };
        CookieWrapper_1.prototype.removeByRegexp = function (regexp, options) {
            if (options === void 0) { options = {}; }
            var foundCookies = this.getByRegexp(regexp);
            for (var _i = 0, foundCookies_1 = foundCookies; _i < foundCookies_1.length; _i++) {
                var name_1 = foundCookies_1[_i].name;
                this.remove(name_1, options);
            }
        };
        return CookieWrapper_1;
    }());
    __setFunctionName(_classThis, "CookieWrapper");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CookieWrapper = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CookieWrapper = _classThis;
}();
exports.cookieWrapper = new CookieWrapper();
