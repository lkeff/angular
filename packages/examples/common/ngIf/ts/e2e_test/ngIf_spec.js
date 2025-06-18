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
const test_utils_1 = require("../../../../test-utils");
function waitForElement(selector) {
    const EC = protractor_1.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    protractor_1.browser.wait(EC.presenceOf((0, protractor_1.$)(selector)), 20000);
}
describe('ngIf', () => {
    const URL = '/ngIf';
    afterEach(test_utils_1.verifyNoBrowserErrors);
    describe('ng-if-simple', () => {
        let comp = 'ng-if-simple';
        it('should hide/show content', () => {
            protractor_1.browser.get(URL);
            waitForElement(comp);
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('hide show = true\nText to show');
            (0, protractor_1.element)(protractor_1.by.css(comp + ' button')).click();
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('show show = false');
        });
    });
    describe('ng-if-else', () => {
        let comp = 'ng-if-else';
        it('should hide/show content', () => {
            protractor_1.browser.get(URL);
            waitForElement(comp);
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('hide show = true\nText to show');
            (0, protractor_1.element)(protractor_1.by.css(comp + ' button')).click();
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('show show = false\nAlternate text while primary text is hidden');
        });
    });
    describe('ng-if-then-else', () => {
        let comp = 'ng-if-then-else';
        it('should hide/show content', () => {
            protractor_1.browser.get(URL);
            waitForElement(comp);
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('hideSwitch Primary show = true\nPrimary text to show');
            protractor_1.element
                .all(protractor_1.by.css(comp + ' button'))
                .get(1)
                .click();
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('hideSwitch Primary show = true\nSecondary text to show');
            protractor_1.element
                .all(protractor_1.by.css(comp + ' button'))
                .get(0)
                .click();
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('showSwitch Primary show = false\nAlternate text while primary text is hidden');
        });
    });
    describe('ng-if-as', () => {
        let comp = 'ng-if-as';
        it('should hide/show content', () => {
            protractor_1.browser.get(URL);
            waitForElement(comp);
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('Next User\nWaiting... (user is null)');
            (0, protractor_1.element)(protractor_1.by.css(comp + ' button')).click();
            expect(protractor_1.element.all(protractor_1.by.css(comp)).get(0).getText()).toEqual('Next User\nHello Smith, John!');
        });
    });
});
