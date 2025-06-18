"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRender = imageRender;
const path_1 = require("path");
// TODO(josephperrott): Determine how we can define/know the image content base path.
const imageContentBasePath = 'unknown';
function imageRender({ href, title, text }) {
    const isRelativeSrc = href === null || href === void 0 ? void 0 : href.startsWith('./');
    const src = isRelativeSrc ? `${imageContentBasePath}/${(0, path_1.normalize)(href)}` : href;
    return `
  <img src="${src}" alt="${text}" title="${title}" class="docs-image">
  `;
}
