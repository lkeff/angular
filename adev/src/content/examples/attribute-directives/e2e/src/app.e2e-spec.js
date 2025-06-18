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
describe('Attribute directives', () => {
    const title = 'My First Attribute Directive';
    beforeAll(() => protractor_1.browser.get(''));
    it(`should display correct title: ${title}`, () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h1')).getText()).toEqual(title);
    }));
    it('should be able to select green highlight', () => __awaiter(void 0, void 0, void 0, function* () {
        const highlightedEle = (0, protractor_1.element)(protractor_1.by.cssContainingText('p', 'Highlight me!'));
        const lightGreen = 'rgba(144, 238, 144, 1)';
        const getBgColor = () => highlightedEle.getCssValue('background-color');
        expect(yield highlightedEle.getCssValue('background-color')).not.toEqual(lightGreen);
        const greenRb = protractor_1.element.all(protractor_1.by.css('input')).get(0);
        yield greenRb.click();
        yield protractor_1.browser.actions().mouseMove(highlightedEle).perform();
        // Wait for up to 4s for the background color to be updated,
        // to account for slow environments (e.g. CI).
        yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield getBgColor()) === lightGreen; }), 4000);
    }));
});
