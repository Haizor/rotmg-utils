import { Equipment } from "./data/Equipment";
import { EquipmentSet } from "./data/EquipmentSet";
import { ObjectClass } from "./data/ObjectClass";
import { XMLObject } from "./data/XMLObject";
import { Player } from "./data/Player";
import { Wall } from "./data/Wall";
import { Skin } from "./data/Skin";
import { Dye } from "./data/Dye";
import { ProjectileRender } from "./data/ProjectileRender";
import { AssetContainer, Metadata } from "asset/normal/AssetContainer";
import { Character } from "./data/Character";
import { XMLBuilder } from "fast-xml-parser";
import { deserializeObject } from "../normal/Serializable";

export class RotMGAssets implements AssetContainer<XMLObject> {
	private _objects: XMLObject[] = [];
	private _objectMaps: Map<ObjectClass, XMLObject[]> = new Map();

	private _constructors: Map<ObjectClass, any> = new Map();
	private metadata: Metadata | undefined;

	private readOnly: boolean;

	constructor(readOnly: boolean = false) {
		this.readOnly = readOnly;
		this._constructors.set(ObjectClass.Equipment, Equipment);
		this._constructors.set(ObjectClass.Player, Player);
		this._constructors.set(ObjectClass.Wall, Wall);
		this._constructors.set(ObjectClass.Projectile, ProjectileRender);
		this._constructors.set(ObjectClass.Character, Character);
		this._constructors.set(ObjectClass.Skin, Skin);
		this._constructors.set(ObjectClass.Dye, Dye);
	}

	add(obj: XMLObject) {
		if (this.readOnly) return;

		if (!this._objectMaps.has(obj.class)) {
			this._objectMaps.set(obj.class, []);
		}

		const categorized = this._objectMaps.get(obj.class) as XMLObject[];

		const index = this._objects.findIndex((o) => o.id === obj.id);
		if (index !== -1) {
			this._objects[index] = obj;
			categorized[categorized.findIndex((o) => o.id === obj.id)] = obj;
			return;
		}

		this._objects.push(obj);
		this._objectMaps.get(obj.class)?.push(obj);
	}

	remove(xml: XMLObject) {
		for (let i = 0; i < this._objects.length; i++) {
			if (xml.id === this._objects[i].id) {
				this._objects.splice(i, 1);
			}
		}

		if (this._objectMaps.has(xml.class)) {
			const objs = (this._objectMaps.get(xml.class) as XMLObject[])
			for (let i = 0; i < objs.length; i++) {
				if (xml.id === objs[i].id) {
					objs.splice(i, 1);
				}
			}
		}
	}

	getMetadata(): Metadata | undefined {
		return this.metadata;
	}

	setMetadata(metadata: Metadata): void {
		this.metadata = metadata;
	}

	get(id: any): XMLObject | undefined {
		if (typeof(id) === "string") {
			return this.getObjectFromId(id);
		} else if (typeof(id) === "number") {
			return this.getObjectFromType(id);
		}
		return this.getObjectFromId(id);
	}

	getAll(): XMLObject[] {
		return this._objects;
	}

	getObjects(): XMLObject[] {
		return this._objects;
	}

	getObjectsOfClass(clazz: ObjectClass) {
		return this._objectMaps.get(clazz);
	}

	getObjectFromId(id: string) {
		return this._objects.find((obj) => obj.id === id);
	}

	getObjectFromType(type: number) {
		return this._objects.find((obj) => obj.type === type);
	}

 
	parseFromXML(xml: any): XMLObject | undefined { 
		const clazz = ObjectClass[xml.Class as keyof typeof ObjectClass];
		const constructor = this._constructors.get(clazz);
		const obj: XMLObject = constructor !== undefined ? new constructor() : new XMLObject();
		
		deserializeObject(obj, xml);

		obj.readOnly = this.readOnly;

		this._objects.push(obj);
		
		if (!this._objectMaps.has(obj.class)) {
			this._objectMaps.set(obj.class, []);
		}

		this._objectMaps.get(obj.class)?.push(obj);

		return obj;
	}

	parseSet(xml: any) {
		const set = new EquipmentSet();
		deserializeObject(set, xml);
		
		for (const piece of set.setpieces) {
			const obj = this.getObjectFromType(piece.type);
			if (!(obj instanceof Equipment)) continue;
			obj.set = set;
			obj.tier = "ST";
		}
	}

	serialize() {
		const obj = {
			Objects: {
				Object: this.getAll().map((v) => v.getSerializedObject())
			}
		}
		
		const parser = new XMLBuilder({
			attributeNamePrefix: "@_",
			textNodeName: "",
			ignoreAttributes: false,
		});

		return parser.build(obj);
	}
}