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
exports.Circle = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var Behavior_1 = require("./Behavior");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acquireRange = 15;
        _this.distance = 8;
        _this.speed = 1;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "name", {
        get: function () { return "Circle"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "angularVelocity", {
        get: function () { return this.speed / this.distance; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, Serializable_1.Data)("@_acquireRange"),
        __metadata("design:type", Number)
    ], Circle.prototype, "acquireRange", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_distance"),
        __metadata("design:type", Number)
    ], Circle.prototype, "distance", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_speed"),
        __metadata("design:type", Number)
    ], Circle.prototype, "speed", void 0);
    Circle = __decorate([
        (0, Behavior_1.XMLBehavior)()
    ], Circle);
    return Circle;
}(Behavior_1.Behavior));
exports.Circle = Circle;
