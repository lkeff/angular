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
describe('Dynamic Form', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('should submit form', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstNameElement = protractor_1.element.all(protractor_1.by.css('input[id=firstName]')).get(0);
        expect(yield firstNameElement.getAttribute('value')).toEqual('Bombasto');
        const emailElement = protractor_1.element.all(protractor_1.by.css('input[id=emailAddress]')).get(0);
        const email = 'test@test.com';
        yield emailElement.sendKeys(email);
        expect(yield emailElement.getAttribute('value')).toEqual(email);
        yield (0, protractor_1.element)(protractor_1.by.css('select option[value="solid"]')).click();
        yield protractor_1.element.all(protractor_1.by.css('button')).get(0).click();
        expect(yield (0, protractor_1.element)(protractor_1.by.cssContainingText('strong', 'Saved the following values')).isPresent()).toBe(true);
    }));
});
