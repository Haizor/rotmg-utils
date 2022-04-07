import { Activate } from "./Activate";
export declare class BoostRange implements Activate {
    radius: number;
    speedBoost: number;
    lifeBoost: number;
    duration: number;
    targeted: boolean;
    getName(): string;
}
