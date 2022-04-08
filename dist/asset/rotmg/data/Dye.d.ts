import { XMLObject } from "./XMLObject";
import { DataController } from "../../../asset/normal/Serializable";
import { BasicTexture, Texture } from "./Texture";
export declare type DyeAnimation = {
    type: DyeAnimationType;
    speed: number;
    pivotX: number;
    pivotY: number;
};
export declare enum DyeAnimationType {
    Horizontal = 1,
    Vertical = 2,
    Spinning = 3
}
export declare const DyeAnimationData: DataController<DyeAnimation>;
export declare class Dye extends XMLObject {
    mask?: Texture;
    clothing?: string;
    accessory?: string;
    dyeAnimation?: DyeAnimation;
    getColor(): string;
    getSheetName(): string;
    getIndex(): number;
    isClothing(): boolean;
    isAccessory(): boolean;
    isColor(): boolean;
    isTextile(): boolean;
    getTextileTexture(): BasicTexture | undefined;
    getRGB(): [number, number, number] | undefined;
}
