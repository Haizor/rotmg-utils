import { Behavior } from "./Behavior";
export declare class Buzz extends Behavior {
    speed: number;
    acceleration: number;
    turnRate: number;
    acquireRange: number;
    cooldown: number;
    get name(): string;
}
