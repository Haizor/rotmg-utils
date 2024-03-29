import { Data } from "../../../../asset/normal/Serializable";
import { Behavior, XMLBehavior } from "./Behavior";

@XMLBehavior()
export class Wander extends Behavior {
	@Data("@_speed")
	speed: number = 0.4;

	get name(): string { return "Wander" }
}