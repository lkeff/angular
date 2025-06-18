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
describe('Forms Tests', () => {
    beforeEach(() => protractor_1.browser.get(''));
    it('should display correct title', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('h1')).get(0).getText()).toEqual('Actor Form');
    }));
    it('should not display message before submit', () => __awaiter(void 0, void 0, void 0, function* () {
        const ele = (0, protractor_1.element)(protractor_1.by.css('h2'));
        expect(yield ele.isDisplayed()).toBe(false);
    }));
    it('should hide form after submit', () => __awaiter(void 0, void 0, void 0, function* () {
        const ele = protractor_1.element.all(protractor_1.by.css('h1')).get(0);
        expect(yield ele.isDisplayed()).toBe(true);
        const b = protractor_1.element.all(protractor_1.by.css('button[type=submit]')).get(0);
        yield b.click();
        expect(yield ele.isDisplayed()).toBe(false);
    }));
    it('should display message after submit', () => __awaiter(void 0, void 0, void 0, function* () {
        const b = protractor_1.element.all(protractor_1.by.css('button[type=submit]')).get(0);
        yield b.click();
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h2')).getText()).toContain('You submitted the following');
    }));
    it('should hide form after submit', () => __awaiter(void 0, void 0, void 0, function* () {
        const studioEle = protractor_1.element.all(protractor_1.by.css('input[name=studio]')).get(0);
        expect(yield studioEle.isDisplayed()).toBe(true);
        const submitButtonEle = protractor_1.element.all(protractor_1.by.css('button[type=submit]')).get(0);
        yield submitButtonEle.click();
        expect(yield studioEle.isDisplayed()).toBe(false);
    }));
    it('should reflect submitted data after submit', () => __awaiter(void 0, void 0, void 0, function* () {
        const studioEle = protractor_1.element.all(protractor_1.by.css('input[name=studio]')).get(0);
        const value = yield studioEle.getAttribute('value');
        const test = 'testing 1 2 3';
        const newValue = value + test;
        yield studioEle.sendKeys(test);
        expect(yield studioEle.getAttribute('value')).toEqual(newValue);
        const b = protractor_1.element.all(protractor_1.by.css('button[type=submit]')).get(0);
        yield b.click();
        const studioTextEle = (0, protractor_1.element)(protractor_1.by.cssContainingText('div', 'Studio'));
        expect(yield studioTextEle.isPresent()).toBe(true, 'cannot locate "Studio" label');
        const divEle = (0, protractor_1.element)(protractor_1.by.cssContainingText('div', newValue));
        expect(yield divEle.isPresent()).toBe(true, `cannot locate div with this text: ${newValue}`);
    }));
});
