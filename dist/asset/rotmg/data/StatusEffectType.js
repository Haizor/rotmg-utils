"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEffectTypeData = exports.StatusEffectType = void 0;
var StatusEffectType;
(function (StatusEffectType) {
    StatusEffectType[StatusEffectType["Nothing"] = 0] = "Nothing";
    StatusEffectType[StatusEffectType["Armored"] = 1] = "Armored";
    StatusEffectType[StatusEffectType["Berserk"] = 2] = "Berserk";
    StatusEffectType[StatusEffectType["Damaging"] = 3] = "Damaging";
    StatusEffectType[StatusEffectType["Energized"] = 4] = "Energized";
    StatusEffectType[StatusEffectType["Healing"] = 5] = "Healing";
    StatusEffectType[StatusEffectType["Inspired"] = 6] = "Inspired";
    StatusEffectType[StatusEffectType["Invisible"] = 7] = "Invisible";
    StatusEffectType[StatusEffectType["Invulnerable"] = 8] = "Invulnerable";
    StatusEffectType[StatusEffectType["Speedy"] = 9] = "Speedy";
    StatusEffectType[StatusEffectType["Armor Broken"] = 10] = "Armor Broken";
    StatusEffectType[StatusEffectType["Bleeding"] = 11] = "Bleeding";
    StatusEffectType[StatusEffectType["Blind"] = 12] = "Blind";
    StatusEffectType[StatusEffectType["Confused"] = 13] = "Confused";
    StatusEffectType[StatusEffectType["Curse"] = 14] = "Curse";
    StatusEffectType[StatusEffectType["Darkness"] = 15] = "Darkness";
    StatusEffectType[StatusEffectType["Dazed"] = 16] = "Dazed";
    StatusEffectType[StatusEffectType["Drunk"] = 17] = "Drunk";
    StatusEffectType[StatusEffectType["Exposed"] = 18] = "Exposed";
    StatusEffectType[StatusEffectType["In Combat"] = 19] = "In Combat";
    StatusEffectType[StatusEffectType["Hallucinating"] = 20] = "Hallucinating";
    StatusEffectType[StatusEffectType["Hexed"] = 21] = "Hexed";
    StatusEffectType[StatusEffectType["Paralyzed"] = 22] = "Paralyzed";
    StatusEffectType[StatusEffectType["Pet Stasis"] = 23] = "Pet Stasis";
    StatusEffectType[StatusEffectType["Petrify"] = 24] = "Petrify";
    StatusEffectType[StatusEffectType["Quiet"] = 25] = "Quiet";
    StatusEffectType[StatusEffectType["Sick"] = 26] = "Sick";
    StatusEffectType[StatusEffectType["Silenced"] = 27] = "Silenced";
    StatusEffectType[StatusEffectType["Slowed"] = 28] = "Slowed";
    StatusEffectType[StatusEffectType["Stasis"] = 29] = "Stasis";
    StatusEffectType[StatusEffectType["Stunned"] = 30] = "Stunned";
    StatusEffectType[StatusEffectType["Unstable"] = 31] = "Unstable";
    StatusEffectType[StatusEffectType["Weak"] = 32] = "Weak";
})(StatusEffectType = exports.StatusEffectType || (exports.StatusEffectType = {}));
exports.StatusEffectTypeData = {
    serialize: function (input) { return StatusEffectType[input]; },
    deserialize: function (input) {
        if (input === undefined)
            return undefined;
        return StatusEffectType[input];
    }
};
