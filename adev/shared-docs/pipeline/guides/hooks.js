"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hooks = void 0;
const state_1 = require("./state");
/**
 * Custom hooks for marked that will be used to post-transform markdown files with parent styles for docs.
 */
exports.hooks = {
    preprocess(html) {
        (0, state_1.resetHeaderIdsOfCurrentDocument)();
        return html;
    },
    postprocess(html) {
        return html;
    },
};
