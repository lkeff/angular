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
__exportStar(require("./src/api"), exports);
__exportStar(require("./src/di"), exports);
__exportStar(require("./src/diagnostics"), exports);
__exportStar(require("./src/evaluation"), exports);
__exportStar(require("./src/factory"), exports);
__exportStar(require("./src/injectable_registry"), exports);
__exportStar(require("./src/metadata"), exports);
__exportStar(require("./src/debug_info"), exports);
__exportStar(require("./src/references_registry"), exports);
__exportStar(require("./src/schema"), exports);
__exportStar(require("./src/util"), exports);
__exportStar(require("./src/input_transforms"), exports);
__exportStar(require("./src/jit_declaration_registry"), exports);
