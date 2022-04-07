import { DataController } from "../../../asset/normal/Serializable";
import { StatusEffectType } from "./StatusEffectType";
export declare type ProjectileParams = {
    objectId: string;
    projectileId?: number;
    speed: number;
    lifetime: number;
    damage?: number;
    minDamage?: number;
    maxDamage?: number;
    amplitude?: number;
    frequency?: number;
    acceleration?: number;
    accelerationDelay?: number;
    speedClamp?: number;
    multiHit?: boolean;
    boomerang?: boolean;
    armorPiercing?: boolean;
    passesCover?: boolean;
    wavy?: boolean;
    parametric?: boolean;
};
export declare class Projectile {
    objectId: string;
    projectileId?: number;
    speed: number;
    minDamage?: number;
    maxDamage?: number;
    damage?: number;
    amplitude: number;
    frequency: number;
    acceleration: number;
    accelerationDelay: number;
    speedClamp?: number;
    size: number;
    lifetime: number;
    multiHit: boolean;
    boomerang: boolean;
    armorPiercing: boolean;
    passesCover: boolean;
    wavy: boolean;
    parametric: boolean;
    conditionEffect?: ConditionEffect;
    constructor(params: ProjectileParams);
    getDamage(): number;
    getRange(): number;
    static fromXML(xml: any): Projectile;
    serialize(): any;
}
export interface ConditionEffect {
    type: StatusEffectType;
    duration: number;
}
export declare const ProjectileData: DataController<Projectile[]>;
export declare function ProjectileSerializer(proj: Projectile[]): any[];
