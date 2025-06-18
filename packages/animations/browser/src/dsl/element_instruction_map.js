"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementInstructionMap = void 0;
class ElementInstructionMap {
    constructor() {
        this._map = new Map();
    }
    get(element) {
        return this._map.get(element) || [];
    }
    append(element, instructions) {
        let existingInstructions = this._map.get(element);
        if (!existingInstructions) {
            this._map.set(element, (existingInstructions = []));
        }
        existingInstructions.push(...instructions);
    }
    has(element) {
        return this._map.has(element);
    }
    clear() {
        this._map.clear();
    }
}
exports.ElementInstructionMap = ElementInstructionMap;
