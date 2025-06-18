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
exports.isInternal = isInternal;
const typescript_1 = __importDefault(require("typescript"));
const jsdoc_extractor_1 = require("./jsdoc_extractor");
/**
 * Check if the member has a JSDoc @internal or a @internal is a normal comment
 */
function isInternal(member) {
    return ((0, jsdoc_extractor_1.extractJsDocTags)(member).some((tag) => tag.name === 'internal') ||
        hasLeadingInternalComment(member));
}
/*
 * Check if the member has a comment block with @internal
 */
function hasLeadingInternalComment(member) {
    var _a;
    const memberText = member.getSourceFile().text;
    return ((_a = typescript_1.default.reduceEachLeadingCommentRange(memberText, member.getFullStart(), (pos, end, kind, hasTrailingNewLine, containsInternal) => {
        return containsInternal || memberText.slice(pos, end).includes('@internal');
    }, 
    /* state */ false, 
    /* initial */ false)) !== null && _a !== void 0 ? _a : false);
}
