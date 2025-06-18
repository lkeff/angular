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
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const output_migration_1 = require("./output_migration");
describe('google3 target detection', () => {
    let fs;
    beforeEach(() => {
        fs = (0, testing_1.initMockFileSystem)('Native');
        fs.ensureDir((0, file_system_1.absoluteFrom)('/'));
    });
    describe('3P', () => {
        it('should create Angular programs by default', () => __awaiter(void 0, void 0, void 0, function* () {
            const tsconfigPath = (0, file_system_1.absoluteFrom)('/tsconfig.json');
            fs.writeFile(tsconfigPath, JSON.stringify({
                compilerOptions: {},
            }));
            const migration = new output_migration_1.OutputMigration();
            const baseInfo = migration.createProgram(tsconfigPath, fs);
            expect(baseInfo.ngCompiler).toBeTruthy();
        }));
    });
    describe('1P', () => {
        beforeEach(() => {
            process.env['GOOGLE3_TSURGE'] = '1';
        });
        afterEach(() => {
            process.env['GOOGLE3_TSURGE'] = undefined;
        });
        it('should create plain TS programs if there are no Angular options', () => __awaiter(void 0, void 0, void 0, function* () {
            const tsconfigPath = (0, file_system_1.absoluteFrom)('/tsconfig.json');
            fs.writeFile(tsconfigPath, JSON.stringify({
                compilerOptions: {},
            }));
            const migration = new output_migration_1.OutputMigration();
            const baseInfo = migration.createProgram(tsconfigPath, fs);
            expect(baseInfo.ngCompiler).toBeFalsy();
        }));
        it('should create an Angular program if there is a known Angular option', () => __awaiter(void 0, void 0, void 0, function* () {
            const tsconfigPath = (0, file_system_1.absoluteFrom)('/tsconfig.json');
            fs.writeFile(tsconfigPath, JSON.stringify({
                compilerOptions: {},
                angularCompilerOptions: {
                    _useHostForImportGeneration: true,
                },
            }));
            const migration = new output_migration_1.OutputMigration();
            const baseInfo = migration.createProgram(tsconfigPath, fs);
            expect(baseInfo.ngCompiler).toBeTruthy();
        }));
    });
});
