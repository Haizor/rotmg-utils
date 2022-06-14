"use strict";
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
exports.AnimatedTexture = exports.RandomTexture = exports.BasicTexture = exports.TextureData = void 0;
exports.TextureData = {
    serialize: function (texture) {
        if (texture === undefined)
            return;
        return texture.serialize();
    },
    deserialize: function (xml) {
        return BasicTexture.fromXML(xml);
    }
};
function serializeTextureObject(texture) {
    return {
        File: texture.file,
        Index: texture.index
    };
}
var BasicTexture = /** @class */ (function () {
    function BasicTexture(file, index, animated) {
        this.file = "";
        this.index = 0;
        this.animated = false;
        this.file = file;
        this.index = index;
        this.animated = animated;
    }
    BasicTexture.prototype.getTexture = function () {
        return this;
    };
    BasicTexture.prototype.serialize = function () {
        var _a;
        var key = this.animated ? "AnimatedTexture" : "Texture";
        return _a = {}, _a[key] = serializeTextureObject(this), _a;
    };
    BasicTexture.fromXML = function (xml) {
        if (xml.RandomTexture !== undefined) {
            if (xml.RandomTexture.Texture instanceof Array) {
                return new RandomTexture(xml.RandomTexture.Texture.map(function (tex) {
                    return {
                        animated: false,
                        file: tex.File,
                        index: tex.Index
                    };
                }));
            }
            else {
                return new RandomTexture([xml.RandomTexture.Texture]);
            }
        }
        else if (xml.Animation !== undefined) {
            var animations = Array.isArray(xml.Animation) ? xml.Animation : [xml.Animation];
            return new AnimatedTexture(animations.map(function (animation) {
                var e_1, _a;
                var maxTime = 0;
                try {
                    for (var _b = __values(animation.Frame), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var frame = _c.value;
                        maxTime += frame["@_time"];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return {
                    prob: animation["@_prob"],
                    maxTime: maxTime,
                    frames: animation.Frame.map(function (frame) {
                        return { time: frame["@_time"], texture: {
                                file: frame.Texture.File,
                                index: frame.Texture.Index,
                                animated: false
                            } };
                    })
                };
            }));
        }
        var texture = xml.Texture || xml.AnimatedTexture;
        if (texture !== undefined)
            return new BasicTexture(texture.File, texture.Index, xml.AnimatedTexture !== undefined);
    };
    return BasicTexture;
}());
exports.BasicTexture = BasicTexture;
var RandomTexture = /** @class */ (function () {
    function RandomTexture(textures) {
        this.textures = [];
        this.textures = textures;
    }
    RandomTexture.prototype.getTexture = function () {
        return this.textures[Math.floor(Math.random() * this.textures.length)];
    };
    RandomTexture.prototype.serialize = function () {
        var e_2, _a;
        var obj = {
            RandomTexture: {
                AnimatedTexture: [],
                Texture: []
            }
        };
        try {
            for (var _b = __values(this.textures), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tex = _c.value;
                (tex.animated ? obj.RandomTexture.AnimatedTexture : obj.RandomTexture.Texture).push(serializeTextureObject(tex));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return obj;
    };
    return RandomTexture;
}());
exports.RandomTexture = RandomTexture;
var AnimatedTexture = /** @class */ (function () {
    function AnimatedTexture(animations) {
        this.animations = [];
        this.currAnimationIndex = 0;
        this.animations = animations;
    }
    AnimatedTexture.prototype.getTexture = function (time) {
        var e_3, _a;
        var animation = this.animations[this.currAnimationIndex];
        var timeSeconds = (time / 1000) % animation.maxTime;
        try {
            for (var _b = __values(animation.frames), _c = _b.next(); !_c.done; _c = _b.next()) {
                var frame = _c.value;
                timeSeconds -= frame.time;
                if (timeSeconds < 0) {
                    return frame.texture;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return animation.frames[0].texture;
    };
    AnimatedTexture.prototype.serialize = function () {
        return {
            Animation: this.animations.map(function (animation) {
                return {
                    "@_prob": animation.prob,
                    "Frame": animation.frames.map(function (frame) {
                        return {
                            "@_time": frame.time,
                            Texture: serializeTextureObject(frame.texture)
                        };
                    })
                };
            })
        };
    };
    return AnimatedTexture;
}());
exports.AnimatedTexture = AnimatedTexture;
