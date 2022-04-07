import { AssetLoader } from "../normal/AssetLoader";
import { CustomSpritesheet } from "./atlas/CustomSpritesheet";
export declare class RotMGCustomSpriteLoader implements AssetLoader<string, CustomSpritesheet> {
    gl?: WebGLRenderingContext;
    constructor(gl?: WebGLRenderingContext);
    load(sources: string[]): Promise<CustomSpritesheet>;
}
