import { Equipment } from "./Equipment";

export class Item {
	data: Equipment;
	constructor(data: Equipment) {
		this.data = data;
	}

	getStats() {
		return this.data.stats;
	}
}