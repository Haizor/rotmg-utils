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
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var Teleport = /** @class */ (function () {
    function Teleport() {
        this.maxDistance = 13;
    }
    Teleport.prototype.getName = function () {
        return "Teleport";
    };
    __decorate([
        (0, Serializable_1.Data)("@_maxDistance"),
        __metadata("design:type", Number)
    ], Teleport.prototype, "maxDistance", void 0);
    Teleport = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], Teleport);
    return Teleport;
}());
exports.default = Teleport;
