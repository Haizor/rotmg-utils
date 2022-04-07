"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramAssetLoader = void 0;
var MapAssetContainer_1 = __importDefault(require("../MapAssetContainer"));
var ProgramAssetLoader = /** @class */ (function () {
    //TODO: try and find a better way to get the shaders, because this feels pooby
    function ProgramAssetLoader(gl, manager) {
        this.gl = gl;
        this.manager = manager;
    }
    ProgramAssetLoader.prototype.load = function (sources) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var programs, sources_1, sources_1_1, src, vertex, fragment, program;
            var e_1, _c;
            return __generator(this, function (_d) {
                programs = new Map();
                try {
                    for (sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
                        src = sources_1_1.value;
                        vertex = (_a = this.manager.get("shaders", src.vertex)) === null || _a === void 0 ? void 0 : _a.value;
                        fragment = (_b = this.manager.get("shaders", src.fragment)) === null || _b === void 0 ? void 0 : _b.value;
                        if (vertex === undefined || fragment === undefined) {
                            console.error("Failed to create program with name '".concat(src.name, "', failed to load shaders!"));
                            continue;
                        }
                        program = this.gl.createProgram();
                        if (program === null) {
                            console.error("Failed to create program with name '".concat(src.name, "'!"));
                            continue;
                        }
                        this.gl.attachShader(program, vertex);
                        this.gl.attachShader(program, fragment);
                        this.gl.linkProgram(program);
                        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                            console.error("Failed to link program with name '".concat(src.name, "'!"));
                            continue;
                        }
                        programs.set(src.name, program);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (sources_1_1 && !sources_1_1.done && (_c = sources_1.return)) _c.call(sources_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/, new MapAssetContainer_1.default(programs)];
            });
        });
    };
    return ProgramAssetLoader;
}());
exports.ProgramAssetLoader = ProgramAssetLoader;
