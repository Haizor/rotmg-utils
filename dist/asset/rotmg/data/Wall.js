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
exports.Wall = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var Texture_1 = require("./Texture");
var XMLObject_1 = require("./XMLObject");
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shadowSize = 1;
        _this.static = false;
        _this.fullOccupy = false;
        _this.occupySquare = false;
        _this.enemyOccupySquare = false;
        _this.blocksSight = false;
        return _this;
    }
    __decorate([
        (0, Serializable_1.Data)("Top", Texture_1.TextureData),
        __metadata("design:type", Object)
    ], Wall.prototype, "top", void 0);
    __decorate([
        (0, Serializable_1.Data)("ShadowSize", (0, Serializable_1.XMLNoDefault)(1)),
        __metadata("design:type", Number)
    ], Wall.prototype, "shadowSize", void 0);
    __decorate([
        (0, Serializable_1.Data)("Static", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Wall.prototype, "static", void 0);
    __decorate([
        (0, Serializable_1.Data)("FullOccupy", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Wall.prototype, "fullOccupy", void 0);
    __decorate([
        (0, Serializable_1.Data)("OccupySquare", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Wall.prototype, "occupySquare", void 0);
    __decorate([
        (0, Serializable_1.Data)("EnemyOccupySquare", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Wall.prototype, "enemyOccupySquare", void 0);
    __decorate([
        (0, Serializable_1.Data)("BlocksSight", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Wall.prototype, "blocksSight", void 0);
    return Wall;
}(XMLObject_1.XMLObject));
exports.Wall = Wall;
