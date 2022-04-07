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
exports.Decoy = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var Decoy = /** @class */ (function () {
    function Decoy() {
        this.duration = 3;
        this.speed = 1;
        this.distance = 8;
        this.angleOffset = 0;
    }
    Decoy.prototype.getName = function () {
        return "Decoy";
    };
    __decorate([
        (0, Serializable_1.Data)("@_duration"),
        __metadata("design:type", Number)
    ], Decoy.prototype, "duration", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_speed"),
        __metadata("design:type", Number)
    ], Decoy.prototype, "speed", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_distance"),
        __metadata("design:type", Number)
    ], Decoy.prototype, "distance", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_angleOffset"),
        __metadata("design:type", Number)
    ], Decoy.prototype, "angleOffset", void 0);
    Decoy = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], Decoy);
    return Decoy;
}());
exports.Decoy = Decoy;
