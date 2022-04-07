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
exports.Equipment = exports.EffectInfoData = exports.TierData = exports.BagType = exports.SlotType = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var Activate_1 = require("./activate/Activate");
var Item_1 = require("./Item");
var Stats_1 = require("./Stats");
var XMLObject_1 = require("./XMLObject");
var SlotType;
(function (SlotType) {
    SlotType[SlotType["None"] = 0] = "None";
    SlotType[SlotType["Sword"] = 1] = "Sword";
    SlotType[SlotType["Dagger"] = 2] = "Dagger";
    SlotType[SlotType["Bow"] = 3] = "Bow";
    SlotType[SlotType["Tome"] = 4] = "Tome";
    SlotType[SlotType["Shield"] = 5] = "Shield";
    SlotType[SlotType["LeatherArmor"] = 6] = "LeatherArmor";
    SlotType[SlotType["HeavyArmor"] = 7] = "HeavyArmor";
    SlotType[SlotType["Wand"] = 8] = "Wand";
    SlotType[SlotType["Ring"] = 9] = "Ring";
    SlotType[SlotType["Potion"] = 10] = "Potion";
    SlotType[SlotType["Spell"] = 11] = "Spell";
    SlotType[SlotType["Seal"] = 12] = "Seal";
    SlotType[SlotType["Cloak"] = 13] = "Cloak";
    SlotType[SlotType["RobeArmor"] = 14] = "RobeArmor";
    SlotType[SlotType["Quiver"] = 15] = "Quiver";
    SlotType[SlotType["Helm"] = 16] = "Helm";
    SlotType[SlotType["Staff"] = 17] = "Staff";
    SlotType[SlotType["Poison"] = 18] = "Poison";
    SlotType[SlotType["Skull"] = 19] = "Skull";
    SlotType[SlotType["Trap"] = 20] = "Trap";
    SlotType[SlotType["Orb"] = 21] = "Orb";
    SlotType[SlotType["Prism"] = 22] = "Prism";
    SlotType[SlotType["Scepter"] = 23] = "Scepter";
    SlotType[SlotType["Katana"] = 24] = "Katana";
    SlotType[SlotType["Star"] = 25] = "Star";
    SlotType[SlotType["Wakizashi"] = 27] = "Wakizashi";
    SlotType[SlotType["Lute"] = 28] = "Lute";
    SlotType[SlotType["Mace"] = 29] = "Mace";
})(SlotType = exports.SlotType || (exports.SlotType = {}));
var WeaponTypes = [
    SlotType.Staff,
    SlotType.Sword,
    SlotType.Bow,
    SlotType.Wand,
    SlotType.Dagger,
    SlotType.Katana
];
var AbilityTypes = [
    SlotType.Cloak,
    SlotType.Helm,
    SlotType.Lute,
    SlotType.Mace,
    SlotType.Orb,
    SlotType.Poison,
    SlotType.Prism,
    SlotType.Quiver,
    SlotType.Scepter,
    SlotType.Seal,
    SlotType.Shield,
    SlotType.Skull,
    SlotType.Spell,
    SlotType.Star,
    SlotType.Tome,
    SlotType.Trap,
    SlotType.Wakizashi,
];
var BagType;
(function (BagType) {
    BagType[BagType["BrownBag"] = 0] = "BrownBag";
    BagType[BagType["PinkBag"] = 1] = "PinkBag";
    BagType[BagType["PurpleBag"] = 2] = "PurpleBag";
    BagType[BagType["CyanBag"] = 4] = "CyanBag";
    BagType[BagType["BlueBag"] = 5] = "BlueBag";
    BagType[BagType["WhiteBag"] = 6] = "WhiteBag";
    BagType[BagType["YellowBag"] = 7] = "YellowBag";
    BagType[BagType["OrangeBag"] = 8] = "OrangeBag";
    BagType[BagType["RedBag"] = 9] = "RedBag";
})(BagType = exports.BagType || (exports.BagType = {}));
exports.TierData = {
    serialize: function (input) {
        if (input === "UT" || input === "ST")
            return;
        return input;
    },
    deserialize: function (input) {
        if (input === undefined)
            return "UT";
        return input;
    }
};
exports.EffectInfoData = {
    serialize: function (input) { return input.map(function (info) {
        return { "@_name": info.name, "@_description": info.description
        };
    }); },
    deserialize: function (input) {
        if (input === undefined || input.EffectInfo === undefined)
            return [];
        var data = Array.isArray(input.EffectInfo) ? input.EffectInfo : [input.EffectInfo];
        return data.map(function (info) { return { name: info["@_name"], description: info["@_description"] }; });
    }
};
var Equipment = /** @class */ (function (_super) {
    __extends(Equipment, _super);
    function Equipment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.slotType = SlotType.None;
        _this.tier = 0;
        _this.bagType = BagType.BrownBag;
        _this.rateOfFire = 1;
        _this.arcGap = 15;
        _this.numProjectiles = 1;
        _this.stats = new Stats_1.Stats();
        _this.consumable = false;
        _this.potion = false;
        _this.soulbound = false;
        _this.activates = [];
        _this.abilityProcs = [];
        _this.onHitProcs = [];
        _this.onShootProcs = [];
        _this.multiPhase = false;
        _this.mpCost = 0;
        _this.cooldown = 0.5;
        _this.extraTooltipData = [];
        return _this;
    }
    Equipment.prototype.getDisplayName = function () {
        return this.displayId || this.id;
    };
    Equipment.prototype.createInstance = function () {
        return new Item_1.Item(this);
    };
    Equipment.prototype.isWeapon = function () {
        var _this = this;
        return WeaponTypes.findIndex(function (type) { return (type === _this.slotType); }) !== -1;
    };
    Equipment.prototype.isAbility = function () {
        var _this = this;
        return AbilityTypes.findIndex(function (type) { return (type === _this.slotType); }) !== -1;
    };
    Equipment.prototype.getRange = function () {
        if (!this.hasProjectiles())
            return undefined;
        return parseFloat(((this.projectiles[0].lifetime / 1000) * (this.projectiles[0].speed / 10)).toFixed(2));
    };
    Equipment.prototype.getROF = function () {
        if (this.rateOfFire === 1)
            return;
        return "".concat(this.rateOfFire * 100, "%");
    };
    __decorate([
        (0, Serializable_1.Data)("SlotType", (0, Serializable_1.XMLEnum)(SlotType)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "slotType", void 0);
    __decorate([
        (0, Serializable_1.Data)("Tier", exports.TierData),
        __metadata("design:type", Object)
    ], Equipment.prototype, "tier", void 0);
    __decorate([
        (0, Serializable_1.Data)("BagType", (0, Serializable_1.XMLEnum)(BagType)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "bagType", void 0);
    __decorate([
        (0, Serializable_1.Data)("RateOfFire", (0, Serializable_1.XMLNoDefault)(1)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "rateOfFire", void 0);
    __decorate([
        (0, Serializable_1.Data)("ArcGap", (0, Serializable_1.XMLNoDefault)(15)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "arcGap", void 0);
    __decorate([
        (0, Serializable_1.Data)("NumProjectiles", (0, Serializable_1.XMLNoDefault)(1)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "numProjectiles", void 0);
    __decorate([
        (0, Serializable_1.Data)("ActivateOnEquip", Stats_1.StatsData),
        __metadata("design:type", Stats_1.Stats)
    ], Equipment.prototype, "stats", void 0);
    __decorate([
        (0, Serializable_1.Data)("Consumable", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Equipment.prototype, "consumable", void 0);
    __decorate([
        (0, Serializable_1.Data)("Potion", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Equipment.prototype, "potion", void 0);
    __decorate([
        (0, Serializable_1.Data)("Soulbound", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Equipment.prototype, "soulbound", void 0);
    __decorate([
        (0, Serializable_1.Data)("Activate", (0, Activate_1.ActivateData)(), { isConstructed: true }),
        __metadata("design:type", Array)
    ], Equipment.prototype, "activates", void 0);
    __decorate([
        (0, Serializable_1.Data)("OnPlayerAbilityActivate", (0, Activate_1.ActivateData)("OnPlayerAbilityActivate"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], Equipment.prototype, "abilityProcs", void 0);
    __decorate([
        (0, Serializable_1.Data)("OnPlayerHitActivate", (0, Activate_1.ActivateData)("OnPlayerHitActivate"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], Equipment.prototype, "onHitProcs", void 0);
    __decorate([
        (0, Serializable_1.Data)("OnPlayerShootActivate", (0, Activate_1.ActivateData)("OnPlayerShootActivate"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], Equipment.prototype, "onShootProcs", void 0);
    __decorate([
        (0, Serializable_1.Data)("feedPower"),
        __metadata("design:type", Number)
    ], Equipment.prototype, "feedPower", void 0);
    __decorate([
        (0, Serializable_1.Data)("MultiPhase", Serializable_1.XMLBoolean),
        __metadata("design:type", Boolean)
    ], Equipment.prototype, "multiPhase", void 0);
    __decorate([
        (0, Serializable_1.Data)("MpCost", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "mpCost", void 0);
    __decorate([
        (0, Serializable_1.Data)("MpEndCost"),
        __metadata("design:type", Number)
    ], Equipment.prototype, "mpEndCost", void 0);
    __decorate([
        (0, Serializable_1.Data)("MpCostPerSecond"),
        __metadata("design:type", Number)
    ], Equipment.prototype, "mpCostPerSecond", void 0);
    __decorate([
        (0, Serializable_1.Data)("Cooldown", (0, Serializable_1.XMLNoDefault)(0.5)),
        __metadata("design:type", Number)
    ], Equipment.prototype, "cooldown", void 0);
    __decorate([
        (0, Serializable_1.Data)("XPBonus"),
        __metadata("design:type", Number)
    ], Equipment.prototype, "xpBonus", void 0);
    __decorate([
        (0, Serializable_1.Data)("DisplayId"),
        __metadata("design:type", String)
    ], Equipment.prototype, "displayId", void 0);
    __decorate([
        (0, Serializable_1.Data)("Description"),
        __metadata("design:type", String)
    ], Equipment.prototype, "description", void 0);
    __decorate([
        (0, Serializable_1.Data)("ExtraTooltipData", exports.EffectInfoData),
        __metadata("design:type", Array)
    ], Equipment.prototype, "extraTooltipData", void 0);
    return Equipment;
}(XMLObject_1.XMLObject));
exports.Equipment = Equipment;
