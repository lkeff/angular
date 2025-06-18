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
/**
 * This file should not be necessary because node resolution should just default to `./di/index`!
 *
 * However it does not seem to work and it breaks:
 *  - //packages/animations/browser/test:test_web_chromium-local
 *  - //packages/compiler-cli/test:extract_i18n
 *  - //packages/compiler-cli/test:ngc
 *  - //packages/compiler-cli/test:perform_watch
 *  - //packages/compiler-cli/test/diagnostics:check_types
 *  - //packages/compiler-cli/test/transformers:test
 *  - //packages/compiler/test:test
 *  - //tools/public_api_guard:core_api
 *
 * Remove this file once the above is solved or wait until `ngc` is deleted and then it should be
 * safe to delete this file.
 */
__exportStar(require("./di/index"), exports);
