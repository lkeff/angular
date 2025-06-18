"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTAINER_HEADER_OFFSET = exports.MOVED_VIEWS = exports.VIEW_REFS = exports.NATIVE = exports.DEHYDRATED_VIEWS = exports.TYPE = void 0;
const view_1 = require("./view");
/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
exports.TYPE = 1;
/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
// FLAGS, PARENT, NEXT, and T_HOST are indices 2, 3, 4, and 5
// As we already have these constants in LView, we don't need to re-create them.
exports.DEHYDRATED_VIEWS = 6;
exports.NATIVE = 7;
exports.VIEW_REFS = 8;
exports.MOVED_VIEWS = 9;
/**
 * Size of LContainer's header. Represents the index after which all views in the
 * container will be inserted. We need to keep a record of current views so we know
 * which views are already in the DOM (and don't need to be re-added) and so we can
 * remove views from the DOM when they are no longer required.
 */
exports.CONTAINER_HEADER_OFFSET = 10;
