"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnosticNode = getDiagnosticNode;
exports.makeNotStandaloneDiagnostic = makeNotStandaloneDiagnostic;
exports.makeUnknownComponentImportDiagnostic = makeUnknownComponentImportDiagnostic;
exports.makeUnknownComponentDeferredImportDiagnostic = makeUnknownComponentDeferredImportDiagnostic;
const diagnostics_1 = require("../../diagnostics");
const api_1 = require("./api");
function getDiagnosticNode(ref, rawExpr) {
    // Show the diagnostic on the node within `rawExpr` which references the declaration
    // in question. `rawExpr` represents the raw expression from which `ref` was partially evaluated,
    // so use that to find the right node. Note that by the type system, `rawExpr` might be `null`, so
    // fall back on the declaration identifier in that case (even though in practice this should never
    // happen since local NgModules always have associated expressions).
    return rawExpr !== null ? ref.getOriginForDiagnostics(rawExpr) : ref.node.name;
}
function makeNotStandaloneDiagnostic(scopeReader, ref, rawExpr, kind) {
    const scope = scopeReader.getScopeForComponent(ref.node);
    let message = `The ${kind} '${ref.node.name.text}' appears in 'imports', but is not standalone and cannot be imported directly.`;
    let relatedInformation = undefined;
    if (scope !== null && scope.kind === api_1.ComponentScopeKind.NgModule) {
        // The directive/pipe in question is declared in an NgModule. Check if it's also exported.
        const isExported = scope.exported.dependencies.some((dep) => dep.ref.node === ref.node);
        const relatedInfoMessageText = isExported
            ? `It can be imported using its '${scope.ngModule.name.text}' NgModule instead.`
            : `It's declared in the '${scope.ngModule.name.text}' NgModule, but is not exported. ` +
                'Consider exporting it and importing the NgModule instead.';
        relatedInformation = [(0, diagnostics_1.makeRelatedInformation)(scope.ngModule.name, relatedInfoMessageText)];
    }
    else {
        // TODO(alxhub): the above case handles directives/pipes in NgModules that are declared in the
        // current compilation, but not those imported from .d.ts dependencies. We could likely scan the
        // program here and find NgModules to suggest, to improve the error in that case.
    }
    if (relatedInformation === undefined) {
        // If no contextual pointers can be provided to suggest a specific remedy, then at least tell
        // the user broadly what they need to do.
        message += ' It must be imported via an NgModule.';
    }
    return (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.COMPONENT_IMPORT_NOT_STANDALONE, getDiagnosticNode(ref, rawExpr), message, relatedInformation);
}
function makeUnknownComponentImportDiagnostic(ref, rawExpr) {
    return (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.COMPONENT_UNKNOWN_IMPORT, getDiagnosticNode(ref, rawExpr), `Component imports must be standalone components, directives, pipes, or must be NgModules.`);
}
function makeUnknownComponentDeferredImportDiagnostic(ref, rawExpr) {
    return (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.COMPONENT_UNKNOWN_DEFERRED_IMPORT, getDiagnosticNode(ref, rawExpr), `Component deferred imports must be standalone components, directives or pipes.`);
}
