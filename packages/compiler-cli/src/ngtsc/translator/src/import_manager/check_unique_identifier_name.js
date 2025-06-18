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
exports.createGenerateUniqueIdentifierHelper = createGenerateUniqueIdentifierHelper;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Generates a helper for `ImportManagerConfig` to generate unique identifiers
 * for a given source file.
 */
function createGenerateUniqueIdentifierHelper() {
    const generatedIdentifiers = new Set();
    const isGeneratedIdentifier = (sf, identifierName) => generatedIdentifiers.has(`${sf.fileName}@@${identifierName}`);
    const markIdentifierAsGenerated = (sf, identifierName) => generatedIdentifiers.add(`${sf.fileName}@@${identifierName}`);
    return (sourceFile, symbolName) => {
        const sf = sourceFile;
        if (sf.identifiers === undefined) {
            throw new Error('Source file unexpectedly lacks map of parsed `identifiers`.');
        }
        const isUniqueIdentifier = (name) => !sf.identifiers.has(name) && !isGeneratedIdentifier(sf, name);
        if (isUniqueIdentifier(symbolName)) {
            markIdentifierAsGenerated(sf, symbolName);
            return null;
        }
        let name = null;
        let counter = 1;
        do {
            name = `${symbolName}_${counter++}`;
        } while (!isUniqueIdentifier(name));
        markIdentifierAsGenerated(sf, name);
        return typescript_1.default.factory.createUniqueName(name, typescript_1.default.GeneratedIdentifierFlags.Optimistic);
    };
}
