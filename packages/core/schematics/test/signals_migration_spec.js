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
describe('combined signals migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    function runMigration(migrations) {
        return runner.runSchematic('signals', { migrations }, tree);
    }
    function stripWhitespace(value) {
        return value.replace(/\s/g, '');
    }
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', runfiles_1.runfiles.resolvePackageRelative('../collection.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/tsconfig.json', '{}');
        writeFile('/angular.json', JSON.stringify({
            version: 1,
            projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } },
        }));
        previousWorkingDir = shelljs_1.default.pwd();
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        shelljs_1.default.cd(tmpDirPath);
    });
    afterEach(() => {
        shelljs_1.default.cd(previousWorkingDir);
        shelljs_1.default.rm('-r', tmpDirPath);
    });
    it('should be able to run multiple migrations at the same time', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/index.ts', `
      import {ContentChild, Input, ElementRef, Output, Component, EventEmitter} from '@angular/core';

      @Component({
        template: 'The value is {{value}}',
      })
      export class SomeComponent {
        @ContentChild('ref') ref!: ElementRef;
        @Input('alias') value: string = 'initial';
        @Output() clicked = new EventEmitter<void>();
      }`);
        yield runMigration(['inputs', 'queries', 'outputs']);
        expect(stripWhitespace(tree.readContent('/index.ts'))).toBe(stripWhitespace(`
      import {ElementRef, Component, input, output, contentChild} from '@angular/core';

      @Component({
        template: 'The value is {{value()}}',
      })
      export class SomeComponent {
        readonly ref = contentChild.required<ElementRef>('ref');
        readonly value = input<string>('initial', { alias: "alias" });
        readonly clicked = output<void>();
      }
    `));
    }));
    it('should be able to run only specific migrations', () => __awaiter(void 0, void 0, void 0, function* () {
        writeFile('/index.ts', `
      import {ContentChild, Input, ElementRef, Component} from '@angular/core';

      @Component({
        template: 'The value is {{value}}',
      })
      export class SomeComponent {
        @ContentChild('ref') ref!: ElementRef;
        @Input('alias') value: string = 'initial';
      }`);
        yield runMigration(['queries']);
        expect(stripWhitespace(tree.readContent('/index.ts'))).toBe(stripWhitespace(`
      import {Input, ElementRef, Component, contentChild} from '@angular/core';

      @Component({
        template: 'The value is {{value}}',
      })
      export class SomeComponent {
        readonly ref = contentChild.required<ElementRef>('ref');
        @Input('alias') value: string = 'initial';
      }
    `));
    }));
});
