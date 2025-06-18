"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCS_CONTENT_LOADER = void 0;
exports.contentResolver = contentResolver;
const core_1 = require("@angular/core");
exports.DOCS_CONTENT_LOADER = new core_1.InjectionToken('DOCS_CONTENT_LOADER');
function contentResolver(contentPath) {
    return () => (0, core_1.inject)(exports.DOCS_CONTENT_LOADER).getContent(contentPath);
}
