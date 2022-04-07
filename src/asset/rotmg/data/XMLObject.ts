
import { Serializable, Data, serializeObject, XMLEnum } from "../../../asset/normal/Serializable";
import { ObjectClass } from "./ObjectClass";
import { Projectile, ProjectileData } from "./Projectile";
import { TextureProvider, TextureData } from "./Texture";
import { XMLBuilder } from "fast-xml-parser";

export class XMLObject implements Serializable {
	@Data("@_type")
	type: number = -1;
	@Data("@_id")
	id: string = "";
	@Data("Class", XMLEnum(ObjectClass))
	class: ObjectClass = ObjectClass.GameObject;
	@Data("Texture", TextureData, { deserializeFullObject: true })
	@Data("AnimatedTexture", TextureData, { deserializeFullObject: true })
	@Data("RandomTexture", TextureData, { deserializeFullObject: true })
	texture?: TextureProvider = undefined;
	@Data("Projectile", ProjectileData)
	projectiles: Projectile[] = [];

	readOnly: boolean = false;

	getDisplayName(): string {
		return this.id;
	}

	hasProjectiles(): boolean {
		return this.projectiles.length > 0;
	}

	getSerializedObject(): any {
		return serializeObject(this);
	}

	serialize() {
		const obj = {
			Object: {
				...this.getSerializedObject()
			}
		}
		const parser = new XMLBuilder({
			attributeNamePrefix: "@_",
			textNodeName: "",
			ignoreAttributes: false,
		});

		return parser.build(obj);
	}

	serializeProjectiles() {
		return this.projectiles.map((proj) => proj.serialize());
	}
}
