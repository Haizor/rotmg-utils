import { AssetContainer, Metadata } from "asset/normal/AssetContainer";
import { Sprite, SpriteData, SpriteGetOptions } from "./Spritesheet";
export declare class CustomSprite extends Sprite {
    blob: string;
    constructor(data: SpriteData, blob: string);
    getAtlasSource(): string;
    serialize(): SpriteData;
}
export declare class CustomSpritesheet implements AssetContainer<Sprite> {
    name?: string;
    metadata?: Metadata;
    ctx: CanvasRenderingContext2D;
    sprites: CustomSprite[];
    width: number;
    height: number;
    blob?: string;
    constructor(name?: string);
    add(image: HTMLImageElement): Promise<Sprite>;
    set(index: number, image: HTMLImageElement): Promise<Sprite | undefined>;
    delete(index: number): void;
    updateBlob(): Promise<void>;
    get(id: SpriteGetOptions): Sprite | undefined;
    getAll(): Sprite[];
    getMetadata(): Metadata | undefined;
    setMetadata(metadata: Metadata): void;
    load(src: any): Promise<void>;
    serialize(): string;
}
