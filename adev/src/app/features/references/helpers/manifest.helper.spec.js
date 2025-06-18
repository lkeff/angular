"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const manifest_helper_1 = require("./manifest.helper");
describe('ManiferHelper', () => {
    describe('getApiUrl', () => {
        it('should return the correct URL for a given package and API name', () => {
            const packageEntry = {
                moduleName: '@angular/common',
                moduleLabel: 'common',
                normalizedModuleName: 'angular_common',
                entries: [],
            };
            const apiName = 'DatePipe';
            const result = (0, manifest_helper_1.getApiUrl)(packageEntry, apiName);
            expect(result).toBe('api/common/DatePipe');
            const packageEntry2 = {
                moduleName: '@angular/animations/browser',
                moduleLabel: 'animations/browser',
                normalizedModuleName: 'angular_animations_browser',
                entries: [],
            };
            const result2 = (0, manifest_helper_1.getApiUrl)(packageEntry2, apiName);
            expect(result2).toBe('api/animations/browser/DatePipe');
            const packageEntry3 = {
                moduleName: '@angular/common/http/testing',
                moduleLabel: 'common/http/testing',
                normalizedModuleName: 'angular_common_http_testing',
                entries: [],
            };
            const result3 = (0, manifest_helper_1.getApiUrl)(packageEntry3, apiName);
            expect(result3).toBe('api/common/http/testing/DatePipe');
        });
    });
});
