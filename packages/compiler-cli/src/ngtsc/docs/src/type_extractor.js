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
exports.extractResolvedTypeString = extractResolvedTypeString;
const typescript_1 = __importDefault(require("typescript"));
/** Gets the string representation of a node's resolved type. */
function extractResolvedTypeString(node, checker) {
    return checker.typeToString(checker.getTypeAtLocation(node), undefined, typescript_1.default.TypeFormatFlags.NoTruncation);
}
