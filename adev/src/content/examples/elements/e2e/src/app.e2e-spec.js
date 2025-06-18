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
describe('Elements', () => {
    const messageInput = (0, protractor_1.element)(protractor_1.by.css('input'));
    const popupButtons = protractor_1.element.all(protractor_1.by.css('button'));
    // Helpers
    const click = (elem) => __awaiter(void 0, void 0, void 0, function* () {
        // Waiting for the element to be clickable, makes the tests less flaky.
        yield protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(elem), 5000);
        yield elem.click();
    });
    const waitForText = (elem) => __awaiter(void 0, void 0, void 0, function* () {
        // Waiting for the element to have some text, makes the tests less flaky.
        yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return /\S/.test(yield elem.getText()); }), 5000);
    });
    beforeEach(() => protractor_1.browser.get(''));
    describe('popup component', () => {
        const popupComponentButton = popupButtons.get(0);
        const popupComponent = (0, protractor_1.element)(protractor_1.by.css('popup-component'));
        const closeButton = popupComponent.element(protractor_1.by.css('button'));
        it('should be displayed on button click', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield popupComponent.isPresent()).toBe(false);
            yield click(popupComponentButton);
            expect(yield popupComponent.isPresent()).toBe(true);
        }));
        it('should display the specified message', () => __awaiter(void 0, void 0, void 0, function* () {
            yield messageInput.clear();
            yield messageInput.sendKeys('Angular rocks!');
            yield click(popupComponentButton);
            yield waitForText(popupComponent);
            expect(yield popupComponent.getText()).toContain('Popup: Angular rocks!');
        }));
        it('should be closed on "close" button click', () => __awaiter(void 0, void 0, void 0, function* () {
            yield click(popupComponentButton);
            expect(yield popupComponent.isPresent()).toBe(true);
            yield click(closeButton);
            expect(yield popupComponent.isPresent()).toBe(false);
        }));
    });
    describe('popup element', () => {
        const popupElementButton = popupButtons.get(1);
        const popupElement = (0, protractor_1.element)(protractor_1.by.css('popup-element'));
        const closeButton = popupElement.element(protractor_1.by.css('button'));
        it('should be displayed on button click', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield popupElement.isPresent()).toBe(false);
            yield click(popupElementButton);
            expect(yield popupElement.isPresent()).toBe(true);
        }));
        it('should display the specified message', () => __awaiter(void 0, void 0, void 0, function* () {
            yield messageInput.clear();
            yield messageInput.sendKeys('Angular rocks!');
            yield click(popupElementButton);
            yield waitForText(popupElement);
            expect(yield popupElement.getText()).toContain('Popup: Angular rocks!');
        }));
        it('should be closed on "close" button click', () => __awaiter(void 0, void 0, void 0, function* () {
            yield click(popupElementButton);
            expect(yield popupElement.isPresent()).toBe(true);
            yield click(closeButton);
            expect(yield popupElement.isPresent()).toBe(false);
        }));
    });
});
