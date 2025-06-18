"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵnextContext = ɵɵnextContext;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const state_1 = require("../state");
/**
 * Retrieves a context at the level specified and saves it as the global, contextViewData.
 * Will get the next level up if level is not specified.
 *
 * This is used to save contexts of parent views so they can be bound in embedded views, or
 * in conjunction with reference() to bind a ref from a parent view.
 *
 * @param level The relative level of the view from which to grab context compared to contextVewData
 * @returns context
 *
 * @codeGenApi
 */
function ɵɵnextContext(level = 1) {
    return (0, state_1.nextContextImpl)(level);
}
