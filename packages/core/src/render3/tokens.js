"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_CHANGE = void 0;
/** A special value which designates that a value has not changed. */
exports.NO_CHANGE = typeof ngDevMode === 'undefined' || ngDevMode ? { __brand__: 'NO_CHANGE' } : {};
