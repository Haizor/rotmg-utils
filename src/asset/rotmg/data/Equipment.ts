import { DataController, Data, XMLBoolean, XMLEnum, XMLNoDefault } from "../../../asset/normal/Serializable";
import { Activate, ActivateData, Proc } from "./activate/Activate";
import { EquipmentSet } from "./EquipmentSet";
import { Item } from "./Item";
import { Stats, StatsData } from "./Stats";
import { Subattack, SubattackData } from "./Subattack";
import { XMLObject } from "./XMLObject";

export type Tier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | "UT" | "ST";

export enum SlotType {
	None,
	Sword,
	Dagger,
	Bow,
	Tome,
	Shield,
	LeatherArmor,
	HeavyArmor,
	Wand,
	Ring,
	Potion,
	Spell,
	Seal,
	Cloak,
	RobeArmor,
	Quiver,
	Helm,
	Staff,
	Poison,
	Skull,
	Trap,
	Orb,
	Prism,
	Scepter,
	Katana,
	Star,

	Wakizashi = 27,
	Lute,
	Mace,
}

const WeaponTypes = [
	SlotType.Staff,
	SlotType.Sword,
	SlotType.Bow,
	SlotType.Wand,
	SlotType.Dagger,
	SlotType.Katana
]

const AbilityTypes = [
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
]

export enum BagType {
	BrownBag,
	PinkBag,
	PurpleBag,
	CyanBag = 4,
	BlueBag,
	WhiteBag,
	YellowBag,
	OrangeBag,
	RedBag
}

export const TierData: DataController<Tier> = {
	serialize: (input: Tier) => {
		if (input === "UT" || input === "ST") return;
		return input;
	},
	deserialize: (input: any) => {
		if (input === undefined) return "UT";
		return input;
	}
}

export type EffectInfo = {
	description: string,
	name: string
}

export const EffectInfoData: DataController<EffectInfo[]> = {
	serialize: (input: EffectInfo[]) => input.map((info) => { 
		return {"@_name": info.name, "@_description": info.description
	}}),
	deserialize: (input: any) => {
		if (input === undefined || input.EffectInfo === undefined) return [];
		const data = Array.isArray(input.EffectInfo) ? input.EffectInfo : [input.EffectInfo];
		return data.map((info: any) => { return { name: info["@_name"], description: info["@_description"] }})
	}
}

export class Equipment extends XMLObject {
	@Data("SlotType", XMLEnum(SlotType))
	slotType: SlotType = SlotType.None;
	@Data("Tier", TierData)
	tier: Tier = 0;
	@Data("BagType", XMLEnum(BagType))
	bagType: BagType = BagType.BrownBag;
	@Data("RateOfFire")
	rateOfFire: number = 1;
	@Data("ArcGap")
	arcGap: number = 15;
	@Data("NumProjectiles")
	numProjectiles: number = 1;
	@Data("ActivateOnEquip", StatsData)
	stats: Stats = new Stats();
	@Data("ActivateOnEquip", ActivateData("ActivateOnEquip"), { isConstructed: true })
	activateOnEquips: Activate[] = [];
	@Data("BurstCount")
	burstCount?: number = undefined;
	@Data("BurstDelay")
	burstDelay?: number = undefined;
	@Data("BurstMinDelay")
	burstMinDelay?: number = undefined;

	@Data("Subattack", SubattackData)
	subAttacks: Subattack[] = [];

	@Data("Consumable", XMLBoolean)
	consumable: boolean = false;
	@Data("Potion", XMLBoolean)
	potion: boolean = false;
	@Data("Soulbound", XMLBoolean)
	soulbound: boolean = false;
	@Data("Activate", ActivateData(), {isConstructed: true})
	activates: Activate[] = [];
	@Data("OnPlayerAbilityActivate", ActivateData("OnPlayerAbilityActivate"), {isConstructed: true})
	abilityProcs: Proc[] = [];
	@Data("OnPlayerHitActivate", ActivateData("OnPlayerHitActivate"), {isConstructed: true})
	onHitProcs: Proc[] = [];
	@Data("OnPlayerShootActivate", ActivateData("OnPlayerShootActivate"), {isConstructed: true})
	onShootProcs: Proc[] = [];
	@Data("feedPower")
	feedPower?: number = undefined;
	@Data("MultiPhase", XMLBoolean)
	multiPhase: boolean = false;
	
	@Data("MpCost")
	mpCost: number = 0;
	@Data("MpEndCost")
	mpEndCost?: number = undefined;
	@Data("MpCostPerSecond")
	mpCostPerSecond?: number = undefined;
	@Data("Cooldown")
	cooldown: number = 0.5;
	@Data("XPBonus")
	xpBonus?: number = undefined;

	@Data("DisplayId")
	displayId?: string = undefined;
	@Data("Description")
	description?: string = undefined;
	@Data("ExtraTooltipData", EffectInfoData)
	extraTooltipData: EffectInfo[] = [];

	set?: EquipmentSet;

	getDisplayName(): string {
		return this.displayId || this.id;
	}

	createInstance(): Item {
		return new Item(this);
	}

	isWeapon() {
		return WeaponTypes.findIndex((type) => (type === this.slotType)) !== -1;
	}

	isAbility() {
		return AbilityTypes.findIndex((type) => (type === this.slotType)) !== -1;
	}

	getRange() {
		if (!this.hasProjectiles()) return undefined;
		return parseFloat(((this.projectiles[0].lifetime / 1000) * (this.projectiles[0].speed / 10)).toFixed(2));
	}

	getROF() {
		if (this.rateOfFire === 1) return;
		return `${this.rateOfFire * 100}%`
	}
}