import { AssetContainer } from "../AssetContainer";
import { AssetLoader } from "../AssetLoader";
import { AssetManager } from "../AssetManager";
export declare class ProgramAssetLoader implements AssetLoader<ProgramConfig, AssetContainer<WebGLProgram>> {
    gl: WebGLRenderingContext;
    manager: AssetManager;
    constructor(gl: WebGLRenderingContext, manager: AssetManager);
    load(sources: ProgramConfig[]): Promise<AssetContainer<WebGLProgram>>;
}
export declare type ProgramConfig = {
    name: string;
    vertex: string;
    fragment: string;
};
export declare type ProgramMap = Map<string, WebGLProgram>;
