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
describe('Inputs and Outputs', () => {
    beforeEach(() => protractor_1.browser.get(''));
    // helper function used to test what's logged to the console
    function logChecker(contents) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield protractor_1.browser.manage().logs().get(protractor_1.logging.Type.BROWSER);
            const messages = logs.filter(({ message }) => message.indexOf(contents) !== -1);
            expect(messages.length).toBeGreaterThan(0);
        });
    }
    it('should have title Inputs and Outputs', () => __awaiter(void 0, void 0, void 0, function* () {
        const title = protractor_1.element.all(protractor_1.by.css('h1')).get(0);
        expect(yield title.getText()).toEqual('Inputs and Outputs');
    }));
    it('should add 123 to the parent list', () => __awaiter(void 0, void 0, void 0, function* () {
        const addToParentButton = protractor_1.element.all(protractor_1.by.css('button')).get(0);
        const addToListInput = protractor_1.element.all(protractor_1.by.css('input')).get(0);
        const addedItem = protractor_1.element.all(protractor_1.by.css('li')).get(4);
        // Wait for an <li> to be present before sending keys to the input.
        yield protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(protractor_1.element.all(protractor_1.by.css('li')).get(0)), 5000);
        yield addToListInput.sendKeys('123');
        yield addToParentButton.click();
        expect(yield addedItem.getText()).toEqual('123');
    }));
    it('should delete item', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteButton = protractor_1.element.all(protractor_1.by.css('button')).get(1);
        const contents = 'Child';
        yield deleteButton.click();
        yield logChecker(contents);
    }));
    it('should log buy the item', () => __awaiter(void 0, void 0, void 0, function* () {
        const buyButton = protractor_1.element.all(protractor_1.by.css('button')).get(2);
        const contents = 'Child';
        yield buyButton.click();
        yield logChecker(contents);
    }));
    it('should save item for later', () => __awaiter(void 0, void 0, void 0, function* () {
        const saveButton = protractor_1.element.all(protractor_1.by.css('button')).get(3);
        const contents = 'Child';
        yield saveButton.click();
        yield logChecker(contents);
    }));
    it('should add item to wishlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const addToParentButton = protractor_1.element.all(protractor_1.by.css('button')).get(4);
        const addedItem = protractor_1.element.all(protractor_1.by.css('li')).get(6);
        yield addToParentButton.click();
        expect(yield addedItem.getText()).toEqual('Television');
    }));
});
