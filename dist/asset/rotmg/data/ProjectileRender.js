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
exports.ProjectileRender = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var XMLObject_1 = require("./XMLObject");
var ProjectileRender = /** @class */ (function (_super) {
    __extends(ProjectileRender, _super);
    function ProjectileRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.angleCorrection = 0;
        _this.rotation = 0;
        return _this;
    }
    __decorate([
        (0, Serializable_1.Data)("AngleCorrection", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], ProjectileRender.prototype, "angleCorrection", void 0);
    __decorate([
        (0, Serializable_1.Data)("Rotation", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], ProjectileRender.prototype, "rotation", void 0);
    return ProjectileRender;
}(XMLObject_1.XMLObject));
exports.ProjectileRender = ProjectileRender;
