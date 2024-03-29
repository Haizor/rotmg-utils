import { Data } from "../../../../asset/normal/Serializable";
import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class PoisonGrenade implements Activate {
	@Data("@_radius")
	radius: number = 2;
	@Data("@_impactDamage")
	impactDamage: number = 20;
	@Data("@_totalDamage")
	totalDamage: number = 120;
	@Data("@_duration")
	duration: number = 3;
	@Data("@_throwTime")
	throwTime: number = 0.8;
	@Data("@_color")
	color: string = "DDFF00"

	getDOT(): number {
		return this.totalDamage - this.impactDamage;
	}

	getDPS(): number {
		if (this.duration === 0) {
			return this.totalDamage;
		}
		return this.getDOT() / this.duration;
	}

	getName(): string {
		return "PoisonGrenade"
	}
}