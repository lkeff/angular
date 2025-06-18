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
const core_1 = require("@angular-devkit/core");
const testing_1 = require("@angular-devkit/core/node/testing");
const schematics_1 = require("@angular-devkit/schematics");
const testing_2 = require("@angular-devkit/schematics/testing");
const runfiles_1 = require("@bazel/runfiles");
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
describe('all migrations', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    const migrationCollectionPath = runfiles_1.runfiles.resolvePackageRelative('../migrations.json');
    const allMigrationSchematics = Object.keys(JSON.parse(fs_1.default.readFileSync(migrationCollectionPath, 'utf8')).schematics);
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', migrationCollectionPath);
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/node_modules/@angular/core/index.d.ts', `export const MODULE: any;`);
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } },
        }));
        writeFile('/tsconfig.json', `{}`);
        previousWorkingDir = shelljs_1.default.pwd();
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        // Switch into the temporary directory path. This allows us to run
        // the schematic against our custom unit test tree.
        shelljs_1.default.cd(tmpDirPath);
    });
    afterEach(() => {
        shelljs_1.default.cd(previousWorkingDir);
        shelljs_1.default.rm('-r', tmpDirPath);
    });
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration(migrationName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield runner.runSchematic(migrationName, undefined, tree);
        });
    }
    if (allMigrationSchematics.length) {
        allMigrationSchematics.forEach((name) => {
            describe(name, () => createTests(name));
        });
    }
    else {
        it('should pass', () => {
            expect(true).toBe(true);
        });
    }
    function createTests(migrationName) {
        // Regression test for: https://github.com/angular/angular/issues/36346.
        it('should not throw if non-existent symbols are imported with rootDirs', () => __awaiter(this, void 0, void 0, function* () {
            writeFile(`/tsconfig.json`, JSON.stringify({
                compilerOptions: {
                    rootDirs: ['./generated'],
                },
            }));
            writeFile('/index.ts', `
      import {Renderer} from '@angular/core';

      const variableDecl: Renderer = null;

      export class Test {
        constructor(renderer: Renderer) {}
      }
    `);
            let error = null;
            try {
                yield runMigration(migrationName);
            }
            catch (e) {
                error = e;
            }
            expect(error).toBe(null);
        }));
    }
});
