"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSchemas = extractSchemas;
const compiler_1 = require("@angular/compiler");
const imports_1 = require("../../../imports");
const diagnostics_1 = require("./diagnostics");
function extractSchemas(rawExpr, evaluator, context) {
    const schemas = [];
    const result = evaluator.evaluate(rawExpr);
    if (!Array.isArray(result)) {
        throw (0, diagnostics_1.createValueHasWrongTypeError)(rawExpr, result, `${context}.schemas must be an array`);
    }
    for (const schemaRef of result) {
        if (!(schemaRef instanceof imports_1.Reference)) {
            throw (0, diagnostics_1.createValueHasWrongTypeError)(rawExpr, result, `${context}.schemas must be an array of schemas`);
        }
        const id = schemaRef.getIdentityIn(schemaRef.node.getSourceFile());
        if (id === null || schemaRef.ownedByModuleGuess !== '@angular/core') {
            throw (0, diagnostics_1.createValueHasWrongTypeError)(rawExpr, result, `${context}.schemas must be an array of schemas`);
        }
        // Since `id` is the `ts.Identifier` within the schema ref's declaration file, it's safe to
        // use `id.text` here to figure out which schema is in use. Even if the actual reference was
        // renamed when the user imported it, these names will match.
        switch (id.text) {
            case 'CUSTOM_ELEMENTS_SCHEMA':
                schemas.push(compiler_1.CUSTOM_ELEMENTS_SCHEMA);
                break;
            case 'NO_ERRORS_SCHEMA':
                schemas.push(compiler_1.NO_ERRORS_SCHEMA);
                break;
            default:
                throw (0, diagnostics_1.createValueHasWrongTypeError)(rawExpr, schemaRef, `'${schemaRef.debugName}' is not a valid ${context} schema`);
        }
    }
    return schemas;
}
