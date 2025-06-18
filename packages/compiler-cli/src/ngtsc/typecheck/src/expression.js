"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY_EXPRESSION = void 0;
exports.astToTypescript = astToTypescript;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("./diagnostics");
const ts_util_1 = require("./ts_util");
/**
 * Expression that is cast to any. Currently represented as `0 as any`.
 *
 * Historically this expression was using `null as any`, but a newly-added check in TypeScript 5.6
 * (https://devblogs.microsoft.com/typescript/announcing-typescript-5-6-beta/#disallowed-nullish-and-truthy-checks)
 * started flagging it as always being nullish. Other options that were considered:
 * - `NaN as any` or `Infinity as any` - not used, because they don't work if the `noLib` compiler
 *   option is enabled. Also they require more characters.
 * - Some flavor of function call, like `isNan(0) as any` - requires even more characters than the
 *   NaN option and has the same issue with `noLib`.
 */
exports.ANY_EXPRESSION = typescript_1.default.factory.createAsExpression(typescript_1.default.factory.createNumericLiteral('0'), typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword));
const UNDEFINED = typescript_1.default.factory.createIdentifier('undefined');
const UNARY_OPS = new Map([
    ['+', typescript_1.default.SyntaxKind.PlusToken],
    ['-', typescript_1.default.SyntaxKind.MinusToken],
]);
const BINARY_OPS = new Map([
    ['+', typescript_1.default.SyntaxKind.PlusToken],
    ['-', typescript_1.default.SyntaxKind.MinusToken],
    ['<', typescript_1.default.SyntaxKind.LessThanToken],
    ['>', typescript_1.default.SyntaxKind.GreaterThanToken],
    ['<=', typescript_1.default.SyntaxKind.LessThanEqualsToken],
    ['>=', typescript_1.default.SyntaxKind.GreaterThanEqualsToken],
    ['==', typescript_1.default.SyntaxKind.EqualsEqualsToken],
    ['===', typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken],
    ['*', typescript_1.default.SyntaxKind.AsteriskToken],
    ['**', typescript_1.default.SyntaxKind.AsteriskAsteriskToken],
    ['/', typescript_1.default.SyntaxKind.SlashToken],
    ['%', typescript_1.default.SyntaxKind.PercentToken],
    ['!=', typescript_1.default.SyntaxKind.ExclamationEqualsToken],
    ['!==', typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken],
    ['||', typescript_1.default.SyntaxKind.BarBarToken],
    ['&&', typescript_1.default.SyntaxKind.AmpersandAmpersandToken],
    ['&', typescript_1.default.SyntaxKind.AmpersandToken],
    ['|', typescript_1.default.SyntaxKind.BarToken],
    ['??', typescript_1.default.SyntaxKind.QuestionQuestionToken],
    ['in', typescript_1.default.SyntaxKind.InKeyword],
]);
/**
 * Convert an `AST` to TypeScript code directly, without going through an intermediate `Expression`
 * AST.
 */
