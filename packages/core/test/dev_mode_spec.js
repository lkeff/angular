"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../src/core");
describe('dev mode', () => {
    it('is enabled in our tests by default', () => {
        expect((0, core_1.isDevMode)()).toBe(true);
    });
});
