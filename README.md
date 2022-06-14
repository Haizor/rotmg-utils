# RotMG Utils
A library for automating parsing of Realm of the Mad God XML & spritesheets.
## Basic Usage
```
	import { AssetManager } from "@haizor/rotmg-utils"

	const manager = new AssetManager();
	
	//Register the loader used to parse the RotMG assets
	manager.registerLoader("rotmg-asset", new RotMGAssetLoader());

	manager.load({
		name: "base",
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
	}).then(() => {
		//Get takes the type of the asset, and an ID, which can be either the type (number) or the id (string) when referring to RotMG assets.
		const equip = manager.get<Equipment>("rotmg", "Short Sword");
	});
```