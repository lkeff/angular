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
exports.getSignatureHelp = getSignatureHelp;
const compiler_1 = require("@angular/compiler");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const template_target_1 = require("./template_target");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
/**
 * Queries the TypeScript Language Service to get signature help for a template position.
 */
function getSignatureHelp(compiler, tsLS, fileName, position, options) {
    var _a, _b;
    const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, compiler);
    if (typeCheckInfo === undefined) {
        return undefined;
    }
    const targetInfo = (0, template_target_1.getTargetAtPosition)(typeCheckInfo.nodes, position);
    if (targetInfo === null) {
        return undefined;
    }
    if (targetInfo.context.kind !== template_target_1.TargetNodeKind.RawExpression &&
        targetInfo.context.kind !== template_target_1.TargetNodeKind.CallExpressionInArgContext) {
        // Signature completions are only available in expressions.
        return undefined;
    }
    const symbol = compiler
        .getTemplateTypeChecker()
        .getSymbolOfNode(targetInfo.context.node, typeCheckInfo.declaration);
    if (symbol === null || symbol.kind !== api_1.SymbolKind.Expression) {
        return undefined;
    }
    // Determine a shim position to use in the request to the TypeScript Language Service.
    // Additionally, extract the `Call` node for which signature help is being queried, as this
    // is needed to construct the correct span for the results later.
    let shimPosition;
    let expr;
    switch (targetInfo.context.kind) {
        case template_target_1.TargetNodeKind.RawExpression:
            // For normal expressions, just use the primary TCB position of the expression.
            shimPosition = symbol.tcbLocation.positionInFile;
            // Walk up the parents of this expression and try to find a
            // `Call` for which signature information is being fetched.
            let callExpr = null;
            const parents = targetInfo.context.parents;
            for (let i = parents.length - 1; i >= 0; i--) {
                const parent = parents[i];
                if (parent instanceof compiler_1.Call || parent instanceof compiler_1.SafeCall) {
                    callExpr = parent;
                    break;
                }
            }
            // If no Call node could be found, then this query cannot be safely
            // answered as a correct span for the results will not be obtainable.
            if (callExpr === null) {
                return undefined;
            }
            expr = callExpr;
            break;
        case template_target_1.TargetNodeKind.CallExpressionInArgContext:
            // The `Symbol` points to a `Call` expression in the TCB (where it will be represented as a
            // `ts.CallExpression`) *and* the template position was within the argument list of the method
            // call. This happens when there was no narrower expression inside the argument list that
            // matched the template position, such as when the call has no arguments: `foo(|)`.
            //
            // The `Symbol`'s shim position is to the start of the call expression (`|foo()`) and
            // therefore wouldn't return accurate signature help from the TS language service. For that, a
            // position within the argument list for the `ts.CallExpression` in the TCB will need to be
            // determined. This is done by finding that call expression and extracting a viable position
            // from it directly.
            //
            // First, use `findTightestNode` to locate the `ts.Node` at `symbol`'s location.
            const shimSf = (0, file_system_1.getSourceFileOrError)(compiler.getCurrentProgram(), symbol.tcbLocation.tcbPath);
            let shimNode = (_a = (0, ts_utils_1.findTightestNode)(shimSf, symbol.tcbLocation.positionInFile)) !== null && _a !== void 0 ? _a : null;
            // This node should be somewhere inside a `ts.CallExpression`. Walk up the AST to find it.
            while (shimNode !== null) {
                if (typescript_1.default.isCallExpression(shimNode)) {
                    break;
                }
                shimNode = (_b = shimNode.parent) !== null && _b !== void 0 ? _b : null;
            }
            // If one couldn't be found, something is wrong, so bail rather than report incorrect results.
            if (shimNode === null || !typescript_1.default.isCallExpression(shimNode)) {
                return undefined;
            }
            // Position the cursor in the TCB at the start of the argument list for the
            // `ts.CallExpression`. This will allow us to get the correct signature help, even though the
            // template itself doesn't have an expression inside the argument list.
            shimPosition = shimNode.arguments.pos;
            // In this case, getting the right call AST node is easy.
            expr = targetInfo.context.node;
            break;
    }
    const res = tsLS.getSignatureHelpItems(symbol.tcbLocation.tcbPath, shimPosition, options);
    if (res === undefined) {
        return undefined;
    }
    // The TS language service results are almost returnable as-is. However, they contain an
    // `applicableSpan` which marks the entire argument list, and that span is in the context of the
    // TCB's `ts.CallExpression`. It needs to be replaced with the span for the `Call` argument list.
    return Object.assign(Object.assign({}, res), { applicableSpan: {
            start: expr.argumentSpan.start,
            length: expr.argumentSpan.end - expr.argumentSpan.start,
        } });
}
