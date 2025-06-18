"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialNgModuleLinkerVersion1 = void 0;
exports.toR3NgModuleMeta = toR3NgModuleMeta;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const util_1 = require("./util");
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclareNgModule()` call expressions.
 */
class PartialNgModuleLinkerVersion1 {
    constructor(
    /**
     * If true then emit the additional declarations, imports, exports, etc in the NgModule
     * definition. These are only used by JIT compilation.
     */
    emitInline) {
        this.emitInline = emitInline;
    }
    linkPartialDeclaration(constantPool, metaObj) {
        const meta = toR3NgModuleMeta(metaObj, this.emitInline);
        return (0, compiler_1.compileNgModule)(meta);
    }
}
exports.PartialNgModuleLinkerVersion1 = PartialNgModuleLinkerVersion1;
/**
 * Derives the `R3NgModuleMetadata` structure from the AST object.
 */
function toR3NgModuleMeta(metaObj, supportJit) {
    const wrappedType = metaObj.getOpaque('type');
    const meta = {
        kind: compiler_1.R3NgModuleMetadataKind.Global,
        type: (0, util_1.wrapReference)(wrappedType),
        bootstrap: [],
        declarations: [],
        publicDeclarationTypes: null,
        includeImportTypes: true,
        imports: [],
        exports: [],
        selectorScopeMode: supportJit ? compiler_1.R3SelectorScopeMode.Inline : compiler_1.R3SelectorScopeMode.Omit,
        containsForwardDecls: false,
        schemas: [],
        id: metaObj.has('id') ? metaObj.getOpaque('id') : null,
    };
    // Each of `bootstrap`, `declarations`, `imports` and `exports` are normally an array. But if any
    // of the references are not yet declared, then the arrays must be wrapped in a function to
    // prevent errors at runtime when accessing the values.
    // The following blocks of code will unwrap the arrays from such functions, because
    // `R3NgModuleMetadata` expects arrays of `R3Reference` objects.
    // Further, since the `ɵɵdefineNgModule()` will also suffer from the forward declaration problem,
    // we must update the `containsForwardDecls` property if a function wrapper was found.
    if (metaObj.has('bootstrap')) {
        const bootstrap = metaObj.getValue('bootstrap');
        if (bootstrap.isFunction()) {
            meta.containsForwardDecls = true;
            meta.bootstrap = wrapReferences(unwrapForwardRefs(bootstrap));
        }
        else
            meta.bootstrap = wrapReferences(bootstrap);
    }
    if (metaObj.has('declarations')) {
        const declarations = metaObj.getValue('declarations');
        if (declarations.isFunction()) {
            meta.containsForwardDecls = true;
            meta.declarations = wrapReferences(unwrapForwardRefs(declarations));
        }
        else
            meta.declarations = wrapReferences(declarations);
    }
    if (metaObj.has('imports')) {
        const imports = metaObj.getValue('imports');
        if (imports.isFunction()) {
            meta.containsForwardDecls = true;
            meta.imports = wrapReferences(unwrapForwardRefs(imports));
        }
        else
            meta.imports = wrapReferences(imports);
    }
    if (metaObj.has('exports')) {
        const exports = metaObj.getValue('exports');
        if (exports.isFunction()) {
            meta.containsForwardDecls = true;
            meta.exports = wrapReferences(unwrapForwardRefs(exports));
        }
        else
            meta.exports = wrapReferences(exports);
    }
    if (metaObj.has('schemas')) {
        const schemas = metaObj.getValue('schemas');
        meta.schemas = wrapReferences(schemas);
    }
    return meta;
}
/**
 * Extract an array from the body of the function.
 *
 * If `field` is `function() { return [exp1, exp2, exp3]; }` then we return `[exp1, exp2, exp3]`.
 *
 */
function unwrapForwardRefs(field) {
    return field.getFunctionReturnValue();
}
/**
 * Wrap the array of expressions into an array of R3 references.
 */
function wrapReferences(values) {
    return values.getArray().map((i) => (0, util_1.wrapReference)(i.getOpaque()));
}
