import { AssetManager } from "./asset"
import { BasicTexture, BulletCreate, Dye, DyeAnimation, DyeAnimationType, Equipment, ObjectClass, Proc, RotMGAssetLoader, SlotType } from "./rotmg-asset"
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

	
describe("Equipment", () => {
	test("Universal Equipment Data", () => {
		const object = manager.get("rotmg", "Short Sword")?.value as Equipment;
		expect(object.class).toBe(ObjectClass.Equipment);
		expect(object.getDisplayName()).toBe("Short Sword");
		expect(object.slotType).toBe(SlotType.Sword);
		expect(object.description).toBe("A steel short sword.");
		expect(object.soulbound).toBe(false);
		expect(object.numProjectiles).toEqual(1);
		expect(object.subAttacks).toStrictEqual([]);
		expect(object.feedPower).toBe(4);
	})
	test("Subattacks", () => {
		const object = manager.get("rotmg", "Bow of Covert Havens")?.value as Equipment;
		expect(object.subAttacks.length).toBeGreaterThanOrEqual(0);
		expect(object.subAttacks[0].numProjectiles).toEqual(1);
		expect(object.subAttacks[0].rateOfFire).toEqual(1);
		expect(object.subAttacks[1].projectileId).toEqual(1);
		expect(object.subAttacks[1].arcGap).toEqual(14);
	})
	test("Burst", () => {
		const object = manager.get("rotmg", "S.T.A.F.F.")?.value as Equipment;
		expect(object.burstCount).toEqual(5);
		expect(object.burstDelay).toBeCloseTo(1.8);
		expect(object.burstMinDelay).toEqual(1)
	})
	test("Proc Parsing", () => {
		const object = manager.get("rotmg", "Primal Arcana")?.value as Equipment;
		expect(object.onShootProcs.length).toEqual(2);
		expect((object.onShootProcs[0] as (Proc & BulletCreate)).type).toBe(0x5625)
	})
})

describe("Dyes & Textiles", () => {

	describe("Dye", () => {
		test("Dye is a dye / not a textile", () => {
			const object = manager.get("rotmg", "Alice Blue Clothing Dye")?.value as Dye;
			expect(object.isColor()).toBe(true);
			expect(object.isTextile()).toBe(false);
		})
		test("Dye color is correct", () => {
			const object = manager.get("rotmg", "Blue Clothing Dye")?.value as Dye;
			const rgb = object.getRGB() as [number, number, number];
			expect(rgb[0]).toBe(0);
			expect(rgb[1]).toBe(0);
			expect(rgb[2]).toBe(255);
		})
	})
	describe("Textile", () => {
		test("Textile is a textile / not a dye", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth")?.value as Dye;
			expect(object.isTextile()).toBe(true);
			expect(object.isColor()).toBe(false);
		})
		test("Textile texture is correct", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth")?.value as Dye;
			const texture = object.getTextileTexture() as BasicTexture;
			expect(texture.file).toBe("textile4x4");
			expect(texture.index).toBe(257);
		})
		test("Textile animation", () => {
			const object = manager.get("rotmg", "Large Hypnotic Cloth")?.value as Dye;
			expect(object.dyeAnimation).toBeDefined();
			const dyeAnimation = object.dyeAnimation as DyeAnimation;
			expect(dyeAnimation.pivotX).toBe(0);
			expect(dyeAnimation.pivotY).toBe(0);
			expect(dyeAnimation.type).toBe(DyeAnimationType.Spinning);
			expect(dyeAnimation.speed).toBe(10);
		})
	})
})