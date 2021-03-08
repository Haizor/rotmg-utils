import ProjectileLoader from '../projectiles';

const defaultEquipXML = "https://static.drips.pw/rotmg/production/current/xml/Equip.xml";
const defaultSetsJSON = "https://static.drips.pw/rotmg/production/current/json/EquipmentSets.json"

const excludedTagNames = ["EquipmentSet"]

const imageOverrides = {
    "d3LofiObjEmbed": "d3LofiObj",
    "lofiChar8x8": "lofiChar",
    "lofiObj5new": "lofiObj5b"
}

const indexOverrides = [
    "Marble Seal", "Staff of Unholy Sacrifice"
]

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

const equipExcludeIds = [
    0x5279,
    0x52c4,
    0x52c5,
    0x4216,
    0x4217,
    0x4218
]

class EquipmentLoader {
    constructor(settings = {}) {
        this.xml = settings.xml;
        this.xmlURL = settings.xmlURL || defaultEquipXML;   
        this.setsJSON = settings.setsJSON || defaultSetsJSON;
        this.projLoader = settings.projLoader || new ProjectileLoader();
    }

    async get() {
        if (this.equipment == null) {
            await this.loadFromXML();
        } 

        return this.equipment;
    }

    async loadFromXML() {
        let projectiles = await this.projLoader.get();

        let setsResponse = await fetch(this.setsJSON, {
            cache: "no-cache"
        });
        let val = await setsResponse.json();

        this.sets = val.EquipmentSet;
        for (let set of this.sets) {
            set.type = parseInt(set.type, 16)
            for (let key of Object.keys(set)) {
                if (key.includes("ActivateOnEquip")) {
                    let obj = set[key];
                    if (!obj.length) {
                        let array = [obj]
                        set[key] = array;
                    }
                }
            }
        }

        let equipmentText;
        if (this.xml) {
            equipmentText = this.xml;
        } else {
            let equipmentResponse = await fetch(this.xmlURL, {method: "GET", cache: "no-store", mode: "cors"});
            equipmentText = await equipmentResponse.text();
        }

        let parser = new DOMParser(),
            xmlDoc = parser.parseFromString(equipmentText, "text/xml")

        let allEquips = {};
        let equipNodes = xmlDoc.documentElement.children;
        if (xmlDoc.documentElement.tagName === "Object") {
            equipNodes = [xmlDoc.documentElement]
        }
        for (let child of equipNodes) {
            try {
                if (excludedTagNames.includes(child.nodeName)) continue;
    
                let objectId = child.getAttribute("id");
                let type = parseInt(child.getAttribute("type"));

                if (equipExcludeIds.includes(type)) continue;
    
                if (objectId.includes("Proc")) continue;
        
                let currEquip = {};
                let displayNameNode = child.getElementsByTagName("DisplayId")[0]
                currEquip.name = displayNameNode ? displayNameNode.firstChild.nodeValue : objectId;
                currEquip.type = type
                currEquip.slotType = parseInt(getValue(child, "SlotType"));
                currEquip.description = (getValue(child, "Description") || "").replace(/\\n/g, "<br>");
        
                let textureNode = child.getElementsByTagName("Texture")[0];
                if (textureNode != null) {
                    let file = getValue(textureNode, "File");
                    if (imageOverrides[file]) file = imageOverrides[file];
        
                    let base = 16;
                    if (indexOverrides.includes(objectId)) {
                        base = 10;
                    }
        
                    currEquip.texture = {
                        file: file.replace("Embed", ""),
                        index: parseInt(textureNode.getElementsByTagName("Index")[0].firstChild.nodeValue, base)
                    }
                }

                currEquip.oldSound = getValue(child, "OldSound") || "magicShoot";

                currEquip.stats = {}
                let statsNodes = child.getElementsByTagName("ActivateOnEquip");
                if (statsNodes.length > 0) {
                    let stats = {};
                    for (let statsNode of statsNodes) {
                        let increment = statsNode.firstChild.nodeValue == "IncrementStat";
                        let amount = parseInt(statsNode.getAttribute("amount"));
                        stats[STAT_IDS[parseInt(statsNode.getAttribute("stat"))]] = increment ? amount : -amount
                    }
                    currEquip.stats = stats;
                }
        
                let tierNode = child.getElementsByTagName("Tier")[0];
                
                if (tierNode == null) {
                    currEquip.tier = child.hasAttribute("setType") ? "ST" : "UT"
                } else {
                    currEquip.tier = tierNode.firstChild.nodeValue;
                }
        
                let projectileNode = child.getElementsByTagName("Projectile")[0];
        
                if (projectileNode != null) {
                    let projectile = {};
                    try {
                        projectile.object = projectiles[getValue(projectileNode, "ObjectId")] || projectiles["Grey Missile"];
                        projectile.speed = parseInt(getValue(projectileNode, "Speed"));
                        projectile.minDamage = parseInt(getValue(projectileNode, "MinDamage"));
                        projectile.maxDamage = parseInt(getValue(projectileNode, "MaxDamage"));
                        projectile.lifetime = parseInt(getValue(projectileNode, "LifetimeMS"));
                        projectile.multiHit = hasValue(projectileNode, "MultiHit");
                        projectile.passesCover = hasValue(projectileNode, "PassesCover");
                        projectile.armorPiercing = hasValue(projectileNode, "ArmorPiercing");
                        projectile.boomerang = hasValue(projectileNode, "Boomerang");
                        projectile.parametric = hasValue(projectileNode, "Parametric");
                        projectile.wavy = hasValue(projectileNode, "Wavy");
                        projectile.range = getRange(projectile);

                        projectile.acceleration = parseInt(getValue(projectileNode, "Acceleration"));
                        projectile.accelerationDelay = parseInt(getValue(projectileNode, "AccelerationDelay"));
                        projectile.speedClamp = parseInt(getValue(projectileNode, "SpeedClamp"));
    
                        projectile.faceDir = hasValue(projectileNode, "FaceDir");
                        projectile.amplitude = parseFloat(getValue(projectileNode, "Amplitude")) || 0;
                        projectile.frequency = parseFloat(getValue(projectileNode, "Frequency")) || 0;
                        projectile.size = parseInt(getValue(projectileNode, "Size")) || 100;
        
                        let conditionEffectNodes = projectileNode.getElementsByTagName("ConditionEffect");
                        if (conditionEffectNodes.length > 0) {
                            let conditionEffects = []
                            for (let conditionEffectNode of conditionEffectNodes) {
                                let conditionEffect = {
                                    id: conditionEffectNode.firstChild.nodeValue
                                }
                                
                                for (let attrName of conditionEffectNode.getAttributeNames()) {
                                    conditionEffect[attrName] = conditionEffectNode.getAttribute(attrName);
                                }
                                conditionEffects.push(conditionEffect);
                            }
                            currEquip.conditionEffects = conditionEffects;
                        }
        
                    } catch {
                        console.log(`Failed to get projectiles for ${currEquip.name}!`)
                    }
                    currEquip.projectile = projectile;
                }
        
        
                let extraTooltipData = child.getElementsByTagName("ExtraTooltipData")[0];
                if (extraTooltipData != null) {
                    let tooltipData = [];
                    for (let effectInfoNode of extraTooltipData.getElementsByTagName("EffectInfo")) {
                        let effectInfo = {};
                        for (let attribute of effectInfoNode.attributes) {
                            effectInfo[attribute.name] = attribute.value;
                        }
                        tooltipData.push(effectInfo);
                    }
                    currEquip.tooltipData = tooltipData;
                }
        
                let setType = child.getAttribute("setType");
                if (setType) currEquip.setInfo = this.getSetFromType(parseInt(setType, 16)); 
        
                currEquip.shots = parseInt(getValue(child, "NumProjectiles") || "1");
                currEquip.arcGap = (parseInt(getValue(child, "ArcGap") || "10"));
                currEquip.rateOfFire = +(parseFloat(getValue(child, "RateOfFire") || "1")).toFixed(2);
                currEquip.mpCost = parseInt(getValue(child, "MpCost"));
                currEquip.cooldown = parseFloat(getValue(child, "Cooldown"));

                currEquip.burstCount = parseInt(getValue(child, "BurstCount"));
                currEquip.burstDelay = parseFloat(getValue(child, "BurstDelay"));
                currEquip.burstMinDelay = parseFloat(getValue(child, "BurstMinDelay"));
        
                let activateNodes = child.getElementsByTagName("Activate");
                if (activateNodes.length > 0) {
                    let activateArray = [];
                    for (let activateNode of activateNodes) {
                        let activate = {}
                        activate.id = activateNode.firstChild.nodeValue;
        
                        for (let attrName of activateNode.getAttributeNames()) {
                            activate[attrName] = activateNode.getAttribute(attrName);
                        }
                        activateArray.push(activate);
                    }
                    currEquip.activates = activateArray;
                }
                
                currEquip.xpBonus = parseInt(getValue(child, "XPBonus"));
                currEquip.feedPower = parseInt(getValue(child, "feedPower"));
                currEquip.soulbound = hasValue(child, "Soulbound");

                currEquip.trueRange = calcTrueRange(currEquip, currEquip.shots);
        
                if (allEquips[currEquip.slotType] == null) allEquips[currEquip.slotType] = [];
                allEquips[currEquip.slotType].push(currEquip)
            } catch (e) {

            }
        }
        this.equipment = allEquips;

        return this.equipment;
    }

