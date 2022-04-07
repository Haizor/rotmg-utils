"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSpritesheet = exports.CustomSprite = void 0;
var Spritesheet_1 = require("./Spritesheet");
var CustomSprite = /** @class */ (function (_super) {
    __extends(CustomSprite, _super);
    function CustomSprite(data, blob) {
        var _this = _super.call(this, data) || this;
        _this.blob = blob;
        return _this;
    }
    CustomSprite.prototype.getAtlasSource = function () {
        return this.blob;
    };
    CustomSprite.prototype.serialize = function () {
        return this.getData();
    };
    return CustomSprite;
}(Spritesheet_1.Sprite));
exports.CustomSprite = CustomSprite;
var CustomSpritesheet = /** @class */ (function () {
    function CustomSpritesheet(name) {
        this.sprites = [];
        this.width = 512;
        this.height = 512;
        this.name = name;
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.imageRendering = "pixelated";
        var ctx = canvas.getContext("2d");
        if (ctx === null) {
            throw new Error("Failed to create canvas context for custom sprites!");
        }
        this.ctx = ctx;
    }
    CustomSpritesheet.prototype.add = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.set(this.sprites.length, image)];
            });
        });
    };
    CustomSpritesheet.prototype.initGL = function (gl) {
        this.gl = gl;
        var texture = gl.createTexture();
        if (texture === null)
            return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        this.texture = texture;
    };
    CustomSpritesheet.prototype.set = function (index, image) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, x, y;
            var _this = this;
            return __generator(this, function (_a) {
                ctx = this.ctx;
                x = (index % (this.width / 8)) * 8;
                y = Math.floor(index / (this.height / 8) * 8);
                return [2 /*return*/, new Promise(function (res, rej) {
                        image.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        ctx.clearRect(x, y, 8, 8);
                                        ctx.drawImage(image, x, y, 8, 8);
                                        return [4 /*yield*/, this.updateBlob()];
                                    case 1:
                                        _b.sent();
                                        this.updateTexture();
                                        data = {
                                            padding: 0,
                                            aId: -1,
                                            index: index,
                                            spriteSheetName: (_a = this.name) !== null && _a !== void 0 ? _a : "unknown",
                                            isTransparentSprite: true,
                                            position: {
                                                x: x,
                                                y: y,
                                                w: 8,
                                                h: 8
                                            },
                                            maskPosition: {
                                                x: 0,
                                                y: 0,
                                                w: 0,
                                                h: 0
                                            },
                                            mostCommonColor: {
                                                r: 0,
                                                g: 0,
                                                b: 0,
                                                a: 0
                                            }
                                        };
                                        this.sprites[index] = new CustomSprite(data, this.blob);
                                        res(this.sprites[index]);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    CustomSpritesheet.prototype.delete = function (index) {
        var _a = this.sprites[index].getData().position, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        this.ctx.clearRect(x, y, w, h);
        this.sprites.splice(index, 1);
    };
    CustomSpritesheet.prototype.updateBlob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.ctx.canvas.toBlob(function (blob) {
                    var e_1, _a;
                    if (blob === null)
                        return;
                    var url = URL.createObjectURL(blob);
                    if (_this.blob !== undefined) {
                        URL.revokeObjectURL(_this.blob);
                    }
                    _this.blob = url;
                    try {
                        for (var _b = __values(_this.sprites), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var sprite = _c.value;
                            sprite.blob = url;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CustomSpritesheet.prototype.updateTexture = function () {
        var e_2, _a;
        var gl = this.gl;
        if (gl === undefined || this.texture === undefined)
            return;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.ctx.canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        try {
            for (var _b = __values(this.sprites), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sprite = _c.value;
                sprite.setGLTexture({
                    texture: this.texture,
                    size: { width: this.width, height: this.height }
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CustomSpritesheet.prototype.get = function (id) {
        var index;
        var spriteSheetName;
        if (id.texture) {
            index = id.texture.index;
            spriteSheetName = id.texture.file;
        }
        else {
            index = id.index;
            spriteSheetName = id.spriteSheetName;
        }
        return this.sprites.find(function (sprite) {
            if (sprite === undefined)
                return undefined;
            var data = sprite.getData();
            return data.index === index && data.spriteSheetName === spriteSheetName;
        });
    };
    CustomSpritesheet.prototype.getAll = function () {
        return this.sprites;
    };
    CustomSpritesheet.prototype.getMetadata = function () {
        return this.metadata;
    };
    CustomSpritesheet.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    CustomSpritesheet.prototype.load = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                data = JSON.parse(src);
                return [2 /*return*/, new Promise(function (res, rej) {
                        _this.name = data.name;
                        var img = new Image();
                        img.src = data.image;
                        img.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.ctx.drawImage(img, 0, 0);
                                        return [4 /*yield*/, this.updateBlob()];
                                    case 1:
                                        _a.sent();
                                        this.sprites = data.sprites.map(function (sprite) { return new CustomSprite(sprite, _this.blob); });
                                        res();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    CustomSpritesheet.prototype.serialize = function () {
        return JSON.stringify({
            name: this.name,
            image: this.ctx.canvas.toDataURL(),
            sprites: this.sprites.map(function (sprite) { return sprite.serialize(); })
        });
    };
    return CustomSpritesheet;
}());
exports.CustomSpritesheet = CustomSpritesheet;
