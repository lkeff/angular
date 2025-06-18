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
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const runfiles_1 = require("@bazel/runfiles");
describe('ng-add schematic', () => {
    const localizeTripleSlashType = `/// <reference types="@angular/localize" />`;
    const defaultOptions = { project: 'demo' };
    const schematicRunner = new testing_1.SchematicTestRunner('@angular/localize', runfiles_1.runfiles.resolvePackageRelative('../collection.json'));
    let host;
    beforeEach(() => {
        host = new schematics_1.EmptyTree();
        host.create('package.json', JSON.stringify({
            'devDependencies': {
                // The default (according to `ng-add` in its package.json) is for `@angular/localize` to be
                // saved to `devDependencies`.
                '@angular/localize': '~0.0.0-PLACEHOLDER',
            },
        }));
        host.create('main.ts', `
      import { enableProdMode } from '@angular/core';
      import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    `);
        host.create('angular.json', JSON.stringify({
            version: 1,
            projects: {
                'demo': {
                    root: '',
                    architect: {
                        application: {
                            builder: '@angular-devkit/build-angular:application',
                            options: {
                                browser: './main.ts',
                                tsConfig: './tsconfig.application.json',
                                polyfills: ['zone.js'],
                            },
                        },
                        build: {
                            builder: '@angular-devkit/build-angular:browser',
                            options: {
                                main: './main.ts',
                                tsConfig: './tsconfig.app.json',
                            },
                        },
                        test: {
                            builder: '@angular-devkit/build-angular:karma',
                            options: {
                                tsConfig: './tsconfig.spec.json',
                                polyfills: 'zone.js',
                            },
                        },
                        testKarmaBuild: {
                            builder: '@angular/build:karma',
                            options: {
                                tsConfig: './tsconfig.spec.json',
                                polyfills: 'zone.js',
                            },
                        },
                        server: {
                            builder: '@angular-devkit/build-angular:server',
                            options: {
                                tsConfig: './tsconfig.server.json',
                            },
                        },
                        unknown: {
                            builder: '@custom-builder/build-angular:unknown',
                            options: {
                                tsConfig: './tsconfig.unknown.json',
                            },
                        },
                    },
                },
            },
        }));
    });
    it(`should add '@angular/localize' type reference in 'main.ts'`, () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        expect(host.readText('main.ts')).toContain(localizeTripleSlashType);
    }));
    it(`should not add '@angular/localize' type reference in 'main.ts' if already present`, () => __awaiter(void 0, void 0, void 0, function* () {
        const mainContentInput = `
      ${localizeTripleSlashType}
      import { enableProdMode } from '@angular/core';
    `;
        host.overwrite('main.ts', mainContentInput);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        expect(host.readText('main.ts')).toBe(mainContentInput);
    }));
    it(`should not add '@angular/localize' in 'types' tsconfigs referenced in non official builders`, () => __awaiter(void 0, void 0, void 0, function* () {
        const tsConfig = JSON.stringify({
            compilerOptions: {
                types: ['node'],
            },
        });
        host.create('tsconfig.unknown.json', tsConfig);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const { compilerOptions } = host.readJson('tsconfig.unknown.json');
        const types = compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.types;
        expect(types).not.toContain('@angular/localize');
        expect(types).toHaveSize(1);
    }));
    it(`should add '@angular/localize' in 'types' tsconfigs referenced in browser builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        const tsConfig = JSON.stringify({
            compilerOptions: {
                types: ['node'],
            },
        });
        host.create('tsconfig.app.json', tsConfig);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const { compilerOptions } = host.readJson('tsconfig.app.json');
        const types = compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.types;
        expect(types).toContain('@angular/localize');
        expect(types).toHaveSize(2);
    }));
    it(`should add '@angular/localize' in 'types' tsconfigs referenced in application builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        const tsConfig = JSON.stringify({
            compilerOptions: {
                types: ['node'],
            },
        });
        host.create('tsconfig.application.json', tsConfig);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const { compilerOptions } = host.readJson('tsconfig.application.json');
        const types = compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.types;
        expect(types).toContain('@angular/localize');
        expect(types).toHaveSize(2);
    }));
    it(`should add '@angular/localize/init' in 'polyfills' in application builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const workspace = host.readJson('angular.json');
        const polyfills = workspace.projects['demo'].architect.application.options.polyfills;
        expect(polyfills).toEqual(['zone.js', '@angular/localize/init']);
    }));
    it(`should add '@angular/localize/init' in 'polyfills' in karma builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const workspace = host.readJson('angular.json');
        const polyfills = workspace.projects['demo'].architect.test.options.polyfills;
        expect(polyfills).toEqual(['zone.js', '@angular/localize/init']);
    }));
    it(`should add '@angular/localize/init' in 'polyfills' in karma application builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const workspace = host.readJson('angular.json');
        const polyfills = workspace.projects['demo'].architect.testKarmaBuild.options.polyfills;
        expect(polyfills).toEqual(['zone.js', '@angular/localize/init']);
    }));
    it(`should add '@angular/localize/init' in 'polyfills' in browser builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const workspace = host.readJson('angular.json');
        const polyfills = workspace.projects['demo'].architect.build.options.polyfills;
        expect(polyfills).toEqual(['@angular/localize/init']);
    }));
    it(`should add '@angular/localize' in 'types' tsconfigs referenced in karma builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        const tsConfig = JSON.stringify({
            compilerOptions: {
                types: ['node'],
            },
        });
        host.create('tsconfig.spec.json', tsConfig);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const { compilerOptions } = host.readJson('tsconfig.spec.json');
        const types = compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.types;
        expect(types).toContain('@angular/localize');
        expect(types).toHaveSize(2);
    }));
    it(`should add '@angular/localize' in 'types' tsconfigs referenced in server builder`, () => __awaiter(void 0, void 0, void 0, function* () {
        const tsConfig = JSON.stringify({
            compilerOptions: {},
        });
        host.create('tsconfig.server.json', tsConfig);
        host = yield schematicRunner.runSchematic('ng-add', defaultOptions, host);
        const { compilerOptions } = host.readJson('tsconfig.server.json');
        const types = compilerOptions === null || compilerOptions === void 0 ? void 0 : compilerOptions.types;
        expect(types).toContain('@angular/localize');
        expect(types).toHaveSize(1);
    }));
    it('should add package to `dependencies` if `useAtRuntime` is `true`', () => __awaiter(void 0, void 0, void 0, function* () {
        host = yield schematicRunner.runSchematic('ng-add', Object.assign(Object.assign({}, defaultOptions), { useAtRuntime: true }), host);
        const { devDependencies, dependencies } = host.readJson('/package.json');
        expect(dependencies === null || dependencies === void 0 ? void 0 : dependencies['@angular/localize']).toBe('~0.0.0-PLACEHOLDER');
        expect(devDependencies === null || devDependencies === void 0 ? void 0 : devDependencies['@angular/localize']).toBeUndefined();
    }));
});
