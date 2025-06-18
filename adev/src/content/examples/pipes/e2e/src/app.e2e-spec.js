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
describe('Pipes', () => {
    beforeAll(() => protractor_1.browser.get(''));
    it('should open correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.tagName('h1')).get(0).getText()).toEqual('Pipes');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('app-birthday p')).getText()).toEqual(`The hero's birthday is Apr 15, 1988`);
    }));
    it('should show 4 heroes', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.css('app-hero-list div')).count()).toEqual(4);
    }));
    it('should show a familiar hero in json', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.cssContainingText('app-hero-list p', 'Heroes as JSON')).getText()).toContain('Bombasto');
    }));
    it('should show alternate birthday formats', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, protractor_1.element)(protractor_1.by.cssContainingText('app-birthday-formatting > p', `The hero's birthday is 4/15/88`)).isDisplayed()).toBe(true);
        expect(yield (0, protractor_1.element)(protractor_1.by.cssContainingText('app-birthday-formatting > p', `The hero's birthday is Apr 15, 1988`)).isDisplayed()).toBe(true);
    }));
    it('should be able to chain and compose pipes', () => __awaiter(void 0, void 0, void 0, function* () {
        const chainedPipeEles = protractor_1.element.all(protractor_1.by.cssContainingText('app-birthday-pipe-chaining p', `The chained hero's`));
        expect(yield chainedPipeEles.count()).toBe(2, 'should have 2 chained pipe examples');
        expect(yield chainedPipeEles.get(0).getText()).toContain('APR 15, 1988');
        expect(yield chainedPipeEles.get(1).getText()).toContain('FRIDAY, APRIL 15, 1988');
    }));
    it('should be able to use ExponentialStrengthPipe pipe', () => __awaiter(void 0, void 0, void 0, function* () {
        const ele = (0, protractor_1.element)(protractor_1.by.css('app-power-booster p'));
        expect(yield ele.getText()).toContain('Super power boost: 1024');
    }));
    it('should be able to use the exponential calculator', () => __awaiter(void 0, void 0, void 0, function* () {
        const eles = protractor_1.element.all(protractor_1.by.css('app-power-boost-calculator input'));
        const baseInputEle = eles.get(0);
        const factorInputEle = eles.get(1);
        const outputEle = (0, protractor_1.element)(protractor_1.by.css('app-power-boost-calculator p'));
        yield baseInputEle.clear();
        yield baseInputEle.sendKeys('7');
        yield factorInputEle.clear();
        yield factorInputEle.sendKeys('3');
        expect(yield outputEle.getText()).toContain('343');
    }));
    it('should support flying heroes (pure) ', () => __awaiter(void 0, void 0, void 0, function* () {
        const nameEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes input[type="text"]'));
        const canFlyCheckEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes #can-fly'));
        const mutateCheckEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes #mutate'));
        const resetEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes button'));
        const flyingHeroesEle = protractor_1.element.all(protractor_1.by.css('app-flying-heroes #flyers div'));
        expect(yield canFlyCheckEle.getAttribute('checked')).toEqual('true', 'should default to "can fly"');
        expect(yield mutateCheckEle.getAttribute('checked')).toEqual('true', 'should default to mutating array');
        expect(yield flyingHeroesEle.count()).toEqual(2, 'only two of the original heroes can fly');
        yield nameEle.sendKeys('test1\n');
        expect(yield flyingHeroesEle.count()).toEqual(2, 'no change while mutating array');
        yield mutateCheckEle.click();
        yield nameEle.sendKeys('test2\n');
        expect(yield flyingHeroesEle.count()).toEqual(4, 'not mutating; should see both adds');
        expect(yield flyingHeroesEle.get(2).getText()).toContain('test1');
        expect(yield flyingHeroesEle.get(3).getText()).toContain('test2');
        yield resetEle.click();
        expect(yield flyingHeroesEle.count()).toEqual(2, 'reset should restore original flying heroes');
    }));
    it('should support flying heroes (impure) ', () => __awaiter(void 0, void 0, void 0, function* () {
        const nameEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes-impure input[type="text"]'));
        const canFlyCheckEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes-impure #can-fly'));
        const mutateCheckEle = (0, protractor_1.element)(protractor_1.by.css('app-flying-heroes-impure #mutate'));
        const flyingHeroesEle = protractor_1.element.all(protractor_1.by.css('app-flying-heroes-impure #flyers div'));
        expect(yield canFlyCheckEle.getAttribute('checked')).toEqual('true', 'should default to "can fly"');
        expect(yield mutateCheckEle.getAttribute('checked')).toEqual('true', 'should default to mutating array');
        expect(yield flyingHeroesEle.count()).toEqual(2, 'only two of the original heroes can fly');
        yield nameEle.sendKeys('test1\n');
        expect(yield flyingHeroesEle.count()).toEqual(3, 'new flying hero should show in mutating array');
    }));
    it('should show an async hero message', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.element.all(protractor_1.by.tagName('app-hero-async-message')).get(0).getText()).toContain('hero');
    }));
});
