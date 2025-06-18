"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialPipeLinkerVersion1 = void 0;
exports.toR3PipeMeta = toR3PipeMeta;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const fatal_linker_error_1 = require("../../fatal_linker_error");
const util_1 = require("./util");
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclarePipe()` call expressions.
 */
class PartialPipeLinkerVersion1 {
    constructor() { }
    linkPartialDeclaration(constantPool, metaObj, version) {
        const meta = toR3PipeMeta(metaObj, version);
        return (0, compiler_1.compilePipeFromMetadata)(meta);
    }
}
exports.PartialPipeLinkerVersion1 = PartialPipeLinkerVersion1;
/**
 * Derives the `R3PipeMetadata` structure from the AST object.
 */
function toR3PipeMeta(metaObj, version) {
    const typeExpr = metaObj.getValue('type');
    const typeName = typeExpr.getSymbolName();
    if (typeName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(typeExpr.expression, 'Unsupported type, its name could not be determined');
    }
    const pure = metaObj.has('pure') ? metaObj.getBoolean('pure') : true;
    const isStandalone = metaObj.has('isStandalone')
        ? metaObj.getBoolean('isStandalone')
        : (0, util_1.getDefaultStandaloneValue)(version);
    return {
        name: typeName,
        type: (0, util_1.wrapReference)(typeExpr.getOpaque()),
        typeArgumentCount: 0,
        deps: null,
        pipeName: metaObj.getString('name'),
        pure,
        isStandalone,
    };
}
