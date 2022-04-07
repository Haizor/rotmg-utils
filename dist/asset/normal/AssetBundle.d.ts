import { AssetContainer } from "./AssetContainer";
import JSZip from "jszip";
export declare class AssetBundle {
    name: string;
    containers: Map<string, AssetContainer<any>>;
    dirty: boolean;
    default: boolean;
    constructor(name: string);
    get<T>(type: string, id: any): GetResult<T> | undefined;
    exportToZip(): JSZip;
}
declare type GetResult<T> = {
    value: T;
    container: AssetContainer<T>;
};
export {};
