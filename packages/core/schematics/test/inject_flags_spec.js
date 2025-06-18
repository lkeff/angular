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
describe('inject-flags migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration() {
        return runner.runSchematic('inject-flags', {}, tree);
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
    it('should migrate a single InjectFlags usage', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, InjectFlags.Optional);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, { optional: true });`);
    }));
    it('should migrate multiple InjectFlags', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, InjectFlags.Optional | InjectFlags.Host | InjectFlags.SkipSelf);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, { optional: true, host: true, skipSelf: true });`);
    }));
    it('should not generate a property for InjectFlags.Default', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, InjectFlags.Default);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, {});`);
    }));
    it('should migrate InjectFlags used in a variable', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        const flags = InjectFlags.SkipSelf | InjectFlags.Optional;

        @Directive()
        export class Dir {
          el = inject(ElementRef, flags);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`const flags = { skipSelf: true, optional: true };`);
    }));
    it('should migrate InjectFlags used in a function initializer', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        function injectEl(flags = InjectFlags.SkipSelf | InjectFlags.Optional) {
          return inject(ElementRef, flags);
        }

        @Directive()
        export class Dir {
          el = injectEl();
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`function injectEl(flags = { skipSelf: true, optional: true })`);
    }));
    it('should remove InjectFlags import even if InjectFlags is not used', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {}
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).not.toContain('InjectFlags');
    }));
    it('should migrate InjectFlags within a parenthesized expression', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, ((InjectFlags.Optional) | InjectFlags.SkipSelf));
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, { optional: true, skipSelf: true });`);
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
        import { inject, InjectFlags, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, InjectFlags.Optional | InjectFlags.SkipSelf);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, { optional: true, skipSelf: true });`);
    }));
    it('should handle aliased InjectFlags', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/test.ts', `
        import { inject, InjectFlags as Foo, Directive, ElementRef } from '@angular/core';

        @Directive()
        export class Dir {
          el = inject(ElementRef, Foo.Optional | Foo.Host | Foo.SkipSelf);
        }
      `);
        yield runMigration();
        const content = tree.readContent('/test.ts');
        expect(content).toContain(`import { inject, Directive, ElementRef } from '@angular/core';`);
        expect(content).toContain(`el = inject(ElementRef, { optional: true, host: true, skipSelf: true });`);
    }));
});
