"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitDeclarationRegistry = void 0;
/**
 * Registry that keeps track of Angular declarations that are explicitly
 * marked for JIT compilation and are skipping compilation by trait handlers.
 */
class JitDeclarationRegistry {
    constructor() {
        this.jitDeclarations = new Set();
    }
}
exports.JitDeclarationRegistry = JitDeclarationRegistry;
