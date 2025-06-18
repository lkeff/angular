"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/common/utils");
const test_util_1 = require("../test-util");
function supportMediaQuery() {
    const _global = (typeof window === 'object' && window) || (typeof self === 'object' && self) || global;
    return _global['MediaQueryList'] && _global['matchMedia'];
}
describe('test mediaQuery patch', (0, test_util_1.ifEnvSupports)(supportMediaQuery, () => {
    it('test whether addListener is patched', () => {
        const mqList = window.matchMedia('min-width:500px');
        if (mqList && mqList['addListener']) {
            expect(mqList[(0, utils_1.zoneSymbol)('addListener')]).toBeTruthy();
        }
    });
}));
