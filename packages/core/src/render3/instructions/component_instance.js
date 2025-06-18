"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵcomponentInstance = ɵɵcomponentInstance;
const assert_1 = require("../../util/assert");
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
/**
 * Instruction that returns the component instance in which the current instruction is executing.
 * This is a constant-time version of `nextContent` for the case where we know that we need the
 * component instance specifically, rather than the context of a particular template.
 *
 * @codeGenApi
 */
function ɵɵcomponentInstance() {
    const instance = (0, state_1.getLView)()[view_1.DECLARATION_COMPONENT_VIEW][view_1.CONTEXT];
    ngDevMode && (0, assert_1.assertDefined)(instance, 'Expected component instance to be defined');
    return instance;
}
