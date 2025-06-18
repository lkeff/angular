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
describe('Dependency Injection Tests', () => {
    let expectedMsg;
    let expectedMsgRx;
    beforeAll(() => protractor_1.browser.get(''));
    describe('Cars:', () => {
        it('DI car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'DI car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#di')).getText()).toEqual(expectedMsg);
        }));
        it('No DI car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'No DI car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#nodi')).getText()).toEqual(expectedMsg);
        }));
        it('Injector car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Injector car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#injector')).getText()).toEqual(expectedMsg);
        }));
        it('Factory car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Factory car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#factory')).getText()).toEqual(expectedMsg);
        }));
        it('Simple car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Simple car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#simple')).getText()).toEqual(expectedMsg);
        }));
        it('Super car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Super car with 12 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#super')).getText()).toEqual(expectedMsg);
        }));
        it('Test car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Test car with 8 cylinders and YokoGoodStone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#test')).getText()).toEqual(expectedMsg);
        }));
    });
    describe('Other Injections:', () => {
        it('DI car displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'DI car with 4 cylinders and Flintstone tires.';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#car')).getText()).toEqual(expectedMsg);
        }));
        it('Hero displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Dr. Nice';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#hero')).getText()).toEqual(expectedMsg);
        }));
        it('Optional injection displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = "R.O.U.S.'s? I don't think they exist!";
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#rodent')).getText()).toEqual(expectedMsg);
        }));
    });
    describe('Tests:', () => {
        it('Tests display as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsgRx = /Tests passed/;
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#tests')).getText()).toMatch(expectedMsgRx);
        }));
    });
    describe('Provider variations:', () => {
        it('P1 (class) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hello from logger provided with Logger class';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p1')).getText()).toEqual(expectedMsg);
        }));
        it('P3 (provide) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hello from logger provided with useClass:Logger';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p3')).getText()).toEqual(expectedMsg);
        }));
        it('P4 (useClass:BetterLogger) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hello from logger provided with useClass:BetterLogger';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p4')).getText()).toEqual(expectedMsg);
        }));
        it('P5 (useClass:EvenBetterLogger - dependency)  displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Message to Bob: Hello from EvenBetterlogger';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p5')).getText()).toEqual(expectedMsg);
        }));
        it('P6a (no alias) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hello OldLogger (but we want NewLogger)';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p6a')).getText()).toEqual(expectedMsg);
        }));
        it('P6b (alias) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hello from NewLogger (via aliased OldLogger)';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p6b')).getText()).toEqual(expectedMsg);
        }));
        it('P7 (useValue) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Silent logger says "Shhhhh!". Provided via "useValue"';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p7')).getText()).toEqual(expectedMsg);
        }));
        it('P8 (useFactory) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Hero service injected successfully via heroServiceProvider';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p8')).getText()).toEqual(expectedMsg);
        }));
        it('P9 (InjectionToken) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'APP_CONFIG Application title is Dependency Injection';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p9')).getText()).toEqual(expectedMsg);
        }));
        it('P10 (optional dependency) displays as expected', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsg = 'Optional logger was not available';
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#p10')).getText()).toEqual(expectedMsg);
        }));
    });
    describe('User/Heroes:', () => {
        it('User is Bob - unauthorized', () => __awaiter(void 0, void 0, void 0, function* () {
            expectedMsgRx = /Bob, is not authorized/;
            expect(yield (0, protractor_1.element)(protractor_1.by.css('#user')).getText()).toMatch(expectedMsgRx);
        }));
        it('should have button', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield protractor_1.element.all(protractor_1.by.cssContainingText('button', 'Next User')).get(0).isDisplayed()).toBe(true, "'Next User' button should be displayed");
        }));
        it('unauthorized user should have multiple unauthorized heroes', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroes = protractor_1.element.all(protractor_1.by.css('#unauthorized app-hero-list div'));
            expect(yield heroes.count()).toBeGreaterThan(0);
        }));
        it('unauthorized user should have no secret heroes', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroes = protractor_1.element.all(protractor_1.by.css('#unauthorized app-hero-list div'));
            expect(yield heroes.count()).toBeGreaterThan(0);
            const filteredHeroes = heroes.filter((elem) => __awaiter(void 0, void 0, void 0, function* () { return /secret/.test(yield elem.getText()); }));
            expect(yield filteredHeroes.count()).toEqual(0);
        }));
        it('unauthorized user should have no authorized heroes listed', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield protractor_1.element.all(protractor_1.by.css('#authorized app-hero-list div')).count()).toEqual(0);
        }));
        describe('after button click', () => {
            beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
                const buttonEle = protractor_1.element.all(protractor_1.by.cssContainingText('button', 'Next User')).get(0);
                yield buttonEle.click();
            }));
            it('User is Alice  - authorized', () => __awaiter(void 0, void 0, void 0, function* () {
                expectedMsgRx = /Alice, is authorized/;
                expect(yield (0, protractor_1.element)(protractor_1.by.css('#user')).getText()).toMatch(expectedMsgRx);
            }));
            it('authorized user should have multiple authorized heroes ', () => __awaiter(void 0, void 0, void 0, function* () {
                const heroes = protractor_1.element.all(protractor_1.by.css('#authorized app-hero-list div'));
                expect(yield heroes.count()).toBeGreaterThan(0);
            }));
            it('authorized user should have multiple authorized heroes with tree-shakeable HeroesService', () => __awaiter(void 0, void 0, void 0, function* () {
                const heroes = protractor_1.element.all(protractor_1.by.css('#tspAuthorized app-hero-list div'));
                expect(yield heroes.count()).toBeGreaterThan(0);
            }));
            it('authorized user should have secret heroes', () => __awaiter(void 0, void 0, void 0, function* () {
                const heroes = protractor_1.element.all(protractor_1.by.css('#authorized app-hero-list div'));
                expect(yield heroes.count()).toBeGreaterThan(0);
                const filteredHeroes = heroes.filter((elem) => __awaiter(void 0, void 0, void 0, function* () { return /secret/.test(yield elem.getText()); }));
                expect(yield filteredHeroes.count()).toBeGreaterThan(0);
            }));
            it('authorized user should have no unauthorized heroes listed', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(yield protractor_1.element.all(protractor_1.by.css('#unauthorized app-hero-list div')).count()).toEqual(0);
            }));
        });
    });
});
