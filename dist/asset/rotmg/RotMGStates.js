"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotMGStates = void 0;
var Serializable_1 = require("../normal/Serializable");
var State_1 = require("./data/behaviour/State");
var RotMGStates = /** @class */ (function () {
    function RotMGStates() {
        this.states = [];
    }
    RotMGStates.prototype.get = function (id) {
        return this.states.find(function (state) { return state.id === id; });
    };
    RotMGStates.prototype.getAll = function () {
        return this.states;
    };
    RotMGStates.prototype.parseFromXML = function (xml) {
        var state = new State_1.State();
        (0, Serializable_1.deserializeObject)(state, xml);
        console.log(state);
        this.states.push(state);
    };
    RotMGStates.prototype.getMetadata = function () {
        return this.metadata;
    };
    RotMGStates.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    return RotMGStates;
}());
exports.RotMGStates = RotMGStates;
