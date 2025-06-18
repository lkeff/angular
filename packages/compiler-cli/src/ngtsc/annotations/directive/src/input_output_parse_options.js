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
exports.parseAndValidateInputAndOutputOptions = parseAndValidateInputAndOutputOptions;
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const reflection_1 = require("../../../reflection");
/**
 * Parses and validates input and output initializer function options.
 *
 * This currently only parses the `alias` option and returns it. The other
 * options for signal inputs are runtime constructs that aren't relevant at
 * compile time.
 */
function parseAndValidateInputAndOutputOptions(optionsNode) {
    if (!typescript_1.default.isObjectLiteralExpression(optionsNode)) {
        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_HAS_WRONG_TYPE, optionsNode, 'Argument needs to be an object literal that is statically analyzable.');
    }
    const options = (0, reflection_1.reflectObjectLiteral)(optionsNode);
    let alias = undefined;
    if (options.has('alias')) {
        const aliasExpr = options.get('alias');
        if (!typescript_1.default.isStringLiteralLike(aliasExpr)) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.VALUE_HAS_WRONG_TYPE, aliasExpr, 'Alias needs to be a string that is statically analyzable.');
        }
        alias = aliasExpr.text;
    }
    return { alias };
}
