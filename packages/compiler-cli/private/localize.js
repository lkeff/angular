"use strict";
/**
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
exports.SourceFileLoader = exports.SourceFile = void 0;
/**
 * @fileoverview The API from compiler-cli that the `@angular/localize`
 * package requires.
 */
__exportStar(require("../src/ngtsc/logging"), exports);
__exportStar(require("../src/ngtsc/file_system"), exports);
var sourcemaps_1 = require("../src/ngtsc/sourcemaps");
Object.defineProperty(exports, "SourceFile", { enumerable: true, get: function () { return sourcemaps_1.SourceFile; } });
Object.defineProperty(exports, "SourceFileLoader", { enumerable: true, get: function () { return sourcemaps_1.SourceFileLoader; } });
