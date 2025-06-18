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
describe('Accessibility example e2e tests', () => {
    beforeEach(() => protractor_1.browser.get(''));
    it('should display Accessibility Example', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h1')).getText()).toEqual('Accessibility Example');
    }));
    it('should take a number and change progressbar width', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, protractor_1.element)(protractor_1.by.css('input')).sendKeys('16');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('input')).getAttribute('value')).toEqual('16');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('app-example-progressbar div')).getCssValue('width')).toBe('48px');
    }));
});
