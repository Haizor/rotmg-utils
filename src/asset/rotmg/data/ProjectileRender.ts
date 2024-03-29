import { Data, XMLNoDefault } from "../../../asset/normal/Serializable";
import { XMLObject } from "./XMLObject";

export class ProjectileRender extends XMLObject {
	@Data("AngleCorrection", XMLNoDefault(0))
	angleCorrection: number = 0;
	@Data("Rotation", XMLNoDefault(0))
	rotation: number = 0;
}