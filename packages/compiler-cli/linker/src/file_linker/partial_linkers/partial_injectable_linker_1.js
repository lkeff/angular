"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialInjectableLinkerVersion1 = void 0;
exports.toR3InjectableMeta = toR3InjectableMeta;
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
 * A `PartialLinker` that is designed to process `ɵɵngDeclareInjectable()` call expressions.
 */
class PartialInjectableLinkerVersion1 {
    linkPartialDeclaration(constantPool, metaObj) {
        const meta = toR3InjectableMeta(metaObj);
        return (0, compiler_1.compileInjectable)(meta, /* resolveForwardRefs */ false);
    }
}
exports.PartialInjectableLinkerVersion1 = PartialInjectableLinkerVersion1;
/**
 * Derives the `R3InjectableMetadata` structure from the AST object.
 */
function toR3InjectableMeta(metaObj) {
    const typeExpr = metaObj.getValue('type');
    const typeName = typeExpr.getSymbolName();
    if (typeName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(typeExpr.expression, 'Unsupported type, its name could not be determined');
    }
    const meta = {
        name: typeName,
        type: (0, util_1.wrapReference)(typeExpr.getOpaque()),
        typeArgumentCount: 0,
        providedIn: metaObj.has('providedIn')
            ? (0, util_1.extractForwardRef)(metaObj.getValue('providedIn'))
            : (0, compiler_1.createMayBeForwardRefExpression)(compiler_1.outputAst.literal(null), compiler_1.ForwardRefHandling.None),
    };
    if (metaObj.has('useClass')) {
        meta.useClass = (0, util_1.extractForwardRef)(metaObj.getValue('useClass'));
    }
    if (metaObj.has('useFactory')) {
        meta.useFactory = metaObj.getOpaque('useFactory');
    }
    if (metaObj.has('useExisting')) {
        meta.useExisting = (0, util_1.extractForwardRef)(metaObj.getValue('useExisting'));
    }
    if (metaObj.has('useValue')) {
        meta.useValue = (0, util_1.extractForwardRef)(metaObj.getValue('useValue'));
    }
    if (metaObj.has('deps')) {
        meta.deps = metaObj.getArray('deps').map((dep) => (0, util_1.getDependency)(dep.getObject()));
    }
    return meta;
}
