"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nCreateOpCode = exports.ICU_MARKER = exports.ELEMENT_MARKER = void 0;
/**
 * Marks that the next string is an element name.
 *
 * See `I18nMutateOpCodes` documentation.
 */
exports.ELEMENT_MARKER = {
    marker: 'element',
};
/**
 * Marks that the next string is comment text need for ICU.
 *
 * See `I18nMutateOpCodes` documentation.
 */
exports.ICU_MARKER = {
    marker: 'ICU',
};
/**
 * See `I18nCreateOpCodes`
 */
var I18nCreateOpCode;
(function (I18nCreateOpCode) {
    /**
     * Number of bits to shift index so that it can be combined with the `APPEND_EAGERLY` and
     * `COMMENT`.
     */
    I18nCreateOpCode[I18nCreateOpCode["SHIFT"] = 2] = "SHIFT";
    /**
     * Should the node be appended to parent immediately after creation.
     */
    I18nCreateOpCode[I18nCreateOpCode["APPEND_EAGERLY"] = 1] = "APPEND_EAGERLY";
    /**
     * If set the node should be comment (rather than a text) node.
     */
    I18nCreateOpCode[I18nCreateOpCode["COMMENT"] = 2] = "COMMENT";
})(I18nCreateOpCode || (exports.I18nCreateOpCode = I18nCreateOpCode = {}));
