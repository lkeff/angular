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
exports.executeMigratePhase = executeMigratePhase;
/**
 * Executes the migrate phase of the given migration against
 * the specified TypeScript project.
 *
 * This requires the global migration data, computed by the
 * analysis and merge phases of the migration.
 *
 * @returns a list of text replacements to apply to disk and the
 *   absolute project directory path (to allow for applying).
 */
function executeMigratePhase(migration, globalMetadata, tsconfigAbsolutePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseInfo = migration.createProgram(tsconfigAbsolutePath);
        const info = migration.prepareProgram(baseInfo);
        return Object.assign(Object.assign({}, (yield migration.migrate(globalMetadata, info))), { projectRoot: info.projectRoot });
    });
}
