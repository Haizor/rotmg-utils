import { Equipment } from "./Equipment";
export declare class Item {
    data: Equipment;
    constructor(data: Equipment);
    getStats(): import("./Stats").Stats;
}
