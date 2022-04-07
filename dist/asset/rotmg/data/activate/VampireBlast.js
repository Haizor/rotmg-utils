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
exports.VampireBlast = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
var ActivateParser_1 = require("./ActivateParser");
//how is it that deca has 10 million properties for skulls but necro is shit. curious.
var VampireBlast = /** @class */ (function () {
    function VampireBlast() {
        this.radius = 2.5;
        this.totalDamage = 35;
        this.ignoreDef = 0;
        this.heal = 25;
        this.healRange = 5;
        this.wisMin = 50;
        this.wisPerIncrease = 10;
        this.wisDamageBase = 10;
        this.wisPerRad = 10;
        this.incrRad = 0.5;
        this.condEffect = StatusEffectType_1.StatusEffectType.Nothing;
        this.condDuration = 0;
        this.color = "FF0000";
    }
    VampireBlast.prototype.getName = function () {
        return "VampireBlast";
    };
    VampireBlast.prototype.getDamage = function (wis) {
        return this.totalDamage + this.getBonusDamage(wis);
    };
    VampireBlast.prototype.getBonusDamage = function (wis) {
        if (wis < this.wisMin)
            return 0;
        var extraWis = wis - this.wisMin;
        var extraDamage = 0;
        while (extraWis > 0) {
            extraWis -= this.wisPerIncrease;
            extraDamage += this.wisDamageBase;
        }
        return extraDamage;
    };
    VampireBlast.prototype.getHealRadius = function (wis) {
        return this.healRange + this.getBonusHealRadius(wis);
    };
    VampireBlast.prototype.getBonusHealRadius = function (wis) {
        if (wis < this.wisMin)
            return 0;
        var extraWis = wis - this.wisMin;
        var extraRad = 0;
        while (extraWis > 0) {
            extraWis -= this.wisPerRad;
            extraRad += this.incrRad;
        }
        return extraRad;
    };
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "radius", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_totalDamage"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "totalDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_ignoreDef"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "ignoreDef", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_heal"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "heal", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_healRange"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "healRange", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisMin"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "wisMin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerIncrease"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "wisPerIncrease", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisDamageBase"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "wisDamageBase", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerRad"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "wisPerRad", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_incrRad"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "incrRad", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_condEffect", StatusEffectType_1.StatusEffectTypeData),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "condEffect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_condDuration"),
        __metadata("design:type", Number)
    ], VampireBlast.prototype, "condDuration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_color"),
        __metadata("design:type", String)
    ], VampireBlast.prototype, "color", void 0);
    VampireBlast = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], VampireBlast);
    return VampireBlast;
}());
exports.VampireBlast = VampireBlast;
