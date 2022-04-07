import { Activate } from "./Activate";
export declare class PoisonGrenade implements Activate {
    radius: number;
    impactDamage: number;
    totalDamage: number;
    duration: number;
    throwTime: number;
    color: string;
    getDOT(): number;
    getDPS(): number;
    getName(): string;
}
