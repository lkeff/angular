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
exports.DocumentCoreMigration = void 0;
const migrations_1 = require("@angular/compiler-cli/private/migrations");
const apply_import_manager_1 = require("../../utils/tsurge/helpers/apply_import_manager");
const tsurge_1 = require("../../utils/tsurge");
const imports_1 = require("../../utils/typescript/imports");
/** Migration that moves the import of `DOCUMENT` from `core` to `common`. */
class DocumentCoreMigration extends tsurge_1.TsurgeFunnelMigration {
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacements = [];
            let importManager = null;
            for (const sourceFile of info.sourceFiles) {
                const specifier = (0, imports_1.getImportSpecifier)(sourceFile, '@angular/common', 'DOCUMENT');
                if (specifier === null) {
                    continue;
                }
                importManager !== null && importManager !== void 0 ? importManager : (importManager = new migrations_1.ImportManager({
                    // Prevent the manager from trying to generate a non-conflicting import.
                    generateUniqueIdentifier: () => null,
                    shouldUseSingleQuotes: () => true,
                }));
                importManager.removeImport(sourceFile, 'DOCUMENT', '@angular/common');
                importManager.addImport({
                    exportSymbolName: 'DOCUMENT',
                    exportModuleSpecifier: '@angular/core',
                    requestedFile: sourceFile,
                    unsafeAliasOverride: specifier.propertyName ? specifier.name.text : undefined,
                });
            }
            if (importManager !== null) {
                (0, apply_import_manager_1.applyImportManagerChanges)(importManager, replacements, info.sourceFiles, info);
            }
            return (0, tsurge_1.confirmAsSerializable)({ replacements });
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)(globalData);
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const seen = new Set();
            const combined = [];
            [unitA.replacements, unitB.replacements].forEach((replacements) => {
                replacements.forEach((current) => {
                    const { position, end, toInsert } = current.update.data;
                    const key = current.projectFile.id + '/' + position + '/' + end + '/' + toInsert;
                    if (!seen.has(key)) {
                        seen.add(key);
                        combined.push(current);
                    }
                });
            });
            return (0, tsurge_1.confirmAsSerializable)({ replacements: combined });
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, tsurge_1.confirmAsSerializable)(combinedData);
        });
    }
    stats() {
        return __awaiter(this, void 0, void 0, function* () {
            return { counters: {} };
        });
    }
}
exports.DocumentCoreMigration = DocumentCoreMigration;
