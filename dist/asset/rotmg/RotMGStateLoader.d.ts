import { AssetLoader } from "../normal/AssetLoader";
import { RotMGStates } from "./RotMGStates";
export declare class RotMGStateLoader implements AssetLoader<string, RotMGStates> {
    load(sources: string[]): Promise<RotMGStates>;
}
