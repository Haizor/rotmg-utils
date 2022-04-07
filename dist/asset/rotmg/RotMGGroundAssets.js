"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotMGGroundAssets = void 0;
var Serializable_1 = require("../normal/Serializable");
var Ground_1 = require("./data/Ground");
var RotMGGroundAssets = /** @class */ (function () {
    function RotMGGroundAssets(readOnly) {
        if (readOnly === void 0) { readOnly = false; }
        this._groundTiles = [];
        this.readOnly = readOnly;
    }
    RotMGGroundAssets.prototype.parseFromXML = function (xml) {
        var ground = new Ground_1.Ground();
        (0, Serializable_1.deserializeObject)(ground, xml);
        ground.readOnly = this.readOnly;
        this._groundTiles.push(ground);
        return;
    };
    RotMGGroundAssets.prototype.get = function (id) {
        return this._groundTiles.find(function (ground) { return ground.id === id; });
    };
    RotMGGroundAssets.prototype.getAll = function () {
        return this._groundTiles;
    };
    RotMGGroundAssets.prototype.getMetadata = function () {
        return this.metadata;
    };
    RotMGGroundAssets.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    return RotMGGroundAssets;
}());
exports.RotMGGroundAssets = RotMGGroundAssets;
