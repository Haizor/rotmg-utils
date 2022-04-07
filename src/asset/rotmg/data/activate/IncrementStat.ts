import { Data } from "../../../../asset/normal/Serializable";
import { Stats, StatsData } from "../Stats";
import { Activate } from "./Activate";
import { XMLActivate } from "./ActivateParser";

@XMLActivate()
export class IncrementStat implements Activate {
	@Data("", StatsData, { deserializeFullObject: true })
	stats: Stats = new Stats();

	getName(): string {
		return "IncrementStat";
	}
}