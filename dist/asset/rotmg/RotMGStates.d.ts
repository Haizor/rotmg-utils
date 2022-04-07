import { AssetContainer, Metadata } from "../normal/AssetContainer";
import { State } from "./data/behaviour/State";
export declare class RotMGStates implements AssetContainer<State> {
    metadata?: Metadata;
    states: State[];
    get(id: any): State | undefined;
    getAll(): State[];
    parseFromXML(xml: any): void;
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
}
