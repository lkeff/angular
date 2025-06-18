"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewContext = void 0;
exports.injectViewContext = injectViewContext;
const state_1 = require("./state");
class ViewContext {
    constructor(view, node) {
        this.view = view;
        this.node = node;
    }
}
exports.ViewContext = ViewContext;
/**
 * @internal
 * @nocollapse
 */
ViewContext.__NG_ELEMENT_ID__ = injectViewContext;
function injectViewContext() {
    return new ViewContext((0, state_1.getLView)(), (0, state_1.getCurrentTNode)());
}
