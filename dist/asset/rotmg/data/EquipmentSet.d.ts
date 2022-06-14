import { Activate } from "./activate/Activate";
import { Equipment } from "./Equipment";
import { Stats } from "./Stats";
export declare class Setpiece {
    slot: number;
    type: number;
}
export declare class EquipmentSet {
    type: number;
    id: string;
    setpieces: Setpiece[];
    activateOnEquip2: Activate[];
    activateOnEquip3: Activate[];
    activateOnEquipAll: Activate[];
    getStats(equipment: (Equipment | undefined)[]): Stats;
    private statsFromActivates;
}
