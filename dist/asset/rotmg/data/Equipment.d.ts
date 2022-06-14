import { DataController } from "../../../asset/normal/Serializable";
import { Activate, Proc } from "./activate/Activate";
import { EquipmentSet } from "./EquipmentSet";
import { Item } from "./Item";
import { Stats } from "./Stats";
import { Subattack } from "./Subattack";
import { XMLObject } from "./XMLObject";
export declare type Tier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | "UT" | "ST";
export declare enum SlotType {
    None = 0,
    Sword = 1,
    Dagger = 2,
    Bow = 3,
    Tome = 4,
    Shield = 5,
    LeatherArmor = 6,
    HeavyArmor = 7,
    Wand = 8,
    Ring = 9,
    Potion = 10,
    Spell = 11,
    Seal = 12,
    Cloak = 13,
    RobeArmor = 14,
    Quiver = 15,
    Helm = 16,
    Staff = 17,
    Poison = 18,
    Skull = 19,
    Trap = 20,
    Orb = 21,
    Prism = 22,
    Scepter = 23,
    Katana = 24,
    Star = 25,
    Wakizashi = 27,
    Lute = 28,
    Mace = 29
}
export declare enum BagType {
    BrownBag = 0,
    PinkBag = 1,
    PurpleBag = 2,
    CyanBag = 4,
    BlueBag = 5,
    WhiteBag = 6,
    YellowBag = 7,
    OrangeBag = 8,
    RedBag = 9
}
export declare const TierData: DataController<Tier>;
export declare type EffectInfo = {
    description: string;
    name: string;
};
export declare const EffectInfoData: DataController<EffectInfo[]>;
export declare class Equipment extends XMLObject {
    slotType: SlotType;
    tier: Tier;
    bagType: BagType;
    rateOfFire: number;
    arcGap: number;
    numProjectiles: number;
    stats: Stats;
    burstCount?: number;
    burstDelay?: number;
    burstMinDelay?: number;
    subAttacks: Subattack[];
    consumable: boolean;
    potion: boolean;
    soulbound: boolean;
    activates: Activate[];
    abilityProcs: Proc[];
    onHitProcs: Proc[];
    onShootProcs: Proc[];
    feedPower?: number;
    multiPhase: boolean;
    mpCost: number;
    mpEndCost?: number;
    mpCostPerSecond?: number;
    cooldown: number;
    xpBonus?: number;
    displayId?: string;
    description?: string;
    extraTooltipData: EffectInfo[];
    set?: EquipmentSet;
    getDisplayName(): string;
    createInstance(): Item;
    isWeapon(): boolean;
    isAbility(): boolean;
    getRange(): number;
    getROF(): string;
}
