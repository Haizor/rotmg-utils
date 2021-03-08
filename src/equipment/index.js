import ProjectileLoader from '../projectiles'

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

class EquipmentLoader {
    constructor(settings = {}) {
        this.xml = settings.xml;
        this.xmlURL = settings.xmlURL || "https://www.haizor.net/rotmg/unity/xml/Equip.xml";   
        this.setsURL = settings.setsURL || "https://www.haizor.net/rotmg/unity/xml/equipmentsets.xml";
        this.projLoader = settings.projLoader || new ProjectileLoader();
    }

    async load() {
        if (this.equipment) return this.equipment;

        this.projectiles = await this.projLoader.get();
        this.sets = await this.loadSets(this.setsURL);

        if (typeof(this.xmlURL) == "string") {
            this.equipment = await this.loadEquipment(this.xmlURL)
        } else {
            this.equipment = [].concat(...await Promise.all(this.xmlURL.map((url) => this.loadEquipment(url))))
        }   
    }

    async loadEquipment(url) {
        const res = await fetch(url, {cache: "no-cache"});
        const xml = (new DOMParser()).parseFromString((await res.text()), "text/xml");

        const equipment = [];

        for (let node of xml.getElementsByTagName("Objects")[0].getElementsByTagName("Object")) {
            const clazz = getStringValue(node, "Class");
            if (clazz != "Equipment") continue;

            const equip = {};
            equip.type = parseInt(getAttribute(node, "type"), 16);

            equip.name = getStringValue(node, "DisplayId") || getAttribute(node, "id")
            equip.description = getStringValue(node, "Description");

            equip.sound = getStringValue(node, "Sound");
            equip.oldSound = getStringValue(node, "OldSound");

            const texNode = getChild(node, "Texture");
            equip.texture = {
                file: getStringValue(texNode, "File"),
                index: getIntValue(texNode, "Index")
            }

            if (hasValue(node, "ExtraTooltipData")) {
                const tooltipData = [];

                for (let infoNode of getChild(node, "ExtraTooltipData").getElementsByTagName("EffectInfo")) {
                    const effectInfo = {}
                    for (let attribute of infoNode.attributes) {
                        effectInfo[attribute.name] = attribute.value;
                    }

                    tooltipData.push(effectInfo)
                }

                equip.tooltipData = tooltipData;
            }

            if (getAttribute(node, "setType")) {
                const type = parseInt(getAttribute(node, "setType"), 16)
                equip.set = this.getSet(type);
            }

            if (hasValue(node, "ActivateOnEquip")) {
                equip.stats = {};

                for (let statNode of node.getElementsByTagName("ActivateOnEquip")) {
                    equip.stats[STAT_IDS[parseInt(getAttribute(statNode, "stat"))]] = parseInt(getAttribute(statNode, "amount"))
                }
            }

            if (hasValue(node, "Projectile")) {
                const projectile = {};
                const projNode = getChild(node, "Projectile");

                projectile.object = this.projLoader.projectiles[getStringValue(projNode, "ObjectId")] || this.projLoader.projectiles["Grey Missile"]
                projectile.speed = getIntValue(projNode, "Speed");
                
                if (hasValue(projNode, "Damage")) {
                    projectile.minDamage = getIntValue(projNode, "Damage");
                    projectile.maxDamage = getIntValue(projNode, "Damage");
                } else {
                    projectile.minDamage = getIntValue(projNode, "MinDamage");
                    projectile.maxDamage = getIntValue(projNode, "MaxDamage");
                }
                
                projectile.lifetime = getIntValue(projNode, "LifetimeMS");

                projectile.amplitude = getFloatValue(projNode, "Amplitude") || 0;
                projectile.frequency = getFloatValue(projNode, "Frequency") || 0;
                projectile.wavy = hasValue(projNode, "Wavy");

                projectile.acceleration = getIntValue(projNode, "Acceleration");
                projectile.accelerationDelay = getIntValue(projNode, "AccelerationDelay");
                projectile.speedClamp = getIntValue(projNode, "SpeedClamp");

                projectile.size = getIntValue(projNode, "Size") || 100;

                projectile.boomerang = hasValue(projNode, "Boomerang")
                projectile.parametric = hasValue(projNode, "Parametric");

                projectile.multiHit = hasValue(projNode, "MultiHit");
                projectile.passesCover = hasValue(projNode, "PassesCover");
                projectile.armorPiercing = hasValue(projNode, "ArmorPiercing")
                projectile.faceDir = hasValue(projNode, "FaceDir");

                if (hasValue(projNode, "ConditionEffect")) {
                    const condEffects = [];
                    for (let effNode of projNode.getElementsByTagName("ConditionEffect")) {
                        const condEffect = { id: effNode.firstChild.nodeValue };

                        for (let attr of effNode.getAttributeNames()) {
                            condEffect[attr] = effNode.getAttribute(attr);
                        }

                        condEffects.push(condEffect);
                    }

                    equip.conditionEffects = condEffects;
                }

                projectile.range = getRange(projectile);

                equip.projectile = projectile;
            }

            if (hasValue(node, "Activate")) {
                const activates = [];
                for (let actNode of node.getElementsByTagName("Activate")) {
                    const activate = {}
                    activate.id = actNode.firstChild.nodeValue;

                    for (let attr of actNode.getAttributeNames()) {
                        activate[attr] = actNode.getAttribute(attr);
                    }
                    activates.push(activate);
                }
                equip.activates = activates;
            }

            if (hasValue(node, "OnPlayerAbilityActivate")) {
                const activates = [];
                for (let actNode of node.getElementsByTagName("OnPlayerAbilityActivate")) {
                    const activate = {}
                    activate.id = actNode.firstChild.nodeValue;
                    

                    for (let attr of actNode.getAttributeNames()) {
                        activate[attr] = actNode.getAttribute(attr);
                    }
                    activates.push(activate);
                }
                equip.activates = activates;
            }

            equip.shots = getIntValue(node, "NumProjectiles") || 1;
            const arcGap = getIntValue(node, "ArcGap");

            equip.arcGap = !isNaN(arcGap) ? arcGap : 10;
            equip.rateOfFire = getFloatValue(node, "RateOfFire") || 1;

            equip.burstCount = getIntValue(node, "BurstCount");
            equip.burstDelay = getFloatValue(node, "BurstDelay");
            equip.burstMinDelay = getFloatValue(node, "BurstMinDelay");

            equip.mpCost = getIntValue(node, "MpCost");
            equip.cooldown = getFloatValue(node, "Cooldown");

            equip.slotType = getIntValue(node, "SlotType");
            equip.bagType = getIntValue(node, "BagType");

            equip.tier = getStringValue(node, "Tier");
            if (equip.tier == null) equip.tier = "UT";
            if (equip.set) equip.tier = "ST";

            equip.soulbound = hasValue(node, "Soulbound")
            equip.feedPower = getIntValue(node, "feedPower");
            equip.xpBonus = getIntValue(node, "XPBonus");

            equipment.push(equip);
        }

        return equipment;
    }

