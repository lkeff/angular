"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("../src/core");
describe('ApplicationConfig', () => {
    describe('mergeApplicationConfig', () => {
        const FOO_TOKEN = new core_1.InjectionToken('foo');
        const BAR_TOKEN = new core_1.InjectionToken('bar');
        const BUZ_TOKEN = new core_1.InjectionToken('buz');
        const BASE_CONFIG = {
            providers: [{ provide: FOO_TOKEN, useValue: 'foo' }],
        };
        const APP_CONFIG_EXPECT = {
            providers: [
                { provide: FOO_TOKEN, useValue: 'foo' },
                { provide: BAR_TOKEN, useValue: 'bar' },
                { provide: BUZ_TOKEN, useValue: 'buz' },
            ],
        };
        it('should merge 2 configs from left to right', () => {
            const extraConfig = {
                providers: [
                    { provide: BAR_TOKEN, useValue: 'bar' },
                    { provide: BUZ_TOKEN, useValue: 'buz' },
                ],
            };
            const config = (0, core_1.mergeApplicationConfig)(BASE_CONFIG, extraConfig);
            expect(config).toEqual(APP_CONFIG_EXPECT);
        });
        it('should merge more than 2 configs from left to right', () => {
            const extraConfigOne = {
                providers: [{ provide: BAR_TOKEN, useValue: 'bar' }],
            };
            const extraConfigTwo = {
                providers: [{ provide: BUZ_TOKEN, useValue: 'buz' }],
            };
            const config = (0, core_1.mergeApplicationConfig)(BASE_CONFIG, extraConfigOne, extraConfigTwo);
            expect(config).toEqual(APP_CONFIG_EXPECT);
        });
    });
});
