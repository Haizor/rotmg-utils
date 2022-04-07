"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressPromise = void 0;
function progressPromise(promises, onProgressChange) {
    return new Promise(function (res, rej) {
        var e_1, _a;
        var results = [];
        try {
            for (var promises_1 = __values(promises), promises_1_1 = promises_1.next(); !promises_1_1.done; promises_1_1 = promises_1.next()) {
                var promise = promises_1_1.value;
                promise.then(function (result) {
                    results.push(result);
                    if (onProgressChange !== undefined)
                        onProgressChange(results.length);
                    if (results.length === promises.length) {
                        res(results);
                    }
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (promises_1_1 && !promises_1_1.done && (_a = promises_1.return)) _a.call(promises_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.progressPromise = progressPromise;
