"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileInputTransformFields = compileInputTransformFields;
const compiler_1 = require("@angular/compiler");
/** Generates additional fields to be added to a class that has inputs with transform functions. */
function compileInputTransformFields(inputs) {
    const extraFields = [];
    for (const input of inputs) {
        // Note: Signal inputs capture their transform `WriteT` as part of the `InputSignal`.
        // Such inputs will not have a `transform` captured and not generate coercion members.
        if (input.transform) {
            extraFields.push({
                name: `ngAcceptInputType_${input.classPropertyName}`,
                type: compiler_1.outputAst.transplantedType(input.transform.type),
                statements: [],
                initializer: null,
                deferrableImports: null,
            });
        }
    }
    return extraFields;
}
