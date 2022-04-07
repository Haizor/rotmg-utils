export declare enum StatusEffectType {
    Nothing = 0,
    Armored = 1,
    Berserk = 2,
    Damaging = 3,
    Energized = 4,
    Healing = 5,
    Inspired = 6,
    Invisible = 7,
    Invulnerable = 8,
    Speedy = 9,
    "Armor Broken" = 10,
    Bleeding = 11,
    Blind = 12,
    Confused = 13,
    Curse = 14,
    Darkness = 15,
    Dazed = 16,
    Drunk = 17,
    Exposed = 18,
    "In Combat" = 19,
    Hallucinating = 20,
    Hexed = 21,
    Paralyzed = 22,
    "Pet Stasis" = 23,
    Petrify = 24,
    Quiet = 25,
    Sick = 26,
    Silenced = 27,
    Slowed = 28,
    Stasis = 29,
    Stunned = 30,
    Unstable = 31,
    Weak = 32
}
export declare const StatusEffectTypeData: {
    serialize: (input: StatusEffectType) => string;
    deserialize: (input: any) => StatusEffectType;
};
