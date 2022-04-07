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
exports.HealNova = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var HealNova = /** @class */ (function () {
    function HealNova() {
        this.range = 2.5;
        this.amount = 40;
        this.wisMin = 50;
        this.wisPerIncrease = 10;
        this.wisHealBase = 30;
        this.splitHealing = true;
    }
    HealNova.prototype.getHealAmount = function (wis) {
        if (wis < this.wisMin) {
            return this.amount;
        }
        return this.amount + this.getBonusHealAmount(wis);
    };
    HealNova.prototype.getBonusHealAmount = function (wis) {
        var extraWis = wis - this.wisMin;
        var extraHeal = 0;
        while (extraWis - this.wisPerIncrease > 0) {
            extraWis -= this.wisPerIncrease;
            extraHeal += this.wisHealBase;
        }
        return extraHeal;
    };
    HealNova.prototype.getRange = function (wis) {
        return this.range + this.getBonusRange(wis);
    };
    HealNova.prototype.getBonusRange = function (wis) {
        if (wis < this.wisMin)
            return 0;
        return (wis - this.wisMin) * 0.1;
    };
    HealNova.prototype.getName = function () {
        return "HealNova";
    };
    __decorate([
        (0, Serializable_1.Data)("@_range"),
        __metadata("design:type", Number)
    ], HealNova.prototype, "range", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_amount"),
        __metadata("design:type", Number)
    ], HealNova.prototype, "amount", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisMin"),
        __metadata("design:type", Number)
    ], HealNova.prototype, "wisMin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerIncrease"),
        __metadata("design:type", Number)
    ], HealNova.prototype, "wisPerIncrease", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisHealBase"),
        __metadata("design:type", Number)
    ], HealNova.prototype, "wisHealBase", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_splitHealing", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], HealNova.prototype, "splitHealing", void 0);
    HealNova = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], HealNova);
    return HealNova;
}());
exports.HealNova = HealNova;
