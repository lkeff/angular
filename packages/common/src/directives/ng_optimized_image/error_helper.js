"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgDirectiveDetails = imgDirectiveDetails;
// Assembles directive details string, useful for error messages.
function imgDirectiveDetails(ngSrc, includeNgSrc = true) {
    const ngSrcInfo = includeNgSrc
        ? `(activated on an <img> element with the \`ngSrc="${ngSrc}"\`) `
        : '';
    return `The NgOptimizedImage directive ${ngSrcInfo}has detected that`;
}
