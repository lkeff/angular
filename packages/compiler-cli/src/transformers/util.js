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
exports.error = error;
exports.createMessageDiagnostic = createMessageDiagnostic;
exports.stripComment = stripComment;
const typescript_1 = __importDefault(require("typescript"));
const api_1 = require("./api");
function error(msg) {
    throw new Error(`Internal error: ${msg}`);
}
function createMessageDiagnostic(messageText) {
    return {
        file: undefined,
        start: undefined,
        length: undefined,
        category: typescript_1.default.DiagnosticCategory.Message,
        messageText,
        code: api_1.DEFAULT_ERROR_CODE,
        source: api_1.SOURCE,
    };
}
/**
 * Strip multiline comment start and end markers from the `commentText` string.
 *
 * This will also strip the JSDOC comment start marker (`/**`).
 */
function stripComment(commentText) {
    return commentText
        .replace(/^\/\*\*?/, '')
        .replace(/\*\/$/, '')
        .trim();
}
