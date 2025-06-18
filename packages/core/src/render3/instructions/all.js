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
exports.ɵsetUnknownPropertyStrictMode = exports.ɵsetUnknownElementStrictMode = exports.ɵgetUnknownPropertyStrictMode = exports.ɵgetUnknownElementStrictMode = void 0;
/*
 * This file re-exports all symbols contained in this directory.
 *
 * Why is this file not `index.ts`?
 *
 * There seems to be an inconsistent path resolution of an `index.ts` file
 * when only the parent directory is referenced. This could be due to the
 * node module resolution configuration differing from rollup and/or typescript.
 *
 * With commit
 * https://github.com/angular/angular/commit/d5e3f2c64bd13ce83e7c70788b7fc514ca4a9918
 * the `instructions.ts` file was moved to `instructions/instructions.ts` and an
 * `index.ts` file was used to re-export everything. Having had file names that were
 * importing from `instructions' directly (not the from the sub file or the `index.ts`
 * file) caused strange CI issues. `index.ts` had to be renamed to `all.ts` for this
 * to work.
 *
 * Jira Issue = FW-1184
 */
__exportStar(require("../../defer/instructions"), exports);
__exportStar(require("./advance"), exports);
__exportStar(require("./attribute"), exports);
__exportStar(require("./attribute_interpolation"), exports);
__exportStar(require("./change_detection"), exports);
__exportStar(require("./class_map_interpolation"), exports);
__exportStar(require("./component_instance"), exports);
__exportStar(require("./control_flow"), exports);
__exportStar(require("./di"), exports);
__exportStar(require("./di_attr"), exports);
__exportStar(require("./element"), exports);
__exportStar(require("./element_container"), exports);
var element_validation_1 = require("./element_validation");
Object.defineProperty(exports, "\u0275getUnknownElementStrictMode", { enumerable: true, get: function () { return element_validation_1.ɵgetUnknownElementStrictMode; } });
Object.defineProperty(exports, "\u0275getUnknownPropertyStrictMode", { enumerable: true, get: function () { return element_validation_1.ɵgetUnknownPropertyStrictMode; } });
Object.defineProperty(exports, "\u0275setUnknownElementStrictMode", { enumerable: true, get: function () { return element_validation_1.ɵsetUnknownElementStrictMode; } });
Object.defineProperty(exports, "\u0275setUnknownPropertyStrictMode", { enumerable: true, get: function () { return element_validation_1.ɵsetUnknownPropertyStrictMode; } });
__exportStar(require("./get_current_view"), exports);
__exportStar(require("./dom_property"), exports);
__exportStar(require("./i18n"), exports);
__exportStar(require("./listener"), exports);
__exportStar(require("./namespace"), exports);
__exportStar(require("./next_context"), exports);
__exportStar(require("./projection"), exports);
__exportStar(require("./property"), exports);
__exportStar(require("./property_interpolation"), exports);
__exportStar(require("./queries"), exports);
__exportStar(require("./queries_signals"), exports);
__exportStar(require("./storage"), exports);
__exportStar(require("./style_map_interpolation"), exports);
__exportStar(require("./style_prop_interpolation"), exports);
__exportStar(require("./styling"), exports);
__exportStar(require("./template"), exports);
__exportStar(require("./text"), exports);
__exportStar(require("./text_interpolation"), exports);
__exportStar(require("./two_way"), exports);
__exportStar(require("./let_declaration"), exports);
__exportStar(require("./attach_source_locations"), exports);
