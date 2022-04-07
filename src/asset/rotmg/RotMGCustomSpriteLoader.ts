import { AssetLoader } from "../normal/AssetLoader";
import { CustomSpritesheet } from "./atlas/CustomSpritesheet";

export class RotMGCustomSpriteLoader implements AssetLoader<string, CustomSpritesheet> {
	gl?: WebGLRenderingContext;
	constructor(gl?: WebGLRenderingContext) {
		this.gl = gl;
	}

	async load(sources: string[]): Promise<CustomSpritesheet> {
		const sheet = new CustomSpritesheet();
		for (const src of sources) {
			await sheet.load(src);
		}
		return sheet;
	}
}