"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.StatBoostAura = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var ActivateParser_1 = require("./ActivateParser");
var StatBoostSelf_1 = require("./StatBoostSelf");
var StatBoostAura = /** @class */ (function (_super) {
    __extends(StatBoostAura, _super);
    function StatBoostAura() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.range = 4;
        _this.wisPerRange = 1;
        _this.wisRangeBase = 0.1;
        return _this;
    }
    StatBoostAura.prototype.getRange = function (wis) {
        return this.range + this.getBonusRange(wis);
    };
    StatBoostAura.prototype.getBonusRange = function (wis) {
        if (wis < this.wisMin)
            return 0;
        return (wis - this.wisMin) * this.wisRangeBase;
    };
    StatBoostAura.prototype.getName = function () {
        return "StatBoostAura";
    };
    __decorate([
        (0, Serializable_1.Data)("@_range"),
        __metadata("design:type", Number)
    ], StatBoostAura.prototype, "range", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisPerRange"),
        __metadata("design:type", Number)
    ], StatBoostAura.prototype, "wisPerRange", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_wisRangeBase"),
        __metadata("design:type", Number)
    ], StatBoostAura.prototype, "wisRangeBase", void 0);
    StatBoostAura = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], StatBoostAura);
    return StatBoostAura;
}(StatBoostSelf_1.StatBoostSelf));
exports.StatBoostAura = StatBoostAura;