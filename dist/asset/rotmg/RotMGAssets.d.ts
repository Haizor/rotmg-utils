import { ObjectClass } from "./data/ObjectClass";
import { XMLObject } from "./data/XMLObject";
import { AssetContainer, Metadata } from "asset/normal/AssetContainer";
export declare class RotMGAssets implements AssetContainer<XMLObject> {
    private _objects;
    private _objectMaps;
    private _constructors;
    private metadata;
    private readOnly;
    constructor(readOnly?: boolean);
    add(obj: XMLObject): void;
    remove(xml: XMLObject): void;
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
    get(id: any): XMLObject | undefined;
    getAll(): XMLObject[];
    getObjects(): XMLObject[];
    getObjectsOfClass(clazz: ObjectClass): XMLObject[];
    getObjectFromId(id: string): XMLObject;
    getObjectFromType(type: number): XMLObject;
    parseFromXML(xml: any): XMLObject | undefined;
    serialize(): any;
}
