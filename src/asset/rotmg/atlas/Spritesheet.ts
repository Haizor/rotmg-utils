import { AssetContainer, Metadata } from "asset/normal/AssetContainer";
import { BasicTexture, Texture } from "../data/Texture";

// export enum Atlases {
// 	"https://www.haizor.net/rotmg/assets/production/atlases/groundTiles.png" = 1,
// 	"https://www.haizor.net/rotmg/assets/production/atlases/characters.png" = 2,
// 	"https://www.haizor.net/rotmg/assets/production/atlases/mapObjects.png" = 4
// }

const DefaultAtlases = {
	1: "groundTiles.png",
	2: "characters.png",
	4: "mapObjects.png"
}

export type Atlases = {
	[key: number]: string
}

export type SpritePosition = {
	x: number;
	y: number;
	w: number;
	h: number;
}

export type SpriteColor = {
	r: number;
	g: number;
	b: number;
	a: number;
}

export type SpriteAtlasData = {
	spriteSheetName: string;
	atlasId: number;
	elements: SpriteData[];
}

export type SpriteData = {
	padding: number;
	index: number;
	spriteSheetName: string;
	aId: number;
	isTransparentSprite: boolean;
	position: SpritePosition;
	maskPosition: SpritePosition;	
	mostCommonColor: SpriteColor;
}

export type AnimatedSpriteData = {
	index: number;
	spriteSheetName: string;
	direction: number;
	action: number;
	set: number;
	spriteData: SpriteData;
}

export enum Direction {
	Side,
	Unknown,
	Front,
	Back
}

export enum Action {
	None, 
	Walk,
	Attack,
}

export class Sprite {
	private _data: SpriteData;
	private _animatedData?: AnimatedSpriteData;
	private _atlases: Atlases;

	constructor(data: SpriteData, atlases: Atlases, animatedData?: AnimatedSpriteData) {
		this._data = data;
		this._atlases = atlases;
		this._animatedData = animatedData;
	}

	getData() {
		return this._data;
	}

	getAnimatedData() {
		return this._animatedData;
	}

	getAtlasSource(): string | undefined {
		return this._atlases[this._data.aId];
	}

	asTexture() {
		return new BasicTexture(this._data.spriteSheetName, this._data.index, false);
	}
}

export type SpriteGetOptions = {
	animated?: boolean;
	multiple?: boolean;
	all?: boolean;

	direction?: number;
	action?: number;

	texture?: Texture
	index: number;
	spriteSheetName: string;
}

export class Spritesheet implements AssetContainer<Sprite | Sprite[]> {
	private _sprites: SpriteAtlasData[] = [];
	private _animatedSprites: AnimatedSpriteData[] = [];

	gl?: WebGLRenderingContext;
	metadata?: Metadata;
	atlases: Atlases = {};

	constructor(gl?: WebGLRenderingContext, settings?: any) {
		this.gl = gl;
		const root = settings?.atlasRoot ?? "https://www.haizor.net/rotmg/assets/production/atlases/";
		for (const [key, value] of Object.entries(DefaultAtlases)) {
			this.atlases[key] = root + value;
		}
	}

	async load(src: string) {
		try {
			const json = JSON.parse(src);
			this._sprites = json.sprites;
			this._animatedSprites = json.animatedSprites;
		} catch (e) {
			console.log("Failed to load sprite JSON!");
		}
	}

	get(options: SpriteGetOptions): (Sprite | Sprite[]) | undefined {
		const { all, multiple } = options;
		let animated: boolean;
		let index: number;
		let spriteSheetName : string;

		if (options.texture !== undefined) {
			index = options.texture.index;
			spriteSheetName = options.texture.file;
			animated = options.texture.animated;
		} else {
			index = options.index;
			spriteSheetName = options.spriteSheetName;
			animated = options.animated ?? false;
		}

		if (animated === true) {
			const direction = options.direction ?? Direction.Side;
			const action = options.action ?? Action.Walk;

			if (all === true) {
				const data = this._animatedSprites.filter((data) => data.index === index && data.spriteSheetName === spriteSheetName);
				if (data.length === 0) return [];

				return data.map((data) => {
					const sprite = new Sprite(data.spriteData, this.atlases, data);
					return sprite;
				})
			}

			if (multiple === true) {
				const data = this._animatedSprites.filter((data) => data.index === index && data.spriteSheetName === spriteSheetName && data.action === action && data.direction === direction);
				if (data.length === 0) return [];

				return data.map((data) => {
					const sprite = new Sprite(data.spriteData, this.atlases, data);
					return sprite;
				})
			} else {
				const data = this._animatedSprites.find((data) => data.index === index && data.spriteSheetName === spriteSheetName && data.action === action && data.direction === direction);
				if (data === undefined) return;
	
				const sprite = new Sprite(data.spriteData, this.atlases, data);
				return sprite;
			}
		} else {
			const atlas = this._sprites.find((data) => data.spriteSheetName === spriteSheetName);
			const data = atlas?.elements.find((data) => data.index === index);
			if (data === undefined) return;

			const sprite = new Sprite(data, this.atlases);
			return sprite;
		}
	}
	
	getAll(): Sprite[] {
		throw new Error("Method not implemented.");
	}

	getMetadata(): Metadata | undefined {
		return this.metadata;
	}

	setMetadata(metadata: Metadata): void {
		this.metadata = metadata;
	}
}