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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSet = exports.Setpiece = void 0;
var Serializable_1 = require("../../normal/Serializable");
var Activate_1 = require("./activate/Activate");
var IncrementStat_1 = require("./activate/IncrementStat");
var Stats_1 = require("./Stats");
var Setpiece = /** @class */ (function () {
    function Setpiece() {
        this.slot = -1;
        this.type = -1;
    }
    __decorate([
        (0, Serializable_1.Data)("@_slot"),
        __metadata("design:type", Number)
    ], Setpiece.prototype, "slot", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_itemtype"),
        __metadata("design:type", Number)
    ], Setpiece.prototype, "type", void 0);
    return Setpiece;
}());
exports.Setpiece = Setpiece;
var EquipmentSet = /** @class */ (function () {
    function EquipmentSet() {
        this.type = -1;
        this.id = "";
        this.setpieces = [];
        this.activateOnEquip2 = [];
        this.activateOnEquip3 = [];
        this.activateOnEquipAll = [];
    }
    EquipmentSet.prototype.getStats = function (equipment) {
        var e_1, _a;
        var equipCount = 0;
        var _loop_1 = function (equip) {
            if (this_1.setpieces.findIndex(function (piece) { return piece.type === equip.type; }) !== -1) {
                equipCount++;
            }
        };
        var this_1 = this;
        try {
            for (var equipment_1 = __values(equipment), equipment_1_1 = equipment_1.next(); !equipment_1_1.done; equipment_1_1 = equipment_1.next()) {
                var equip = equipment_1_1.value;
                _loop_1(equip);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (equipment_1_1 && !equipment_1_1.done && (_a = equipment_1.return)) _a.call(equipment_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var stats = new Stats_1.Stats();
        if (equipCount > 1) {
            stats = stats.add(this.statsFromActivates(this.activateOnEquip2));
        }
        if (equipCount > 2) {
            stats = stats.add(this.statsFromActivates(this.activateOnEquip3));
        }
        if (equipCount > 3) {
            stats = stats.add(this.statsFromActivates(this.activateOnEquipAll));
        }
        return stats;
    };
    EquipmentSet.prototype.statsFromActivates = function (activates) {
        var e_2, _a;
        var stats = new Stats_1.Stats();
        try {
            for (var activates_1 = __values(activates), activates_1_1 = activates_1.next(); !activates_1_1.done; activates_1_1 = activates_1.next()) {
                var activate = activates_1_1.value;
                if (activate instanceof IncrementStat_1.IncrementStat) {
                    stats = stats.add(activate.stats);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (activates_1_1 && !activates_1_1.done && (_a = activates_1.return)) _a.call(activates_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return stats;
    };
    __decorate([
        (0, Serializable_1.Data)("@_type"),
        __metadata("design:type", Number)
    ], EquipmentSet.prototype, "type", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_id"),
        __metadata("design:type", String)
    ], EquipmentSet.prototype, "id", void 0);
    __decorate([
        (0, Serializable_1.Data)("Setpiece", (0, Serializable_1.XMLArray)(Setpiece)),
        __metadata("design:type", Array)
    ], EquipmentSet.prototype, "setpieces", void 0);
    __decorate([
        (0, Serializable_1.Data)("ActivateOnEquip2", (0, Activate_1.ActivateData)("ActivateOnEquip2"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], EquipmentSet.prototype, "activateOnEquip2", void 0);
    __decorate([
        (0, Serializable_1.Data)("ActivateOnEquip3", (0, Activate_1.ActivateData)("ActivateOnEquip3"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], EquipmentSet.prototype, "activateOnEquip3", void 0);
    __decorate([
        (0, Serializable_1.Data)("ActivateOnEquipAll", (0, Activate_1.ActivateData)("ActivateOnEquipAll"), { isConstructed: true }),
        __metadata("design:type", Array)
    ], EquipmentSet.prototype, "activateOnEquipAll", void 0);
    return EquipmentSet;
}());
exports.EquipmentSet = EquipmentSet;
