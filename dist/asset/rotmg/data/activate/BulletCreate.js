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
exports.BulletCreate = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var BulletCreate = /** @class */ (function () {
    function BulletCreate() {
        this.targetMouse = false;
        this.minDistance = 0;
        this.maxDistance = 4.4;
        this.offsetAngle = 90;
        this.numShots = 1;
        this.gapAngle = 45;
        this.gapTiles = 0.4;
        this.arcGap = 0;
        this.type = undefined;
    }
    BulletCreate.prototype.getName = function () {
        return "BulletCreate";
    };
    __decorate([
        (0, Serializable_1.Data)("@_targetMouse"),
        __metadata("design:type", Boolean)
    ], BulletCreate.prototype, "targetMouse", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_minDistance"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "minDistance", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_maxDistance"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "maxDistance", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_offsetAngle"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "offsetAngle", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_numShots"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "numShots", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_gapAngle"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "gapAngle", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_gapTiles"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "gapTiles", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_arcGap"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "arcGap", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_type"),
        __metadata("design:type", Number)
    ], BulletCreate.prototype, "type", void 0);
    BulletCreate = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], BulletCreate);
    return BulletCreate;
}());
exports.BulletCreate = BulletCreate;
