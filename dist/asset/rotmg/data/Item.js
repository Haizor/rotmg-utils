"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(data) {
        this.data = data;
    }
    Item.prototype.getStats = function () {
        return this.data.stats;
    };
    return Item;
}());
exports.Item = Item;
