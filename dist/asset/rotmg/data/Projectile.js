"use strict";
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
exports.ProjectileSerializer = exports.ProjectileData = exports.Projectile = void 0;
var Serializable_1 = require("../../../asset/normal/Serializable");
var StatusEffectType_1 = require("./StatusEffectType");
//TODO: rewrite this entire class jesus fuck this is not ok
//hey future me here i simply do not care
var Projectile = /** @class */ (function () {
    function Projectile(params) {
        this.amplitude = 0;
        this.frequency = 0;
        this.acceleration = 0;
        this.accelerationDelay = 0;
        this.size = 100;
        this.multiHit = false;
        this.boomerang = false;
        this.armorPiercing = false;
        this.passesCover = false;
        this.wavy = false;
        this.parametric = false;
        this.objectId = params.objectId;
        this.speed = params.speed;
        this.lifetime = params.lifetime;
        this.damage = params.damage;
        this.minDamage = params.minDamage;
        this.maxDamage = params.maxDamage;
        this.amplitude = params.amplitude || 0;
        this.frequency = params.frequency || 0;
        this.acceleration = params.acceleration || 0;
        this.accelerationDelay = params.accelerationDelay || 0;
        this.speedClamp = params.speedClamp;
        this.multiHit = params.multiHit !== undefined ? true : false;
        this.boomerang = params.boomerang !== undefined ? true : false;
        this.armorPiercing = params.armorPiercing !== undefined ? true : false;
        this.passesCover = params.passesCover !== undefined ? true : false;
        this.wavy = params.wavy !== undefined ? true : false;
        this.parametric = params.parametric !== undefined ? true : false;
    }
    Projectile.prototype.getDamage = function () {
        if (this.minDamage !== undefined && this.maxDamage !== undefined) {
            return this.minDamage + Math.floor(Math.random() * (this.maxDamage - this.minDamage));
        }
        return this.damage || 0;
    };
    Projectile.prototype.getRange = function () {
        return (this.lifetime * this.speed) / 10000;
    };
    Projectile.fromXML = function (xml) {
        var projectile = new Projectile({
            objectId: xml.ObjectId,
            speed: xml.Speed,
            lifetime: xml.LifetimeMS,
            damage: xml.Damage,
            minDamage: xml.MinDamage,
            maxDamage: xml.MaxDamage,
            amplitude: xml.Amplitude,
            frequency: xml.Frequency,
            acceleration: xml.Acceleration,
            accelerationDelay: xml.AccelerationDelay,
            speedClamp: xml.SpeedClamp,
            multiHit: xml.MultiHit,
            boomerang: xml.Boomerang,
            armorPiercing: xml.ArmorPiercing,
            passesCover: xml.PassesCover,
            wavy: xml.Wavy,
            parametric: xml.Parametric
        });
        projectile.projectileId = xml["@_id"] || -1;
        projectile.size = xml.Size || 100;
        if (xml.ConditionEffect !== undefined) {
            projectile.conditionEffect = {
                type: StatusEffectType_1.StatusEffectType[xml.ConditionEffect["#text"]],
                duration: xml.ConditionEffect["@_duration"]
            };
        }
        return projectile;
    };
    //TODO: finish 
    Projectile.prototype.serialize = function () {
        return (0, Serializable_1.serializeObject)(this);
    };
    __decorate([
        (0, Serializable_1.Data)("ObjectId"),
        __metadata("design:type", String)
    ], Projectile.prototype, "objectId", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_id", (0, Serializable_1.XMLNoDefault)(-1)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "projectileId", void 0);
    __decorate([
        (0, Serializable_1.Data)("Speed"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "speed", void 0);
    __decorate([
        (0, Serializable_1.Data)("MinDamage"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "minDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("MaxDamage"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "maxDamage", void 0);
    __decorate([
        (0, Serializable_1.Data)("Damage"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "damage", void 0);
    __decorate([
        (0, Serializable_1.Data)("Amplitude", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "amplitude", void 0);
    __decorate([
        (0, Serializable_1.Data)("Frequency", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "frequency", void 0);
    __decorate([
        (0, Serializable_1.Data)("Acceleration", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "acceleration", void 0);
    __decorate([
        (0, Serializable_1.Data)("AccelerationDelay", (0, Serializable_1.XMLNoDefault)(0)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "accelerationDelay", void 0);
    __decorate([
        (0, Serializable_1.Data)("SpeedClamp"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "speedClamp", void 0);
    __decorate([
        (0, Serializable_1.Data)("Size", (0, Serializable_1.XMLNoDefault)(100)),
        __metadata("design:type", Number)
    ], Projectile.prototype, "size", void 0);
    __decorate([
        (0, Serializable_1.Data)("LifetimeMS"),
        __metadata("design:type", Number)
    ], Projectile.prototype, "lifetime", void 0);
    __decorate([
        (0, Serializable_1.Data)("MultiHit", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "multiHit", void 0);
    __decorate([
        (0, Serializable_1.Data)("Boomerang", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "boomerang", void 0);
    __decorate([
        (0, Serializable_1.Data)("ArmorPiercing", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "armorPiercing", void 0);
    __decorate([
        (0, Serializable_1.Data)("PassesCover", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "passesCover", void 0);
    __decorate([
        (0, Serializable_1.Data)("Wavy", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "wavy", void 0);
    __decorate([
        (0, Serializable_1.Data)("Parametric", (0, Serializable_1.XMLNoDefault)(false)),
        __metadata("design:type", Boolean)
    ], Projectile.prototype, "parametric", void 0);
    return Projectile;
}());
exports.Projectile = Projectile;
exports.ProjectileData = {
    serialize: function (value) { return value.map(function (proj) { return proj.serialize(); }); },
    deserialize: function (value) {
        if (value === undefined)
            return [];
        var projectiles = Array.isArray(value) ? value : [value];
        return projectiles.map(function (proj) { return Projectile.fromXML(proj); });
    }
};
function ProjectileSerializer(proj) {
    return proj.map(function (proj) { return proj.serialize(); });
}
exports.ProjectileSerializer = ProjectileSerializer;
