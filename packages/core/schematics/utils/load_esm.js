"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEsmModule = loadEsmModule;
exports.loadCompilerCliMigrationsModule = loadCompilerCliMigrationsModule;
/**
 * This uses a dynamic import to load a module which may be ESM.
 * CommonJS code can load ESM code via a dynamic import. Unfortunately, TypeScript
 * will currently, unconditionally downlevel dynamic import into a require call.
 * require calls cannot load ESM code and will result in a runtime error. To workaround
 * this, a Function constructor is used to prevent TypeScript from changing the dynamic import.
 * Once TypeScript provides support for keeping the dynamic import this workaround can
 * be dropped.
 * This is only intended to be used with Angular framework packages.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
 */
function loadEsmModule(modulePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const namespaceObject = yield new Function('modulePath', `return import(modulePath);`)(modulePath);
        // If it is not ESM then the values needed will be stored in the `default` property.
        // TODO_ESM: This can be removed once `@angular/*` packages are ESM only.
        if (namespaceObject.default) {
            return namespaceObject.default;
        }
        else {
            return namespaceObject;
        }
    });
}
/**
 * Attempt to load the new `@angular/compiler-cli/private/migrations` entry. If not yet present
 * the previous deep imports are used to constructor an equivalent object.
 *
 * @returns A Promise that resolves to the dynamically imported compiler-cli private migrations
 * entry or an equivalent object if not available.
 */
function loadCompilerCliMigrationsModule() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield loadEsmModule('@angular/compiler-cli/private/migrations');
        }
        catch (_a) {
            // rules_nodejs currently does not support exports field entries. This is a temporary workaround
            // that leverages devmode currently being CommonJS. If that changes before rules_nodejs supports
            // exports then this workaround needs to be reworked.
            // TODO_ESM: This can be removed once Bazel supports exports fields.
            return require('@angular/compiler-cli/private/migrations.js');
        }
    });
}
