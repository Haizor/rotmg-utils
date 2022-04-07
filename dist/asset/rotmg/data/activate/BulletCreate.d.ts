import { Activate } from "./Activate";
export declare class BulletCreate implements Activate {
    targetMouse: boolean;
    minDistance: number;
    maxDistance: number;
    offsetAngle: number;
    numShots: number;
    gapAngle: number;
    gapTiles: number;
    arcGap: number;
    type?: number;
    getName(): string;
}
