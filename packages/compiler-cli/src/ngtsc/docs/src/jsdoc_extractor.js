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
exports.extractJsDocTags = extractJsDocTags;
exports.extractJsDocDescription = extractJsDocDescription;
exports.extractRawJsDoc = extractRawJsDoc;
const typescript_1 = __importDefault(require("typescript"));
/**
 * RegExp to match the `@` character follow by any Angular decorator, used to escape Angular
 * decorators in JsDoc blocks so that they're not parsed as JsDoc tags.
 */
const decoratorExpression = /@(?=(Injectable|Component|Directive|Pipe|NgModule|Input|Output|HostBinding|HostListener|Inject|Optional|Self|Host|SkipSelf|ViewChild|ViewChildren|ContentChild|ContentChildren))/g;
/** Gets the set of JsDoc tags applied to a node. */
function extractJsDocTags(node) {
    const escapedNode = getEscapedNode(node);
    return typescript_1.default.getJSDocTags(escapedNode).map((t) => {
        var _a;
        return {
            name: t.tagName.getText(),
            comment: unescapeAngularDecorators((_a = typescript_1.default.getTextOfJSDocComment(t.comment)) !== null && _a !== void 0 ? _a : ''),
        };
    });
}
/**
 * Gets the JsDoc description for a node. If the node does not have
 * a description, returns the empty string.
 */
function extractJsDocDescription(node) {
    var _a, _b;
    const escapedNode = getEscapedNode(node);
    // If the node is a top-level statement (const, class, function, etc.), we will get
    // a `ts.JSDoc` here. If the node is a `ts.ParameterDeclaration`, we will get
    // a `ts.JSDocParameterTag`.
    const commentOrTag = typescript_1.default.getJSDocCommentsAndTags(escapedNode).find((d) => {
        return typescript_1.default.isJSDoc(d) || typescript_1.default.isJSDocParameterTag(d);
    });
    const comment = (_a = commentOrTag === null || commentOrTag === void 0 ? void 0 : commentOrTag.comment) !== null && _a !== void 0 ? _a : '';
    const description = typeof comment === 'string' ? comment : ((_b = typescript_1.default.getTextOfJSDocComment(comment)) !== null && _b !== void 0 ? _b : '');
    return unescapeAngularDecorators(description);
}
/**
 * Gets the raw JsDoc applied to a node.
 * If the node does not have a JsDoc block, returns the empty string.
 */
function extractRawJsDoc(node) {
    var _a, _b;
    // Assume that any node has at most one JsDoc block.
    const comment = (_b = (_a = typescript_1.default.getJSDocCommentsAndTags(node).find(typescript_1.default.isJSDoc)) === null || _a === void 0 ? void 0 : _a.getFullText()) !== null && _b !== void 0 ? _b : '';
    return unescapeAngularDecorators(comment);
}
/**
 * Gets an "escaped" version of the node by copying its raw JsDoc into a new source file
 * on top of a dummy class declaration. For the purposes of JsDoc extraction, we don't actually
 * care about the node itself, only its JsDoc block.
 */
function getEscapedNode(node) {
    // TODO(jelbourn): It's unclear whether we need to escape @param JsDoc, since they're unlikely
    //    to have an Angular decorator on the beginning of a line. If we do need to escape them,
    //    it will require some more complicated copying below.
    if (typescript_1.default.isParameter(node)) {
        return node;
    }
    const rawComment = extractRawJsDoc(node);
    const escaped = escapeAngularDecorators(rawComment);
    const file = typescript_1.default.createSourceFile('x.ts', `${escaped}class X {}`, typescript_1.default.ScriptTarget.ES2020, true);
    return file.statements.find((s) => typescript_1.default.isClassDeclaration(s));
}
/** Escape the `@` character for Angular decorators. */
function escapeAngularDecorators(comment) {
    return comment.replace(decoratorExpression, '_NG_AT_');
}
/** Unescapes the `@` character for Angular decorators. */
function unescapeAngularDecorators(comment) {
    return comment.replace(/_NG_AT_/g, '@');
}
