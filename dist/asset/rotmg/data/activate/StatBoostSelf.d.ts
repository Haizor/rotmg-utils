import { StatType } from "../Stats";
import { Activate } from "./Activate";
export declare class StatBoostSelf implements Activate {
    stat: StatType;
    noStack: boolean;
    duration: number;
    amount: number;
    wisMin: number;
    wisPerDuration: number;
    wisDurationBase: number;
    wisPerAmount: number;
    wisAmountBase: number;
    getAmount(wis: number): number;
    getBonusAmount(wis: number): number;
    getDuration(wis: number): number;
    getBonusDuration(wis: number): number;
    getName(): string;
}
