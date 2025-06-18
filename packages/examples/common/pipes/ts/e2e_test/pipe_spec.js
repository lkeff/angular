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
describe('pipe', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    const URL = '/pipes';
    describe('async', () => {
        it('should resolve and display promise', () => {
            protractor_1.browser.get(URL);
            waitForElement('async-promise-pipe');
            expect(protractor_1.element.all(protractor_1.by.css('async-promise-pipe span')).get(0).getText()).toEqual('Wait for it...');
            (0, protractor_1.element)(protractor_1.by.css('async-promise-pipe button')).click();
            expect(protractor_1.element.all(protractor_1.by.css('async-promise-pipe span')).get(0).getText()).toEqual('Wait for it... hi there!');
        });
    });
    describe('lowercase/uppercase', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('lowerupper-pipe');
            (0, protractor_1.element)(protractor_1.by.css('lowerupper-pipe input')).sendKeys('Hello World!');
            expect(protractor_1.element.all(protractor_1.by.css('lowerupper-pipe pre')).get(0).getText()).toEqual("'hello world!'");
            expect(protractor_1.element.all(protractor_1.by.css('lowerupper-pipe pre')).get(1).getText()).toEqual("'HELLO WORLD!'");
        });
    });
    describe('titlecase', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('titlecase-pipe');
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(0).getText()).toEqual('Some String');
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(1).getText()).toEqual('This Is Mixed Case');
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(2).getText()).toEqual("It's Non-trivial Question");
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(3).getText()).toEqual('One,two,three');
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(4).getText()).toEqual('True|false');
            expect(protractor_1.element.all(protractor_1.by.css('titlecase-pipe p')).get(5).getText()).toEqual('Foo-vs-bar');
        });
    });
    describe('keyvalue', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('keyvalue-pipe');
            expect(protractor_1.element.all(protractor_1.by.css('keyvalue-pipe div')).get(0).getText()).toEqual('1:bar');
            expect(protractor_1.element.all(protractor_1.by.css('keyvalue-pipe div')).get(1).getText()).toEqual('2:foo');
            expect(protractor_1.element.all(protractor_1.by.css('keyvalue-pipe div')).get(2).getText()).toEqual('1:bar');
            expect(protractor_1.element.all(protractor_1.by.css('keyvalue-pipe div')).get(3).getText()).toEqual('2:foo');
        });
    });
    describe('number', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('number-pipe');
            const examples = protractor_1.element.all(protractor_1.by.css('number-pipe p'));
            expect(examples.get(0).getText()).toEqual('No specified formatting: 3.142');
            expect(examples.get(1).getText()).toEqual('With digitsInfo parameter specified: 0,003.14159');
            expect(examples.get(2).getText()).toEqual('With digitsInfo and locale parameters specified: 0\u202f003,14159');
        });
    });
    describe('percent', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('percent-pipe');
            const examples = protractor_1.element.all(protractor_1.by.css('percent-pipe p'));
            expect(examples.get(0).getText()).toEqual('A: 26%');
            expect(examples.get(1).getText()).toEqual('B: 0,134.950%');
            expect(examples.get(2).getText()).toEqual('B: 0\u202f134,950 %');
        });
    });
    describe('currency', () => {
        it('should work properly', () => {
            protractor_1.browser.get(URL);
            waitForElement('currency-pipe');
            const examples = protractor_1.element.all(protractor_1.by.css('currency-pipe p'));
            expect(examples.get(0).getText()).toEqual('A: $0.26');
            expect(examples.get(1).getText()).toEqual('A: CA$0.26');
            expect(examples.get(2).getText()).toEqual('A: CAD0.26');
            expect(examples.get(3).getText()).toEqual('B: CA$0,001.35');
            expect(examples.get(4).getText()).toEqual('B: $0,001.35');
            expect(examples.get(5).getText()).toEqual('B: 0\u202f001,35 $CA');
            expect(examples.get(6).getText()).toEqual('B: CLP1');
        });
    });
});
