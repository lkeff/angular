"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMarkedGlobally = configureMarkedGlobally;
const marked_1 = require("marked");
const renderer_1 = require("./renderer");
/** Globally configures marked for rendering JsDoc content to HTML. */
function configureMarkedGlobally() {
    marked_1.marked.use({
        renderer: renderer_1.renderer,
    });
}
