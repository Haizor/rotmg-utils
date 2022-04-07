import { RotMGAssets } from "./RotMGAssets";
import { AssetLoader } from "../normal/AssetLoader";
import { RotMGGroundAssets } from "./RotMGGroundAssets";
export declare class RotMGAssetLoader implements AssetLoader<string, RotMGAssets | RotMGGroundAssets> {
    load(sources: string[], settings?: Settings): Promise<RotMGAssets | RotMGGroundAssets>;
}
export declare type Settings = {
    readOnly: boolean;
    type: "object" | "ground";
};
