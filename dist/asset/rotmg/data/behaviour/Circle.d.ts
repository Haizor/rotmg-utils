import { Behavior } from "./Behavior";
export declare class Circle extends Behavior {
    acquireRange: number;
    distance: number;
    speed: number;
    get name(): string;
    get angularVelocity(): number;
}
