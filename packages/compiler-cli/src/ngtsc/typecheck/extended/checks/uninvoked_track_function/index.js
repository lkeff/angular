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
const api_2 = require("../../api");
/**
 * Ensures that track functions in @for loops are invoked.
 */
class UninvokedTrackFunctionCheck extends api_2.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.UNINVOKED_TRACK_FUNCTION;
    }
    visitNode(ctx, component, node) {
        var _a;
        if (!(node instanceof compiler_1.TmplAstForLoopBlock) || !node.trackBy) {
            return [];
        }
        if (node.trackBy.ast instanceof compiler_1.Call || node.trackBy.ast instanceof compiler_1.SafeCall) {
            // If the method is called, skip it.
            return [];
        }
        if (!(node.trackBy.ast instanceof compiler_1.PropertyRead) &&
            !(node.trackBy.ast instanceof compiler_1.SafePropertyRead)) {
            // If the expression is not a property read, skip it.
            return [];
        }
        const symbol = ctx.templateTypeChecker.getSymbolOfNode(node.trackBy.ast, component);
        if (symbol !== null &&
            symbol.kind === api_1.SymbolKind.Expression &&
            ((_a = symbol.tsType.getCallSignatures()) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const fullExpressionText = generateStringFromExpression(node.trackBy.ast, node.trackBy.source || '');
            const errorString = `The track function in the @for block should be invoked: ${fullExpressionText}(/* arguments */)`;
            return [ctx.makeTemplateDiagnostic(node.sourceSpan, errorString)];
        }
        return [];
    }
}
function generateStringFromExpression(expression, source) {
    return source.substring(expression.span.start, expression.span.end);
}
exports.factory = {
    code: diagnostics_1.ErrorCode.UNINVOKED_TRACK_FUNCTION,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.UNINVOKED_TRACK_FUNCTION,
    create: () => new UninvokedTrackFunctionCheck(),
};
