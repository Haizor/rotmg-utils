const defaultClassURL = "https://static.drips.pw/rotmg/production/current/xml/Players.xml"

class ClassLoader {
    constructor(classURL = defaultClassURL) {
        this.classURL = classURL;
    }

    async get() {
        if (this.classes) return this.classes;

        return await this.getFromXml();
    }

    async getFromXml() {
        let classText = await (await fetch(this.classURL)).text();
        let parser = new DOMParser(),
            xmlDoc = parser.parseFromString(classText, "text/xml");
        let classes = {}

        for (let child of xmlDoc.documentElement.children) {
            let clazz = {};
            if (child.nodeName != "Object") continue;
            clazz.id = child.getAttribute("id");
            clazz.stats = getStats(child);

            let slotTypesNode = child.getElementsByTagName("SlotTypes")[0];
            clazz.slotTypes = [];
            for (let num of slotTypesNode.firstChild.nodeValue.split(', ')) {
                clazz.slotTypes.push(parseInt(num))
            }

            let equips = child.getElementsByTagName("Equipment")[0].firstChild.nodeValue.split(', ');
            clazz.equipment = [];
            for (let i in equips) {
                let equip = parseInt(equips[i]);
                if (equip != -1)
                clazz.equipment[i] = equip;
            }

            let type = parseInt(child.getAttribute("type"), 16);
            clazz.type = type;
            classes[type] = clazz;
        }

        this.classes = classes;
        return this.classes;
    }
}

function getStats(clazzNode) {
    function getStat(name) {
        let node = clazzNode.getElementsByTagName(name)[0];
        return {
            min: parseInt(node.firstChild.nodeValue),
            max: parseInt(node.getAttribute("max"))
        }
    }

    return {
        hp: getStat("MaxHitPoints"),
        mp: getStat("MaxMagicPoints"),
        atk: getStat("Attack"),
        def: getStat("Defense"),
        spd: getStat("Speed"),
        dex: getStat("Dexterity"),
        vit: getStat("HpRegen"),
        wis: getStat("MpRegen")
    }
}

export default ClassLoader