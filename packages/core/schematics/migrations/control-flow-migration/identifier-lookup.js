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
exports.lookupIdentifiersInSourceFile = lookupIdentifiersInSourceFile;
const typescript_1 = __importDefault(require("typescript"));
function lookupIdentifiersInSourceFile(sourceFile, names) {
    const results = new Set();
    const visit = (node) => {
        if (typescript_1.default.isIdentifier(node) && names.includes(node.text)) {
            results.add(node);
        }
        typescript_1.default.forEachChild(node, visit);
    };
    visit(sourceFile);
    return results;
}
