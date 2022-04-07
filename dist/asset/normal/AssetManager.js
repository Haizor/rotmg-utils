"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = void 0;
var AssetBundle_1 = require("./AssetBundle");
var Url2TextSourceLoader_1 = require("./loaders/source/Url2TextSourceLoader");
var File2TextSourceLoader_1 = require("./loaders/source/File2TextSourceLoader");
var AssetManager = /** @class */ (function () {
    function AssetManager() {
        this.assetBundles = new Map();
        this.assetLoaders = new Map();
        this.sourceLoaders = new Map();
        this.registerSourceLoader("url-to-text", new Url2TextSourceLoader_1.Url2TextSourceLoader());
        this.registerSourceLoader("file-to-text", new File2TextSourceLoader_1.File2TextSourceLoader());
    }
    AssetManager.prototype.setFetcher = function (fetcher) {
        this.registerSourceLoader("url-to-text", new Url2TextSourceLoader_1.Url2TextSourceLoader(fetcher));
    };
    AssetManager.prototype.addBundle = function (bundle) {
        this.assetBundles.set(bundle.name, bundle);
    };
    AssetManager.prototype.registerLoader = function (name, loader) {
        this.assetLoaders.set(name, loader);
    };
    AssetManager.prototype.registerSourceLoader = function (name, loader) {
        this.sourceLoaders.set(name, loader);
    };
    AssetManager.prototype.load = function (config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var bundle, promises, _b, _c, assetContainer;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        bundle = new AssetBundle_1.AssetBundle(config.name);
                        bundle.default = (_a = config.default) !== null && _a !== void 0 ? _a : false;
                        this.assetBundles.set(config.name, bundle);
                        promises = new Map();
                        try {
                            for (_b = __values(config.containers), _c = _b.next(); !_c.done; _c = _b.next()) {
                                assetContainer = _c.value;
                                promises.set(assetContainer.type, this.loadContainer(bundle, assetContainer, promises));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises.values())];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AssetManager.prototype.loadContainer = function (bundle, config, promises) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var type, loader, settings, sources, depends, assetLoader, sourceLoader, srcs, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = config.type, loader = config.loader, settings = config.settings, sources = config.sources, depends = config.depends;
                        assetLoader = this.assetLoaders.get(config.loader);
                        sourceLoader = this.sourceLoaders.get((_a = config.sourceLoader) !== null && _a !== void 0 ? _a : "");
                        if (assetLoader === undefined)
                            return [2 /*return*/];
                        if (!(depends !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(depends.map(function (type) { return promises.get(type); }))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        srcs = sources;
                        if (!(sourceLoader !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(srcs.map(function (src) { return sourceLoader.convert(src); }))];
                    case 3:
                        srcs = _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, assetLoader.load(srcs, settings)];
                    case 5:
                        container = _b.sent();
                        container.setMetadata({ loader: loader, type: type });
                        bundle.containers.set(type, container);
                        return [2 /*return*/];
                }
            });
        });
    };
    AssetManager.prototype.loadZip = function (zip) {
        return __awaiter(this, void 0, void 0, function () {
            var metadataFile, config, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        metadataFile = zip.file("metadata.json");
                        if (metadataFile === null)
                            return [2 /*return*/];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, metadataFile.async("string")];
                    case 1:
                        config = _b.apply(_a, [_c.sent()]);
                        config.containers.forEach(function (container) {
                            container.sources = container.sources.map(function (src) { return zip.file(src); });
                        });
                        return [4 /*yield*/, this.load(config)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AssetManager.prototype.get = function (type, id) {
        var e_2, _a;
        try {
            for (var _b = __values(this.assetBundles.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var bundle = _c.value;
                var result = bundle.get(type, id);
                if (result !== undefined) {
                    return __assign(__assign({}, result), { bundle: bundle });
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
    };
    AssetManager.prototype.getAll = function (type) {
        var e_3, _a, e_4, _b;
        var assets = [];
        try {
            for (var _c = __values(this.assetBundles.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var bundle = _d.value;
                try {
                    for (var _e = (e_4 = void 0, __values(bundle.containers.entries())), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var containerEntry = _f.value;
                        if (containerEntry[0] === type) {
                            assets = __spreadArray(__spreadArray([], __read(assets), false), __read(containerEntry[1].getAll()), false);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return assets;
    };
    AssetManager.prototype.getBundle = function (name) {
        return this.assetBundles.get(name);
    };
    AssetManager.prototype.getBundles = function () {
        return Array.from(this.assetBundles.values());
    };
    AssetManager.prototype.getContainers = function (type) {
        var e_5, _a;
        var containers = [];
        try {
            for (var _b = __values(this.getBundles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var bundle = _c.value;
                var container = bundle.containers.get(type);
                if (container !== undefined)
                    containers.push(container);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return containers;
    };
    AssetManager.prototype.deleteAssetBundle = function (bundle) {
        return this.assetBundles.delete(bundle.name);
    };
    return AssetManager;
}());
exports.AssetManager = AssetManager;