    async loadSets(url) {
        const res = await fetch(url, {cache: "no-cache"});
        const xml = (new DOMParser()).parseFromString((await res.text()), "text/xml");

        const sets = [];
        for (let node of xml.getElementsByTagName("EquipmentSet")) {
            const set = {};
            set.type = parseInt(getAttribute(node, "type"), 16)
            set.id = getAttribute(node, "id");

            set.setpieces = [];
            for (let setpieceNode of node.getElementsByTagName("Setpiece")) {
                const slot = parseInt(getAttribute(setpieceNode, "slot"));
                const type = parseInt(getAttribute(setpieceNode, "itemtype"), 16);
                if (!set.setpieces[slot]) set.setpieces[slot] = []
                set.setpieces[slot].push(type);
            }

            function addStats(a, b) {
                if (a == null) return b;
                if (b == null) return a;

                let newStats = {}
                for (let stat of Object.values(STAT_IDS)) {
                    newStats[stat] = (a[stat] || 0) + (b[stat] || 0);
                }
                return newStats;
            }

            function getStats(nodes) {
                const stats = {};
                if (nodes.length <= 0) return null;

                for (let actNode of nodes) {
                    if (actNode.innerHTML != "IncrementStat") continue;

                    const stat = STAT_IDS[parseInt(getAttribute(actNode, "stat"))];
                    const amount = parseInt(getAttribute(actNode, "amount"))

                    if (stats[stat]) {
                        stats[stat] += amount;
                    } else {
                        stats[stat] = amount;
                    }
                }
                return stats;
            }

            set.stats = {
                individual: {},
                total: {}
            };
            set.stats.individual[2] = getStats(node.getElementsByTagName("ActivateOnEquip2"));
            set.stats.individual[3] = getStats(node.getElementsByTagName("ActivateOnEquip3"));
            set.stats.individual[4] = getStats(node.getElementsByTagName("ActivateOnEquipAll"));

            set.stats.total[2] = set.stats.individual[2];
            set.stats.total[3] = addStats(set.stats.total[2], set.stats.individual[3]);
            set.stats.total[4] = addStats(set.stats.total[3], set.stats.individual[4]);

            for (let actNode of node.getElementsByTagName("ActivateOnEquipAll")) {
                if (actNode.firstChild.nodeValue == "ChangeSkin") {
                    set.skin = {
                        type: parseInt(getAttribute(actNode, "skinType"), 16),
                        size: parseInt(getAttribute(actNode, "size")),
                        bulletType: getAttribute(actNode, "bulletType")
                    }
                }
            }

            sets.push(set);
        }

        return sets;
    }

