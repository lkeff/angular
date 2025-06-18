"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoots = getRoots;
/** Returns all app roots. */
function getRoots() {
    const roots = Array.from(document.documentElement.querySelectorAll('[ng-version]'));
    const isTopLevel = (element) => {
        let parent = element;
        while (parent === null || parent === void 0 ? void 0 : parent.parentElement) {
            parent = parent.parentElement;
            if (parent.hasAttribute('ng-version')) {
                return false;
            }
        }
        return true;
    };
    return roots.filter(isTopLevel);
}
