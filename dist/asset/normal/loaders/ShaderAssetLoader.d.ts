import { AssetLoader } from "../AssetLoader";
import MapAssetContainer from "../MapAssetContainer";
export declare class ShaderAssetLoader implements AssetLoader<ShaderConfig, MapAssetContainer<WebGLShader>> {
    gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext);
    load(sources: ShaderConfig[]): Promise<MapAssetContainer<WebGLShader>>;
}
declare type ShaderConfig = {
    name: string;
    src: string;
    type: "vertex" | "fragment";
};
export declare type ShaderMap = Map<string, WebGLShader>;
export {};
