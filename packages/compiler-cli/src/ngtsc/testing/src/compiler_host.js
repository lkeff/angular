"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgtscTestCompilerHost = void 0;
const file_system_1 = require("../../file_system");
const cached_source_files_1 = require("./cached_source_files");
/**
 * A compiler host intended to improve test performance by caching default library source files for
 * reuse across tests.
 */
class NgtscTestCompilerHost extends file_system_1.NgtscCompilerHost {
    getSourceFile(fileName, languageVersion) {
        const cachedSf = (0, cached_source_files_1.getCachedSourceFile)(fileName, () => this.readFile(fileName));
        if (cachedSf !== null) {
            return cachedSf;
        }
        return super.getSourceFile(fileName, languageVersion);
    }
}
exports.NgtscTestCompilerHost = NgtscTestCompilerHost;
