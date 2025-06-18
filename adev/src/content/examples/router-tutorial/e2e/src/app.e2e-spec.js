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
describe('Router basic tutorial e2e tests', () => {
    beforeEach(() => protractor_1.browser.get(''));
    it('should display Angular Router Sample', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h1')).getText()).toBe('Angular Router Sample');
    }));
    it('should display Crisis Center button', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('a')).get(0).getText()).toBe('Crisis Center');
    }));
    it('should display Heroes button', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('a')).get(1).getText()).toBe('Heroes');
    }));
    it('should display HEROES', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h3')).getText()).toBe('HEROES');
    }));
    it('should change to display crisis list component', () => __awaiter(void 0, void 0, void 0, function* () {
        const crisisButton = protractor_1.element.all(protractor_1.by.css('a')).get(0);
        yield crisisButton.click();
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h3')).getText()).toBe('CRISIS CENTER');
    }));
    it('should change to display heroes component', () => __awaiter(void 0, void 0, void 0, function* () {
        const heroesButton = protractor_1.element.all(protractor_1.by.css('a')).get(1);
        yield heroesButton.click();
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h3')).getText()).toBe('HEROES');
    }));
    it('should use wildcard route', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/fake-page');
        expect(yield protractor_1.browser.getCurrentUrl()).toContain('fake-page');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('h2')).getText()).toBe('Page Not Found');
    }));
});
