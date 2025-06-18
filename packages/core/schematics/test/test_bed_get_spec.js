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
const shelljs_1 = __importDefault(require("shelljs"));
describe('test-bed-get migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration() {
        return runner.runSchematic('test-bed-get', {}, tree);
    }
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', runfiles_1.runfiles.resolvePackageRelative('../migrations.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        writeFile('/tsconfig.json', '{}');
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } },
        }));
        writeFile('/node_modules/@angular/core/testing/index.d.ts', `
      export declare class TestBed {
        static get(token: any): any;
      }
    `);
        shelljs_1.default.cd(tmpDirPath);
    });
    it('should migrate a usage of TestBed.get', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { TestBed } from '@angular/core/testing';

        const SOME_TOKEN = {};

        describe('test', () => {
          it('should inject', () => {
            console.log(TestBed.get(SOME_TOKEN, null));
          });
        });
      `);
        yield runMigration();
        expect(tree.readContent('/test.ts')).toContain('console.log(TestBed.inject(SOME_TOKEN, null));');
    }));
    it('should migrate a usage of an aliased TestBed.get', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { TestBed as Alias } from '@angular/core/testing';

        const SOME_TOKEN = {};

        describe('test', () => {
          it('should inject', () => {
            console.log(Alias.get(SOME_TOKEN, null));
          });
        });
      `);
        yield runMigration();
        expect(tree.readContent('/test.ts')).toContain('console.log(Alias.inject(SOME_TOKEN, null));');
    }));
    it('should migrate a usage of TestBed.get that is not in a call', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { TestBed } from '@angular/core/testing';

        export const GET = TestBed.get;
      `);
        yield runMigration();
        expect(tree.readContent('/test.ts')).toContain('export const GET = TestBed.inject;');
    }));
    it('should handle a file that is present in multiple projects', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/tsconfig-2.json', '{}');
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: {
                a: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } },
                b: { root: '', architect: { build: { options: { tsConfig: './tsconfig-2.json' } } } },
            },
        }));
        writeFile('test.ts', `
        import { TestBed } from '@angular/core/testing';

        const SOME_TOKEN = {};

        describe('test', () => {
          it('should inject', () => {
            console.log(TestBed.get(SOME_TOKEN));
          });
        });
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain('console.log(TestBed.inject(SOME_TOKEN));');
    }));
});
