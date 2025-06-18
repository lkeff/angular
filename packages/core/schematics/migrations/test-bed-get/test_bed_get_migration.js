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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestBedGetMigration = void 0;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../utils/tsurge");
const imports_1 = require("../../utils/typescript/imports");
const symbol_1 = require("../../utils/typescript/symbol");
/** Name of the method being replaced. */
const METHOD_NAME = 'get';
/** Migration that replaces `TestBed.get` usages with `TestBed.inject`. */
class TestBedGetMigration extends tsurge_1.TsurgeFunnelMigration {
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = [];
            for (const sourceFile of info.sourceFiles) {
                const specifier = (0, imports_1.getImportSpecifier)(sourceFile, '@angular/core/testing', 'TestBed');
                if (specifier === null) {
                    continue;
                }
                const typeChecker = info.program.getTypeChecker();
                sourceFile.forEachChild(function walk(node) {
                    if (typescript_1.default.isPropertyAccessExpression(node) &&
                        node.name.text === METHOD_NAME &&
                        typescript_1.default.isIdentifier(node.expression) &&
                        (0, symbol_1.isReferenceToImport)(typeChecker, node.expression, specifier)) {
                        locations.push({ file: (0, tsurge_1.projectFile)(sourceFile, info), position: node.name.getStart() });
                    }
                    else {
                        node.forEachChild(walk);
                    }
                });
            }
            return (0, tsurge_1.confirmAsSerializable)({ locations });
        });
    }
    migrate(globalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacements = globalData.locations.map(({ file, position }) => {
                return new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
                    position: position,
                    end: position + METHOD_NAME.length,
                    toInsert: 'inject',
                }));
            });
            return (0, tsurge_1.confirmAsSerializable)({ replacements });
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const seen = new Set();
            const locations = [];
            const combined = [...unitA.locations, ...unitB.locations];
            for (const location of combined) {
                const key = `${location.file.id}#${location.position}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    locations.push(location);
                }
            }
            return (0, tsurge_1.confirmAsSerializable)({ locations });
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
exports.TestBedGetMigration = TestBedGetMigration;
