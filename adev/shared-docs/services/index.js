"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfContentsLoader = exports.TOC_SKIP_CONTENT_MARKER = void 0;
__exportStar(require("./navigation-state.service"), exports);
var table_of_contents_loader_service_1 = require("./table-of-contents-loader.service");
Object.defineProperty(exports, "TOC_SKIP_CONTENT_MARKER", { enumerable: true, get: function () { return table_of_contents_loader_service_1.TOC_SKIP_CONTENT_MARKER; } });
Object.defineProperty(exports, "TableOfContentsLoader", { enumerable: true, get: function () { return table_of_contents_loader_service_1.TableOfContentsLoader; } });
__exportStar(require("./search.service"), exports);
