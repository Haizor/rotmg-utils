import { Serializable } from "../../../asset/normal/Serializable";
import { ObjectClass } from "./ObjectClass";
import { Projectile } from "./Projectile";
import { TextureProvider } from "./Texture";
export declare class XMLObject implements Serializable {
    type: number;
    id: string;
    class: ObjectClass;
    texture?: TextureProvider;
    projectiles: Projectile[];
    readOnly: boolean;
    getDisplayName(): string;
    hasProjectiles(): boolean;
    getSerializedObject(): any;
    serialize(): any;
    serializeProjectiles(): any[];
}
