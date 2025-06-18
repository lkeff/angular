"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetSourceFile = createGetSourceFile;
/**
 * Create a `GetSourceFileFn` that will return the `SourceFile` being linked or `null`, if not
 * available.
 */
function createGetSourceFile(sourceUrl, code, loader) {
    if (loader === null) {
        // No source-mapping so just return a function that always returns `null`.
        return () => null;
    }
    else {
        // Source-mapping is available so return a function that will load (and cache) the `SourceFile`.
        let sourceFile = undefined;
        return () => {
            if (sourceFile === undefined) {
                sourceFile = loader.loadSourceFile(sourceUrl, code);
            }
            return sourceFile;
        };
    }
}
