import { Data } from "../../../../asset/normal/Serializable";
import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class Magic implements Activate {
	@Data("@_amount")
	amount: number = 0;

	getName(): string {
		return "Magic";
	}
}