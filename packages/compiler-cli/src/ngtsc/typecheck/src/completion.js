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
exports.CompletionEngine = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const api_1 = require("../api");
const comments_1 = require("./comments");
/**
 * Powers autocompletion for a specific component.
 *
 * Internally caches autocompletion results, and must be discarded if the component template or
 * surrounding TS program have changed.
 */
class CompletionEngine {
    constructor(tcb, data, tcbPath, tcbIsShim) {
        this.tcb = tcb;
        this.data = data;
        this.tcbPath = tcbPath;
        this.tcbIsShim = tcbIsShim;
        /**
         * Cache of completions for various levels of the template, including the root template (`null`).
         * Memoizes `getTemplateContextCompletions`.
         */
        this.templateContextCache = new Map();
        this.expressionCompletionCache = new Map();
        // Find the component completion expression within the TCB. This looks like: `ctx. /* ... */;`
        const globalRead = (0, comments_1.findFirstMatchingNode)(this.tcb, {
            filter: typescript_1.default.isPropertyAccessExpression,
            withExpressionIdentifier: comments_1.ExpressionIdentifier.COMPONENT_COMPLETION,
        });
        if (globalRead !== null) {
            this.componentContext = {
                tcbPath: this.tcbPath,
                isShimFile: this.tcbIsShim,
                // `globalRead.name` is an empty `ts.Identifier`, so its start position immediately follows
                // the `.` in `ctx.`. TS autocompletion APIs can then be used to access completion results
                // for the component context.
                positionInFile: globalRead.name.getStart(),
            };
        }
        else {
            this.componentContext = null;
        }
    }
    /**
     * Get global completions within the given template context and AST node.
     *
     * @param context the given template context - either a `TmplAstTemplate` embedded view, or `null`
     *     for the root
     * template context.
     * @param node the given AST node
     */
    getGlobalCompletions(context, node) {
        if (this.componentContext === null) {
            return null;
        }
        const templateContext = this.getTemplateContextCompletions(context);
        if (templateContext === null) {
            return null;
        }
        let nodeContext = null;
        if (node instanceof compiler_1.EmptyExpr) {
            const nodeLocation = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: typescript_1.default.isIdentifier,
                withSpan: node.sourceSpan,
            });
            if (nodeLocation !== null) {
                nodeContext = {
                    tcbPath: this.tcbPath,
                    isShimFile: this.tcbIsShim,
                    positionInFile: nodeLocation.getStart(),
                };
            }
        }
        if (node instanceof compiler_1.PropertyRead && node.receiver instanceof compiler_1.ImplicitReceiver) {
            const nodeLocation = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: typescript_1.default.isPropertyAccessExpression,
                withSpan: node.sourceSpan,
            });
            if (nodeLocation) {
                nodeContext = {
                    tcbPath: this.tcbPath,
                    isShimFile: this.tcbIsShim,
                    positionInFile: nodeLocation.getStart(),
                };
            }
        }
        return {
            componentContext: this.componentContext,
            templateContext,
            nodeContext,
        };
    }
    getExpressionCompletionLocation(expr) {
        if (this.expressionCompletionCache.has(expr)) {
            return this.expressionCompletionCache.get(expr);
        }
        // Completion works inside property reads and method calls.
        let tsExpr = null;
        if (expr instanceof compiler_1.PropertyRead || expr instanceof compiler_1.PropertyWrite) {
            // Non-safe navigation operations are trivial: `foo.bar` or `foo.bar()`
            tsExpr = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: typescript_1.default.isPropertyAccessExpression,
                withSpan: expr.nameSpan,
            });
        }
        else if (expr instanceof compiler_1.SafePropertyRead) {
            // Safe navigation operations are a little more complex, and involve a ternary. Completion
            // happens in the "true" case of the ternary.
            const ternaryExpr = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: typescript_1.default.isParenthesizedExpression,
                withSpan: expr.sourceSpan,
            });
            if (ternaryExpr === null || !typescript_1.default.isConditionalExpression(ternaryExpr.expression)) {
                return null;
            }
            const whenTrue = ternaryExpr.expression.whenTrue;
            if (typescript_1.default.isPropertyAccessExpression(whenTrue)) {
                tsExpr = whenTrue;
            }
            else if (typescript_1.default.isCallExpression(whenTrue) &&
                typescript_1.default.isPropertyAccessExpression(whenTrue.expression)) {
                tsExpr = whenTrue.expression;
            }
        }
        if (tsExpr === null) {
            return null;
        }
        const res = {
            tcbPath: this.tcbPath,
            isShimFile: this.tcbIsShim,
            positionInFile: tsExpr.name.getEnd(),
        };
        this.expressionCompletionCache.set(expr, res);
        return res;
    }
    getLiteralCompletionLocation(expr) {
        if (this.expressionCompletionCache.has(expr)) {
            return this.expressionCompletionCache.get(expr);
        }
        let tsExpr = null;
        if (expr instanceof compiler_1.TmplAstTextAttribute) {
            const strNode = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: typescript_1.default.isParenthesizedExpression,
                withSpan: expr.sourceSpan,
            });
            if (strNode !== null && typescript_1.default.isStringLiteral(strNode.expression)) {
                tsExpr = strNode.expression;
            }
        }
        else {
            tsExpr = (0, comments_1.findFirstMatchingNode)(this.tcb, {
                filter: (n) => typescript_1.default.isStringLiteral(n) || typescript_1.default.isNumericLiteral(n),
                withSpan: expr.sourceSpan,
            });
        }
        if (tsExpr === null) {
            return null;
        }
        let positionInShimFile = tsExpr.getEnd();
        if (typescript_1.default.isStringLiteral(tsExpr)) {
            // In the shimFile, if `tsExpr` is a string, the position should be in the quotes.
            positionInShimFile -= 1;
        }
        const res = {
            tcbPath: this.tcbPath,
            isShimFile: this.tcbIsShim,
            positionInFile: positionInShimFile,
        };
        this.expressionCompletionCache.set(expr, res);
        return res;
    }
    /**
     * Get global completions within the given template context - either a `TmplAstTemplate` embedded
     * view, or `null` for the root context.
     */
    getTemplateContextCompletions(context) {
        if (this.templateContextCache.has(context)) {
            return this.templateContextCache.get(context);
        }
        const templateContext = new Map();
        // The bound template already has details about the references and variables in scope in the
        // `context` template - they just need to be converted to `Completion`s.
        for (const node of this.data.boundTarget.getEntitiesInScope(context)) {
            if (node instanceof compiler_1.TmplAstReference) {
                templateContext.set(node.name, {
                    kind: api_1.CompletionKind.Reference,
                    node,
                });
            }
            else if (node instanceof compiler_1.TmplAstLetDeclaration) {
                templateContext.set(node.name, {
                    kind: api_1.CompletionKind.LetDeclaration,
                    node,
                });
            }
            else {
                templateContext.set(node.name, {
                    kind: api_1.CompletionKind.Variable,
                    node,
                });
            }
        }
        this.templateContextCache.set(context, templateContext);
        return templateContext;
    }
}
exports.CompletionEngine = CompletionEngine;
