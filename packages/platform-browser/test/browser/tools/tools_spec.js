"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callNgProfilerTimeChangeDetection = callNgProfilerTimeChangeDetection;
const core_1 = require("@angular/core");
const index_1 = require("../../../index");
describe('profiler', () => {
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    beforeEach(() => {
        (0, index_1.enableDebugTools)({
            injector: core_1.Injector.create({
                providers: [
                    {
                        provide: core_1.ApplicationRef,
                        useValue: jasmine.createSpyObj('ApplicationRef', [
                            'bootstrap',
                            'tick',
                            'attachView',
                            'detachView',
                        ]),
                        deps: [],
                    },
                ],
            }),
        });
    });
    afterEach(() => {
        (0, index_1.disableDebugTools)();
    });
    it('should time change detection', () => {
        callNgProfilerTimeChangeDetection();
    });
    it('should time change detection with recording', () => {
        callNgProfilerTimeChangeDetection({ 'record': true });
    });
});
function callNgProfilerTimeChangeDetection(config) {
    core_1.ɵglobal.ng.profiler.timeChangeDetection(config);
}
