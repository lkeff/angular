"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapForDiagnostics = wrapForDiagnostics;
exports.wrapForTypeChecker = wrapForTypeChecker;
exports.addParseSpanInfo = addParseSpanInfo;
exports.addTypeCheckId = addTypeCheckId;
exports.shouldReportDiagnostic = shouldReportDiagnostic;
exports.translateDiagnostic = translateDiagnostic;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../diagnostics");
const tcb_util_1 = require("./tcb_util");
/**
 * Wraps the node in parenthesis such that inserted span comments become attached to the proper
 * node. This is an alias for `ts.factory.createParenthesizedExpression` with the benefit that it
 * signifies that the inserted parenthesis are for diagnostic purposes, not for correctness of the
 * rendered TCB code.
 *
 * Note that it is important that nodes and its attached comment are not wrapped into parenthesis
 * by default, as it prevents correct translation of e.g. diagnostics produced for incorrect method
 * arguments. Such diagnostics would then be produced for the parenthesised node whereas the
 * positional comment would be located within that node, resulting in a mismatch.
 */
function wrapForDiagnostics(expr) {
    return typescript_1.default.factory.createParenthesizedExpression(expr);
}
/**
 * Wraps the node in parenthesis such that inserted span comments become attached to the proper
 * node. This is an alias for `ts.factory.createParenthesizedExpression` with the benefit that it
 * signifies that the inserted parenthesis are for use by the type checker, not for correctness of
 * the rendered TCB code.
 */
function wrapForTypeChecker(expr) {
    return typescript_1.default.factory.createParenthesizedExpression(expr);
}
/**
 * Adds a synthetic comment to the expression that represents the parse span of the provided node.
 * This comment can later be retrieved as trivia of a node to recover original source locations.
 */
function addParseSpanInfo(node, span) {
    let commentText;
    if (span instanceof compiler_1.AbsoluteSourceSpan) {
        commentText = `${span.start},${span.end}`;
    }
    else {
        commentText = `${span.start.offset},${span.end.offset}`;
    }
    typescript_1.default.addSyntheticTrailingComment(node, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, commentText, 
    /* hasTrailingNewLine */ false);
}
/**
 * Adds a synthetic comment to the function declaration that contains the type checking ID
 * of the class declaration.
 */
function addTypeCheckId(tcb, id) {
    typescript_1.default.addSyntheticLeadingComment(tcb, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, id, true);
}
/**
 * Determines if the diagnostic should be reported. Some diagnostics are produced because of the
 * way TCBs are generated; those diagnostics should not be reported as type check errors of the
 * template.
 */
function shouldReportDiagnostic(diagnostic) {
    const { code } = diagnostic;
    if (code === 6133 /* $var is declared but its value is never read. */) {
        return false;
    }
    else if (code === 6199 /* All variables are unused. */) {
        return false;
    }
    else if (code === 2695 /* Left side of comma operator is unused and has no side effects. */) {
        return false;
    }
    else if (code === 7006 /* Parameter '$event' implicitly has an 'any' type. */) {
        return false;
    }
    return true;
}
/**
 * Attempts to translate a TypeScript diagnostic produced during template type-checking to their
 * location of origin, based on the comments that are emitted in the TCB code.
 *
 * If the diagnostic could not be translated, `null` is returned to indicate that the diagnostic
 * should not be reported at all. This prevents diagnostics from non-TCB code in a user's source
 * file from being reported as type-check errors.
 */
function translateDiagnostic(diagnostic, resolver) {
    if (diagnostic.file === undefined || diagnostic.start === undefined) {
        return null;
    }
    const fullMapping = (0, tcb_util_1.getSourceMapping)(diagnostic.file, diagnostic.start, resolver, 
    /*isDiagnosticsRequest*/ true);
    if (fullMapping === null) {
        return null;
    }
    const { sourceLocation, sourceMapping: templateSourceMapping, span } = fullMapping;
    return (0, diagnostics_1.makeTemplateDiagnostic)(sourceLocation.id, templateSourceMapping, span, diagnostic.category, diagnostic.code, diagnostic.messageText);
}
