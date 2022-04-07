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
exports.ConditionEffectSelf = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
var ActivateParser_1 = require("./ActivateParser");
var ConditionEffectSelf = /** @class */ (function () {
    function ConditionEffectSelf() {
        this.effect = StatusEffectType_1.StatusEffectType.Healing;
        this.duration = 0;
        this.wisMin = 50;
        this.wisPerDuration = 10;
        this.wisDurationBase = 1;
    }
    ConditionEffectSelf.prototype.getDuration = function (wis) {
        return this.duration + this.getBonusDuration(wis);
    };
    ConditionEffectSelf.prototype.getBonusDuration = function (wis) {
        if (wis < this.wisMin)
            return 0;
        var extraWis = wis - this.wisMin;
        var extraDuration = 0;
        while (extraWis - this.wisPerDuration > 0) {
            extraWis -= this.wisPerDuration;
            extraDuration += this.wisDurationBase;
        }
        return extraDuration;
    };
    ConditionEffectSelf.prototype.getName = function () {
        return "ConditionEffectSelf";
    };
    __decorate([
        (0, Serializable_1.Data)("@_effect", StatusEffectType_1.StatusEffectTypeData),
        __metadata("design:type", Number)
    ], ConditionEffectSelf.prototype, "effect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], ConditionEffectSelf.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisMin"),
        __metadata("design:type", Number)
    ], ConditionEffectSelf.prototype, "wisMin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerDuration"),
        __metadata("design:type", Number)
    ], ConditionEffectSelf.prototype, "wisPerDuration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisDurationBase"),
        __metadata("design:type", Number)
    ], ConditionEffectSelf.prototype, "wisDurationBase", void 0);
    ConditionEffectSelf = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], ConditionEffectSelf);
    return ConditionEffectSelf;
}());
exports.ConditionEffectSelf = ConditionEffectSelf;
