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
exports.RotMGAssets = void 0;
var Equipment_1 = require("./data/Equipment");
var EquipmentSet_1 = require("./data/EquipmentSet");
var ObjectClass_1 = require("./data/ObjectClass");
var XMLObject_1 = require("./data/XMLObject");
var Player_1 = require("./data/Player");
var Wall_1 = require("./data/Wall");
var Skin_1 = require("./data/Skin");
var Dye_1 = require("./data/Dye");
var ProjectileRender_1 = require("./data/ProjectileRender");
var Character_1 = require("./data/Character");
var fast_xml_parser_1 = require("fast-xml-parser");
var Serializable_1 = require("../normal/Serializable");
var RotMGAssets = /** @class */ (function () {
    function RotMGAssets(readOnly) {
        if (readOnly === void 0) { readOnly = false; }
        this._objects = [];
        this._objectMaps = new Map();
        this._constructors = new Map();
        this.readOnly = readOnly;
        this._constructors.set(ObjectClass_1.ObjectClass.Equipment, Equipment_1.Equipment);
        this._constructors.set(ObjectClass_1.ObjectClass.Player, Player_1.Player);
        this._constructors.set(ObjectClass_1.ObjectClass.Wall, Wall_1.Wall);
        this._constructors.set(ObjectClass_1.ObjectClass.Projectile, ProjectileRender_1.ProjectileRender);
        this._constructors.set(ObjectClass_1.ObjectClass.Character, Character_1.Character);
        this._constructors.set(ObjectClass_1.ObjectClass.Skin, Skin_1.Skin);
        this._constructors.set(ObjectClass_1.ObjectClass.Dye, Dye_1.Dye);
    }
    RotMGAssets.prototype.add = function (obj) {
        var _a;
        if (this.readOnly)
            return;
        if (!this._objectMaps.has(obj.class)) {
            this._objectMaps.set(obj.class, []);
        }
        var categorized = this._objectMaps.get(obj.class);
        var index = this._objects.findIndex(function (o) { return o.id === obj.id; });
        if (index !== -1) {
            this._objects[index] = obj;
            categorized[categorized.findIndex(function (o) { return o.id === obj.id; })] = obj;
            return;
        }
        this._objects.push(obj);
        (_a = this._objectMaps.get(obj.class)) === null || _a === void 0 ? void 0 : _a.push(obj);
    };
    RotMGAssets.prototype.remove = function (xml) {
        for (var i = 0; i < this._objects.length; i++) {
            if (xml.id === this._objects[i].id) {
                this._objects.splice(i, 1);
            }
        }
        if (this._objectMaps.has(xml.class)) {
            var objs = this._objectMaps.get(xml.class);
            for (var i = 0; i < objs.length; i++) {
                if (xml.id === objs[i].id) {
                    objs.splice(i, 1);
                }
            }
        }
    };
    RotMGAssets.prototype.getMetadata = function () {
        return this.metadata;
    };
    RotMGAssets.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    RotMGAssets.prototype.get = function (id) {
        if (typeof (id) === "string") {
            return this.getObjectFromId(id);
        }
        else if (typeof (id) === "number") {
            return this.getObjectFromType(id);
        }
        return this.getObjectFromId(id);
    };
    RotMGAssets.prototype.getAll = function () {
        return this._objects;
    };
    RotMGAssets.prototype.getObjects = function () {
        return this._objects;
    };
    RotMGAssets.prototype.getObjectsOfClass = function (clazz) {
        return this._objectMaps.get(clazz);
    };
    RotMGAssets.prototype.getObjectFromId = function (id) {
        return this._objects.find(function (obj) { return obj.id === id; });
    };
    RotMGAssets.prototype.getObjectFromType = function (type) {
        return this._objects.find(function (obj) { return obj.type === type; });
    };
    RotMGAssets.prototype.parseFromXML = function (xml) {
        var _a;
        var clazz = ObjectClass_1.ObjectClass[xml.Class];
        var constructor = this._constructors.get(clazz);
        var obj = constructor !== undefined ? new constructor() : new XMLObject_1.XMLObject();
        (0, Serializable_1.deserializeObject)(obj, xml);
        obj.readOnly = this.readOnly;
        this._objects.push(obj);
        if (!this._objectMaps.has(obj.class)) {
            this._objectMaps.set(obj.class, []);
        }
        (_a = this._objectMaps.get(obj.class)) === null || _a === void 0 ? void 0 : _a.push(obj);
        return obj;
    };
    RotMGAssets.prototype.parseSet = function (xml) {
        var e_1, _a;
        var set = new EquipmentSet_1.EquipmentSet();
        (0, Serializable_1.deserializeObject)(set, xml);
        try {
            for (var _b = __values(set.setpieces), _c = _b.next(); !_c.done; _c = _b.next()) {
                var piece = _c.value;
                var obj = this.getObjectFromType(piece.type);
                if (!(obj instanceof Equipment_1.Equipment))
                    continue;
                obj.set = set;
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
    RotMGAssets.prototype.serialize = function () {
        var obj = {
            Objects: {
                Object: this.getAll().map(function (v) { return v.getSerializedObject(); })
            }
        };
        var parser = new fast_xml_parser_1.XMLBuilder({
            attributeNamePrefix: "@_",
            textNodeName: "",
            ignoreAttributes: false,
        });
        return parser.build(obj);
    };
    return RotMGAssets;
}());
exports.RotMGAssets = RotMGAssets;
