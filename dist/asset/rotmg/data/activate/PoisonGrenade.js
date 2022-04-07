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
exports.PoisonGrenade = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var PoisonGrenade = /** @class */ (function () {
    function PoisonGrenade() {
        this.radius = 2;
        this.impactDamage = 20;
        this.totalDamage = 120;
        this.duration = 3;
        this.throwTime = 0.8;
        this.color = "DDFF00";
    }
    PoisonGrenade.prototype.getDOT = function () {
        return this.totalDamage - this.impactDamage;
    };
    PoisonGrenade.prototype.getDPS = function () {
        if (this.duration === 0) {
            return this.totalDamage;
        }
        return this.getDOT() / this.duration;
    };
    PoisonGrenade.prototype.getName = function () {
        return "PoisonGrenade";
    };
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], PoisonGrenade.prototype, "radius", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_impactDamage"),
        __metadata("design:type", Number)
    ], PoisonGrenade.prototype, "impactDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_totalDamage"),
        __metadata("design:type", Number)
    ], PoisonGrenade.prototype, "totalDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], PoisonGrenade.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_throwTime"),
        __metadata("design:type", Number)
    ], PoisonGrenade.prototype, "throwTime", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_color"),
        __metadata("design:type", String)
    ], PoisonGrenade.prototype, "color", void 0);
    PoisonGrenade = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], PoisonGrenade);
    return PoisonGrenade;
}());
exports.PoisonGrenade = PoisonGrenade;
