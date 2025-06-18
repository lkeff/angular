"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
protractor_1.browser.waitForAngularEnabled(false);
describe('Element E2E Tests', function () {
    describe('Hello World Elements', () => {
        beforeEach(() => protractor_1.browser.get('hello-world.html'));
        describe('(with default CD strategy and view encapsulation)', () => {
            const helloWorldEl = (0, protractor_1.element)(protractor_1.by.css('hello-world-el'));
            it('should display "Hello World!"', function () {
                expect(helloWorldEl.getText()).toBe('Hello World!');
            });
            it('should display "Hello Foo!" via name attribute', function () {
                const input = (0, protractor_1.element)(protractor_1.by.css('input[type=text]'));
                input.sendKeys('Foo');
                // Make tests less flaky on CI by waiting up to 5s for the element text to be updated.
                protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElement(helloWorldEl, 'Hello Foo!'), 5000);
            });
        });
        describe('(with `OnPush` CD strategy)', () => {
            const helloWorldOnpushEl = (0, protractor_1.element)(protractor_1.by.css('hello-world-onpush-el'));
            it('should display "Hello World!"', function () {
                expect(helloWorldOnpushEl.getText()).toBe('Hello World!');
            });
            it('should display "Hello Foo!" via name attribute', function () {
                const input = (0, protractor_1.element)(protractor_1.by.css('input[type=text]'));
                input.sendKeys('Foo');
                // Make tests less flaky on CI by waiting up to 5s for the element text to be updated.
                protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElement(helloWorldOnpushEl, 'Hello Foo!'), 5000);
            });
        });
        describe('(with `ShadowDom` view encapsulation)', () => {
            const helloWorldShadowEl = (0, protractor_1.element)(protractor_1.by.css('hello-world-shadow-el'));
            const getShadowDomText = (el) => protractor_1.browser.executeScript('return arguments[0].shadowRoot.textContent', el);
            it('should display "Hello World!"', function () {
                expect(getShadowDomText(helloWorldShadowEl)).toBe('Hello World!');
            });
            it('should display "Hello Foo!" via name attribute', function () {
                const input = (0, protractor_1.element)(protractor_1.by.css('input[type=text]'));
                input.sendKeys('Foo');
                // Make tests less flaky on CI by waiting up to 5s for the element text to be updated.
                protractor_1.browser.wait(() => __awaiter(this, void 0, void 0, function* () { return (yield getShadowDomText(helloWorldShadowEl)) === 'Hello Foo!'; }), 5000);
            });
        });
    });
});
