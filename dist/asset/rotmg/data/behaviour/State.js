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
exports.State = exports.TransitionData = exports.StateData = exports.BehaviorData = void 0;
var Serializable_1 = require("../../../../asset/normal/Serializable");
var Behavior_1 = require("./Behavior");
var Transition_1 = require("./Transition");
exports.BehaviorData = {
    serialize: function (input) {
        return input.map(function (behavior) { return behavior.serialize(); });
    },
    deserialize: function (input) {
        var xml = Array.isArray(input) ? input : [input];
        return xml.reduce(function (result, val) {
            if (val === undefined)
                return result;
            var constructor = Behavior_1.behaviorConstructors.get(val["#text"]);
            if (constructor === undefined)
                return result;
            var obj = new constructor();
            (0, Serializable_1.deserializeObject)(obj, val);
            result.push(obj);
            return result;
        }, []);
    }
};
exports.StateData = {
    serialize: function (input) {
        return input.map(function (state) { return state.serialize(); });
    },
    deserialize: function (input) {
        var _this = this;
        if (input === undefined)
            return [];
        var xml = Array.isArray(input) ? input : [input];
        return xml.map(function (val) {
            var state = new State();
            (0, Serializable_1.deserializeObject)(state, val);
            state.parent = _this;
            return state;
        });
    }
};
exports.TransitionData = {
    serialize: function (input) {
        if (input.length === 0)
            return;
        return (0, Serializable_1.serializeObject)(input);
    },
    deserialize: function (input) {
        if (input === undefined)
            return [];
        var xml = Array.isArray(input) ? input : [input];
        return xml.map(function (val) {
            var transition = new Transition_1.Transition();
            (0, Serializable_1.deserializeObject)(transition, val);
            return transition;
        });
    }
};
var State = /** @class */ (function () {
    function State() {
        this.id = "";
        this.behaviors = [];
        this.states = [];
        this.transitions = [];
    }
    State.prototype.getChildWithID = function (id) {
        return this.states.find(function (state) { return state.id === id; });
    };
    State.prototype.serialize = function () {
        return (0, Serializable_1.serializeObject)(this);
    };
    __decorate([
        (0, Serializable_1.Data)("@_id"),
        __metadata("design:type", String)
    ], State.prototype, "id", void 0);
    __decorate([
        (0, Serializable_1.Data)("Behavior", exports.BehaviorData),
        __metadata("design:type", Array)
    ], State.prototype, "behaviors", void 0);
    __decorate([
        (0, Serializable_1.Data)("State", exports.StateData),
        __metadata("design:type", Array)
    ], State.prototype, "states", void 0);
    __decorate([
        (0, Serializable_1.Data)("Transition", exports.TransitionData),
        __metadata("design:type", Array)
    ], State.prototype, "transitions", void 0);
    return State;
}());
exports.State = State;
