"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalLink = isExternalLink;
exports.anchorTarget = anchorTarget;
/** Whether the link provided is external to the application. */
function isExternalLink(href) {
    var _a;
    return (_a = href === null || href === void 0 ? void 0 : href.startsWith('http')) !== null && _a !== void 0 ? _a : false;
}
/** Provide the correct target for the anchor tag based on the link provided. */
function anchorTarget(href) {
    return isExternalLink(href) ? ` target="_blank"` : '';
}
