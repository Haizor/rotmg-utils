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
exports.Trap = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
var ActivateParser_1 = require("./ActivateParser");
var Trap = /** @class */ (function () {
    function Trap() {
        this.radius = 3.5;
        this.totalDamage = 60;
        this.condEffect = StatusEffectType_1.StatusEffectType.Slowed;
        this.condDuration = 3;
        this.color = 0xFF0000;
        this.duration = 20;
        this.throwTime = 1;
        this.sensitivity = 0.5;
    }
    Trap.prototype.getName = function () {
        return "Trap";
    };
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], Trap.prototype, "radius", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_totalDamage"),
        __metadata("design:type", Number)
    ], Trap.prototype, "totalDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_condEffect", StatusEffectType_1.StatusEffectTypeData),
        __metadata("design:type", Number)
    ], Trap.prototype, "condEffect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_condDuration"),
        __metadata("design:type", Number)
    ], Trap.prototype, "condDuration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_color"),
        __metadata("design:type", Number)
    ], Trap.prototype, "color", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], Trap.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_throwTime"),
        __metadata("design:type", Number)
    ], Trap.prototype, "throwTime", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_sensitivity"),
        __metadata("design:type", Number)
    ], Trap.prototype, "sensitivity", void 0);
    Trap = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], Trap);
    return Trap;
}());
exports.Trap = Trap;
