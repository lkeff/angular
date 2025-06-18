"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.icuContainerIterate = icuContainerIterate;
exports.ensureIcuContainerVisitorLoaded = ensureIcuContainerVisitorLoaded;
let _icuContainerIterate;
/**
 * Iterator which provides ability to visit all of the `TIcuContainerNode` root `RNode`s.
 */
function icuContainerIterate(tIcuContainerNode, lView) {
    return _icuContainerIterate(tIcuContainerNode, lView);
}
/**
 * Ensures that `IcuContainerVisitor`'s implementation is present.
 *
 * This function is invoked when i18n instruction comes across an ICU. The purpose is to allow the
 * bundler to tree shake ICU logic and only load it if ICU instruction is executed.
 */
function ensureIcuContainerVisitorLoaded(loader) {
    if (_icuContainerIterate === undefined) {
        // Do not inline this function. We want to keep `ensureIcuContainerVisitorLoaded` light, so it
        // can be inlined into call-site.
        _icuContainerIterate = loader();
    }
}
