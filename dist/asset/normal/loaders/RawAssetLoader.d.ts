import { AssetLoader } from "../AssetLoader";
export declare class RawAssetLoader implements AssetLoader<string, string[]> {
    load(sources: string[]): Promise<string[]>;
}
