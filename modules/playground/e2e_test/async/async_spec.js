"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const driver_utilities_1 = require("@angular/build-tooling/bazel/benchmark/driver-utilities");
const protractor_1 = require("protractor");
describe('async', () => {
    const URL = '/';
    beforeEach(() => protractor_1.browser.get(URL));
    it('should work with synchronous actions', () => {
        const increment = (0, protractor_1.$)('#increment');
        increment.$('.action').click();
        expect(increment.$('.val').getText()).toEqual('1');
    });
    it('should wait for asynchronous actions', () => {
        const timeout = (0, protractor_1.$)('#delayedIncrement');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        // whenStable should only be called when the async action finished,
        // so the count should be 1 at this point.
        expect(timeout.$('.val').getText()).toEqual('1');
    });
    it('should notice when asynchronous actions are cancelled', () => {
        const timeout = (0, protractor_1.$)('#delayedIncrement');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        protractor_1.browser.ignoreSynchronization = true;
        timeout.$('.action').click();
        timeout.$('.cancel').click();
        protractor_1.browser.ignoreSynchronization = false;
        // whenStable should be called since the async action is cancelled. The
        // count should still be 0;
        expect(timeout.$('.val').getText()).toEqual('0');
    });
    it('should wait for a series of asynchronous actions', () => {
        const timeout = (0, protractor_1.$)('#multiDelayedIncrements');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        // whenStable should only be called when all the async actions
        // finished, so the count should be 10 at this point.
        expect(timeout.$('.val').getText()).toEqual('10');
    });
    it('should wait via frameworkStabilizer', () => {
        const whenAllStable = () => {
            return protractor_1.browser.executeAsyncScript('window.frameworkStabilizers[0](arguments[0]);');
        };
        // This disables protractor's wait mechanism
        protractor_1.browser.ignoreSynchronization = true;
        const timeout = (0, protractor_1.$)('#multiDelayedIncrements');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        whenAllStable().then(() => {
            // whenAllStable should only be called when all the async actions
            // finished, so the count should be 10 at this point.
            expect(timeout.$('.val').getText()).toEqual('10');
        });
        whenAllStable().then(() => {
            // whenAllStable should be called immediately since nothing is pending.
            protractor_1.browser.ignoreSynchronization = false;
        });
    });
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
});
