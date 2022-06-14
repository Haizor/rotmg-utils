import { RotMGAssets } from "./RotMGAssets";
import  { XMLParser } from "fast-xml-parser";
import { AssetLoader } from "../normal/AssetLoader";
import { RotMGGroundAssets } from "./RotMGGroundAssets";

export class RotMGAssetLoader implements AssetLoader<string, RotMGAssets | RotMGGroundAssets> {
	async load(sources: string[], settings: Settings = {readOnly: false, type: "object"}): Promise<RotMGAssets | RotMGGroundAssets> {
		const assets = settings.type === "object" ? new RotMGAssets(settings.readOnly) : new RotMGGroundAssets(settings.readOnly);
		await Promise.all(sources.map(async (src) => {
			const parser = new XMLParser({
				parseAttributeValue: true,
				ignoreAttributes: false
			})
			
			const xml = parser.parse(src);

			const rootKey = Object.keys(xml)[1];
			const childKey = Object.keys(xml[rootKey])[0];

			if (rootKey === "EquipmentSets" && assets instanceof RotMGAssets) {
				for (const obj of xml[rootKey][childKey]) {
					assets.parseSet(obj);
				}
			} else if (Array.isArray(xml[rootKey][childKey])) {
				for (const obj of xml[rootKey][childKey]) {
					assets.parseFromXML(obj);
				}
			} else {
				assets.parseFromXML(xml[rootKey][childKey]);
			}
		}))

		return assets;
	}
}

export type Settings =  {
	readOnly: boolean;
	type: "object" | "ground";
}