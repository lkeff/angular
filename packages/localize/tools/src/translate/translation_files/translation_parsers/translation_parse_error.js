"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationParseError = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
/**
 * This error is thrown when there is a problem parsing a translation file.
 */
class TranslationParseError extends Error {
    constructor(span, msg, level = compiler_1.ParseErrorLevel.ERROR) {
        super(contextualMessage(span, msg, level));
        this.span = span;
        this.msg = msg;
        this.level = level;
    }
}
exports.TranslationParseError = TranslationParseError;
function contextualMessage(span, msg, level) {
    const ctx = span.start.getContext(100, 2);
    msg += `\nAt ${span.start}${span.details ? `, ${span.details}` : ''}:\n`;
    if (ctx) {
        msg += `...${ctx.before}[${compiler_1.ParseErrorLevel[level]} ->]${ctx.after}...\n`;
    }
    return msg;
}
