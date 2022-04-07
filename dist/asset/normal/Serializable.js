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
exports.deserializeObject = exports.serializeObject = exports.Data = exports.XMLHex = exports.XMLNoDefault = exports.XMLEnum = exports.XMLBoolean = exports.XMLValue = void 0;
require("reflect-metadata");
exports.XMLValue = {
    serialize: function (input) { return input; },
    deserialize: function (input) { return input; }
};
exports.XMLBoolean = {
    serialize: function (input) { return input !== false ? { "#text": "" } : undefined; },
    deserialize: function (input) { return input !== undefined; }
};
function XMLEnum(e) {
    return {
        serialize: function (input) { return e[input]; },
        deserialize: function (input) {
            if (typeof (input) === "number") {
                return input;
            }
            return e[input];
        }
    };
}
exports.XMLEnum = XMLEnum;
function XMLNoDefault(defaultValue) {
    return {
        serialize: function (input) {
            if (input === defaultValue)
                return;
            return input;
        },
        deserialize: function (input) { return input; }
    };
}
exports.XMLNoDefault = XMLNoDefault;
exports.XMLHex = {
    serialize: function (input) { return input; },
    deserialize: function (input) {
        if (input === undefined)
            return;
        return "0x" + input.toString(16);
    }
};
function Data(name, dataController, options) {
    if (options === void 0) { options = {}; }
    return function (target, propertyKey) {
        Reflect.defineMetadata("data", { name: name, controller: dataController !== null && dataController !== void 0 ? dataController : exports.XMLValue, options: options }, target, propertyKey);
    };
}
exports.Data = Data;
function serializeObject(target) {
    var e_1, _a, _b;
    var serialized = {};
    try {
        for (var _c = __values(Object.entries(target)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var property = _d.value;
            var data = Reflect.getMetadata("data", target, property[0]);
            if (data === undefined)
                continue;
            var obj = data.options.isConstructed ? data.controller.serialize(property[1]) : (_b = {}, _b[data.name] = data.controller.serialize(property[1]), _b);
            serialized = __assign(__assign({}, serialized), obj);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return serialized;
}
exports.serializeObject = serializeObject;
function deserializeObject(target, data) {
    var e_2, _a, _b, _c;
    try {
        for (var _d = __values(Object.entries(target)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var property = _e.value;
            var dataInfo = Reflect.getMetadata("data", target, property[0]);
            if (dataInfo === undefined)
                continue;
            //TODO: don't use isconstructed as a replacement
            if (dataInfo.options.deserializeFullObject || dataInfo.options.isConstructed) {
                Object.assign(target, (_b = {}, _b[property[0]] = dataInfo.controller.deserialize.call(target, data), _b));
            }
            else {
                var deserialized = dataInfo.controller.deserialize.call(target, data[dataInfo.name]);
                if (deserialized !== undefined)
                    Object.assign(target, (_c = {}, _c[property[0]] = deserialized, _c));
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // console.log(target)
}
exports.deserializeObject = deserializeObject;
