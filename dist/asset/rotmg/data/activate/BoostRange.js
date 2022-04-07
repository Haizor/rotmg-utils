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
exports.BoostRange = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var BoostRange = /** @class */ (function () {
    function BoostRange() {
        this.radius = 4;
        this.speedBoost = 1.25;
        this.lifeBoost = 1;
        this.duration = 3;
        this.targeted = false;
    }
    BoostRange.prototype.getName = function () {
        return "BoostRange";
    };
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], BoostRange.prototype, "radius", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_speedBoost"),
        __metadata("design:type", Number)
    ], BoostRange.prototype, "speedBoost", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_lifeBoost"),
        __metadata("design:type", Number)
    ], BoostRange.prototype, "lifeBoost", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], BoostRange.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_targeted", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], BoostRange.prototype, "targeted", void 0);
    BoostRange = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], BoostRange);
    return BoostRange;
}());
exports.BoostRange = BoostRange;
