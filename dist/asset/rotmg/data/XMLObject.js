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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLObject = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var ObjectClass_1 = require("./ObjectClass");
var Projectile_1 = require("./Projectile");
var Texture_1 = require("./Texture");
var fast_xml_parser_1 = require("fast-xml-parser");
var XMLObject = /** @class */ (function () {
    function XMLObject() {
        this.type = -1;
        this.id = "";
        this.class = ObjectClass_1.ObjectClass.GameObject;
        this.texture = undefined;
        this.projectiles = [];
        this.readOnly = false;
    }
    XMLObject.prototype.getDisplayName = function () {
        return this.id;
    };
    XMLObject.prototype.hasProjectiles = function () {
        return this.projectiles.length > 0;
    };
    XMLObject.prototype.getSerializedObject = function () {
        return (0, Serializable_1.serializeObject)(this);
    };
    XMLObject.prototype.serialize = function () {
        var obj = {
            Object: __assign({}, this.getSerializedObject())
        };
        var parser = new fast_xml_parser_1.XMLBuilder({
            attributeNamePrefix: "@_",
            textNodeName: "",
            ignoreAttributes: false,
        });
        return parser.build(obj);
    };
    XMLObject.prototype.serializeProjectiles = function () {
        return this.projectiles.map(function (proj) { return proj.serialize(); });
    };
    __decorate([
        (0, Serializable_1.Data)("@_type"),
        __metadata("design:type", Number)
    ], XMLObject.prototype, "type", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_id"),
        __metadata("design:type", String)
    ], XMLObject.prototype, "id", void 0);
    __decorate([
        (0, Serializable_1.Data)("Class", (0, Serializable_1.XMLEnum)(ObjectClass_1.ObjectClass)),
        __metadata("design:type", Number)
    ], XMLObject.prototype, "class", void 0);
    __decorate([
        (0, Serializable_1.Data)("Texture", Texture_1.TextureData, { deserializeFullObject: true }),
        (0, Serializable_1.Data)("AnimatedTexture", Texture_1.TextureData, { deserializeFullObject: true }),
        (0, Serializable_1.Data)("RandomTexture", Texture_1.TextureData, { deserializeFullObject: true }),
        __metadata("design:type", Object)
    ], XMLObject.prototype, "texture", void 0);
    __decorate([
        (0, Serializable_1.Data)("Projectile", Projectile_1.ProjectileData),
        __metadata("design:type", Array)
    ], XMLObject.prototype, "projectiles", void 0);
    return XMLObject;
}());
exports.XMLObject = XMLObject;
