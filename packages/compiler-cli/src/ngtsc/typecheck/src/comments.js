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
exports.ExpressionIdentifier = exports.CommentTriviaType = void 0;
exports.readSpanComment = readSpanComment;
exports.addExpressionIdentifier = addExpressionIdentifier;
exports.markIgnoreDiagnostics = markIgnoreDiagnostics;
exports.hasIgnoreForDiagnosticsMarker = hasIgnoreForDiagnosticsMarker;
exports.findFirstMatchingNode = findFirstMatchingNode;
exports.findAllMatchingNodes = findAllMatchingNodes;
exports.hasExpressionIdentifier = hasExpressionIdentifier;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const parseSpanComment = /^(\d+),(\d+)$/;
/**
 * Reads the trailing comments and finds the first match which is a span comment (i.e. 4,10) on a
 * node and returns it as an `AbsoluteSourceSpan`.
 *
 * Will return `null` if no trailing comments on the node match the expected form of a source span.
 */
function readSpanComment(node, sourceFile = node.getSourceFile()) {
    return (typescript_1.default.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
        if (kind !== typescript_1.default.SyntaxKind.MultiLineCommentTrivia) {
            return null;
        }
        const commentText = sourceFile.text.substring(pos + 2, end - 2);
        const match = commentText.match(parseSpanComment);
        if (match === null) {
            return null;
        }
        return new compiler_1.AbsoluteSourceSpan(+match[1], +match[2]);
    }) || null);
}
/** Used to identify what type the comment is. */
var CommentTriviaType;
(function (CommentTriviaType) {
    CommentTriviaType["DIAGNOSTIC"] = "D";
    CommentTriviaType["EXPRESSION_TYPE_IDENTIFIER"] = "T";
})(CommentTriviaType || (exports.CommentTriviaType = CommentTriviaType = {}));
/** Identifies what the TCB expression is for (for example, a directive declaration). */
var ExpressionIdentifier;
(function (ExpressionIdentifier) {
    ExpressionIdentifier["DIRECTIVE"] = "DIR";
    ExpressionIdentifier["COMPONENT_COMPLETION"] = "COMPCOMP";
    ExpressionIdentifier["EVENT_PARAMETER"] = "EP";
    ExpressionIdentifier["VARIABLE_AS_EXPRESSION"] = "VAE";
})(ExpressionIdentifier || (exports.ExpressionIdentifier = ExpressionIdentifier = {}));
/** Tags the node with the given expression identifier. */
function addExpressionIdentifier(node, identifier) {
    typescript_1.default.addSyntheticTrailingComment(node, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, `${CommentTriviaType.EXPRESSION_TYPE_IDENTIFIER}:${identifier}`, 
    /* hasTrailingNewLine */ false);
}
const IGNORE_FOR_DIAGNOSTICS_MARKER = `${CommentTriviaType.DIAGNOSTIC}:ignore`;
/**
 * Tag the `ts.Node` with an indication that any errors arising from the evaluation of the node
 * should be ignored.
 */
function markIgnoreDiagnostics(node) {
    typescript_1.default.addSyntheticTrailingComment(node, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, IGNORE_FOR_DIAGNOSTICS_MARKER, 
    /* hasTrailingNewLine */ false);
}
/** Returns true if the node has a marker that indicates diagnostics errors should be ignored.  */
function hasIgnoreForDiagnosticsMarker(node, sourceFile) {
    return (typescript_1.default.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
        if (kind !== typescript_1.default.SyntaxKind.MultiLineCommentTrivia) {
            return null;
        }
        const commentText = sourceFile.text.substring(pos + 2, end - 2);
        return commentText === IGNORE_FOR_DIAGNOSTICS_MARKER;
    }) === true);
}
function makeRecursiveVisitor(visitor) {
    function recursiveVisitor(node) {
        const res = visitor(node);
        return res !== null ? res : node.forEachChild(recursiveVisitor);
    }
    return recursiveVisitor;
}
function getSpanFromOptions(opts) {
    let withSpan = null;
    if (opts.withSpan !== undefined) {
        if (opts.withSpan instanceof compiler_1.AbsoluteSourceSpan) {
            withSpan = opts.withSpan;
        }
        else {
            withSpan = { start: opts.withSpan.start.offset, end: opts.withSpan.end.offset };
        }
    }
    return withSpan;
}
/**
 * Given a `ts.Node` with finds the first node whose matching the criteria specified
 * by the `FindOptions`.
 *
 * Returns `null` when no `ts.Node` matches the given conditions.
 */
function findFirstMatchingNode(tcb, opts) {
    var _a;
    const withSpan = getSpanFromOptions(opts);
    const withExpressionIdentifier = opts.withExpressionIdentifier;
    const sf = tcb.getSourceFile();
    const visitor = makeRecursiveVisitor((node) => {
        if (!opts.filter(node)) {
            return null;
        }
        if (withSpan !== null) {
            const comment = readSpanComment(node, sf);
            if (comment === null || withSpan.start !== comment.start || withSpan.end !== comment.end) {
                return null;
            }
        }
        if (withExpressionIdentifier !== undefined &&
            !hasExpressionIdentifier(sf, node, withExpressionIdentifier)) {
            return null;
        }
        return node;
    });
    return (_a = tcb.forEachChild(visitor)) !== null && _a !== void 0 ? _a : null;
}
/**
 * Given a `ts.Node` with source span comments, finds the first node whose source span comment
 * matches the given `sourceSpan`. Additionally, the `filter` function allows matching only
 * `ts.Nodes` of a given type, which provides the ability to select only matches of a given type
 * when there may be more than one.
 *
 * Returns `null` when no `ts.Node` matches the given conditions.
 */
function findAllMatchingNodes(tcb, opts) {
    const withSpan = getSpanFromOptions(opts);
    const withExpressionIdentifier = opts.withExpressionIdentifier;
    const results = [];
    const stack = [tcb];
    const sf = tcb.getSourceFile();
    while (stack.length > 0) {
        const node = stack.pop();
        if (!opts.filter(node)) {
            stack.push(...node.getChildren());
            continue;
        }
        if (withSpan !== null) {
            const comment = readSpanComment(node, sf);
            if (comment === null || withSpan.start !== comment.start || withSpan.end !== comment.end) {
                stack.push(...node.getChildren());
                continue;
            }
        }
        if (withExpressionIdentifier !== undefined &&
            !hasExpressionIdentifier(sf, node, withExpressionIdentifier)) {
            continue;
        }
        results.push(node);
    }
    return results;
}
function hasExpressionIdentifier(sourceFile, node, identifier) {
    return (typescript_1.default.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
        if (kind !== typescript_1.default.SyntaxKind.MultiLineCommentTrivia) {
            return false;
        }
        const commentText = sourceFile.text.substring(pos + 2, end - 2);
        return commentText === `${CommentTriviaType.EXPRESSION_TYPE_IDENTIFIER}:${identifier}`;
    }) || false);
}
