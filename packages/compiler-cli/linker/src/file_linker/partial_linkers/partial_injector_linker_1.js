"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialInjectorLinkerVersion1 = void 0;
exports.toR3InjectorMeta = toR3InjectorMeta;
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
 * A `PartialLinker` that is designed to process `ɵɵngDeclareInjector()` call expressions.
 */
class PartialInjectorLinkerVersion1 {
    linkPartialDeclaration(constantPool, metaObj) {
        const meta = toR3InjectorMeta(metaObj);
        return (0, compiler_1.compileInjector)(meta);
    }
}
exports.PartialInjectorLinkerVersion1 = PartialInjectorLinkerVersion1;
/**
 * Derives the `R3InjectorMetadata` structure from the AST object.
 */
function toR3InjectorMeta(metaObj) {
    const typeExpr = metaObj.getValue('type');
    const typeName = typeExpr.getSymbolName();
    if (typeName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(typeExpr.expression, 'Unsupported type, its name could not be determined');
    }
    return {
        name: typeName,
        type: (0, util_1.wrapReference)(typeExpr.getOpaque()),
        providers: metaObj.has('providers') ? metaObj.getOpaque('providers') : null,
        imports: metaObj.has('imports') ? metaObj.getArray('imports').map((i) => i.getOpaque()) : [],
    };
}