function astToTypescript(ast, maybeResolve, config) {
    const translator = new AstTranslator(maybeResolve, config);
    return translator.translate(ast);
}
class AstTranslator {
    constructor(maybeResolve, config) {
        this.maybeResolve = maybeResolve;
        this.config = config;
    }
    translate(ast) {
        // Skip over an `ASTWithSource` as its `visit` method calls directly into its ast's `visit`,
        // which would prevent any custom resolution through `maybeResolve` for that node.
        if (ast instanceof compiler_1.ASTWithSource) {
            ast = ast.ast;
        }
        // The `EmptyExpr` doesn't have a dedicated method on `AstVisitor`, so it's special cased here.
        if (ast instanceof compiler_1.EmptyExpr) {
            const res = typescript_1.default.factory.createIdentifier('undefined');
            (0, diagnostics_1.addParseSpanInfo)(res, ast.sourceSpan);
            return res;
        }
        // First attempt to let any custom resolution logic provide a translation for the given node.
        const resolved = this.maybeResolve(ast);
        if (resolved !== null) {
            return resolved;
        }
        return ast.visit(this);
    }
    visitUnary(ast) {
        const expr = this.translate(ast.expr);
        const op = UNARY_OPS.get(ast.operator);
        if (op === undefined) {
            throw new Error(`Unsupported Unary.operator: ${ast.operator}`);
        }
        const node = (0, diagnostics_1.wrapForDiagnostics)(typescript_1.default.factory.createPrefixUnaryExpression(op, expr));
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitBinary(ast) {
        const lhs = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.left));
        const rhs = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.right));
        const op = BINARY_OPS.get(ast.operation);
        if (op === undefined) {
            throw new Error(`Unsupported Binary.operation: ${ast.operation}`);
        }
        const node = typescript_1.default.factory.createBinaryExpression(lhs, op, rhs);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitChain(ast) {
        const elements = ast.expressions.map((expr) => this.translate(expr));
        const node = (0, diagnostics_1.wrapForDiagnostics)(typescript_1.default.factory.createCommaListExpression(elements));
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitConditional(ast) {
        const condExpr = this.translate(ast.condition);
        const trueExpr = this.translate(ast.trueExp);
        // Wrap `falseExpr` in parens so that the trailing parse span info is not attributed to the
        // whole conditional.
        // In the following example, the last source span comment (5,6) could be seen as the
        // trailing comment for _either_ the whole conditional expression _or_ just the `falseExpr` that
        // is immediately before it:
        // `conditional /*1,2*/ ? trueExpr /*3,4*/ : falseExpr /*5,6*/`
        // This should be instead be `conditional /*1,2*/ ? trueExpr /*3,4*/ : (falseExpr /*5,6*/)`
        const falseExpr = (0, diagnostics_1.wrapForTypeChecker)(this.translate(ast.falseExp));
        const node = typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createConditionalExpression(condExpr, undefined, trueExpr, undefined, falseExpr));
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitImplicitReceiver(ast) {
        throw new Error('Method not implemented.');
    }
    visitThisReceiver(ast) {
        throw new Error('Method not implemented.');
    }
    visitInterpolation(ast) {
        // Build up a chain of binary + operations to simulate the string concatenation of the
        // interpolation's expressions. The chain is started using an actual string literal to ensure
        // the type is inferred as 'string'.
        return ast.expressions.reduce((lhs, ast) => typescript_1.default.factory.createBinaryExpression(lhs, typescript_1.default.SyntaxKind.PlusToken, (0, diagnostics_1.wrapForTypeChecker)(this.translate(ast))), typescript_1.default.factory.createStringLiteral(''));
    }
    visitKeyedRead(ast) {
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const key = this.translate(ast.key);
        const node = typescript_1.default.factory.createElementAccessExpression(receiver, key);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitKeyedWrite(ast) {
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const left = typescript_1.default.factory.createElementAccessExpression(receiver, this.translate(ast.key));
        // TODO(joost): annotate `left` with the span of the element access, which is not currently
        //  available on `ast`.
        const right = (0, diagnostics_1.wrapForTypeChecker)(this.translate(ast.value));
        const node = (0, diagnostics_1.wrapForDiagnostics)(typescript_1.default.factory.createBinaryExpression(left, typescript_1.default.SyntaxKind.EqualsToken, right));
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitLiteralArray(ast) {
        const elements = ast.expressions.map((expr) => this.translate(expr));
        const literal = typescript_1.default.factory.createArrayLiteralExpression(elements);
        // If strictLiteralTypes is disabled, array literals are cast to `any`.
        const node = this.config.strictLiteralTypes ? literal : (0, ts_util_1.tsCastToAny)(literal);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitLiteralMap(ast) {
        const properties = ast.keys.map(({ key }, idx) => {
            const value = this.translate(ast.values[idx]);
            return typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createStringLiteral(key), value);
        });
        const literal = typescript_1.default.factory.createObjectLiteralExpression(properties, true);
        // If strictLiteralTypes is disabled, object literals are cast to `any`.
        const node = this.config.strictLiteralTypes ? literal : (0, ts_util_1.tsCastToAny)(literal);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitLiteralPrimitive(ast) {
        let node;
        if (ast.value === undefined) {
            node = typescript_1.default.factory.createIdentifier('undefined');
        }
        else if (ast.value === null) {
            node = typescript_1.default.factory.createNull();
        }
        else if (typeof ast.value === 'string') {
            node = typescript_1.default.factory.createStringLiteral(ast.value);
        }
        else if (typeof ast.value === 'number') {
            node = (0, ts_util_1.tsNumericExpression)(ast.value);
        }
        else if (typeof ast.value === 'boolean') {
            node = ast.value ? typescript_1.default.factory.createTrue() : typescript_1.default.factory.createFalse();
        }
        else {
            throw Error(`Unsupported AST value of type ${typeof ast.value}`);
        }
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitNonNullAssert(ast) {
        const expr = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.expression));
        const node = typescript_1.default.factory.createNonNullExpression(expr);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitPipe(ast) {
        throw new Error('Method not implemented.');
    }
    visitPrefixNot(ast) {
        const expression = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.expression));
        const node = typescript_1.default.factory.createLogicalNot(expression);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitTypeofExpression(ast) {
        const expression = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.expression));
        const node = typescript_1.default.factory.createTypeOfExpression(expression);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitVoidExpression(ast) {
        const expression = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.expression));
        const node = typescript_1.default.factory.createVoidExpression(expression);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitPropertyRead(ast) {
        // This is a normal property read - convert the receiver to an expression and emit the correct
        // TypeScript expression to read the property.
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const name = typescript_1.default.factory.createPropertyAccessExpression(receiver, ast.name);
        (0, diagnostics_1.addParseSpanInfo)(name, ast.nameSpan);
        const node = (0, diagnostics_1.wrapForDiagnostics)(name);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitPropertyWrite(ast) {
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const left = typescript_1.default.factory.createPropertyAccessExpression(receiver, ast.name);
        (0, diagnostics_1.addParseSpanInfo)(left, ast.nameSpan);
        // TypeScript reports assignment errors on the entire lvalue expression. Annotate the lvalue of
        // the assignment with the sourceSpan, which includes receivers, rather than nameSpan for
        // consistency of the diagnostic location.
        // a.b.c = 1
        // ^^^^^^^^^ sourceSpan
        //     ^     nameSpan
        const leftWithPath = (0, diagnostics_1.wrapForDiagnostics)(left);
        (0, diagnostics_1.addParseSpanInfo)(leftWithPath, ast.sourceSpan);
        // The right needs to be wrapped in parens as well or we cannot accurately match its
        // span to just the RHS. For example, the span in `e = $event /*0,10*/` is ambiguous.
        // It could refer to either the whole binary expression or just the RHS.
        // We should instead generate `e = ($event /*0,10*/)` so we know the span 0,10 matches RHS.
        const right = (0, diagnostics_1.wrapForTypeChecker)(this.translate(ast.value));
        const node = (0, diagnostics_1.wrapForDiagnostics)(typescript_1.default.factory.createBinaryExpression(leftWithPath, typescript_1.default.SyntaxKind.EqualsToken, right));
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitSafePropertyRead(ast) {
        let node;
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        // The form of safe property reads depends on whether strictness is in use.
        if (this.config.strictSafeNavigationTypes) {
            // Basically, the return here is either the type of the complete expression with a null-safe
            // property read, or `undefined`. So a ternary is used to create an "or" type:
            // "a?.b" becomes (0 as any ? a!.b : undefined)
            // The type of this expression is (typeof a!.b) | undefined, which is exactly as desired.
            const expr = typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createNonNullExpression(receiver), ast.name);
            (0, diagnostics_1.addParseSpanInfo)(expr, ast.nameSpan);
            node = typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createConditionalExpression(exports.ANY_EXPRESSION, undefined, expr, undefined, UNDEFINED));
        }
        else if (VeSafeLhsInferenceBugDetector.veWillInferAnyFor(ast)) {
            // Emulate a View Engine bug where 'any' is inferred for the left-hand side of the safe
            // navigation operation. With this bug, the type of the left-hand side is regarded as any.
            // Therefore, the left-hand side only needs repeating in the output (to validate it), and then
            // 'any' is used for the rest of the expression. This is done using a comma operator:
            // "a?.b" becomes (a as any).b, which will of course have type 'any'.
            node = typescript_1.default.factory.createPropertyAccessExpression((0, ts_util_1.tsCastToAny)(receiver), ast.name);
        }
        else {
            // The View Engine bug isn't active, so check the entire type of the expression, but the final
            // result is still inferred as `any`.
            // "a?.b" becomes (a!.b as any)
            const expr = typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createNonNullExpression(receiver), ast.name);
            (0, diagnostics_1.addParseSpanInfo)(expr, ast.nameSpan);
            node = (0, ts_util_1.tsCastToAny)(expr);
        }
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitSafeKeyedRead(ast) {
        const receiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const key = this.translate(ast.key);
        let node;
        // The form of safe property reads depends on whether strictness is in use.
        if (this.config.strictSafeNavigationTypes) {
            // "a?.[...]" becomes (0 as any ? a![...] : undefined)
            const expr = typescript_1.default.factory.createElementAccessExpression(typescript_1.default.factory.createNonNullExpression(receiver), key);
            (0, diagnostics_1.addParseSpanInfo)(expr, ast.sourceSpan);
            node = typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createConditionalExpression(exports.ANY_EXPRESSION, undefined, expr, undefined, UNDEFINED));
        }
        else if (VeSafeLhsInferenceBugDetector.veWillInferAnyFor(ast)) {
            // "a?.[...]" becomes (a as any)[...]
            node = typescript_1.default.factory.createElementAccessExpression((0, ts_util_1.tsCastToAny)(receiver), key);
        }
        else {
            // "a?.[...]" becomes (a!.[...] as any)
            const expr = typescript_1.default.factory.createElementAccessExpression(typescript_1.default.factory.createNonNullExpression(receiver), key);
            (0, diagnostics_1.addParseSpanInfo)(expr, ast.sourceSpan);
            node = (0, ts_util_1.tsCastToAny)(expr);
        }
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitCall(ast) {
        const args = ast.args.map((expr) => this.translate(expr));
        let expr;
        const receiver = ast.receiver;
        // For calls that have a property read as receiver, we have to special-case their emit to avoid
        // inserting superfluous parenthesis as they prevent TypeScript from applying a narrowing effect
        // if the method acts as a type guard.
        if (receiver instanceof compiler_1.PropertyRead) {
            const resolved = this.maybeResolve(receiver);
            if (resolved !== null) {
                expr = resolved;
            }
            else {
                const propertyReceiver = (0, diagnostics_1.wrapForDiagnostics)(this.translate(receiver.receiver));
                expr = typescript_1.default.factory.createPropertyAccessExpression(propertyReceiver, receiver.name);
                (0, diagnostics_1.addParseSpanInfo)(expr, receiver.nameSpan);
            }
        }
        else {
            expr = this.translate(receiver);
        }
        let node;
        // Safe property/keyed reads will produce a ternary whose value is nullable.
        // We have to generate a similar ternary around the call.
        if (ast.receiver instanceof compiler_1.SafePropertyRead || ast.receiver instanceof compiler_1.SafeKeyedRead) {
            node = this.convertToSafeCall(ast, expr, args);
        }
        else {
            node = typescript_1.default.factory.createCallExpression(expr, undefined, args);
        }
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitSafeCall(ast) {
        const args = ast.args.map((expr) => this.translate(expr));
        const expr = (0, diagnostics_1.wrapForDiagnostics)(this.translate(ast.receiver));
        const node = this.convertToSafeCall(ast, expr, args);
        (0, diagnostics_1.addParseSpanInfo)(node, ast.sourceSpan);
        return node;
    }
    visitTemplateLiteral(ast) {
        const length = ast.elements.length;
        const head = ast.elements[0];
        let result;
        if (length === 1) {
            result = typescript_1.default.factory.createNoSubstitutionTemplateLiteral(head.text);
        }
        else {
            const spans = [];
            const tailIndex = length - 1;
            for (let i = 1; i < tailIndex; i++) {
                const middle = typescript_1.default.factory.createTemplateMiddle(ast.elements[i].text);
                spans.push(typescript_1.default.factory.createTemplateSpan(this.translate(ast.expressions[i - 1]), middle));
            }
            const resolvedExpression = this.translate(ast.expressions[tailIndex - 1]);
            const templateTail = typescript_1.default.factory.createTemplateTail(ast.elements[tailIndex].text);
            spans.push(typescript_1.default.factory.createTemplateSpan(resolvedExpression, templateTail));
            result = typescript_1.default.factory.createTemplateExpression(typescript_1.default.factory.createTemplateHead(head.text), spans);
        }
        return result;
    }
    visitTemplateLiteralElement(ast, context) {
        throw new Error('Method not implemented');
    }
    visitTaggedTemplateLiteral(ast) {
        return typescript_1.default.factory.createTaggedTemplateExpression(this.translate(ast.tag), undefined, this.visitTemplateLiteral(ast.template));
    }
    visitParenthesizedExpression(ast) {
        return typescript_1.default.factory.createParenthesizedExpression(this.translate(ast.expression));
    }
    convertToSafeCall(ast, expr, args) {
        if (this.config.strictSafeNavigationTypes) {
            // "a?.method(...)" becomes (0 as any ? a!.method(...) : undefined)
            const call = typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createNonNullExpression(expr), undefined, args);
            return typescript_1.default.factory.createParenthesizedExpression(typescript_1.default.factory.createConditionalExpression(exports.ANY_EXPRESSION, undefined, call, undefined, UNDEFINED));
        }
        if (VeSafeLhsInferenceBugDetector.veWillInferAnyFor(ast)) {
            // "a?.method(...)" becomes (a as any).method(...)
            return typescript_1.default.factory.createCallExpression((0, ts_util_1.tsCastToAny)(expr), undefined, args);
        }
        // "a?.method(...)" becomes (a!.method(...) as any)
        return (0, ts_util_1.tsCastToAny)(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createNonNullExpression(expr), undefined, args));
    }
}
/**
 * Checks whether View Engine will infer a type of 'any' for the left-hand side of a safe navigation
 * operation.
 *
 * In View Engine's template type-checker, certain receivers of safe navigation operations will
 * cause a temporary variable to be allocated as part of the checking expression, to save the value
 * of the receiver and use it more than once in the expression. This temporary variable has type
 * 'any'. In practice, this means certain receivers cause View Engine to not check the full
 * expression, and other receivers will receive more complete checking.
 *
 * For compatibility, this logic is adapted from View Engine's expression_converter.ts so that the
 * Ivy checker can emulate this bug when needed.
 */
