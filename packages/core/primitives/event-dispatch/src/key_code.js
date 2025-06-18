"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCode = exports.SPACE = exports.ENTER = exports.MAC_ENTER = void 0;
/**
 * If on a Macintosh with an extended keyboard, the Enter key located in the
 * numeric pad has a different ASCII code.
 */
exports.MAC_ENTER = 3;
/** The Enter key. */
exports.ENTER = 13;
/** The Space key. */
exports.SPACE = 32;
/** Special keycodes used by jsaction for the generic click action. */
exports.KeyCode = { MAC_ENTER: exports.MAC_ENTER, ENTER: exports.ENTER, SPACE: exports.SPACE };
