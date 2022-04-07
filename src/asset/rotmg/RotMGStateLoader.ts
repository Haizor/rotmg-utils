import { AssetLoader } from "../normal/AssetLoader";
import { RotMGStates } from "./RotMGStates";
import { XMLParser } from "fast-xml-parser";

export class RotMGStateLoader implements AssetLoader<string, RotMGStates> {
	async load(sources: string[]): Promise<RotMGStates> {
		const behaviours = new RotMGStates();
		sources.forEach((src) => {
			const parser = new XMLParser({
				parseAttributeValue: true,
				ignoreAttributes: false
			})
			const xml = parser.parse(src);

			if (Array.isArray(xml.States.State)) {
				for (const state of xml.States.State) {
					behaviours.parseFromXML(state);
				}
			} else {
				behaviours.parseFromXML(xml.States.State)
			}
		})
		return behaviours;
	}
}