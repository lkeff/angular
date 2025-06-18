"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRender = linkRender;
const helpers_1 = require("../helpers");
function linkRender({ href, title, tokens }) {
    const titleAttribute = title ? ` title=${title}` : '';
    return `<a href="${href}"${titleAttribute}${(0, helpers_1.anchorTarget)(href)}>${this.parser.parseInline(tokens)}</a>`;
}
