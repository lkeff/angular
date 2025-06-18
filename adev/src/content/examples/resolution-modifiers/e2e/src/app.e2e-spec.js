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
describe('Resolution-modifiers-example', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('shows basic flower emoji', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('p')).get(0).getText()).toContain('🌸');
    }));
    it('shows basic leaf emoji', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('p')).get(1).getText()).toContain('🌿');
    }));
    it('shows tulip in host child', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('p')).get(9).getText()).toContain('🌷');
    }));
});
