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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetBundle = void 0;
var jszip_1 = __importDefault(require("jszip"));
var AssetBundle = /** @class */ (function () {
    function AssetBundle(name) {
        this.containers = new Map();
        this.dirty = false;
        this.default = false;
        this.name = name;
    }
    AssetBundle.prototype.get = function (type, id) {
        var e_1, _a;
        try {
            for (var _b = __values(this.containers.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var container = _c.value;
                if (container[0] !== type)
                    continue;
                var obj = container[1].get(id);
                if (obj !== undefined) {
                    return {
                        value: obj,
                        container: container[1]
                    };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AssetBundle.prototype.exportToZip = function () {
        var e_2, _a;
        var zip = new jszip_1.default();
        var mainMetadata = {
            name: this.name,
            containers: []
        };
        try {
            for (var _b = __values(this.containers.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var container = _c.value;
                var name_1 = container[0];
                var metadata = container[1].getMetadata();
                if (metadata === undefined)
                    continue;
                try {
                    var serialized = [];
                    if ("serialize" in container[1]) {
                        serialized = container[1].serialize();
                    }
                    var path = "containers/".concat(name_1, "/data.asset");
                    zip.file(path, serialized);
                    mainMetadata.containers.push({
                        type: metadata.type,
                        loader: metadata.loader,
                        sourceLoader: "file-to-text",
                        sources: [path]
                    });
                }
                catch (error) {
                    console.log(error);
                    continue;
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
        zip.file("metadata.json", JSON.stringify(mainMetadata));
        return zip;
    };
    return AssetBundle;
}());
exports.AssetBundle = AssetBundle;
