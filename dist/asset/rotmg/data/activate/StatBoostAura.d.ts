import { StatBoostSelf } from "./StatBoostSelf";
export declare class StatBoostAura extends StatBoostSelf {
    range: number;
    wisPerRange: number;
    wisRangeBase: number;
    getRange(wis: number): number;
    getBonusRange(wis: number): number;
    getName(): string;
}
