"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyShims = applyShims;
const bundled_domino_1 = __importDefault(require("./bundled-domino"));
/**
 * Apply the necessary shims to make DOM globals (such as `Element`, `HTMLElement`, etc.) available
 * on the environment.
 */
function applyShims() {
    // Make all Domino types available in the global env.
    // NB: Any changes here should also be done in `packages/platform-server/src/domino_adapter.ts`.
    Object.assign(globalThis, bundled_domino_1.default.impl);
    globalThis['KeyboardEvent'] = bundled_domino_1.default.impl.Event;
}
