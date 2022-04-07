"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapAssetContainer = /** @class */ (function () {
    function MapAssetContainer(map) {
        this.map = new Map();
        this.map = map;
    }
    MapAssetContainer.prototype.getMetadata = function () {
        return this.metadata;
    };
    MapAssetContainer.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    MapAssetContainer.prototype.set = function (id, obj) {
        this.map.set(id, obj);
    };
    MapAssetContainer.prototype.get = function (id) {
        return this.map.get(id);
    };
    MapAssetContainer.prototype.getAll = function () {
        return Array.from(this.map.values());
    };
    return MapAssetContainer;
}());
exports.default = MapAssetContainer;
