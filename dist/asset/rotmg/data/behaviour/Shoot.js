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
exports.Shoot = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var Behavior_1 = require("./Behavior");
var Shoot = /** @class */ (function (_super) {
    __extends(Shoot, _super);
    function Shoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.projectileId = 1;
        _this.range = 7;
        _this.type = "targeted";
        _this.numShots = 1;
        _this.cooldownJitter = false;
        _this.angle = 9;
        _this.predictive = 0;
        _this.arcDegrees = 0;
        _this.blastEffect = false;
        _this.offset = 0;
        return _this;
    }
    Object.defineProperty(Shoot.prototype, "name", {
        get: function () { return "Shoot"; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, Serializable_1.Data)("@_projectileId"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "projectileId", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_range"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "range", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_type"),
        __metadata("design:type", String)
    ], Shoot.prototype, "type", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_numShots"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "numShots", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_cooldownJitter"),
        __metadata("design:type", Boolean)
    ], Shoot.prototype, "cooldownJitter", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_childId"),
        __metadata("design:type", String)
    ], Shoot.prototype, "childId", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_angle"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "angle", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_predictive"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "predictive", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_defaultAngle"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "defaultAngle", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_arcDegrees"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "arcDegrees", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_blastEffect"),
        __metadata("design:type", Boolean)
    ], Shoot.prototype, "blastEffect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_offset"),
        __metadata("design:type", Number)
    ], Shoot.prototype, "offset", void 0);
    Shoot = __decorate([
        (0, Behavior_1.XMLBehavior)()
    ], Shoot);
    return Shoot;
}(Behavior_1.Behavior));
exports.Shoot = Shoot;
