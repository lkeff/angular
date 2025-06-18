"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const test_utils_1 = require("../../../../../test-utils");
describe('testability example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    describe('using task tracking', () => {
        const URL = '/testability/whenStable/';
        it('times out with a list of tasks', (done) => {
            protractor_1.browser.get(URL);
            protractor_1.browser.ignoreSynchronization = true;
            // Script that runs in the browser and calls whenStable with a timeout.
            let waitWithResultScript = function (done) {
                let rootEl = document.querySelector('example-app');
                let testability = window.getAngularTestability(rootEl);
                testability.whenStable(() => {
                    done();
                }, 1000);
            };
            (0, protractor_1.element)(protractor_1.by.css('.start-button')).click();
            protractor_1.browser.driver.executeAsyncScript(waitWithResultScript).then(() => {
                expect((0, protractor_1.element)(protractor_1.by.css('.status')).getText()).not.toContain('done');
                done();
            });
        });
        afterAll(() => {
            protractor_1.browser.ignoreSynchronization = false;
        });
    });
});
