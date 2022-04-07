import { Behavior } from "./Behavior";
export declare type ShootType = "targeted" | "auto" | "forward";
export declare class Shoot extends Behavior {
    projectileId: number;
    range: number;
    type: ShootType;
    numShots: number;
    cooldownJitter: boolean;
    childId?: string;
    angle: number;
    predictive: number;
    defaultAngle?: number;
    arcDegrees: number;
    blastEffect: boolean;
    offset: number;
    get name(): string;
}
