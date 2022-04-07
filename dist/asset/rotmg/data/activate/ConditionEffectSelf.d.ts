import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
export declare class ConditionEffectSelf implements Activate {
    effect: StatusEffectType;
    duration: number;
    wisMin: number;
    wisPerDuration: number;
    wisDurationBase: number;
    getDuration(wis: number): number;
    getBonusDuration(wis: number): number;
    getName(): string;
}
