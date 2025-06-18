"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticSymbol = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../../file_system");
/**
 * Represents a symbol that is recognizable across incremental rebuilds, which enables the captured
 * metadata to be compared to the prior compilation. This allows for semantic understanding of
 * the changes that have been made in a rebuild, which potentially enables more reuse of work
 * from the prior compilation.
 */
class SemanticSymbol {
    constructor(
    /**
     * The declaration for this symbol.
     */
    decl) {
        this.decl = decl;
        this.path = (0, file_system_1.absoluteFromSourceFile)(decl.getSourceFile());
        this.identifier = getSymbolIdentifier(decl);
    }
}
exports.SemanticSymbol = SemanticSymbol;
function getSymbolIdentifier(decl) {
    if (!typescript_1.default.isSourceFile(decl.parent)) {
        return null;
    }
    // If this is a top-level class declaration, the class name is used as unique identifier.
    // Other scenarios are currently not supported and causes the symbol not to be identified
    // across rebuilds, unless the declaration node has not changed.
    return decl.name.text;
}
