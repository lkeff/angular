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
describe('document-core migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration() {
        return runner.runSchematic('document-core', {}, tree);
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
        shelljs_1.default.cd(tmpDirPath);
    });
    it('should migrate an import of DOCUMENT', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/dir.ts', `
        import { Directive, inject } from '@angular/core';
        import { DOCUMENT } from '@angular/common';

        @Directive()
        export class Dir {
          protected doc = inject(DOCUMENT);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/dir.ts');
        expect(content).toContain(`import { Directive, inject, DOCUMENT } from '@angular/core';`);
        expect(content).not.toContain(`@angular/common`);
    }));
    it('should migrate an aliased import of DOCUMENT', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/dir.ts', `
        import { Directive, inject } from '@angular/core';
        import { DOCUMENT as MY_DOC } from '@angular/common';

        @Directive()
        export class Dir {
          protected doc = inject(MY_DOC);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/dir.ts');
        expect(content).toContain(`import { Directive, inject, DOCUMENT as MY_DOC } from '@angular/core';`);
        expect(content).not.toContain(`@angular/common`);
    }));
    it('should migrate a file that does not import @angular/core', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/dir.ts', `
        import { DOCUMENT } from '@angular/common';

        console.log(DOCUMENT);
      `);
        yield runMigration();
        const content = tree.readContent('/dir.ts');
        expect(content).toContain(`import { DOCUMENT } from '@angular/core';`);
        expect(content).not.toContain(`@angular/common`);
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
        writeFile('dir.ts', `
        import { Directive, inject } from '@angular/core';
        import { DOCUMENT } from '@angular/common';

        @Directive()
        export class Dir {
          protected doc = inject(DOCUMENT);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/dir.ts');
        expect(content).toContain(`import { Directive, inject, DOCUMENT } from '@angular/core';`);
        expect(content).not.toContain(`@angular/common`);
    }));
});
