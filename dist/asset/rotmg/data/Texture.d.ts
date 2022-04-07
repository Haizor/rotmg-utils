import { DataController } from "../../../asset/normal/Serializable";
export interface TextureProvider {
    getTexture(time: number): Texture;
    serialize(): any;
}
export interface Texture {
    file: string;
    index: number;
    animated: boolean;
}
export declare const TextureData: DataController<TextureProvider>;
export declare class BasicTexture implements TextureProvider, Texture {
    file: string;
    index: number;
    animated: boolean;
    constructor(file: string, index: number, animated: boolean);
    getTexture(): Texture;
    serialize(): {
        [x: string]: {
            File: string;
            Index: number;
        };
    };
    static fromXML(xml: any): TextureProvider;
}
export declare class RandomTexture implements TextureProvider {
    textures: Texture[];
    constructor(textures: Texture[]);
    getTexture(): Texture;
    serialize(): any;
}
export declare class AnimatedTexture implements TextureProvider {
    animations: Animation[];
    currAnimationIndex: number;
    constructor(animations: Animation[]);
    getTexture(time: number): Texture;
    serialize(): {
        Animation: {
            "@_prob": number;
            Frame: {
                "@_time": number;
                Texture: {
                    File: string;
                    Index: number;
                };
            }[];
        }[];
    };
}
declare type Animation = {
    frames: Frame[];
    prob: number;
    maxTime: number;
};
declare type Frame = {
    time: number;
    texture: Texture;
};
export {};
