"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spritesheet = exports.Sprite = exports.Action = exports.Direction = void 0;
var Texture_1 = require("../data/Texture");
var Direction;
(function (Direction) {
    Direction[Direction["Side"] = 0] = "Side";
    Direction[Direction["Unknown"] = 1] = "Unknown";
    Direction[Direction["Front"] = 2] = "Front";
    Direction[Direction["Back"] = 3] = "Back";
})(Direction = exports.Direction || (exports.Direction = {}));
var Action;
(function (Action) {
    Action[Action["None"] = 0] = "None";
    Action[Action["Walk"] = 1] = "Walk";
    Action[Action["Attack"] = 2] = "Attack";
})(Action = exports.Action || (exports.Action = {}));
var Sprite = /** @class */ (function () {
    function Sprite(data, animatedData) {
        this._data = data;
        this._animatedData = animatedData;
    }
    Sprite.prototype.getData = function () {
        return this._data;
    };
    Sprite.prototype.getAnimatedData = function () {
        return this._animatedData;
    };
    Sprite.prototype.getAtlasSource = function () {
        switch (this._data.aId) {
            case 1:
                return "https://www.haizor.net/rotmg/assets/production/atlases/groundTiles.png";
            case 2:
                return "https://www.haizor.net/rotmg/assets/production/atlases/characters.png";
            case 4:
                return "https://www.haizor.net/rotmg/assets/production/atlases/mapObjects.png";
        }
    };
    Sprite.prototype.asTexture = function () {
        return new Texture_1.BasicTexture(this._data.spriteSheetName, this._data.index, false);
    };
    return Sprite;
}());
exports.Sprite = Sprite;
var Spritesheet = /** @class */ (function () {
    function Spritesheet(gl) {
        this._sprites = [];
        this._animatedSprites = [];
        this.gl = gl;
    }
    Spritesheet.prototype.load = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                try {
                    json = JSON.parse(src);
                    this._sprites = json.sprites;
                    this._animatedSprites = json.animatedSprites;
                }
                catch (e) {
                    console.log("Failed to load sprite JSON!");
                }
                return [2 /*return*/];
            });
        });
    };
    Spritesheet.prototype.get = function (options) {
        var _a, _b, _c;
        var all = options.all, multiple = options.multiple;
        var animated;
        var index;
        var spriteSheetName;
        if (options.texture !== undefined) {
            index = options.texture.index;
            spriteSheetName = options.texture.file;
            animated = options.texture.animated;
        }
        else {
            index = options.index;
            spriteSheetName = options.spriteSheetName;
            animated = (_a = options.animated) !== null && _a !== void 0 ? _a : false;
        }
        if (animated === true) {
            var direction_1 = (_b = options.direction) !== null && _b !== void 0 ? _b : Direction.Side;
            var action_1 = (_c = options.action) !== null && _c !== void 0 ? _c : Action.Walk;
            if (all === true) {
                var data = this._animatedSprites.filter(function (data) { return data.index === index && data.spriteSheetName === spriteSheetName; });
                if (data.length === 0)
                    return [];
                return data.map(function (data) {
                    var sprite = new Sprite(data.spriteData, data);
                    return sprite;
                });
            }
            if (multiple === true) {
                var data = this._animatedSprites.filter(function (data) { return data.index === index && data.spriteSheetName === spriteSheetName && data.action === action_1 && data.direction === direction_1; });
                if (data.length === 0)
                    return [];
                return data.map(function (data) {
                    var sprite = new Sprite(data.spriteData, data);
                    return sprite;
                });
            }
            else {
                var data = this._animatedSprites.find(function (data) { return data.index === index && data.spriteSheetName === spriteSheetName && data.action === action_1 && data.direction === direction_1; });
                if (data === undefined)
                    return;
                var sprite = new Sprite(data.spriteData, data);
                return sprite;
            }
        }
        else {
            var atlas = this._sprites.find(function (data) { return data.spriteSheetName === spriteSheetName; });
            var data = atlas === null || atlas === void 0 ? void 0 : atlas.elements.find(function (data) { return data.index === index; });
            if (data === undefined)
                return;
            var sprite = new Sprite(data);
            return sprite;
        }
    };
    Spritesheet.prototype.getAll = function () {
        throw new Error("Method not implemented.");
    };
    Spritesheet.prototype.getMetadata = function () {
        return this.metadata;
    };
    Spritesheet.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    return Spritesheet;
}());
exports.Spritesheet = Spritesheet;
