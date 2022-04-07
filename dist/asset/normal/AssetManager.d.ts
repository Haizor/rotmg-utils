import { AssetBundle } from "./AssetBundle";
import { AssetContainer } from "./AssetContainer";
import { AssetLoader } from "./AssetLoader";
import JSZip from "jszip";
import { SourceLoader } from "./loaders/source/SourceLoader";
import { Fetcher } from "./loaders/source/Url2TextSourceLoader";
export declare class AssetManager {
    private assetBundles;
    private assetLoaders;
    private sourceLoaders;
    constructor();
    setFetcher(fetcher: Fetcher): void;
    addBundle(bundle: AssetBundle): void;
    registerLoader(name: string, loader: AssetLoader<any, any>): void;
    registerSourceLoader(name: string, loader: SourceLoader<unknown, unknown>): void;
    load(config: AssetManagerConfig): Promise<void>;
    loadContainer(bundle: AssetBundle, config: AssetContainerConfig<unknown>, promises: Map<string, Promise<void>>): Promise<void>;
    loadZip(zip: JSZip): Promise<void>;
    get<T>(type: string, id: any): GetResult<T> | undefined;
    getAll<T>(type: string): T[];
    getBundle(name: string): AssetBundle | undefined;
    getBundles(): AssetBundle[];
    getContainers(type: string): AssetContainer<unknown>[];
    deleteAssetBundle(bundle: AssetBundle): boolean;
}
export declare type GetResult<T> = {
    value: T;
    container: AssetContainer<T>;
    bundle: AssetBundle;
};
export interface AssetManagerConfig {
    name: string;
    containers: AssetContainerConfig<any>[];
    default?: boolean;
}
export interface AssetContainerConfig<T> {
    type: string;
    loader: string;
    settings?: any;
    sourceLoader?: string;
    depends?: string[];
    sources: T[];
}
