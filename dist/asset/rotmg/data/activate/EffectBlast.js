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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectBlast = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
var ActivateParser_1 = require("./ActivateParser");
var EffectBlast = /** @class */ (function () {
    function EffectBlast() {
        this.condDuration = 0;
        this.condEffect = StatusEffectType_1.StatusEffectType.Nothing;
        this.radius = 3;
        this.collapseEffect = false;
        this.wisMin = 50;
        this.color = 0xCCCCCC;
        this.wisPerIncrease = 10;
        this.wisDurationBase = 1;
    }
    EffectBlast.prototype.getName = function () {
        return "EffectBlast";
    };
    EffectBlast.prototype.getRadius = function (wis) {
        return this.radius + this.getBonusRadius(wis);
    };
    EffectBlast.prototype.getBonusRadius = function (wis) {
        if (this.wisMin === -1 || wis < this.wisMin)
            return 0;
        return ((wis - this.wisMin) * 0.1);
    };
    EffectBlast.prototype.getDuration = function (wis) {
        return this.condDuration + this.getBonusDuration(wis);
    };
    EffectBlast.prototype.getBonusDuration = function (wis) {
        if (this.wisMin === -1 || wis < this.wisMin)
            return 0;
        var extraWis = wis - this.wisMin;
        var extraDuration = 0;
        while (extraWis > 0) {
            extraWis -= this.wisPerIncrease;
            extraDuration += this.wisDurationBase;
        }
        return extraDuration;
    };
    __decorate([
        (0, Serializable_1.Data)("@_condDuration"),
        __metadata("design:type", Number)
    ], EffectBlast.prototype, "condDuration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_condEffect", StatusEffectType_1.StatusEffectTypeData),
        __metadata("design:type", Number)
    ], EffectBlast.prototype, "condEffect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], EffectBlast.prototype, "radius", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_collapseEffect", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], EffectBlast.prototype, "collapseEffect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisMin"),
        __metadata("design:type", Number)
    ], EffectBlast.prototype, "wisMin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_color"),
        __metadata("design:type", Number)
    ], EffectBlast.prototype, "color", void 0);
    EffectBlast = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], EffectBlast);
    return EffectBlast;
}());
exports.EffectBlast = EffectBlast;
