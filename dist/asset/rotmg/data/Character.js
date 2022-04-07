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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Character = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var XMLObject_1 = require("./XMLObject");
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxHp = 100;
        _this.defense = 0;
        _this.enemy = false;
        _this.flying = false;
        _this.quest = false;
        _this.god = false;
        _this.stasisImmune = false;
        return _this;
    }
    Character.prototype.getSerializedObject = function () {
        return __assign(__assign({}, _super.prototype.getSerializedObject.call(this)), { MaxHitPoints: this.maxHp, Defense: this.defense, Group: this.group, Enemy: this.enemy, Flying: this.flying, Quest: this.quest, God: this.god });
    };
    __decorate([
        (0, Serializable_1.Data)("MaxHitPoints"),
        __metadata("design:type", Number)
    ], Character.prototype, "maxHp", void 0);
    __decorate([
        (0, Serializable_1.Data)("Defense"),
        __metadata("design:type", Number)
    ], Character.prototype, "defense", void 0);
    return Character;
}(XMLObject_1.XMLObject));
exports.Character = Character;
