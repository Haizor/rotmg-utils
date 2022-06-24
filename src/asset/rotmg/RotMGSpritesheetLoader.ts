import { AssetLoader } from "../normal/AssetLoader";
import { Spritesheet } from "./atlas/Spritesheet";

export class RotMGSpritesheetLoader implements AssetLoader<string, Spritesheet> {
	gl?: WebGLRenderingContext;
	constructor(gl?: WebGLRenderingContext) {
		this.gl = gl;
	}

	async load(sources: string[], settings: any): Promise<Spritesheet> {
		const manager = new Spritesheet(undefined, settings);
		for (const src of sources) {
			await manager.load(src);
		}
		return manager;
	}
}