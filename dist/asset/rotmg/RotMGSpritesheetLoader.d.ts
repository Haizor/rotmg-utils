import { AssetLoader } from "../normal/AssetLoader";
import { Spritesheet } from "./atlas/Spritesheet";
export declare class RotMGSpritesheetLoader implements AssetLoader<string, Spritesheet> {
    gl?: WebGLRenderingContext;
    constructor(gl?: WebGLRenderingContext);
    load(sources: string[]): Promise<Spritesheet>;
}
