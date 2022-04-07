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
exports.ShurikenAbility = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var StatusEffectType_1 = require("../StatusEffectType");
var ActivateParser_1 = require("./ActivateParser");
var ShurikenAbility = /** @class */ (function () {
    function ShurikenAbility() {
        this.effect = StatusEffectType_1.StatusEffectType.Speedy;
        this.enablePetManaHealing = true;
        this.enableManaRegen = false;
        this.enableGenericManaHealing = true;
    }
    ShurikenAbility.prototype.getName = function () {
        return "ShurikenAbility";
    };
    __decorate([
        (0, Serializable_1.Data)("@_effect", StatusEffectType_1.StatusEffectTypeData),
        __metadata("design:type", Number)
    ], ShurikenAbility.prototype, "effect", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_enablePetManaHealing", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], ShurikenAbility.prototype, "enablePetManaHealing", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_enableManaRegen"),
        __metadata("design:type", Boolean)
    ], ShurikenAbility.prototype, "enableManaRegen", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_enableGenericManaHealing", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], ShurikenAbility.prototype, "enableGenericManaHealing", void 0);
    ShurikenAbility = __decorate([
        (0, ActivateParser_1.XMLActivate)()
    ], ShurikenAbility);
    return ShurikenAbility;
}());
exports.ShurikenAbility = ShurikenAbility;
