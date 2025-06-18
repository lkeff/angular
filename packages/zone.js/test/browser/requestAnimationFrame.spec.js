"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
describe('requestAnimationFrame', function () {
    const functions = [
        'requestAnimationFrame',
        'webkitRequestAnimationFrame',
        'mozRequestAnimationFrame',
    ];
    functions.forEach(function (fnName) {
        if (global[fnName] !== undefined) {
            describe(fnName, function () {
                const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                beforeEach(() => {
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                });
                afterEach(() => {
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
                });
                const requestAnimationFrameFn = window[fnName];
                it('should be tolerant of invalid arguments', function () {
                    // requestAnimationFrameFn throws an error on invalid arguments, so expect that.
                    expect(function () {
                        requestAnimationFrameFn(null);
                    }).toThrow();
                });
                it('should bind to same zone when called recursively', function (done) {
                    Zone.current.fork({ name: 'TestZone' }).run(() => {
                        let frames = 0;
                        let previousTimeStamp = 0;
                        function frameCallback(timestamp) {
                            expect(timestamp).toMatch(/^[\d.]+$/);
                            // expect previous <= current
                            expect(previousTimeStamp).not.toBeGreaterThan(timestamp);
                            previousTimeStamp = timestamp;
                            if (frames++ > 15) {
                                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
                                return done();
                            }
                            requestAnimationFrameFn(frameCallback);
                        }
                        requestAnimationFrameFn(frameCallback);
                    });
                });
            });
        }
    });
});