class VeSafeLhsInferenceBugDetector {
    static veWillInferAnyFor(ast) {
        const visitor = VeSafeLhsInferenceBugDetector.SINGLETON;
        return ast instanceof compiler_1.Call ? ast.visit(visitor) : ast.receiver.visit(visitor);
    }
    visitUnary(ast) {
        return ast.expr.visit(this);
    }
    visitBinary(ast) {
        return ast.left.visit(this) || ast.right.visit(this);
    }
    visitChain(ast) {
        return false;
    }
    visitConditional(ast) {
        return ast.condition.visit(this) || ast.trueExp.visit(this) || ast.falseExp.visit(this);
    }
    visitCall(ast) {
        return true;
    }
    visitSafeCall(ast) {
        return false;
    }
    visitImplicitReceiver(ast) {
        return false;
    }
    visitThisReceiver(ast) {
        return false;
    }
    visitInterpolation(ast) {
        return ast.expressions.some((exp) => exp.visit(this));
    }
    visitKeyedRead(ast) {
        return false;
    }
    visitKeyedWrite(ast) {
        return false;
    }
    visitLiteralArray(ast) {
        return true;
    }
    visitLiteralMap(ast) {
        return true;
    }
    visitLiteralPrimitive(ast) {
        return false;
    }
    visitPipe(ast) {
        return true;
    }
    visitPrefixNot(ast) {
        return ast.expression.visit(this);
    }
    visitTypeofExpression(ast) {
        return ast.expression.visit(this);
    }
    visitVoidExpression(ast) {
        return ast.expression.visit(this);
    }
    visitNonNullAssert(ast) {
        return ast.expression.visit(this);
    }
    visitPropertyRead(ast) {
        return false;
    }
    visitPropertyWrite(ast) {
        return false;
    }
    visitSafePropertyRead(ast) {
        return false;
    }
    visitSafeKeyedRead(ast) {
        return false;
    }
    visitTemplateLiteral(ast, context) {
        return false;
    }
    visitTemplateLiteralElement(ast, context) {
        return false;
    }
    visitTaggedTemplateLiteral(ast, context) {
        return false;
    }
    visitParenthesizedExpression(ast, context) {
        return ast.expression.visit(this);
    }
}
VeSafeLhsInferenceBugDetector.SINGLETON = new VeSafeLhsInferenceBugDetector();
