import { XMLObject } from "./XMLObject";
import { Data, DataController, XMLHex } from "../../../asset/normal/Serializable";
import { BasicTexture, Texture, TextureData } from "./Texture";

export type DyeAnimation = {
	type: DyeAnimationType,
	speed: number,
	pivotX: number,
	pivotY: number
}

export enum DyeAnimationType  {
	Horizontal = 1,
	Vertical = 2,
	Spinning = 3
}

export const DyeAnimationData: DataController<DyeAnimation> = {
	serialize: (dye: DyeAnimation) => {
		return {
			["#name"]: "AnimatedDye",
			["@_type"]: dye.type,
			["@_speed"]: dye.speed,
			["@_pivotX"]: dye.pivotX,
			["@_pivotY"]: dye.pivotY,
		}
	},
	deserialize: (node: any) => {
		if (node === undefined) return undefined;
		return {
			type: node["@_type"] as DyeAnimationType,
			speed: node["@_speed"],
			pivotX: node["@_pivotX"],
			pivotY: node["@_pivotY"]
		}
	}
}

export class Dye extends XMLObject {
	@Data("Mask", TextureData)
	mask?: Texture;
	@Data("Tex1", XMLHex)
	clothing?: string = undefined;
	@Data("Tex2", XMLHex)
	accessory?: string = undefined;
	@Data("AnimatedDye", DyeAnimationData)
	dyeAnimation?: DyeAnimation = undefined;

	getColor(): string {
		const dyeTex = this.clothing ?? this.accessory;
		if (dyeTex === undefined) return "#000000";
		return `#${dyeTex.slice(3)}`;
	}

	getSheetName(): string {
		const dyeTex = this.clothing ?? this.accessory;
		if (dyeTex === undefined) return "";
		const size = parseInt(`0x${dyeTex[2]}`)
		return `textile${size}x${size}`;
	}

	getIndex(): number {
		const dyeTex = this.clothing ?? this.accessory;
		if (dyeTex === undefined) return -1;
		return parseInt(`0x${dyeTex.slice(3)}`);
	}


	isClothing(): boolean {
		return this.clothing !== undefined;
	}

	isAccessory(): boolean {
		return this.accessory !== undefined;
	}

	//Technically this could be wrong at some point but whatever
	isColor(): boolean {
		return !this.isTextile();
	}

	isTextile(): boolean {
		const dyeTex = this.clothing ?? this.accessory;
		if (dyeTex === undefined) return false;
		return parseInt(`0x${dyeTex[2]}`) > 1
	}

	getTextileTexture(): BasicTexture | undefined {
		if (!this.isTextile) return;
		return new BasicTexture(this.getSheetName(), this.getIndex(), false);
	}

	getRGB(): [number, number, number] | undefined {
		if (!this.isColor()) return;
		const color = this.getColor();
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		return [r, g, b];
	}
}