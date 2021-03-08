const defaultURLS = [
    "https://static.drips.pw/rotmg/production/current/xml/Projectiles.xml",
    "https://static.drips.pw/rotmg/production/current/xml/cursedLibraryObjects.xml",
    "https://static.drips.pw/rotmg/production/current/xml/secludedThicketObjects.xml",
    "https://static.drips.pw/rotmg/production/current/xml/theMachineObjects.xml",
    "https://static.drips.pw/rotmg/production/current/xml/ancientRuinsObjects.xml",
]

const replacements = {
    "lofiChar16x16": "chars16x16rEncounters"
}

class ProjectileLoader {
    constructor(urls = defaultURLS) {
        this.urls = urls;
    }

    async get() {
        if (this.projectiles) return this.projectiles;

        let promises = [];
        for (let url of this.urls) {
            promises.push(this.getFromXML(url));
        }
        let projectilesArray = await Promise.all(promises);
        let projectiles = {};
        for (let projObj of projectilesArray) {
            projectiles = {...projectiles, ...projObj};
        }
        this.projectiles = projectiles;
        return projectiles;
    }

    async getFromXML(projURL) {
        let text = await (await fetch(projURL)).text();
        let parser = new DOMParser();
        let projXML = parser.parseFromString(text, 'text/xml');
        let projectiles = {}

        for (let child of projXML.documentElement.children) {
            if (child.getElementsByTagName("Class")[0].firstChild.nodeValue != "Projectile") continue;

            let projectile = {};
            let id = child.getAttribute("id");
            try {
                projectile.textures = [];

                function addTexture(textureNode, animated = false) {
                    let originalFile = textureNode.getElementsByTagName("File")[0].firstChild.nodeValue;
                    let file = originalFile
                        .replace("Embed", "")
                        .replace("new", "b")
                        .replace("lofiChar16x16", "lofiChar");
                    let radix = textureNode.getElementsByTagName("Index")[0].firstChild.nodeValue.match(/^(0x)/) ? 16 : 10
                    projectile.textures.push({
                        file,
                        size: (originalFile.includes('16') || originalFile.includes("Big")) ? 16 : 8,
                        animated,
                        index: parseInt(textureNode.getElementsByTagName("Index")[0].firstChild.nodeValue, radix)
                    })
                }

                for (let textureNode of child.getElementsByTagName("Texture")) {
                    addTexture(textureNode, false);
                }

                for (let textureNode of child.getElementsByTagName("AnimatedTexture")) {
                    addTexture(textureNode, true);
                }


                let angleCorrectionNode = child.getElementsByTagName("AngleCorrection")[0];
                if (angleCorrectionNode != null) projectile.angleCorrection = parseInt(angleCorrectionNode.firstChild.nodeValue);

                let rotationNode = child.getElementsByTagName("Rotation")[0];
                if (rotationNode != null) projectile.rotation = parseInt(rotationNode.firstChild.nodeValue);

                projectiles[id] = projectile;
            } catch {
                console.log(`Failed to parse projectile with ID ${id}!`)
            }
        }
        return projectiles;
    }
}

export default ProjectileLoader;