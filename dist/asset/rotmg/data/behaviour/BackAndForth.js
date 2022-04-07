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
exports.BackAndForth = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var Behavior_1 = require("./Behavior");
var BackAndForth = /** @class */ (function (_super) {
    __extends(BackAndForth, _super);
    function BackAndForth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        _this.angle = 0;
        _this.turnRate = 0;
        _this.radius = 0;
        return _this;
    }
    Object.defineProperty(BackAndForth.prototype, "name", {
        get: function () { return "BackAndForth"; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, Serializable_1.Data)("@_speed"),
        __metadata("design:type", Number)
    ], BackAndForth.prototype, "speed", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_angle"),
        __metadata("design:type", Number)
    ], BackAndForth.prototype, "angle", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_turnRate"),
        __metadata("design:type", Number)
    ], BackAndForth.prototype, "turnRate", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_radius"),
        __metadata("design:type", Number)
    ], BackAndForth.prototype, "radius", void 0);
    BackAndForth = __decorate([
        (0, Behavior_1.XMLBehavior)()
    ], BackAndForth);
    return BackAndForth;
}(Behavior_1.Behavior));
exports.BackAndForth = BackAndForth;
