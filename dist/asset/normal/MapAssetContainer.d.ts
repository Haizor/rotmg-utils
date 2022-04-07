import { AssetContainer, Metadata } from "./AssetContainer";
export default class MapAssetContainer<T> implements AssetContainer<T> {
    map: Map<string, T>;
    metadata: Metadata | undefined;
    constructor(map: Map<string, T>);
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
    set(id: string, obj: T): void;
    get(id: string): T | undefined;
    getAll(): T[];
}
