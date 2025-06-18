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
exports.getCallDecoratorImport = getCallDecoratorImport;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("./imports");
function getCallDecoratorImport(typeChecker, decorator) {
    // Note that this does not cover the edge case where decorators are called from
    // a namespace import: e.g. "@core.Component()". This is not handled by Ngtsc either.
    if (!typescript_1.default.isCallExpression(decorator.expression) ||
        !typescript_1.default.isIdentifier(decorator.expression.expression)) {
        return null;
    }
    const identifier = decorator.expression.expression;
    return (0, imports_1.getImportOfIdentifier)(typeChecker, identifier);
}
