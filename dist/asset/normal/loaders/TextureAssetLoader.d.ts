import { AssetContainer } from "../AssetContainer";
import { AssetLoader } from "../AssetLoader";
export declare class TextureAssetLoader implements AssetLoader<TextureConfig, AssetContainer<WebGLTexture>> {
    gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext);
    load(sources: TextureConfig[]): Promise<AssetContainer<WebGLTexture>>;
    loadImage(src: string): Promise<HTMLImageElement>;
}
export declare type GLTextureInfo = {
    texture: WebGLTexture;
    size: {
        width: number;
        height: number;
    };
};
export declare type TextureMap = Map<string, GLTextureInfo>;
export declare type TextureConfig = {
    name: string;
    src: string;
};
