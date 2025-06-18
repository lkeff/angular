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
 * Ensures that function in event bindings are called. For example, `<button (click)="myFunc"></button>`
 * will not call `myFunc` when the button is clicked. Instead, it should be `<button (click)="myFunc()"></button>`.
 * This is likely not the intent of the developer. Instead, the intent is likely to call `myFunc`.
 */
class UninvokedFunctionInEventBindingSpec extends api_2.TemplateCheckWithVisitor {
    constructor() {
        super(...arguments);
        this.code = diagnostics_1.ErrorCode.UNINVOKED_FUNCTION_IN_EVENT_BINDING;
    }
    visitNode(ctx, component, node) {
        // If the node is not a bound event, skip it.
        if (!(node instanceof compiler_1.TmplAstBoundEvent))
            return [];
        // If the node is not a regular or animation event, skip it.
        if (node.type !== compiler_1.ParsedEventType.Regular && node.type !== compiler_1.ParsedEventType.Animation)
            return [];
        if (!(node.handler instanceof compiler_1.ASTWithSource))
            return [];
        const sourceExpressionText = node.handler.source || '';
        if (node.handler.ast instanceof compiler_1.Chain) {
            // (click)="increment; decrement"
            return node.handler.ast.expressions.flatMap((expression) => assertExpressionInvoked(expression, component, node, sourceExpressionText, ctx));
        }
        if (node.handler.ast instanceof compiler_1.Conditional) {
            // (click)="true ? increment : decrement"
            const { trueExp, falseExp } = node.handler.ast;
            return [trueExp, falseExp].flatMap((expression) => assertExpressionInvoked(expression, component, node, sourceExpressionText, ctx));
        }
        // (click)="increment"
        return assertExpressionInvoked(node.handler.ast, component, node, sourceExpressionText, ctx);
    }
}
/**
 * Asserts that the expression is invoked.
 * If the expression is a property read, and it has a call signature, a diagnostic is generated.
 */
function assertExpressionInvoked(expression, component, node, expressionText, ctx) {
    var _a;
    if (expression instanceof compiler_1.Call || expression instanceof compiler_1.SafeCall) {
        return []; // If the method is called, skip it.
    }
    if (!(expression instanceof compiler_1.PropertyRead) && !(expression instanceof compiler_1.SafePropertyRead)) {
        return []; // If the expression is not a property read, skip it.
    }
    const symbol = ctx.templateTypeChecker.getSymbolOfNode(expression, component);
    if (symbol !== null && symbol.kind === api_1.SymbolKind.Expression) {
        if (((_a = symbol.tsType.getCallSignatures()) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const fullExpressionText = generateStringFromExpression(expression, expressionText);
            const errorString = `Function in event binding should be invoked: ${fullExpressionText}()`;
            return [ctx.makeTemplateDiagnostic(node.sourceSpan, errorString)];
        }
    }
    return [];
}
function generateStringFromExpression(expression, source) {
    return source.substring(expression.span.start, expression.span.end);
}
exports.factory = {
    code: diagnostics_1.ErrorCode.UNINVOKED_FUNCTION_IN_EVENT_BINDING,
    name: diagnostics_1.ExtendedTemplateDiagnosticName.UNINVOKED_FUNCTION_IN_EVENT_BINDING,
    create: () => new UninvokedFunctionInEventBindingSpec(),
};
