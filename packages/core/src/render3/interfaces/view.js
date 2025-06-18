"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_OFFSET = exports.AFTER_RENDER_SEQUENCES_TO_ADD = exports.REACTIVE_TEMPLATE_CONSUMER = exports.EFFECTS = exports.EFFECTS_TO_SCHEDULE = exports.ON_DESTROY_HOOKS = exports.EMBEDDED_VIEW_INJECTOR = exports.ID = exports.QUERIES = exports.PREORDER_HOOK_FLAGS = exports.DECLARATION_LCONTAINER = exports.DECLARATION_COMPONENT_VIEW = exports.DECLARATION_VIEW = exports.CHILD_TAIL = exports.CHILD_HEAD = exports.RENDERER = exports.ENVIRONMENT = exports.INJECTOR = exports.CONTEXT = exports.CLEANUP = exports.HYDRATION = exports.T_HOST = exports.NEXT = exports.PARENT = exports.FLAGS = exports.TVIEW = exports.HOST = void 0;
// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
exports.HOST = 0;
exports.TVIEW = 1;
// Shared with LContainer
exports.FLAGS = 2;
exports.PARENT = 3;
exports.NEXT = 4;
exports.T_HOST = 5;
// End shared with LContainer
exports.HYDRATION = 6;
exports.CLEANUP = 7;
exports.CONTEXT = 8;
exports.INJECTOR = 9;
exports.ENVIRONMENT = 10;
exports.RENDERER = 11;
exports.CHILD_HEAD = 12;
exports.CHILD_TAIL = 13;
// FIXME(misko): Investigate if the three declarations aren't all same thing.
exports.DECLARATION_VIEW = 14;
exports.DECLARATION_COMPONENT_VIEW = 15;
exports.DECLARATION_LCONTAINER = 16;
exports.PREORDER_HOOK_FLAGS = 17;
exports.QUERIES = 18;
exports.ID = 19;
exports.EMBEDDED_VIEW_INJECTOR = 20;
exports.ON_DESTROY_HOOKS = 21;
exports.EFFECTS_TO_SCHEDULE = 22;
exports.EFFECTS = 23;
exports.REACTIVE_TEMPLATE_CONSUMER = 24;
exports.AFTER_RENDER_SEQUENCES_TO_ADD = 25;
/**
 * Size of LView's header. Necessary to adjust for it when setting slots.
 *
 * IMPORTANT: `HEADER_OFFSET` should only be referred to the in the `ɵɵ*` instructions to translate
 * instruction index into `LView` index. All other indexes should be in the `LView` index space and
 * there should be no need to refer to `HEADER_OFFSET` anywhere else.
 */
exports.HEADER_OFFSET = 26;
