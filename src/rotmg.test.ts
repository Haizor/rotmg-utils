import { AssetManager } from "./asset"
import { Dye, DyeAnimation, DyeAnimationType, Equipment, ObjectClass, RotMGAssetLoader, SlotType } from "./rotmg-asset"
import fetch from 'node-fetch';

//yes i am aware that this is a terrible practice. what else??? load the xml from local? create testing xmls??? stupid
globalThis.fetch = fetch;

const manager = new AssetManager();
manager.registerLoader("rotmg-asset", new RotMGAssetLoader());

beforeEach(() => {
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
					"https://www.haizor.net/rotmg/assets/production/xml/equip.xml",
					"https://www.haizor.net/rotmg/assets/production/xml/dyes.xml",
					"https://www.haizor.net/rotmg/assets/production/xml/textiles.xml"
				]
			}
		]
	});
})

	
describe("Basic Weapon", () => {
	test("Universal Equipment Data", () => {
		const object = manager.get("rotmg", "Short Sword").value as Equipment;
		expect(object.class).toBe(ObjectClass.Equipment);
		expect(object.getDisplayName()).toBe("Short Sword");
		expect(object.slotType).toBe(SlotType.Sword);
		expect(object.soulbound).toEqual(false);
		expect(object.numProjectiles).toEqual(1);
	})
})

describe("Dyes & Textiles", () => {

	describe("Dye", () => {
		test("Dye is a dye / not a textile", () => {
			const object = manager.get("rotmg", "Alice Blue Clothing Dye").value as Dye;
			expect(object.isColor()).toBe(true);
			expect(object.isTextile()).toBe(false);
		})
		test("Dye color is correct", () => {
			const object = manager.get("rotmg", "Blue Clothing Dye").value as Dye;
			const rgb = object.getRGB();
			expect(rgb[0]).toBe(0);
			expect(rgb[1]).toBe(0);
			expect(rgb[2]).toBe(255);
		})
	})
	describe("Textile", () => {
		test("Textile is a textile / not a dye", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth").value as Dye;
			expect(object.isTextile()).toBe(true);
			expect(object.isColor()).toBe(false);
		})
		test("Textile texture is correct", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth").value as Dye;
			const texture = object.getTextileTexture();
			expect(texture.file).toBe("textile4x4");
			expect(texture.index).toBe(257);
		})
		test("Textile animation", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth").value as Dye;
			expect(object.dyeAnimation).toBeDefined();
			const dyeAnimation = object.dyeAnimation as DyeAnimation;
			expect(dyeAnimation.pivotX).toBe(0);
			expect(dyeAnimation.pivotY).toBe(0);
			expect(dyeAnimation.type).toBe(DyeAnimationType.Spinning);
			expect(dyeAnimation.speed).toBe(10);
		})
	})
})