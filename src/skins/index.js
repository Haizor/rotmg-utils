const defaultSkinURL = "https://static.drips.pw/rotmg/production/current/xml/Skins.xml";
const defaultClassesURL = "https://static.drips.pw/rotmg/production/current/xml/Players.xml"
const defaultSheetsURL = "https://www.haizor.net/rotmg/unity/sheets/";

class SkinLoader {
    constructor(skinURL = defaultSkinURL, classesURL = defaultClassesURL, sheetsURL = defaultSheetsURL) {
        this.skinURL = skinURL;
        this.classesURL = classesURL;
        this.sheetsURL = sheetsURL;
    }

    async get() {
        if (this.skins) {
            return this.skins;
        }
        return await this.getFromXML();
    }

    async getFromXML() {
        let charText = await (await fetch(this.classesURL)).text();
        let parser = new DOMParser();
        let charXml = parser.parseFromString(charText, "text/xml")
        let skins = {};

        for (let child of charXml.documentElement.children) {
            if (child.nodeName != "Object") continue;
            let skin = {};
            skin.id = "Classic";
            let classType = parseInt(child.getAttribute("type"), 16);

            let textureNode = child.getElementsByTagName("AnimatedTexture")[0];
            let fileName = textureNode.getElementsByTagName("File")[0].firstChild.nodeValue;
            skin.texture = {
                src: fileName,
                maskSrc: fileName + "_mask",
                index: textureNode.getElementsByTagName("Index")[0].firstChild.nodeValue,
            }
            skin.size = fileName.includes("16") ? 16 : 8

            if (skins[classType] == null) skins[classType] = [];

            skins[classType].push(skin);
        }

        let skinText = await (await fetch(this.skinURL)).text();
        let skinXml = parser.parseFromString(skinText, "text/xml")

        for (let child of skinXml.documentElement.children) {
            let skin = {};
            skin.id = child.getAttribute("id");
            skin.type = child.getAttribute("type");
            let classType = parseInt(child.getElementsByTagName("PlayerClassType")[0].firstChild.nodeValue, 16);

            let textureNode = child.getElementsByTagName("AnimatedTexture")[0];
            let fileName = textureNode.getElementsByTagName("File")[0].firstChild.nodeValue;

            skin.texture = {
                src: fileName,
                maskSrc: fileName + "_mask",
                index: textureNode.getElementsByTagName("Index")[0].firstChild.nodeValue,
            }
            skin.size = fileName.includes("16") ? 16 : 8;
            if (skins[classType] == null) skins[classType] = [];

            skins[classType].push(skin);
        }
        this.skins = skins;

        return this.skins;
    }
}



export default SkinLoader