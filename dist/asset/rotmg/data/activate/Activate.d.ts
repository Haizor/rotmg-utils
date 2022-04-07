import { StatusEffectType } from "../StatusEffectType";
export declare const ActivateData: (nodeName?: string) => {
    serialize: (activates: Activate[]) => {
        [x: string]: any[];
    };
    deserialize: (xml: any) => any;
};
export declare function ActivateSerializer(value: Activate[]): any[];
export interface Activate {
    getName(): string;
}
export interface Proc {
    cooldown: number;
    proc: number;
    hpRequired?: number;
    hpMinThreshold?: number;
    requiredConditions: StatusEffectType;
    mustNotWear?: number;
    getName(): string;
}
