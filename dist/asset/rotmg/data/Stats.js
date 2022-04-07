"use strict";
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
exports.StatsData = exports.Stats = exports.StatNames = void 0;
exports.StatNames = {
    "MAXHP": "Max HP",
    "MAXMP": "Max MP"
};
var Stats = /** @class */ (function () {
    function Stats() {
        this.hp = 0;
        this.mp = 0;
        this.atk = 0;
        this.dex = 0;
        this.spd = 0;
        this.def = 0;
        this.vit = 0;
        this.wis = 0;
    }
    Stats.prototype.getAttacksPerSecond = function () {
        return 1.5 + 6.5 * (this.dex / 75);
    };
    Stats.prototype.getAttackDamage = function (damage) {
        return Math.floor(damage * (0.5 + this.atk / 50));
    };
    Stats.prototype.getTilesPerSecond = function () {
        return 4 + 5.6 * (this.spd / 75);
    };
    Stats.prototype.getHealthPerSecond = function () {
        return 1 + 0.24 * this.vit;
    };
    Stats.prototype.getManaPerSecond = function () {
        return 0.5 + 0.12 * this.wis;
    };
    Stats.prototype.getInCombatTime = function () {
        return 7 - 0.05 * this.vit;
    };
    Stats.prototype.getDamageReqForCombat = function () {
        var currDef = 0;
        for (var i = 0; i < this.def; i++) {
            if (i <= 15) {
                currDef += 1;
            }
            else if (i <= 30) {
                currDef += 0.75;
            }
            else if (i <= 45) {
                currDef += 0.5;
            }
            else {
                currDef += 0.25;
            }
        }
        return Math.floor(currDef);
    };
    Stats.prototype.add = function (stats) {
        var newStats = new Stats();
        newStats.hp = this.hp + stats.hp;
        newStats.mp = this.mp + stats.mp;
        newStats.atk = this.atk + stats.atk;
        newStats.dex = this.dex + stats.dex;
        newStats.spd = this.spd + stats.spd;
        newStats.def = this.def + stats.def;
        newStats.vit = this.vit + stats.vit;
        newStats.wis = this.wis + stats.wis;
        return newStats;
    };
    Stats.prototype.isZero = function () {
        return (this.hp === 0 &&
            this.mp === 0 &&
            this.atk === 0 &&
            this.def === 0 &&
            this.spd === 0 &&
            this.dex === 0 &&
            this.vit === 0 &&
            this.wis === 0);
    };
    Stats.prototype.map = function (mapper) {
        return [
            mapper("HP", this.hp),
            mapper("MP", this.mp),
            mapper("ATT", this.atk),
            mapper("DEF", this.def),
            mapper("SPD", this.spd),
            mapper("DEX", this.dex),
            mapper("VIT", this.vit),
            mapper("WIS", this.wis)
        ];
    };
    Stats.prototype.serialize = function () {
        function mapToObject(statName, stat) {
            return stat !== 0 ? {
                "@_stat": statName,
                "@_amount": stat,
                "#text": "IncrementStat"
            } : undefined;
        }
        return {
            ActivateOnEquip: [
                mapToObject("MAXHP", this.hp),
                mapToObject("MAXMP", this.mp),
                mapToObject("ATT", this.atk),
                mapToObject("DEF", this.def),
                mapToObject("SPD", this.spd),
                mapToObject("DEX", this.dex),
                mapToObject("VIT", this.vit),
                mapToObject("WIS", this.wis)
            ]
        };
    };
    Stats.min = function (statsA, statsB) {
        var newStats = new Stats();
        newStats.hp = Math.min(statsA.hp, statsB.hp);
        newStats.mp = Math.min(statsA.mp, statsB.mp);
        newStats.atk = Math.min(statsA.atk, statsB.atk);
        newStats.def = Math.min(statsA.def, statsB.def);
        newStats.spd = Math.min(statsA.spd, statsB.spd);
        newStats.dex = Math.min(statsA.dex, statsB.dex);
        newStats.vit = Math.min(statsA.vit, statsB.vit);
        newStats.wis = Math.min(statsA.wis, statsB.wis);
        return newStats;
    };
    Stats.fromXML = function (xml) {
        var stats = new Stats();
        var stat = xml["@_stat"];
        var increment = xml["#text"] === "IncrementStat" || xml["#text"] === "StatBoostAura";
        var amount = xml["@_amount"] * (increment ? 1 : -1);
        switch (stat) {
            case "MAXHP":
                stats.hp += amount;
                break;
            case "MAXMP":
                stats.mp += amount;
                break;
            case "ATT":
                stats.atk += amount;
                break;
            case "DEF":
                stats.def += amount;
                break;
            case "SPD":
                stats.spd += amount;
                break;
            case "DEX":
                stats.dex += amount;
                break;
            case "VIT":
                stats.vit += amount;
                break;
            case "WIS":
                stats.wis += amount;
                break;
        }
        return stats;
    };
    Stats.convertStatName = function (stat) {
        switch (stat) {
            case "MAXHP":
                return "hp";
            case "MAXMP":
                return "mp";
            case "ATT":
                return "atk";
            case "DEF":
                return "def";
            case "SPD":
                return "spd";
            case "DEX":
                return "dex";
            case "VIT":
                return "vit";
            case "WIS":
                return "wis";
        }
    };
    return Stats;
}());
exports.Stats = Stats;
var StatsData = {
    serialize: function (value) { return value.serialize(); },
    deserialize: function (value) {
        var e_1, _a;
        if (value === undefined)
            return new Stats();
        var values = Array.isArray(value) ? value : [value];
        var stats = new Stats();
        try {
            for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var stat = values_1_1.value;
                stats = stats.add(Stats.fromXML(stat));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return stats;
    }
};
exports.StatsData = StatsData;
