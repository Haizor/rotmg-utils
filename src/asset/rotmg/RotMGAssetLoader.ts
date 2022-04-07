import { RotMGAssets } from "./RotMGAssets";
import  { XMLParser } from "fast-xml-parser";
import { AssetLoader } from "../normal/AssetLoader";
import { RotMGGroundAssets } from "./RotMGGroundAssets";

export class RotMGAssetLoader implements AssetLoader<string, RotMGAssets | RotMGGroundAssets> {
	async load(sources: string[], settings: Settings = {readOnly: false, type: "object"}): Promise<RotMGAssets | RotMGGroundAssets> {
		const assets = settings.type === "object" ? new RotMGAssets(settings.readOnly) : new RotMGGroundAssets(settings.readOnly);
		const root = settings.type === "object" ? "Objects" : "GroundTypes";
		const child = settings.type === "object" ? "Object" : "Ground"
		await Promise.all(sources.map(async (src) => {
			const parser = new XMLParser({
				parseAttributeValue: true,
				ignoreAttributes: false
			})
			
			const xml = parser.parse(src);

			if (Array.isArray(xml[root][child])) {
				for (const obj of xml[root][child]) {
					assets.parseFromXML(obj);
				}
			} else {
				assets.parseFromXML(xml[root][child]);
			}
		}))

		return assets;
	}
}

export type Settings =  {
	readOnly: boolean;
	type: "object" | "ground";
}