    addEquip(equip) {
        this.equipment.push(equip);
        return this.equipment.length;
    }

    addEquips(equipment) {
        this.equipment = [...this.equipment, ...equipment]
        return this.equipment.length;
    }

    getSet(type) {
        for (let set of this.sets) {
            if (set.type == type) return set;
        }
    }

    getEquip(filter) {
        for (let equip of this.equipment) {
            if (!equip) return;
            if (filter(equip)) return equip;
        }
    }

    getEquips(filter) {
        let result = [];
        for (let equip of this.equipment) {
            if (!equip) continue;
            if (filter(equip)) result.push(equip);
        }
        return result;
    }

    removeEquips(filter) {
        for (const i in this.equipment) {
            const equip = this.equipment[i];
            if (filter(equip)) delete this.equipment[i];
        }
    }
}

function getAttribute(node, name) {
    return node.getAttribute(name);
}

function getChild(node, name) {
    return node.getElementsByTagName(name)[0];
}

function hasValue(node, name) {
    return node.getElementsByTagName(name)[0] != null;
}

function getStringValue(node, name) {
    try {
        return node.getElementsByTagName(name)[0].firstChild.nodeValue;
    } catch {
        return null;
    }
}

function getIntValue(node, name, radix = 10) {
    const stringVal = getStringValue(node, name);
    if (!stringVal) return NaN;
    if (stringVal.match(/0x/g)) return parseInt(stringVal, 16);
    return parseInt(getStringValue(node, name), radix);
}

function getFloatValue(node, name) {
    return parseFloat(getStringValue(node, name));
}

export function getRange(projectile) {
    let range = +(((projectile.lifetime / 10000) * projectile.speed) / (projectile.boomerang ? 2 : 1)).toFixed(2);

    return range;
}

//This was all done by regi/Baconocab, that's why it's actually commented 
export function calcTrueRange(equip, sth) {
    if (!equip.projectile) return undefined;

    let range = equip.projectile.speed * equip.projectile.lifetime / 10000;
    // dumb crap to catch staffs
    if (equip.arcGap == 0 && equip.projectile.amplitude <= 0.5 && equip.shots == 2) {
        return range
    } else if (equip.projectile.frequency == 0 && !equip.projectile.wavy) {
        let radthet = calcTheta(equip, sth) * Math.PI / 180;
        let tanvert = Math.tan(radthet/2);
        let trueran = 0.5/tanvert;

        trueran *= 1000;
        trueran = Math.round(trueran);
        trueran = trueran/1000;

        // maybe i should try to catch undefined domain but let's be real who cares
        if (trueran < 0) {
            return 0;
        }

        // catches true range larger than actual range
        if (trueran > range) trueran = range;

        return trueran.toFixed(2);
    } else {
        return undefined;
    }
}

// this is a lot more complicated than pfiffel's true range calculator
// especially for something that's gonna reach the same result for 99% of stuff
// but doing it this way grants flexibility in terms of how many shots you hit
// that's valuable for stuff like predator bow
// also this will work with cult staff, unlike pfiffel's
// so i figured i'd do this properly.
function calcTheta(equip, sth)
{
    let shotDegrees = [];
    let theta = 0;

    // loop that establishes what the angles are
    for (let i = 0; i < equip.shots; i++)
    {
        let indegree = i * equip.arcGap;
        while (indegree >= 360)
        {
            indegree -= 360;
        }
        shotDegrees.push(indegree);
    }

    let sortedDegrees = [];

    // loop that sorts those angles
    for (let i = 0; i < shotDegrees.length; i++)
    {
        let minValue = 360;
        let mindex = 0;
        for (let j = 0; j < shotDegrees.length; j++)
        {
            if (shotDegrees[j] < minValue)
            {
                minValue = shotDegrees[j];
                mindex = j;
            }
        }
        sortedDegrees[i] = minValue;
        sortedDegrees[i + equip.shots] = minValue + 360;
        shotDegrees[mindex] = 360;
    }

    let possibleThetas = [];

    // loop that finds all possible thetas
    for (let i = 0; i < equip.shots; i++)
    {
        possibleThetas[i] = sortedDegrees[i + sth - 1] - sortedDegrees[i];
        theta += possibleThetas[i] + ", ";
    }

    let minthet = 360;
    // loop that finds the correct theta
    for (let i = 0; i < possibleThetas.length; i++)
    {
        if (possibleThetas[i] < minthet)
        {
            minthet = possibleThetas[i];
        }
    }

    theta = minthet;

    return theta;
}

export default EquipmentLoader