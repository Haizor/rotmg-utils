import { AssetContainer, Metadata } from "../normal/AssetContainer";
import { Ground } from "./data/Ground";
export declare class RotMGGroundAssets implements AssetContainer<Ground> {
    private metadata;
    private readOnly;
    private _groundTiles;
    constructor(readOnly?: boolean);
    parseFromXML(xml: any): Ground | undefined;
    get(id: any): Ground | undefined;
    getAll(): Ground[];
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
}
