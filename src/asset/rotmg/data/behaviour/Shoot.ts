import { Data, XMLBoolean } from "../../../../asset/normal/Serializable";
import { Behavior, XMLBehavior } from "./Behavior";

export type ShootType = "targeted" | "auto" | "forward";

@XMLBehavior()
export class Shoot extends Behavior {
	@Data("@_projectileId")
	projectileId: number = 1;
	@Data("@_range")
	range: number = 7;
	@Data("@_type")
	type: ShootType = "targeted";
	@Data("@_numShots")
	numShots: number = 1;
	@Data("@_cooldownJitter")
	cooldownJitter: boolean = false;
	@Data("@_childId")
	childId?: string;
	@Data("@_angle")
	angle: number = 9;
	@Data("@_predictive")
	predictive: number = 0;
	@Data("@_defaultAngle")
	defaultAngle?: number;
	@Data("@_arcDegrees")
	arcDegrees: number = 0;
	@Data("@_blastEffect")
	blastEffect: boolean = false;
	@Data("@_offset")
	offset: number = 0;

	get name(): string { return "Shoot" }
}