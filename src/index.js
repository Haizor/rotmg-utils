import EquipmentLoader, { getRange, calcTrueRange } from './equipment'
import SkinLoader from './skins'
import DyeLoader from './skins/dyes'
import ClassLoader from './classes'
import ProjectileLoader from './projectiles'
import EnemyLoader from './enemies';
import BrowserLoader from './browser'

const STAT_IDS = {
	0: "hp",
	3: "mp",
	20: "atk",
	21: "def",
	22: "spd",
	26: "vit",
	27: "wis",
	28: "dex"
}

export function getEquipmentStats(equipment = []) {
	const stats = {
		hp: 0,
		mp: 0,
		atk: 0,
		def: 0,
		dex: 0,
		spd: 0,
		vit: 0,
		wis: 0
    }

    const sets = {}

    function addToStats(setStats) {
        if (!setStats) return;
        for (let [stat, amount] of Object.entries(setStats)) {
            stats[stat] += amount;
        }
    }

    for (let equip of equipment) {
        if (equip) {
            if (equip.stats) {
                for (let [stat, amount] of Object.entries(equip.stats)) {
                    stats[stat] += amount;
                }
            }
            if (equip.set) {
                if (!sets[equip.set.type]) sets[equip.set.type] = equip.set;
            }
        }
    }

    for (let set of Object.values(sets)) {
        let count = 0;
        for (let i in equipment) {
            const equip = equipment[i];
            if (!equip || !set.setpieces[i]) continue;
            if (set.setpieces[i].includes(equip.type)) {
                count++;
            }
        }
        addToStats(set.stats.total[count]);
    }

    return stats;
}

export { BrowserLoader, EquipmentLoader, SkinLoader, DyeLoader, ClassLoader, ProjectileLoader, EnemyLoader, getRange, calcTrueRange };