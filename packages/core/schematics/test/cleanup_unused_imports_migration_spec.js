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
describe('cleanup unused imports schematic', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    let logs;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration() {
        return runner.runSchematic('cleanup-unused-imports', {}, tree);
    }
    function stripWhitespace(content) {
        return content.replace(/\s+/g, '');
    }
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', runfiles_1.runfiles.resolvePackageRelative('../collection.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        logs = [];
        writeFile('/tsconfig.json', '{}');
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } },
        }));
        previousWorkingDir = shelljs_1.default.pwd();
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        runner.logger.subscribe((log) => logs.push(log.message));
        // Switch into the temporary directory path. This allows us to run
        // the schematic against our custom unit test tree.
        shelljs_1.default.cd(tmpDirPath);
        writeFile('directives.ts', `
        import {Directive} from '@angular/core';

        @Directive({selector: '[one]'})
        export class One {}

        @Directive({selector: '[two]'})
        export class Two {}

        @Directive({selector: '[three]'})
        export class Three {}
      `);
    });
    afterEach(() => {
        shelljs_1.default.cd(previousWorkingDir);
        shelljs_1.default.rm('-r', tmpDirPath);
    });
    it('should clean up an array where some imports are not used', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('comp.ts', `
        import {Component} from '@angular/core';
        import {One, Two, Three} from './directives';

        @Component({
          imports: [Three, One, Two],
          template: '<div one></div>',
        })
        export class Comp {}
      `);
        yield runMigration();
        expect(logs.pop()).toBe('Removed 2 imports in 1 file');
        expect(stripWhitespace(tree.readContent('comp.ts'))).toBe(stripWhitespace(`
        import {Component} from '@angular/core';
        import {One} from './directives';

        @Component({
          imports: [One],
          template: '<div one></div>',
        })
        export class Comp {}
    `));
    }));
    it('should clean up an array where all imports are not used', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('comp.ts', `
        import {Component} from '@angular/core';
        import {One, Two, Three} from './directives';

        @Component({
          imports: [Three, One, Two],
          template: '',
        })
        export class Comp {}
      `);
        yield runMigration();
        expect(logs.pop()).toBe('Removed 3 imports in 1 file');
        expect(stripWhitespace(tree.readContent('comp.ts'))).toBe(stripWhitespace(`
        import {Component} from '@angular/core';

        @Component({
          imports: [],
          template: '',
        })
        export class Comp {}
    `));
    }));
    it('should clean up an array where aliased imports are not used', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('comp.ts', `
        import {Component} from '@angular/core';
        import {One as OneAlias, Two as TwoAlias, Three as ThreeAlias} from './directives';

        @Component({
          imports: [ThreeAlias, OneAlias, TwoAlias],
          template: '<div one></div>',
        })
        export class Comp {}
      `);
        yield runMigration();
        expect(logs.pop()).toBe('Removed 2 imports in 1 file');
        expect(stripWhitespace(tree.readContent('comp.ts'))).toBe(stripWhitespace(`
        import {Component} from '@angular/core';
        import {One as OneAlias} from './directives';

        @Component({
          imports: [OneAlias],
          template: '<div one></div>',
        })
        export class Comp {}
    `));
    }));
    it('should preserve import declaration if unused import is still used within the file', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('comp.ts', `
        import {Component} from '@angular/core';
        import {One} from './directives';

        @Component({
          imports: [One],
          template: '',
        })
        export class Comp {}

        @Component({
          imports: [One],
          template: '<div one></div>',
        })
        export class OtherComp {}
      `);
        yield runMigration();
        expect(logs.pop()).toBe('Removed 1 import in 1 file');
        expect(stripWhitespace(tree.readContent('comp.ts'))).toBe(stripWhitespace(`
        import {Component} from '@angular/core';
        import {One} from './directives';

        @Component({
          imports: [],
          template: '',
        })
        export class Comp {}

        @Component({
          imports: [One],
          template: '<div one></div>',
        })
        export class OtherComp {}
    `));
    }));
    it('should not touch a file where all imports are used', () => __awaiter(void 0, void 0, void 0, function* () {
        const initialContent = `
      import {Component} from '@angular/core';
      import {One, Two, Three} from './directives';

      @Component({
        imports: [Three, One, Two],
        template: '<div one two three></div>',
      })
      export class Comp {}
    `;
        writeFile('comp.ts', initialContent);
        yield runMigration();
        expect(logs.pop()).toBe('Schematic could not find unused imports in the project');
        expect(tree.readContent('comp.ts')).toBe(initialContent);
    }));
    it('should not touch unused import declarations that are not referenced in an `imports` array', () => __awaiter(void 0, void 0, void 0, function* () {
        const initialContent = `
      import {Component} from '@angular/core';
      import {One, Two, Three} from './directives';

      @Component({template: 'Hello'})
      export class Comp {}
    `;
        writeFile('comp.ts', initialContent);
        yield runMigration();
        expect(logs.pop()).toBe('Schematic could not find unused imports in the project');
        expect(tree.readContent('comp.ts')).toBe(initialContent);
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
        writeFile('comp.ts', `
        import {Component} from '@angular/core';
        import {One, Two, Three} from './directives';

        @Component({
          imports: [Three, One, Two],
          template: '<div one></div>',
        })
        export class Comp {}
      `);
        yield runMigration();
        expect(logs.pop()).toBe('Removed 2 imports in 1 file');
        expect(stripWhitespace(tree.readContent('comp.ts'))).toBe(stripWhitespace(`
        import {Component} from '@angular/core';
        import {One} from './directives';

        @Component({
          imports: [One],
          template: '<div one></div>',
        })
        export class Comp {}
    `));
    }));
});
