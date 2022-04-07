import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
export declare class EffectBlast implements Activate {
    condDuration: number;
    condEffect: StatusEffectType;
    radius: number;
    collapseEffect: boolean;
    wisMin: number;
    color: number;
    wisPerIncrease: number;
    wisDurationBase: number;
    getName(): string;
    getRadius(wis: number): number;
    getBonusRadius(wis: number): number;
    getDuration(wis: number): number;
    getBonusDuration(wis: number): number;
}
