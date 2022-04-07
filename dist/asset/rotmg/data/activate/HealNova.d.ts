import { Activate } from "./Activate";
export declare class HealNova implements Activate {
    range: number;
    amount: number;
    wisMin: number;
    wisPerIncrease: number;
    wisHealBase: number;
    splitHealing: boolean;
    getHealAmount(wis: number): number;
    getBonusHealAmount(wis: number): number;
    getRange(wis: number): number;
    getBonusRange(wis: number): number;
    getName(): string;
}
