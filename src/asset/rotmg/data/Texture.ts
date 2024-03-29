import { DataController } from "../../../asset/normal/Serializable";

export interface TextureProvider {
	getTexture(time: number): Texture;
	serialize(): any;
}

export interface Texture {
	file: string,
	index: number,
	animated: boolean
}

export const TextureData: DataController<TextureProvider> = {
	serialize: (texture) => {
		if (texture === undefined) return;

		return texture.serialize()
	},
	deserialize: (xml) => {
		return BasicTexture.fromXML(xml)
	}
}

function serializeTextureObject(texture: Texture) {
	return {
		File: texture.file,
		Index: texture.index
	}
}

export class BasicTexture implements TextureProvider, Texture {
	file: string = ""
	index: number = 0
	animated: boolean = false;

	constructor(file: string, index: number, animated: boolean) {
		this.file = file;
		this.index = index;
		this.animated = animated;
	}

	getTexture(): Texture {
		return this;
	}

	serialize() {
		const key = this.animated ? "AnimatedTexture" : "Texture";
		return {[key]: serializeTextureObject(this)}
	}

	static fromXML(xml: any): TextureProvider {
		if (xml.RandomTexture !== undefined) {
			if (xml.RandomTexture.Texture instanceof Array) {
				return new RandomTexture(xml.RandomTexture.Texture.map((tex: any): Texture => {
					return {
						animated: false,
						file: tex.File,
						index: tex.Index
					}
				}));
			} else {
				return new RandomTexture([xml.RandomTexture.Texture])
			}

		} else if (xml.Animation !== undefined) {
			const animations = Array.isArray(xml.Animation) ? xml.Animation : [xml.Animation];

			return new AnimatedTexture(animations.map((animation: any) => {
				let maxTime = 0;

				for (const frame of animation.Frame) {
					maxTime += frame["@_time"]
				}

				return {
					prob: animation["@_prob"],
					maxTime,
					frames: animation.Frame.map((frame: any) => {
						return {time: frame["@_time"], texture: {
							file: frame.Texture.File,
							index: frame.Texture.Index,
							animated: false
						}}
					})
				}
			}))
		}

		
		const texture = xml.Texture || xml.AnimatedTexture;
		if (texture !== undefined)
		return new BasicTexture(texture.File, texture.Index, xml.AnimatedTexture !== undefined);
	}
}

export class RandomTexture implements TextureProvider {
	textures: Texture[] = [];
	constructor(textures: Texture[]) {
		this.textures = textures;
	}

	getTexture() {
		return this.textures[Math.floor(Math.random() * this.textures.length)];
	}

	serialize() {
		let obj: any = {
			RandomTexture: {
				AnimatedTexture: [],
				Texture: []
			}
		}
		for (const tex of this.textures) {
			(tex.animated ? obj.RandomTexture.AnimatedTexture : obj.RandomTexture.Texture).push(serializeTextureObject(tex));
		}
		return obj;
	}
}

export class AnimatedTexture implements TextureProvider {
	animations: Animation[] = [];
	currAnimationIndex: number = 0;
	constructor(animations: Animation[]) {
		this.animations = animations;
	}

	getTexture(time: number): Texture {
		const animation = this.animations[this.currAnimationIndex];
		let timeSeconds = (time / 1000) % animation.maxTime;
		for (const frame of animation.frames) {
			timeSeconds -= frame.time;
			if (timeSeconds < 0) {
				return frame.texture;
			}
		}

		return animation.frames[0].texture;
	}

	serialize() {
		return {
			Animation: this.animations.map((animation) => {
				return {
					"@_prob": animation.prob,
					"Frame": animation.frames.map((frame) => {
						return {
							"@_time": frame.time,
							Texture: serializeTextureObject(frame.texture)
						}
					})
				}
			})
		}
	}
}

type Animation = {
	frames: Frame[],
	prob: number,
	maxTime: number
}

type Frame = {
	time: number,
	texture: Texture
}