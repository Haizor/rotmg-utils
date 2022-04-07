import { TextureProvider } from "./Texture";
import { XMLObject } from "./XMLObject";
export declare class Wall extends XMLObject {
    top?: TextureProvider;
    shadowSize: number;
    static: boolean;
    fullOccupy: boolean;
    occupySquare: boolean;
    enemyOccupySquare: boolean;
    blocksSight: boolean;
}
