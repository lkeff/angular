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
describe('i18n E2E Tests', () => {
    beforeEach(() => protractor_1.browser.get(''));
    it('should display i18n translated welcome: Bonjour !', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h1')).getText()).toEqual('Bonjour i18n !');
    }));
    it('should display the node texts without elements', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('app-root')).getText()).toContain(`Je n'affiche aucun élément`);
    }));
    it('should display the translated title attribute', () => __awaiter(void 0, void 0, void 0, function* () {
        const title = yield (0, protractor_1.element)(protractor_1.by.css('img')).getAttribute('title');
        expect(title).toBe(`Logo d'Angular`);
    }));
    it('should display the ICU plural expression', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('span')).get(0).getText()).toBe(`Mis à jour à l'instant`);
    }));
    it('should display the ICU select expression', () => __awaiter(void 0, void 0, void 0, function* () {
        const selectIcuExp = protractor_1.element.all(protractor_1.by.css('span')).get(1);
        expect(yield selectIcuExp.getText()).toBe(`L'auteur est une femme`);
        yield protractor_1.element.all(protractor_1.by.css('button')).get(2).click();
        expect(yield selectIcuExp.getText()).toBe(`L'auteur est un homme`);
    }));
    it('should display the nested expression', () => __awaiter(void 0, void 0, void 0, function* () {
        const nestedExp = protractor_1.element.all(protractor_1.by.css('span')).get(2);
        const incBtn = protractor_1.element.all(protractor_1.by.css('button')).get(0);
        expect(yield nestedExp.getText()).toBe(`Mis à jour: à l'instant`);
        yield incBtn.click();
        expect(yield nestedExp.getText()).toBe(`Mis à jour: il y a une minute`);
        yield incBtn.click();
        yield incBtn.click();
        yield protractor_1.element.all(protractor_1.by.css('button')).get(4).click();
        expect(yield nestedExp.getText()).toBe(`Mis à jour: il y a 3 minutes par autre`);
    }));
});
