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
exports.StatBoostSelf = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var StatBoostSelf = /** @class */ (function () {
    function StatBoostSelf() {
        this.stat = "MAXHP";
        this.noStack = true;
        this.duration = 3;
        this.amount = 0;
        this.wisMin = 50;
        this.wisPerDuration = 10;
        this.wisDurationBase = 1;
        this.wisPerAmount = 1;
        this.wisAmountBase = 0;
    }
    StatBoostSelf.prototype.getAmount = function (wis) {
        return this.amount + this.getBonusAmount(wis);
    };
    StatBoostSelf.prototype.getBonusAmount = function (wis) {
        if (wis < this.wisMin)
            return 0;
        var extraWis = wis - this.wisMin;
        var extraAmount = 0;
        while (extraWis - this.wisPerAmount > 0) {
            extraWis -= this.wisPerAmount;
            extraAmount += this.wisAmountBase;
        }
        return extraAmount;
    };
    StatBoostSelf.prototype.getDuration = function (wis) {
        return this.duration + this.getBonusDuration(wis);
    };
    StatBoostSelf.prototype.getBonusDuration = function (wis) {
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
    StatBoostSelf.prototype.getName = function () {
        return "StatBoostSelf";
    };
    __decorate([
        (0, Serializable_1.Data)("@_stat"),
        __metadata("design:type", String)
    ], StatBoostSelf.prototype, "stat", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_noStack", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], StatBoostSelf.prototype, "noStack", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], StatBoostSelf.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_amount"),
        __metadata("design:type", Number)
    ], StatBoostSelf.prototype, "amount", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisMin"),
        __metadata("design:type", Number)
    ], StatBoostSelf.prototype, "wisMin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerDuration"),
        __metadata("design:type", Object)
    ], StatBoostSelf.prototype, "wisPerDuration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisDurationBase"),
        __metadata("design:type", Object)
    ], StatBoostSelf.prototype, "wisDurationBase", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerAmount"),
        __metadata("design:type", Object)
    ], StatBoostSelf.prototype, "wisPerAmount", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisAmountBase"),
        __metadata("design:type", Object)
    ], StatBoostSelf.prototype, "wisAmountBase", void 0);
    StatBoostSelf = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], StatBoostSelf);
    return StatBoostSelf;
}());
exports.StatBoostSelf = StatBoostSelf;
