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
describe('Built-in Directives', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('should have title Built-in Directives', () => __awaiter(void 0, void 0, void 0, function* () {
        const title = protractor_1.element.all(protractor_1.by.css('h1')).get(0);
        expect(yield title.getText()).toEqual('Built-in Directives');
    }));
    it('should change first Teapot header', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstLabel = protractor_1.element.all(protractor_1.by.css('p')).get(0);
        const firstInput = protractor_1.element.all(protractor_1.by.css('input')).get(0);
        expect(yield firstLabel.getText()).toEqual('Current item name: Teapot');
        yield firstInput.sendKeys('abc');
        expect(yield firstLabel.getText()).toEqual('Current item name: Teapotabc');
    }));
    it('should modify sentence when modified checkbox checked', () => __awaiter(void 0, void 0, void 0, function* () {
        const modifiedChkbxLabel = protractor_1.element.all(protractor_1.by.css('input[type="checkbox"]')).get(1);
        const modifiedSentence = protractor_1.element.all(protractor_1.by.css('div')).get(1);
        yield modifiedChkbxLabel.click();
        expect(yield modifiedSentence.getText()).toContain('modified');
    }));
    it('should modify sentence when normal checkbox checked', () => __awaiter(void 0, void 0, void 0, function* () {
        const normalChkbxLabel = protractor_1.element.all(protractor_1.by.css('input[type="checkbox"]')).get(4);
        const normalSentence = protractor_1.element.all(protractor_1.by.css('div')).get(7);
        yield normalChkbxLabel.click();
        expect(yield normalSentence.getText()).toContain('normal weight and, extra large');
    }));
    it('should toggle app-item-detail', () => __awaiter(void 0, void 0, void 0, function* () {
        const toggleButton = protractor_1.element.all(protractor_1.by.css('button')).get(3);
        const toggledDiv = protractor_1.element.all(protractor_1.by.css('app-item-detail')).get(0);
        yield toggleButton.click();
        expect(yield toggledDiv.isDisplayed()).toBe(true);
    }));
    it('should hide app-item-detail', () => __awaiter(void 0, void 0, void 0, function* () {
        const hiddenMessage = protractor_1.element.all(protractor_1.by.css('p')).get(10);
        const hiddenDiv = protractor_1.element.all(protractor_1.by.css('app-item-detail')).get(2);
        expect(yield hiddenMessage.getText()).toContain('in the DOM');
        expect(yield hiddenDiv.isDisplayed()).toBe(true);
    }));
    it('should have 10 lists each containing the string Teapot', () => __awaiter(void 0, void 0, void 0, function* () {
        const listDiv = protractor_1.element.all(protractor_1.by.cssContainingText('.box', 'Teapot'));
        expect(yield listDiv.count()).toBe(10);
    }));
    it('should switch case', () => __awaiter(void 0, void 0, void 0, function* () {
        const tvRadioButton = protractor_1.element.all(protractor_1.by.css('input[type="radio"]')).get(3);
        const tvDiv = (0, protractor_1.element)(protractor_1.by.css('app-lost-item'));
        const fishbowlRadioButton = protractor_1.element.all(protractor_1.by.css('input[type="radio"]')).get(4);
        const fishbowlDiv = (0, protractor_1.element)(protractor_1.by.css('app-unknown-item'));
        yield tvRadioButton.click();
        expect(yield tvDiv.getText()).toContain('Television');
        yield fishbowlRadioButton.click();
        expect(yield fishbowlDiv.getText()).toContain('mysterious');
    }));
});
