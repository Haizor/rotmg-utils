import { XMLObject } from "./XMLObject";
export declare class Character extends XMLObject {
    maxHp: number;
    defense: number;
    group?: string;
    enemy: boolean;
    flying: boolean;
    quest: boolean;
    god: boolean;
    stasisImmune: boolean;
    getSerializedObject(): any;
}
