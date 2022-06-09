import { Data, DataController, deserializeObject, SerializationData } from "../../../asset/normal/Serializable";

export class Subattack {
	@Data("@_projectileId")
	projectileId: number = 0;
	@Data("NumProjectiles")
	numProjectiles: number = 1;
	@Data("ArcGap")
	arcGap: number = 15;
	@Data("RateOfFire")
	rateOfFire: number = 1;
}

export const SubattackData: DataController<Subattack[]> = {
	serialize: (subattacks: Subattack[]) => {
		return subattacks.map((subattack) => {
			const data: any = {};
			for (const [key, value] of Object.entries(subattack)) {
				const metadata: SerializationData = Reflect.getMetadata("data", subattack, key);
				if (metadata !== undefined) {
					data[metadata.name] = metadata.controller.serialize(value);
				}
			}
			return data;
		})
	},
	deserialize: (xml: any) => {
		if (xml === undefined) return [];
		const subattacks = Array.isArray(xml) ? xml : [xml];
		return subattacks.map((xml: any) => {
			const subattack = new Subattack();
			deserializeObject(subattack, xml);
			return subattack;
		});
	}
}
