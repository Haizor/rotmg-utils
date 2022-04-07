import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
export declare class Trap implements Activate {
    radius: number;
    totalDamage: number;
    condEffect: StatusEffectType;
    condDuration: number;
    color: number;
    duration: number;
    throwTime: number;
    sensitivity: number;
    getName(): string;
}
