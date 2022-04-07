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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateSerializer = exports.ActivateData = void 0;
var ActivateParser_1 = __importDefault(require("./ActivateParser"));
var ActivateData = function (nodeName) {
    if (nodeName === void 0) { nodeName = "Activate"; }
    return {
        serialize: function (activates) {
            var _a;
            return _a = {}, _a[nodeName] = activates.map(function (activate) {
                var e_1, _a;
                if (activate === undefined)
                    return undefined;
                var data = {
                    "#text": activate.getName()
                };
                try {
                    for (var _b = __values(Object.entries(activate)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                        var metadata = Reflect.getMetadata("data", activate, key);
                        if (metadata !== undefined) {
                            data[metadata.name] = metadata.controller.serialize(value);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return data;
            }), _a;
        },
        deserialize: function (xml) {
            if (xml[nodeName] === undefined)
                return [];
            var activates = Array.isArray(xml[nodeName]) ? xml[nodeName] : [xml[nodeName]];
            return activates.map(function (xml) { return ActivateParser_1.default.fromXML(xml, nodeName); }).filter(function (activate) { return activate !== undefined; });
        }
    };
};
exports.ActivateData = ActivateData;
function ActivateSerializer(value) {
    return value.map(function (activate) {
        var e_2, _a;
        if (activate === undefined)
            return undefined;
        var data = {
            "#text": activate.getName()
        };
        try {
            for (var _b = __values(Object.entries(activate)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value_1 = _d[1];
                var metadata = Reflect.getMetadata("serialization", activate, key);
                if (metadata !== undefined) {
                    data[metadata.name] = metadata.controller.serialize(value_1);
                }
                else
                    data["@_".concat(key)] = value_1;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return data;
    });
}
exports.ActivateSerializer = ActivateSerializer;
