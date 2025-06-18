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
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const test_utils_1 = require("./test_utils");
// Resolve the "npm_package" directory by using the runfile resolution. Note that we need to
// resolve the "package.json" of the package since otherwise NodeJS would resolve the "main"
// file, which is not necessarily at the root of the "npm_package".
shelljs_1.default.cd(path_1.default.dirname(runfiles_1.runfiles.resolve('angular/packages/core/npm_package/package.json')));
/**
 * Utility functions that allows me to create fs paths
 *   p`${foo}/some/${{bar}}/path` rather than path.join(foo, 'some',
 */
function p(templateStringArray) {
    const segments = [];
    for (const entry of templateStringArray) {
        segments.push(...entry.split('/').filter((s) => s !== ''));
    }
    return path_1.default.join(...segments);
}
describe('@angular/core ng_package', () => {
    describe('misc root files', () => {
        describe('README.md', () => {
            it('should have a README.md file with basic info', () => {
                expect(shelljs_1.default.cat('README.md')).toContain(`Angular`);
                expect(shelljs_1.default.cat('README.md')).toContain(`https://github.com/angular/angular`);
            });
        });
    });
    describe('primary entry-point', () => {
        describe('package.json', () => {
            const packageJson = 'package.json';
            it('should have a package.json file', () => {
                expect(shelljs_1.default.grep('"name":', packageJson)).toContain(`@angular/core`);
            });
            it('should contain correct version number with the PLACEHOLDER string replaced', () => {
                expect(shelljs_1.default.grep('"version":', packageJson)).toMatch(/\d+\.\d+\.\d+(?!-PLACEHOLDER)/);
            });
            it('should contain module resolution mappings', () => {
                const data = JSON.parse(shelljs_1.default.cat(packageJson));
                expect(data).toEqual(jasmine.objectContaining({
                    module: `./fesm2022/core.mjs`,
                    typings: `./index.d.ts`,
                    exports: (0, test_utils_1.matchesObjectWithOrder)({
                        './schematics/*': { default: './schematics/*.js' },
                        './event-dispatch-contract.min.js': { default: './event-dispatch-contract.min.js' },
                        './package.json': { default: './package.json' },
                        '.': {
                            types: './index.d.ts',
                            default: './fesm2022/core.mjs',
                        },
                        './primitives/di': {
                            types: './primitives/di/index.d.ts',
                            default: './fesm2022/primitives/di.mjs',
                        },
                        './primitives/event-dispatch': {
                            types: './primitives/event-dispatch/index.d.ts',
                            default: './fesm2022/primitives/event-dispatch.mjs',
                        },
                        './primitives/signals': {
                            types: './primitives/signals/index.d.ts',
                            default: './fesm2022/primitives/signals.mjs',
                        },
                        './rxjs-interop': {
                            types: './rxjs-interop/index.d.ts',
                            default: './fesm2022/rxjs-interop.mjs',
                        },
                        './testing': {
                            types: './testing/index.d.ts',
                            default: './fesm2022/testing.mjs',
                        },
                    }),
                }));
            });
            it('should contain metadata for ng update', () => {
                expect(shelljs_1.default.cat(packageJson)).not.toContain('NG_UPDATE_PACKAGE_GROUP');
                expect(JSON.parse(shelljs_1.default.cat(packageJson))['ng-update'].packageGroup).toContain('@angular/core');
            });
        });
        describe('typescript support', () => {
            it('should not have amd module names', () => {
                expect(shelljs_1.default.cat('index.d.ts')).not.toContain('<amd-module name');
            });
            it('should have an index d.ts file', () => {
                expect(shelljs_1.default.cat('index.d.ts')).toContain('export ');
            });
            // The `r3_symbols` file was needed for View Engine ngcc processing.
            // This test ensures we no longer ship it by accident.
            it('should not have an r3_symbols d.ts file', () => {
                expect(shelljs_1.default.test('-e', 'src/r3_symbols.d.ts')).toBe(false);
            });
        });
        describe('fesm2022', () => {
            it('should have a fesm2022 file in the /fesm2022 directory', () => {
                expect(shelljs_1.default.cat('fesm2022/core.mjs')).toContain(`export {`);
            });
            it('should have a source map', () => {
                expect(shelljs_1.default.cat('fesm2022/core.mjs.map')).toContain(`{"version":3,"file":"core.mjs","sources":`);
            });
            it('should have the version info in the header', () => {
                expect(shelljs_1.default.cat('fesm2022/core.mjs')).toMatch(/@license Angular v\d+\.\d+\.\d+(?!-PLACEHOLDER)/);
            });
        });
    });
    describe('secondary entry-point', () => {
        describe('typings', () => {
            const typingsFile = p `testing/index.d.ts`;
            it('should have a typings file', () => {
                expect(shelljs_1.default.cat(typingsFile)).toContain('export ');
            });
        });
        describe('fesm2022', () => {
            it('should have a fesm2022 file in the /fesm2022 directory', () => {
                expect(shelljs_1.default.cat('fesm2022/testing.mjs')).toContain(`export {`);
            });
            it('should have a source map', () => {
                expect(shelljs_1.default.cat('fesm2022/testing.mjs.map')).toContain(`{"version":3,"file":"testing.mjs","sources":`);
            });
            it('should have the version info in the header', () => {
                expect(shelljs_1.default.cat('fesm2022/testing.mjs')).toMatch(/@license Angular v\d+\.\d+\.\d+(?!-PLACEHOLDER)/);
            });
        });
    });
});
