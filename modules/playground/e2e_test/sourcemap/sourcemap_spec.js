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
const runfiles_1 = require("@bazel/runfiles");
const fs_1 = require("fs");
const protractor_1 = require("protractor");
const selenium_webdriver_1 = require("selenium-webdriver");
const source_map_1 = require("source-map");
describe('sourcemaps', function () {
    const URL = '/';
    it('should map sources', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get(URL);
            yield (0, protractor_1.$)('error-app .errorButton').click();
            const logs = yield protractor_1.browser.manage().logs().get(selenium_webdriver_1.logging.Type.BROWSER);
            let errorLine = null;
            let errorColumn = null;
            logs.forEach(function (log) {
                const match = log.message.match(/\.createError\s+\(.+:(\d+):(\d+)/m);
                if (match) {
                    errorLine = parseInt(match[1]);
                    errorColumn = parseInt(match[2]);
                }
            });
            expect(errorLine).not.toBeNull();
            expect(errorColumn).not.toBeNull();
            const mapContent = (0, fs_1.readFileSync)(runfiles_1.runfiles.resolvePackageRelative('../../src/sourcemap/app_bundle.js.map')).toString('utf8');
            const decoder = yield new source_map_1.SourceMapConsumer(JSON.parse(mapContent));
            const originalPosition = decoder.originalPositionFor({ line: errorLine, column: errorColumn });
            const sourceCodeLines = (0, fs_1.readFileSync)(runfiles_1.runfiles.resolvePackageRelative('../../src/sourcemap/index.ts'), {
                encoding: 'utf-8',
            }).split('\n');
            expect(sourceCodeLines[originalPosition.line - 1]).toMatch(/throw new Error\(\'Sourcemap test\'\)/);
        });
    });
});
