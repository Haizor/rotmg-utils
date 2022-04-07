import { SlotType } from './Equipment';
import { Stats } from './Stats';
import { XMLObject } from './XMLObject';
export declare class Player extends XMLObject {
    description: string;
    hitSound: string;
    deathSound: string;
    slotTypes: SlotType[];
    equipment: number[];
    stats: Stats;
    maxStats: Stats;
    bloodProb: number;
}