    addFromEquipLoader(equipLoader, setCustom = true) {
        if (!this.equipment) return;
        for (let slot of Object.keys(equipLoader.equipment)) {
            for (let equip of equipLoader.equipment[slot]) {
                if (!this.equipment[slot]) this.equipment[slot] = [];
                equip.custom = true;
                equip.categoryIndex = this.equipment[slot].length;
                this.equipment[slot].push(equip);
            }
        }
    }

    addEquipment(equip, slotType) {
        if (this.equipment == null) return;
        this.equipment[slotType].push(equip);
        return this.equipment[slotType].length;
    }

    removeEquipment(equip, slotType) {
        if (this.equipment == null) return;
        this.equipment[slotType] = this.equipment[slotType].filter((e) => e !== equip);
    }

    async getFromID(slotType, id) {
        if (!this.equipment) return;
        for (let equip of this.equipment[slotType]) {
            if (equip.type === id) {
                return equip;
            }
        }
    }

    getFromType(type) {
        if (!this.equipment) return;
        for (let slotType in this.equipment) {
            for (let equip of this.equipment[slotType]) {
                if (equip.type === type) {
                    return equip;
                }
            }
        }
    }

    getCustomEquipment() {
        let customEquipment = [];
        for (let index in this.equipment) {
            for (let equip of this.equipment[index]) {
                if (equip.custom) {
                    if (!customEquipment[index]) customEquipment[index] = [];
                    customEquipment[index].push(equip);
                }
            }
        }
        return customEquipment;
    }

