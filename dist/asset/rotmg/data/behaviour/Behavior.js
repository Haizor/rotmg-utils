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
exports.XMLBehavior = exports.Behavior = exports.behaviorConstructors = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
exports.behaviorConstructors = new Map();
var Behavior = /** @class */ (function () {
    function Behavior() {
    }
    Behavior.prototype.serialize = function () {
        var obj = (0, Serializable_1.serializeObject)(this);
        obj["#text"] = this.name;
        return obj;
    };
    __decorate([
        (0, Serializable_1.Data)("@_bucket"),
        __metadata("design:type", String)
    ], Behavior.prototype, "bucket", void 0);
    __decorate([
        (0, Serializable_1.Data)("@_cooldown"),
        __metadata("design:type", Number)
    ], Behavior.prototype, "cooldown", void 0);
    return Behavior;
}());
exports.Behavior = Behavior;
function XMLBehavior() {
    return function (constructor) {
        exports.behaviorConstructors.set(constructor.prototype.name, constructor);
    };
}
exports.XMLBehavior = XMLBehavior;
