import { Stats } from "../Stats";
import { Activate } from "./Activate";
export declare class IncrementStat implements Activate {
    stats: Stats;
    getName(): string;
}
