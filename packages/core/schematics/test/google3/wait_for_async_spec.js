"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runfiles_1 = require("@bazel/runfiles");
const fs_1 = require("fs");
const path_1 = require("path");
const shelljs_1 = __importDefault(require("shelljs"));
const tslint_1 = require("tslint");
describe('Google3 waitForAsync TSLint rule', () => {
    const rulesDirectory = (0, path_1.dirname)(runfiles_1.runfiles.resolvePackageRelative('../../migrations/google3/waitForAsyncCjsRule.js'));
    let tmpDir;
    beforeEach(() => {
        tmpDir = (0, path_1.join)(process.env['TEST_TMPDIR'], 'google3-test');
        shelljs_1.default.mkdir('-p', tmpDir);
        // We need to declare the Angular symbols we're testing for, otherwise type checking won't work.
        writeFile('testing.d.ts', `
      export declare function async(fn: Function): any;
    `);
        writeFile('tsconfig.json', JSON.stringify({
            compilerOptions: {
                module: 'es2015',
                baseUrl: './',
                paths: {
                    '@angular/core/testing': ['testing.d.ts'],
                },
            },
        }));
    });
    afterEach(() => shelljs_1.default.rm('-r', tmpDir));
    function runTSLint(fix) {
        const program = tslint_1.Linter.createProgram((0, path_1.join)(tmpDir, 'tsconfig.json'));
        const linter = new tslint_1.Linter({ fix, rulesDirectory: [rulesDirectory] }, program);
        const config = tslint_1.Configuration.parseConfigFile({ rules: { 'wait-for-async-cjs': true } });
        program.getRootFileNames().forEach((fileName) => {
            linter.lint(fileName, program.getSourceFile(fileName).getFullText(), config);
        });
        return linter;
    }
    function writeFile(fileName, content) {
        (0, fs_1.writeFileSync)((0, path_1.join)(tmpDir, fileName), content);
    }
    function getFile(fileName) {
        return (0, fs_1.readFileSync)((0, path_1.join)(tmpDir, fileName), 'utf8');
    }
    it('should flag async imports and usages', () => {
        writeFile('/index.ts', `
      import { async, inject } from '@angular/core/testing';

      it('should work', async(() => {
        expect(inject('foo')).toBe('foo');
      }));

      it('should also work', async(() => {
        expect(inject('bar')).toBe('bar');
      }));
    `);
        const linter = runTSLint(false);
        const failures = linter.getResult().failures.map((failure) => failure.getFailure());
        expect(failures.length).toBe(3);
        expect(failures[0]).toMatch(/Imports of the deprecated async function are not allowed/);
        expect(failures[1]).toMatch(/References to the deprecated async function are not allowed/);
        expect(failures[2]).toMatch(/References to the deprecated async function are not allowed/);
    });
    it('should change async imports to waitForAsync', () => {
        writeFile('/index.ts', `
      import { async, inject } from '@angular/core/testing';

      it('should work', async(() => {
        expect(inject('foo')).toBe('foo');
      }));
    `);
        runTSLint(true);
        expect(getFile('/index.ts')).toContain(`import { inject, waitForAsync } from '@angular/core/testing';`);
    });
    it('should change aliased async imports to waitForAsync', () => {
        writeFile('/index.ts', `
      import { async as renamedAsync, inject } from '@angular/core/testing';

      it('should work', renamedAsync(() => {
        expect(inject('foo')).toBe('foo');
      }));
    `);
        runTSLint(true);
        expect(getFile('/index.ts')).toContain(`import { inject, waitForAsync as renamedAsync } from '@angular/core/testing';`);
    });
    it('should not change async imports if they are not from @angular/core/testing', () => {
        writeFile('/index.ts', `
      import { inject } from '@angular/core/testing';
      import { async } from './my-test-library';

      it('should work', async(() => {
        expect(inject('foo')).toBe('foo');
      }));
    `);
        runTSLint(true);
        const content = getFile('/index.ts');
        expect(content).toContain(`import { inject } from '@angular/core/testing';`);
        expect(content).toContain(`import { async } from './my-test-library';`);
    });
    it('should not change imports if waitForAsync was already imported', () => {
        writeFile('/index.ts', `
      import { async, inject, waitForAsync } from '@angular/core/testing';

      it('should work', async(() => {
        expect(inject('foo')).toBe('foo');
      }));

      it('should also work', waitForAsync(() => {
        expect(inject('bar')).toBe('bar');
      }));
    `);
        runTSLint(true);
        expect(getFile('/index.ts')).toContain(`import { async, inject, waitForAsync } from '@angular/core/testing';`);
    });
    it('should change calls from `async` to `waitForAsync`', () => {
        writeFile('/index.ts', `
      import { async, inject } from '@angular/core/testing';

      it('should work', async(() => {
        expect(inject('foo')).toBe('foo');
      }));

      it('should also work', async(() => {
        expect(inject('bar')).toBe('bar');
      }));
    `);
        runTSLint(true);
        const content = getFile('/index.ts');
        expect(content).toContain(`import { inject, waitForAsync } from '@angular/core/testing';`);
        expect(content).toContain(`it('should work', waitForAsync(() => {`);
        expect(content).toContain(`it('should also work', waitForAsync(() => {`);
    });
    it('should not change aliased calls', () => {
        writeFile('/index.ts', `
      import { async as renamedAsync, inject } from '@angular/core/testing';

      it('should work', renamedAsync(() => {
        expect(inject('foo')).toBe('foo');
      }));
    `);
        runTSLint(true);
        const content = getFile('/index.ts');
        expect(content).toContain(`import { inject, waitForAsync as renamedAsync } from '@angular/core/testing';`);
        expect(content).toContain(`it('should work', renamedAsync(() => {`);
    });
});
