"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nError = void 0;
const parse_util_1 = require("../parse_util");
/**
 * An i18n error.
 */
class I18nError extends parse_util_1.ParseError {
    constructor(span, msg) {
        super(span, msg);
    }
}
exports.I18nError = I18nError;
