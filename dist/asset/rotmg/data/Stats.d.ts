import { DataController } from "../../../asset/normal/Serializable";
export declare type StatType = "MAXHP" | "MAXMP" | "ATT" | "DEF" | "SPD" | "DEX" | "VIT" | "WIS";
export declare const StatNames: any;
export declare class Stats {
    hp: number;
    mp: number;
    atk: number;
    dex: number;
    spd: number;
    def: number;
    vit: number;
    wis: number;
    getAttacksPerSecond(): number;
    getAttackDamage(damage: number): number;
    getTilesPerSecond(): number;
    getHealthPerSecond(): number;
    getManaPerSecond(): number;
    getInCombatTime(): number;
    getDamageReqForCombat(): number;
    add(stats: Stats): Stats;
    isZero(): boolean;
    map<T>(mapper: (name: string, value: number) => T): T[];
    serialize(): {
        ActivateOnEquip: {
            "@_stat": string;
            "@_amount": number;
            "#text": string;
        }[];
    };
    static min(statsA: Stats, statsB: Stats): Stats;
    static fromXML(xml: any): Stats;
    static convertStatName(stat: string): "hp" | "mp" | "atk" | "def" | "spd" | "dex" | "vit" | "wis";
}
declare const StatsData: DataController<Stats>;
export { StatsData };
