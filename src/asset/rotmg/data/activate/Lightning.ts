import { Data } from "../../../normal/Serializable";
import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class Lightning implements Activate {
	@Data("@_totalDamage")
	totalDamage: number = 0;
	@Data("@_decrDamage")
	decrDamage: number = 0;
	@Data("@_wisMin")
	wisMin: number = 50;
	@Data("@_wisDamageBase")
	wisDamageBase: number = 15;
	@Data("@_maxTargets")
	maxTargets: number = 3;
	@Data("@_wisPerTarget")
	wisPerTarget: number = 10;
	@Data("@_condEffect")
	condEffect?: StatusEffectType;

	getDamage(wis: number = 50): number {
		return this.totalDamage + Math.max(Math.floor((wis - this.wisMin) * (this.wisDamageBase / 10)), 0)
	}

	getTargetCount(wis: number = 50): number {
		return this.maxTargets + Math.max(Math.floor((wis - this.wisMin) / this.wisPerTarget) , 0)
	}

	getName(): string {
		return "Lightning";
	}
}