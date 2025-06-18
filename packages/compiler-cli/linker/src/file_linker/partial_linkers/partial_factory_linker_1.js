"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialFactoryLinkerVersion1 = void 0;
exports.toR3FactoryMeta = toR3FactoryMeta;
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
 * A `PartialLinker` that is designed to process `ɵɵngDeclareFactory()` call expressions.
 */
class PartialFactoryLinkerVersion1 {
    linkPartialDeclaration(constantPool, metaObj) {
        const meta = toR3FactoryMeta(metaObj);
        return (0, compiler_1.compileFactoryFunction)(meta);
    }
}
exports.PartialFactoryLinkerVersion1 = PartialFactoryLinkerVersion1;
/**
 * Derives the `R3FactoryMetadata` structure from the AST object.
 */
function toR3FactoryMeta(metaObj) {
    const typeExpr = metaObj.getValue('type');
    const typeName = typeExpr.getSymbolName();
    if (typeName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(typeExpr.expression, 'Unsupported type, its name could not be determined');
    }
    return {
        name: typeName,
        type: (0, util_1.wrapReference)(typeExpr.getOpaque()),
        typeArgumentCount: 0,
        target: (0, util_1.parseEnum)(metaObj.getValue('target'), compiler_1.FactoryTarget),
        deps: getDependencies(metaObj, 'deps'),
    };
}
function getDependencies(metaObj, propName) {
    if (!metaObj.has(propName)) {
        return null;
    }
    const deps = metaObj.getValue(propName);
    if (deps.isArray()) {
        return deps.getArray().map((dep) => (0, util_1.getDependency)(dep.getObject()));
    }
    if (deps.isString()) {
        return 'invalid';
    }
    return null;
}
