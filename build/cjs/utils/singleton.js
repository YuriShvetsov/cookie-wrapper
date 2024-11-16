"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = Singleton;
function Singleton(ctr) {
    var instance;
    return /** @class */ (function () {
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (instance) {
                console.error('You cannot instantiate a singleton twice!');
                return instance;
            }
            instance = new (ctr.bind.apply(ctr, __spreadArray([void 0], args, false)))();
            return instance;
        }
        return class_1;
    }());
}
