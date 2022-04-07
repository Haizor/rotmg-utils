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
exports.ObjectToss = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var ObjectToss = /** @class */ (function () {
    function ObjectToss() {
        this.objectId = "";
        this.throwTime = 1;
        this.color = 0xFFC600;
    }
    ObjectToss.prototype.getName = function () {
        return "ObjectToss";
    };
    __decorate([
        (0, Serializable_1.Data)("@_objectId"),
        __metadata("design:type", String)
    ], ObjectToss.prototype, "objectId", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_throwTime"),
        __metadata("design:type", Number)
    ], ObjectToss.prototype, "throwTime", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_color"),
        __metadata("design:type", Number)
    ], ObjectToss.prototype, "color", void 0);
    ObjectToss = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], ObjectToss);
    return ObjectToss;
}());
exports.ObjectToss = ObjectToss;
