import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class Shoot implements Activate {
	getName(): string {
		return "Shoot"
	}
}