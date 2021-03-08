import ProjectileLoader from "./projectiles";
import EquipmentLoader from "./equipment";
import ClassLoader from "./classes";
import SkinLoader from "./skins";
import EnemyLoader from "./enemies";
import DyeLoader from "./skins/dyes";

export default class BrowserLoader {
    constructor(options) {
        this.options = options;
    }

    async load() {
        const searchParams = new URLSearchParams(window.location.search);
        const configUrl = searchParams.get("config") || "https://www.haizor.net/rotmg/assets/production/production_config.json";
        const loadingPromises = [];
        if (configUrl) {
            let config = {};
            try {
                const res = await fetch(configUrl, {
                    mode: "cors",
                });
                
                if (res.ok) {
                    config = await res.json();
                }

                if (this.options.projectileLoader || this.options.equipLoader) {
                    this.projectileLoader = new ProjectileLoader(config.projectiles.urls);
                    loadingPromises.push(this.projectileLoader.get());
                    
                    if (this.options.equipLoader) {
                        this.equipLoader = new EquipmentLoader({...config.equipment, projLoader: this.projectileLoader});
                        loadingPromises.push(this.equipLoader.load());
                    }
                }

                if (this.options.classLoader) {
                    this.classLoader = new ClassLoader(config.classes.xmlURL);
                    loadingPromises.push(this.classLoader.get());
                }

                if (this.options.skinLoader) {
                    this.skinLoader = new SkinLoader(config.skins.xmlURL, config.classes.xmlURL);
                    loadingPromises.push(this.skinLoader.get());
                }

                if (this.options.dyeLoader) {
                    this.dyeLoader = new DyeLoader(config.dyes.dyeURL, config.dyes.textileURL);
                    loadingPromises.push(this.dyeLoader.get());
                }

                if (this.options.enemyLoader) {
                    this.enemyLoader = new EnemyLoader({resources: config.enemies});
                    loadingPromises.push(this.enemyLoader.get());
                }

                if (this.options.sheetsStore) {
                    this.options.sheetsStore.set(config.sheetsURL)
                }
            } catch (e) {
                console.log(e)
                console.log("Couldn't get the config! Using default parameters...")
            }
            return Promise.all(loadingPromises)
        }
    }
}