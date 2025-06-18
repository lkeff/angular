"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../../../diagnostics");
const api_1 = require("../../../api");
const symbol_util_1 = require("../../../src/symbol_util");
const api_2 = require("../../api");
/** Names of known signal instance properties. */
const SIGNAL_INSTANCE_PROPERTIES = new Set(['set', 'update', 'asReadonly']);
/**
 * Names of known function instance properties.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#instance_properties
 */
const FUNCTION_INSTANCE_PROPERTIES = new Set(['name', 'length', 'prototype']);
/**
 * Ensures Signals are invoked when used in template interpolations.
 */
class InterpolatedSignalCheck extends api_2.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED;
    }
    visitNode(ctx, component, node) {
        // interpolations like `{{ mySignal }}`
        if (node instanceof compiler_1.Interpolation) {
            return node.expressions
                .filter((item) => item instanceof compiler_1.PropertyRead)
                .flatMap((item) => buildDiagnosticForSignal(ctx, item, component));
        }
        // bound properties like `[prop]="mySignal"`
        else if (node instanceof compiler_1.TmplAstBoundAttribute) {
            // we skip the check if the node is an input binding
            const usedDirectives = ctx.templateTypeChecker.getUsedDirectives(component);
            if (usedDirectives !== null &&
                usedDirectives.some((dir) => dir.inputs.getByBindingPropertyName(node.name) !== null)) {
                return [];
            }
            // otherwise, we check if the node is
            if (
            // a bound property like `[prop]="mySignal"`
            (node.type === compiler_1.BindingType.Property ||
                // or a class binding like `[class.myClass]="mySignal"`
                node.type === compiler_1.BindingType.Class ||
                // or a style binding like `[style.width]="mySignal"`
                node.type === compiler_1.BindingType.Style ||
                // or an attribute binding like `[attr.role]="mySignal"`
                node.type === compiler_1.BindingType.Attribute ||
                // or an animation binding like `[@myAnimation]="mySignal"`
                node.type === compiler_1.BindingType.Animation) &&
                node.value instanceof compiler_1.ASTWithSource &&
                node.value.ast instanceof compiler_1.PropertyRead) {
                return buildDiagnosticForSignal(ctx, node.value.ast, component);
            }
        }
        return [];
    }
}
function isFunctionInstanceProperty(name) {
    return FUNCTION_INSTANCE_PROPERTIES.has(name);
}
function isSignalInstanceProperty(name) {
    return SIGNAL_INSTANCE_PROPERTIES.has(name);
}
function buildDiagnosticForSignal(ctx, node, component) {
    // check for `{{ mySignal }}`
    const symbol = ctx.templateTypeChecker.getSymbolOfNode(node, component);
    if (symbol !== null && symbol.kind === api_1.SymbolKind.Expression && (0, symbol_util_1.isSignalReference)(symbol)) {
        const templateMapping = ctx.templateTypeChecker.getSourceMappingAtTcbLocation(symbol.tcbLocation);
        const errorString = `${node.name} is a function and should be invoked: ${node.name}()`;
        const diagnostic = ctx.makeTemplateDiagnostic(templateMapping.span, errorString);
        return [diagnostic];
    }
    // check for `{{ mySignal.name }}` or `{{ mySignal.length }}` or `{{ mySignal.prototype }}`
    // as these are the names of instance properties of Function, the compiler does _not_ throw an
    // error.
    // We also check for `{{ mySignal.set }}` or `{{ mySignal.update }}` or
    // `{{ mySignal.asReadonly }}` as these are the names of instance properties of Signal
    const symbolOfReceiver = ctx.templateTypeChecker.getSymbolOfNode(node.receiver, component);
    if ((isFunctionInstanceProperty(node.name) || isSignalInstanceProperty(node.name)) &&
        symbolOfReceiver !== null &&
        symbolOfReceiver.kind === api_1.SymbolKind.Expression &&
        (0, symbol_util_1.isSignalReference)(symbolOfReceiver)) {
        const templateMapping = ctx.templateTypeChecker.getSourceMappingAtTcbLocation(symbolOfReceiver.tcbLocation);
        const errorString = `${node.receiver.name} is a function and should be invoked: ${node.receiver.name}()`;
        const diagnostic = ctx.makeTemplateDiagnostic(templateMapping.span, errorString);
        return [diagnostic];
    }
    return [];
}
exports.factory = {
    code: diagnostics_1.ErrorCode.INTERPOLATED_SIGNAL_NOT_INVOKED,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.INTERPOLATED_SIGNAL_NOT_INVOKED,
    create: () => new InterpolatedSignalCheck(),
};
