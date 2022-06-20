import { Data } from "../../../normal/Serializable";
import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class AbilityUseDiscount implements Activate {
	@Data("@_multiplier")
	multiplier: number = 1;
	
	getName(): string {
		return "AbilityUseDiscount";
	}
}