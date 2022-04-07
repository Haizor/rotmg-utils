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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dye = exports.DyeAnimationData = exports.DyeAnimationType = void 0;
var XMLObject_1 = require("./XMLObject");
var Serializable_1 = require("../../../asset/normal/Serializable");
var Texture_1 = require("./Texture");
var DyeAnimationType;
(function (DyeAnimationType) {
    DyeAnimationType[DyeAnimationType["Horizontal"] = 1] = "Horizontal";
    DyeAnimationType[DyeAnimationType["Vertical"] = 2] = "Vertical";
    DyeAnimationType[DyeAnimationType["Spinning"] = 3] = "Spinning";
})(DyeAnimationType = exports.DyeAnimationType || (exports.DyeAnimationType = {}));
exports.DyeAnimationData = {
    serialize: function (dye) {
        var _a;
        return _a = {},
            _a["#name"] = "AnimatedDye",
            _a["@_type"] = dye.type,
            _a["@_speed"] = dye.speed,
            _a["@_pivotX"] = dye.pivotX,
            _a["@_pivotY"] = dye.pivotY,
            _a;
    },
    deserialize: function (node) {
        if (node === undefined)
            return undefined;
        return {
            type: node["@_type"],
            speed: node["@_speed"],
            pivotX: node["@_pivotX"],
            pivotY: node["@_pivotY"]
        };
    }
};
var Dye = /** @class */ (function (_super) {
    __extends(Dye, _super);
    function Dye() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clothing = undefined;
        _this.accessory = undefined;
        _this.dyeAnimation = undefined;
        return _this;
    }
    Dye.prototype.getColor = function () {
        var _a;
        var dyeTex = (_a = this.clothing) !== null && _a !== void 0 ? _a : this.accessory;
        if (dyeTex === undefined)
            return "#000000";
        return "#".concat(dyeTex.slice(3));
    };
    Dye.prototype.getSheetName = function () {
        var _a;
        var dyeTex = (_a = this.clothing) !== null && _a !== void 0 ? _a : this.accessory;
        if (dyeTex === undefined)
            return "";
        var size = parseInt("0x".concat(dyeTex[2]));
        return "textile".concat(size, "x").concat(size);
    };
    Dye.prototype.getIndex = function () {
        var _a;
        var dyeTex = (_a = this.clothing) !== null && _a !== void 0 ? _a : this.accessory;
        if (dyeTex === undefined)
            return -1;
        return parseInt("0x".concat(dyeTex.slice(3)));
    };
    Dye.prototype.isClothing = function () {
        return this.clothing !== undefined;
    };
    Dye.prototype.isAccessory = function () {
        return this.accessory !== undefined;
    };
    //Technically this could be wrong at some point but whatever
    Dye.prototype.isColor = function () {
        return !this.isTextile();
    };
    Dye.prototype.isTextile = function () {
        var _a;
        var dyeTex = (_a = this.clothing) !== null && _a !== void 0 ? _a : this.accessory;
        if (dyeTex === undefined)
            return false;
        return parseInt("0x".concat(dyeTex[2])) > 1;
    };
    __decorate([
        (0, Serializable_1.Data)("Mask", Texture_1.TextureData),
        __metadata("design:type", Object)
    ], Dye.prototype, "mask", void 0);
    __decorate([
        (0, Serializable_1.Data)("Tex1", Serializable_1.XMLHex),
        __metadata("design:type", String)
    ], Dye.prototype, "clothing", void 0);
    __decorate([
        (0, Serializable_1.Data)("Tex2", Serializable_1.XMLHex),
        __metadata("design:type", String)
    ], Dye.prototype, "accessory", void 0);
    __decorate([
        (0, Serializable_1.Data)("AnimatedDye", exports.DyeAnimationData),
        __metadata("design:type", Object)
    ], Dye.prototype, "dyeAnimation", void 0);
    return Dye;
}(XMLObject_1.XMLObject));
exports.Dye = Dye;
