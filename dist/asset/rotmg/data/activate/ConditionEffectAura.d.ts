import { ConditionEffectSelf } from "./ConditionEffectSelf";
export declare class ConditionEffectAura extends ConditionEffectSelf {
    range: number;
    getRange(wis: number): number;
    getBonusRange(wis: number): number;
    getName(): string;
}
