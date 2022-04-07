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
exports.Transition = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var Transition = /** @class */ (function () {
    function Transition() {
        this.id = "";
    }
    __decorate([
        (0, Serializable_1.Data)("#text"),
        __metadata("design:type", String)
    ], Transition.prototype, "id", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_afterTime"),
        __metadata("design:type", Number)
    ], Transition.prototype, "afterTime", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_hitpointsLessThan"),
        __metadata("design:type", Number)
    ], Transition.prototype, "hitpointsLessThan", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_playerWithin"),
        __metadata("design:type", Number)
    ], Transition.prototype, "playerWithin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_noPlayerWithin"),
        __metadata("design:type", Number)
    ], Transition.prototype, "noPlayerWithin", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_noneExist"),
        __metadata("design:type", Object)
    ], Transition.prototype, "noneExist", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_exist"),
        __metadata("design:type", Object)
    ], Transition.prototype, "exist", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_random"),
        __metadata("design:type", Number)
    ], Transition.prototype, "random", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_playerSays"),
        __metadata("design:type", String)
    ], Transition.prototype, "playerSays", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_hasTag"),
        __metadata("design:type", String)
    ], Transition.prototype, "hasTag", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_noTag"),
        __metadata("design:type", String)
    ], Transition.prototype, "noTag", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_onTile"),
        __metadata("design:type", String)
    ], Transition.prototype, "onTile", void 0);
    return Transition;
}());
exports.Transition = Transition;
