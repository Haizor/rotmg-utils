import { StatusEffectType } from "../StatusEffectType";
import { Activate } from "./Activate";
export declare class ShurikenAbility implements Activate {
    effect: StatusEffectType;
    enablePetManaHealing: boolean;
    enableManaRegen: boolean;
    enableGenericManaHealing: boolean;
    getName(): string;
}