    clearCustomEquipment() {
        for (let slot in this.equipment) {
            for (let equipIndex in this.equipment) {
                let equip = this.equipment[slot][equipIndex];
                if (equip && equip.custom) this.equipment[slot][equipIndex] = null;
            }
            if (this.equipment[slot]) this.equipment[slot] = this.equipment[slot].filter(val => val != null);
        }
    }

    addCustomEquipment(customEquipment) {
        for (let index in customEquipment) {
            if (customEquipment[index]) {
                for (let customEquip of customEquipment[index]) {
                    if (this.equipment[index]) this.equipment[index].push(customEquip);
                }
            }
        }
    }

    getSetFromType(setId) {
        if (setId == null) return;
    
        for (let setInfo of this.sets) {
            if (setInfo.type == setId) return setInfo;
        }
    }
}

function getValue(node, name) {
	try {
		return node.getElementsByTagName(name)[0].firstChild.nodeValue;
	} catch {
		return undefined;
	}
}

function hasValue(node, name) {
    try {
        return node.getElementsByTagName(name)[0] != null;
    } catch {
        return false;
    }
}

export function getRange(projectile) {
    return +(((projectile.lifetime / 10000) * projectile.speed) / (projectile.boomerang ? 2 : 1)).toFixed(2)
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

export default EquipmentLoader;