"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubattackData = exports.Subattack = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var Subattack = /** @class */ (function () {
    function Subattack() {
        this.projectileId = 0;
        this.numProjectiles = 1;
        this.arcGap = 15;
        this.rateOfFire = 1;
    }
    __decorate([
        (0, Serializable_1.Data)("@_projectileId"),
        __metadata("design:type", Number)
    ], Subattack.prototype, "projectileId", void 0);
    __decorate([
        (0, Serializable_1.Data)("NumProjectiles"),
        __metadata("design:type", Number)
    ], Subattack.prototype, "numProjectiles", void 0);
    __decorate([
        (0, Serializable_1.Data)("ArcGap"),
        __metadata("design:type", Number)
    ], Subattack.prototype, "arcGap", void 0);
    __decorate([
        (0, Serializable_1.Data)("RateOfFire"),
        __metadata("design:type", Number)
    ], Subattack.prototype, "rateOfFire", void 0);
    return Subattack;
}());
exports.Subattack = Subattack;
exports.SubattackData = {
    serialize: function (subattacks) {
        return subattacks.map(function (subattack) {
            var e_1, _a;
            var data = {};
            try {
                for (var _b = __values(Object.entries(subattack)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    var metadata = Reflect.getMetadata("data", subattack, key);
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
        });
    },
    deserialize: function (xml) {
        if (xml === undefined)
            return [];
        var subattacks = Array.isArray(xml) ? xml : [xml];
        return subattacks.map(function (xml) {
            var subattack = new Subattack();
            (0, Serializable_1.deserializeObject)(subattack, xml);
            return subattack;
        });
    }
};
