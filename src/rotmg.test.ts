import { AssetManager } from "./asset"
import { Equipment, ObjectClass, RotMGAssetLoader, SlotType } from "./rotmg-asset"
import fetch from 'node-fetch';

//yes i am aware that this is a terrible practice. what else??? load the xml from local? create testing xmls??? stupid
globalThis.fetch = fetch;

const manager = new AssetManager();
beforeAll(() => {
	manager.registerLoader("rotmg-asset", new RotMGAssetLoader());
	return manager.load({
		name: "test",
		default: true,
		containers: [
			{
				loader: "rotmg-asset",
				type: "rotmg",
				sourceLoader: "url-to-text",
				settings: {
					readOnly: true,
					type: "object"
				},
				
				sources: [
					"https://www.haizor.net/rotmg/assets/production/xml/equip.xml"
				]
			}
		]
	});
})

	
describe("Basic Weapon", () => {
	const object = manager.get("rotmg", "Short Sword").value as Equipment;

	test("Universal Equipment Data", () => {
		expect(object.class).toBe(ObjectClass.Equipment);
		expect(object.getDisplayName()).toBe("Short Sword");
		expect(object.slotType).toBe(SlotType.Sword);
		expect(object.soulbound).toEqual(false);
	})


	expect(object.numProjectiles).toEqual(1);
})



test("Pog", () => { expect(true).toBe(true)})