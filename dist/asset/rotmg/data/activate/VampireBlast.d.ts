import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
export declare class VampireBlast implements Activate {
    radius: number;
    totalDamage: number;
    ignoreDef: number;
    heal: number;
    healRange: number;
    wisMin: number;
    wisPerIncrease: number;
    wisDamageBase: number;
    wisPerRad: number;
    incrRad: number;
    condEffect: StatusEffectType;
    condDuration: number;
    color: string;
    getName(): string;
    getDamage(wis: number): number;
    getBonusDamage(wis: number): number;
    getHealRadius(wis: number): number;
    getBonusHealRadius(wis: number): number;
}
