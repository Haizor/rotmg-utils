import { AssetContainer, Metadata } from "asset/normal/AssetContainer";
import { GLTextureInfo } from "asset/normal/loaders/TextureAssetLoader";
import { BasicTexture, Texture } from "../data/Texture";
export declare type SpritePosition = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare type SpriteColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare type SpriteAtlasData = {
    spriteSheetName: string;
    atlasId: number;
    elements: SpriteData[];
};
export declare type SpriteData = {
    padding: number;
    index: number;
    spriteSheetName: string;
    aId: number;
    isTransparentSprite: boolean;
    position: SpritePosition;
    maskPosition: SpritePosition;
    mostCommonColor: SpriteColor;
};
export declare type AnimatedSpriteData = {
    index: number;
    spriteSheetName: string;
    direction: number;
    action: number;
    set: number;
    spriteData: SpriteData;
};
export declare enum Direction {
    Side = 0,
    Unknown = 1,
    Front = 2,
    Back = 3
}
export declare enum Action {
    None = 0,
    Walk = 1,
    Attack = 2
}
export declare class Sprite {
    private _data;
    private _animatedData?;
    private _texture?;
    constructor(data: SpriteData, texture?: GLTextureInfo, animatedData?: AnimatedSpriteData);
    getData(): SpriteData;
    getAnimatedData(): AnimatedSpriteData;
    getAtlasSource(): string | undefined;
    getGLTexture(): GLTextureInfo | undefined;
    setGLTexture(texture?: GLTextureInfo): void;
    asTexture(): BasicTexture;
}
export declare type SpriteGetOptions = {
    animated?: boolean;
    multiple?: boolean;
    all?: boolean;
    direction?: number;
    action?: number;
    texture?: Texture;
    index: number;
    spriteSheetName: string;
};
export declare class Spritesheet implements AssetContainer<Sprite | Sprite[]> {
    private _sprites;
    private _animatedSprites;
    private _textures;
    gl?: WebGLRenderingContext;
    metadata?: Metadata;
    constructor(gl?: WebGLRenderingContext);
    load(src: string): Promise<void>;
    get(options: SpriteGetOptions): (Sprite | Sprite[]) | undefined;
    getWebGLTextureFromSprite(sprite: Sprite): GLTextureInfo | undefined;
    purgeTextures(): void;
    getAll(): Sprite[];
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
}