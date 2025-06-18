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
describe('Structural Directives', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('first div should show hero name with *ngIf', () => __awaiter(void 0, void 0, void 0, function* () {
        const allDivs = protractor_1.element.all(protractor_1.by.tagName('div'));
        expect(yield allDivs.get(0).getText()).toEqual('Dr. Nice');
    }));
    it('first li should show hero name with *ngFor', () => __awaiter(void 0, void 0, void 0, function* () {
        const allLis = protractor_1.element.all(protractor_1.by.tagName('li'));
        expect(yield allLis.get(0).getText()).toEqual('Dr. Nice');
    }));
    it('ngSwitch have two <happy-hero> instances', () => __awaiter(void 0, void 0, void 0, function* () {
        const happyHeroEls = protractor_1.element.all(protractor_1.by.tagName('app-happy-hero'));
        expect(yield happyHeroEls.count()).toEqual(2);
    }));
    it('should toggle *ngIf="hero" with a button', () => __awaiter(void 0, void 0, void 0, function* () {
        const toggleHeroButton = protractor_1.element.all(protractor_1.by.cssContainingText('button', 'Toggle hero')).get(0);
        const paragraph = protractor_1.element.all(protractor_1.by.cssContainingText('p', 'I turned the corner'));
        expect(yield paragraph.get(0).getText()).toContain('I waved');
        yield toggleHeroButton.click();
        expect(yield paragraph.get(0).getText()).not.toContain('I waved');
    }));
    it('appUnless should show 3 paragraph (A)s and (B)s at the start', () => __awaiter(void 0, void 0, void 0, function* () {
        const paragraph = protractor_1.element.all(protractor_1.by.css('p.unless'));
        expect(yield paragraph.count()).toEqual(3);
        for (let i = 0; i < 3; i++) {
            expect(yield paragraph.get(i).getText()).toContain('(A)');
        }
    }));
    it('appUnless should show 1 paragraph (B) after toggling condition', () => __awaiter(void 0, void 0, void 0, function* () {
        const toggleConditionButton = protractor_1.element
            .all(protractor_1.by.cssContainingText('button', 'Toggle condition'))
            .get(0);
        const paragraph = protractor_1.element.all(protractor_1.by.css('p.unless'));
        yield toggleConditionButton.click();
        expect(yield paragraph.count()).toEqual(1);
        expect(yield paragraph.get(0).getText()).toContain('(B)');
    }));
});
