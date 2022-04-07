"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLActivate = exports.activateConstructors = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
exports.activateConstructors = new Map();
function XMLActivate() {
    return function (constructor) {
        exports.activateConstructors.set(constructor.prototype.getName(), constructor);
    };
}
exports.XMLActivate = XMLActivate;
//TODO: scuffed solution
function Proc(Base) {
    return /** @class */ (function (_super) {
        __extends(Proc, _super);
        function Proc() {
            var _this = _super.call(this) || this;
            _this.cooldown = 0;
            _this.proc = 1;
            _this.requiredConditions = StatusEffectType_1.StatusEffectType.Nothing;
            (0, Serializable_1.Data)("@_cooldown")(_this, "cooldown");
            (0, Serializable_1.Data)("@_proc")(_this, "proc");
            (0, Serializable_1.Data)("@_hpRequired")(_this, "hpRequired");
            (0, Serializable_1.Data)("@_hpMinThreshold")(_this, "hpMinThreshold");
            (0, Serializable_1.Data)("@_requiredConditions", StatusEffectType_1.StatusEffectTypeData)(_this, "requiredConditions");
            (0, Serializable_1.Data)("@_mustNotWear")(_this, "mustNotWear");
            return _this;
        }
        return Proc;
    }(Base));
}
var ActivateParser = /** @class */ (function () {
    function ActivateParser() {
    }
    ActivateParser.fromXML = function (xml, nodeName) {
        var _a;
        var activateName = (_a = xml["#text"]) !== null && _a !== void 0 ? _a : xml;
        var constructor = exports.activateConstructors.get(activateName);
        if (constructor !== undefined) {
            if (nodeName === "OnPlayerAbilityActivate" || nodeName === "OnPlayerHitActivate" || nodeName === "OnPlayerShootActivate") {
                constructor = Proc(constructor);
            }
            var obj = new constructor(xml);
            (0, Serializable_1.deserializeObject)(obj, xml);
            return obj;
        }
        return;
    };
    return ActivateParser;
}());
exports.default = ActivateParser;
