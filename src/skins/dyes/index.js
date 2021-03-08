
const defaultDyeURL = "https://www.haizor.net/rotmg/assets/production/xml/dyes.xml";
const defaultTextileURL = "https://www.haizor.net/rotmg/assets/production/xml/textiles.xml"

const textileSrcUrl = 'https://www.haizor.net/rotmg/assets/production/sheets/textile';

class DyeLoader {
    constructor(dyeURL = defaultDyeURL, textileURL = defaultTextileURL) {
        this.dyeURL = dyeURL;
        this.textileURL = textileURL;
    }
    
    async get() {
        if (this.dyes) return this.dyes;
        return await this.getFromUrl();
    }
    
    async getFromUrl() {
        let dyeText = await (await fetch(this.dyeURL)).text();
        let parser = new DOMParser();
        let dyeXML = parser.parseFromString(dyeText, "text/xml")
        let dyes = {};
        let unorderedColors = {}
        for (let child of dyeXML.documentElement.children) {
            let dye = {}
            if (child.getElementsByTagName("Tex2").length > 0) continue;
            dye.id = child.getAttribute("id");
            dye.type = "dye";
            
            let texNode = child.getElementsByTagName("Tex1")[0]
            dye.color = texNode.firstChild.nodeValue.slice(4);
            unorderedColors[child.getAttribute("type")] = dye;
        }
        
        Object.keys(unorderedColors).sort((a, b) => {
            let hslA = RGBToHSL(hexToRgb(unorderedColors[a].color));
            let hslB = RGBToHSL(hexToRgb(unorderedColors[b].color));

            let hueDiff = hslA.h - hslB.h;

            return (hueDiff);
        }).forEach((key) => {
            dyes[key] = unorderedColors[key];
        })
        
        let textileText = await (await fetch(this.textileURL)).text();
        let textileXML = parser.parseFromString(textileText, "text/xml");
        
        for (let child of textileXML.documentElement.children) {
            let dye = {}
            if (child.getElementsByTagName("Tex2").length > 0) continue;
            dye.id = child.getAttribute("id");
            dye.type = "textile";
            
            let tex = child.getElementsByTagName("Tex1")[0].firstChild.nodeValue;
            let size = parseInt(tex.slice(2, 3), 16)
            
            dye.texture = {
                size,
                src: `${textileSrcUrl}${size}x${size}.png`,
                index: parseInt(tex.slice(3), 16)
            }
            //dye.color = texNode.firstChild.nodeValue.slice(4);
            dyes[child.getAttribute("type")] = dye;
        }
        
        this.dyes = dyes;
        this.allDyes = Object.values(dyes);
        
        return this.dyes;
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//https://css-tricks.com/converting-color-spaces-in-javascript/ thank god for google
function RGBToHSL({r, g, b}) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
    
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;
    
    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
    h += 360;
    
    l = (cmax + cmin) / 2;
    
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    
    return {h, s, l};
}

export default DyeLoader;