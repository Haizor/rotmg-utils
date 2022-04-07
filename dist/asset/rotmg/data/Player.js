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
exports.Player = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var Stats_1 = require("./Stats");
var XMLObject_1 = require("./XMLObject");
var SlotTypeData = {
    serialize: function () { },
    deserialize: function (xml) {
        return xml.split(", ").map(function (num) { return parseInt(num); });
    }
};
var PlayerStats = {
    serialize: function () { },
    deserialize: function (xml) {
        var stats = new Stats_1.Stats();
        stats.hp = xml.MaxHitPoints["#text"];
        stats.mp = xml.MaxMagicPoints["#text"];
        stats.atk = xml.Attack["#text"];
        stats.def = xml.Defense["#text"];
        stats.spd = xml.Speed["#text"];
        stats.dex = xml.Dexterity["#text"];
        stats.vit = xml.HpRegen["#text"];
        stats.wis = xml.MpRegen["#text"];
        return stats;
    }
};
var MaxPlayerStats = {
    serialize: function () { },
    deserialize: function (xml) {
        var stats = new Stats_1.Stats();
        stats.hp = xml.MaxHitPoints["@_max"];
        stats.mp = xml.MaxMagicPoints["@_max"];
        stats.atk = xml.Attack["@_max"];
        stats.def = xml.Defense["@_max"];
        stats.spd = xml.Speed["@_max"];
        stats.dex = xml.Dexterity["@_max"];
        stats.vit = xml.HpRegen["@_max"];
        stats.wis = xml.MpRegen["@_max"];
        return stats;
    }
};
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "This shouldn't show.";
        _this.hitSound = "";
        _this.deathSound = "";
        _this.slotTypes = [];
        _this.equipment = [];
        _this.stats = new Stats_1.Stats();
        _this.maxStats = new Stats_1.Stats();
        _this.bloodProb = 1;
        return _this;
    }
    __decorate([
        (0, Serializable_1.Data)("Description"),
        __metadata("design:type", String)
    ], Player.prototype, "description", void 0);
    __decorate([
        (0, Serializable_1.Data)("HitSound"),
        __metadata("design:type", String)
    ], Player.prototype, "hitSound", void 0);
    __decorate([
        (0, Serializable_1.Data)("DeathSound"),
        __metadata("design:type", String)
    ], Player.prototype, "deathSound", void 0);
    __decorate([
        (0, Serializable_1.Data)("SlotTypes", SlotTypeData),
        __metadata("design:type", Array)
    ], Player.prototype, "slotTypes", void 0);
    __decorate([
        (0, Serializable_1.Data)("Equipment", SlotTypeData),
        __metadata("design:type", Array)
    ], Player.prototype, "equipment", void 0);
    __decorate([
        (0, Serializable_1.Data)("", PlayerStats, { deserializeFullObject: true }),
        __metadata("design:type", Stats_1.Stats)
    ], Player.prototype, "stats", void 0);
    __decorate([
        (0, Serializable_1.Data)("", MaxPlayerStats, { deserializeFullObject: true }),
        __metadata("design:type", Stats_1.Stats)
    ], Player.prototype, "maxStats", void 0);
    __decorate([
        (0, Serializable_1.Data)("BloodProb"),
        __metadata("design:type", Number)
    ], Player.prototype, "bloodProb", void 0);
    return Player;
}(XMLObject_1.XMLObject));
exports.Player = Player;
