"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromUnionIfPossible = removeFromUnionIfPossible;
const typescript_1 = __importDefault(require("typescript"));
function removeFromUnionIfPossible(union, filter) {
    const filtered = union.types.filter(filter);
    if (filtered.length === union.types.length) {
        return union;
    }
    // If there is only item at this point, avoid the union structure.
    if (filtered.length === 1) {
        return filtered[0];
    }
    return typescript_1.default.factory.updateUnionTypeNode(union, typescript_1.default.factory.createNodeArray(filtered));
}
