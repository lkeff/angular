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
exports.findBaseClassDeclarations = findBaseClassDeclarations;
const typescript_1 = __importDefault(require("typescript"));
const class_declaration_1 = require("./class_declaration");
/** Gets all base class declarations of the specified class declaration. */
function findBaseClassDeclarations(node, typeChecker) {
    const result = [];
    let currentClass = node;
    while (currentClass) {
        const baseTypes = (0, class_declaration_1.getBaseTypeIdentifiers)(currentClass);
        if (!baseTypes || baseTypes.length !== 1) {
            break;
        }
        const symbol = typeChecker.getTypeAtLocation(baseTypes[0]).getSymbol();
        // Note: `ts.Symbol#valueDeclaration` can be undefined. TypeScript has an incorrect type
        // for this: https://github.com/microsoft/TypeScript/issues/24706.
        if (!symbol || !symbol.valueDeclaration || !typescript_1.default.isClassDeclaration(symbol.valueDeclaration)) {
            break;
        }
        result.push({ identifier: baseTypes[0], node: symbol.valueDeclaration });
        currentClass = symbol.valueDeclaration;
    }
    return result;
}
