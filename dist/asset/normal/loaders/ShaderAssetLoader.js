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
exports.ShaderAssetLoader = void 0;
var MapAssetContainer_1 = __importDefault(require("../MapAssetContainer"));
var ShaderAssetLoader = /** @class */ (function () {
    function ShaderAssetLoader(gl) {
        this.gl = gl;
    }
    //TODO: make this actually asynchronous
    ShaderAssetLoader.prototype.load = function (sources) {
        return __awaiter(this, void 0, void 0, function () {
            var shaders, sources_1, sources_1_1, src, txt, shader, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        shaders = new Map();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        sources_1 = __values(sources), sources_1_1 = sources_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!sources_1_1.done) return [3 /*break*/, 6];
                        src = sources_1_1.value;
                        return [4 /*yield*/, fetch(src.src)];
                    case 3: return [4 /*yield*/, (_b.sent()).text()];
                    case 4:
                        txt = _b.sent();
                        shader = this.gl.createShader(src.type === "vertex" ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
                        if (shader === null) {
                            console.log("Failed to create shader with name '".concat(src.name, "'!"));
                            return [3 /*break*/, 5];
                        }
                        this.gl.canvas.id = "test";
                        this.gl.shaderSource(shader, txt);
                        this.gl.compileShader(shader);
                        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                            console.log("Failed to compile shader with name '".concat(src.name, "'! Info: ").concat(this.gl.getShaderInfoLog(shader)));
                            return [3 /*break*/, 5];
                        }
                        shaders.set(src.name, shader);
                        _b.label = 5;
                    case 5:
                        sources_1_1 = sources_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, new MapAssetContainer_1.default(shaders)];
                }
            });
        });
    };
    return ShaderAssetLoader;
}());
exports.ShaderAssetLoader = ShaderAssetLoader;
