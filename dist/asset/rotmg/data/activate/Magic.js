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
exports.Magic = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var Magic = /** @class */ (function () {
    function Magic() {
        this.amount = 0;
    }
    Magic.prototype.getName = function () {
        return "Magic";
    };
    __decorate([
        (0, Serializable_1.Data)("@_amount"),
        __metadata("design:type", Number)
    ], Magic.prototype, "amount", void 0);
    Magic = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], Magic);
    return Magic;
}());
exports.Magic = Magic;
