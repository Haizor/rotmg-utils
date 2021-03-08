const DEFAULT_RESOURCES = [
	{
		name: "Lowlands",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/Low.xml"]
	},
	{
		name: "Midlands",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/Mid.xml"]
	},
	{
		name: "Highlands",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/High.xml"]
	},
	{
		name: "Mountains",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/Mountains.xml"]
	},
	{
		name: "Encounters",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/Encounters.xml"]
	},
	{
		name: "Ocean Trench",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/OceanTrench.xml"]
	},
	{
		name: "Tomb of the Ancients",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/TombOfTheAncients.xml"]
	},
	{
		name: "The Shatters",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/Shatters.xml"]
	},
	{
		name: "The Nest",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/epicHiveObjects.xml"]
	},
	{
		name: "Abandoned Mineshaft",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/fungalCavernObjects.xml",
				"https://static.drips.pw/rotmg/production/current/xml/crystalCaveObjects.xml"]
	},
	{
		name: "Lost Halls",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/lostHallsObjects.xml"]
	},
	{
		name: "Oryx's Sanctuary",
		urls: ["https://static.drips.pw/rotmg/production/current/xml/archbishopObjectsMen.xml",
				"https://static.drips.pw/rotmg/production/current/xml/oryxSanctuaryObjects.xml",
				"https://static.drips.pw/rotmg/production/current/xml/oryxSanctuaryUObjects.xml"]
	},
]

const FILE_OVERRIDES = {
	"lofiObjBig": (tex) => tex.size = 16,
	"lofiChar8x8": (tex) => tex.file = "lofiChar",
	"lofiChar16x8": (tex) => tex.file = "lofiChar",
	"lofiChar16x16": (tex) => tex.file = "lofiChar",
	"lofiChar28x8": (tex) => tex.file = "lofiChar2",
	"lofiChar216x16": (tex) => tex.file = "lofiChar2",
	"lofiChar216x8": (tex) => tex.file = "lofiChar2",
	"d1chars16x16r": (tex) => tex.file = "d1Chars16x16r",
	"d3Chars8x8rEmbed": (tex) => tex.file = "d3Chars8x8r",
	"d3Chars16x16rEmbed": (tex) => tex.file = "d3Chars16x16r",

}

export default class EnemyLoader {
	constructor(options = {}) {
		this.resources = options.resources || DEFAULT_RESOURCES;
	}

	async get() {
		if (!this.enemies) {
			return await this.load();
		}
	}

	async load() {
		this.enemiesByDefense = [];
		this.enemies = await Promise.all(this.resources.map(async ({name, urls}) => {
			let enemies = [];

			await Promise.all(urls.map(async (url) => {
				let res = await fetch(url);
				let text = await res.text();
	
				let parser = new DOMParser(),
					xmlDoc = parser.parseFromString(text, "text/xml");
	
	
				for (let child of xmlDoc.documentElement.children) {
					if (child.getElementsByTagName("Enemy").length === 0) continue;
					if (getValue(child, "Class") !== "Character") continue;
					if (hasValue(child, "Invincible")) continue;

					let enemy = {};
					enemy.type = parseInt(child.getAttribute("type"));
					enemy.id = child.getAttribute("id");
					enemy.displayId = getValue(child, "DisplayId") || enemy.id;
					enemy.hitSound = getValue(child, "HitSound")
					enemy.deathSound = getValue(child, "DeathSound");
					enemy.size = parseInt(getValue(child, "Size"));
					enemy.maxHP = parseInt(getValue(child, "MaxHitPoints"));
					enemy.defense = parseInt(getValue(child, "Defense")) || 0;
	
					let texture = {};
					texture.animated = child.getElementsByTagName("AnimatedTexture").length > 0;
			
					let textureNode = child.getElementsByTagName(texture.animated ? "AnimatedTexture" : "Texture")[0];
					texture.file = getValue(textureNode, "File");
	
					if (texture.file === "invisible") continue;
					texture.size = 8;
					if (texture.file.includes("16x16")) {
						texture.size = 16
					} else if (texture.file.includes("32x32")) {
						texture.size = 32;
					} else if (texture.file.includes("16x8")) {
						texture.size = {
							x: 16,
							y: 8
						}
					}
					if (FILE_OVERRIDES[texture.file]) {
						FILE_OVERRIDES[texture.file](texture);
					}
					let indexString = getValue(textureNode, "Index");
					texture.index = parseInt(indexString);
	
					enemy.texture = texture;
	
					if (!this.enemiesByDefense[enemy.defense]) this.enemiesByDefense[enemy.defense] = [];
					this.enemiesByDefense[enemy.defense].push(enemy);
	
					enemies.push(enemy);
				}
			}))
			return {
				name,
				enemies
			}
		}))

		return this.enemies;
	}

	getEnemiesByDef(defense) {
		return this.enemiesByDefense[defense] || [];
	}
}

function getValue(node, name) {
	try {
		return node.getElementsByTagName(name)[0].firstChild.nodeValue;
	} catch {
		return null;
	}
}

function hasValue(node, name) {
	try {
		return node.getElementsByTagName(name).length > 0;
	} catch {
		return false;
	}
}