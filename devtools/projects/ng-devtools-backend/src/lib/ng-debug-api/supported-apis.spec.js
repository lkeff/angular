"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const supported_apis_1 = require("./supported-apis");
describe('supported-apis', () => {
    describe('getSupportedApis', () => {
        it('should return supported APIs', () => {
            const supported = (0, supported_apis_1.getSupportedApis)();
            expect(supported).toBeTruthy();
        });
    });
});
