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
class Hero {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    // Factory methods
    // Hero from string formatted as '<id> <name>'.
    static fromString(s) {
        return new Hero(+s.substring(0, s.indexOf(' ')), s.slice(s.indexOf(' ') + 1));
    }
    // Hero from hero list <li> element.
    static fromLi(li) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringsFromA = yield li.all(protractor_1.by.css('a')).getText();
            const strings = stringsFromA[0].split(' ');
            return { id: +strings[0], name: strings[1] };
        });
    }
    // Hero id and name from the given detail element.
    static fromDetail(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get hero id from the first <div>
            const id = yield detail.all(protractor_1.by.css('div')).first().getText();
            // Get name from the h2
            const name = yield detail.element(protractor_1.by.css('h2')).getText();
            return {
                id: +id.slice(id.indexOf(' ') + 1),
                name: name.substring(0, name.lastIndexOf(' ')),
            };
        });
    }
}
describe('Universal', () => {
    const expectedH1 = 'Tour of Heroes';
    const expectedTitle = `${expectedH1}`;
    const targetHero = { id: 15, name: 'Magneta' };
    const targetHeroDashboardIndex = 2;
    const nameSuffix = 'X';
    const newHeroName = targetHero.name + nameSuffix;
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Assert that there are no errors emitted from the browser
        const logs = yield protractor_1.browser.manage().logs().get(protractor_1.logging.Type.BROWSER);
        const severeLogs = logs.filter((entry) => entry.level === protractor_1.logging.Level.SEVERE);
        expect(severeLogs).toEqual([]);
    }));
    describe('Initial page', () => {
        beforeAll(() => protractor_1.browser.get(''));
        it(`has title '${expectedTitle}'`, () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield protractor_1.browser.getTitle()).toEqual(expectedTitle);
        }));
        it(`has h1 '${expectedH1}'`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectHeading(1, expectedH1);
        }));
        const expectedViewNames = ['Dashboard', 'Heroes'];
        it(`has views ${expectedViewNames}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const viewNames = yield getPageElts().navElts.map((el) => el.getText());
            expect(viewNames).toEqual(expectedViewNames);
        }));
        it('has dashboard as the active view', () => __awaiter(void 0, void 0, void 0, function* () {
            const page = getPageElts();
            expect(yield page.appDashboard.isPresent()).toBeTruthy();
        }));
    });
    describe('Dashboard tests', () => {
        beforeAll(() => protractor_1.browser.get(''));
        it('has top heroes', () => __awaiter(void 0, void 0, void 0, function* () {
            const page = getPageElts();
            expect(yield page.topHeroes.count()).toEqual(4);
        }));
        it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);
        it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);
        it(`cancels and shows ${targetHero.name} in Dashboard`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, protractor_1.element)(protractor_1.by.buttonText('go back')).click();
            yield protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
            const targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
            expect(yield targetHeroElt.getText()).toEqual(targetHero.name);
        }));
        it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);
        it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);
        it(`saves and shows ${newHeroName} in Dashboard`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, protractor_1.element)(protractor_1.by.buttonText('save')).click();
            yield protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
            const targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
            expect(yield targetHeroElt.getText()).toEqual(newHeroName);
        }));
    });
    describe('Heroes tests', () => {
        beforeAll(() => protractor_1.browser.get(''));
        it('can switch to Heroes view', () => __awaiter(void 0, void 0, void 0, function* () {
            yield getPageElts().appHeroesHref.click();
            const page = getPageElts();
            expect(yield page.appHeroes.isPresent()).toBeTruthy();
            expect(yield page.allHeroes.count()).toEqual(9, 'number of heroes');
        }));
        it('can route to hero details', () => __awaiter(void 0, void 0, void 0, function* () {
            yield getHeroLiEltById(targetHero.id).click();
            const page = getPageElts();
            expect(yield page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
            const hero = yield Hero.fromDetail(page.heroDetail);
            expect(hero.id).toEqual(targetHero.id);
            expect(hero.name).toEqual(targetHero.name.toUpperCase());
        }));
        it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);
        it(`shows ${newHeroName} in Heroes list`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, protractor_1.element)(protractor_1.by.buttonText('save')).click();
            yield protractor_1.browser.waitForAngular();
            const expectedText = `${targetHero.id} ${newHeroName}`;
            expect(yield getHeroAEltById(targetHero.id).getText()).toEqual(expectedText);
        }));
        it(`deletes ${newHeroName} from Heroes list`, () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesBefore = yield toHeroArray(getPageElts().allHeroes);
            const li = getHeroLiEltById(targetHero.id);
            yield li.element(protractor_1.by.buttonText('x')).click();
            const page = getPageElts();
            expect(yield page.appHeroes.isPresent()).toBeTruthy();
            expect(yield page.allHeroes.count()).toEqual(8, 'number of heroes');
            const heroesAfter = yield toHeroArray(page.allHeroes);
            // console.log(await Hero.fromLi(page.allHeroes[0]));
            const expectedHeroes = heroesBefore.filter((h) => h.name !== newHeroName);
            expect(heroesAfter).toEqual(expectedHeroes);
            // expect(await page.selectedHeroSubview.isPresent()).toBeFalsy();
        }));
        it(`adds back ${targetHero.name}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedHeroName = 'Alice';
            const heroesBefore = yield toHeroArray(getPageElts().allHeroes);
            const numHeroes = heroesBefore.length;
            yield (0, protractor_1.element)(protractor_1.by.css('input')).sendKeys(updatedHeroName);
            yield (0, protractor_1.element)(protractor_1.by.buttonText('add')).click();
            const page = getPageElts();
            const heroesAfter = yield toHeroArray(page.allHeroes);
            expect(heroesAfter.length).toEqual(numHeroes + 1, 'number of heroes');
            expect(heroesAfter.slice(0, numHeroes)).toEqual(heroesBefore, 'Old heroes are still there');
            const maxId = heroesBefore[heroesBefore.length - 1].id;
            expect(heroesAfter[numHeroes]).toEqual({ id: maxId + 1, name: updatedHeroName });
        }));
        it('displays correctly styled buttons', () => __awaiter(void 0, void 0, void 0, function* () {
            const buttons = yield protractor_1.element.all(protractor_1.by.buttonText('x'));
            for (const button of buttons) {
                // Inherited styles from styles.css
                expect(yield button.getCssValue('font-family')).toBe('Arial, sans-serif');
                expect(yield button.getCssValue('border')).toContain('none');
                expect(yield button.getCssValue('padding')).toBe('5px 10px');
                expect(yield button.getCssValue('border-radius')).toBe('4px');
                // Styles defined in heroes.component.css
                expect(yield button.getCssValue('right')).toBe('0px');
                expect(yield button.getCssValue('top')).toBe('0px');
                expect(yield button.getCssValue('bottom')).toBe('0px');
            }
            const addButton = (0, protractor_1.element)(protractor_1.by.buttonText('add'));
            // Inherited styles from styles.css
            expect(yield addButton.getCssValue('font-family')).toBe('Arial, sans-serif');
            expect(yield addButton.getCssValue('border')).toContain('none');
            expect(yield addButton.getCssValue('padding')).toBe('5px 10px');
            expect(yield addButton.getCssValue('border-radius')).toBe('4px');
        }));
    });
    describe('Progressive hero search', () => {
        beforeAll(() => protractor_1.browser.get(''));
        it(`searches for 'Ma'`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield getPageElts().searchBox.sendKeys('Ma');
            yield protractor_1.browser.sleep(1000);
            expect(yield getPageElts().searchResults.count()).toBe(4);
        }));
        it(`continues search with 'g'`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield getPageElts().searchBox.sendKeys('g');
            yield protractor_1.browser.sleep(1000);
            expect(yield getPageElts().searchResults.count()).toBe(2);
        }));
        it(`continues search with 'n' and gets ${targetHero.name}`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield getPageElts().searchBox.sendKeys('n');
            yield protractor_1.browser.sleep(1000);
            const page = getPageElts();
            expect(yield page.searchResults.count()).toBe(1);
            const hero = page.searchResults.get(0);
            expect(yield hero.getText()).toEqual(targetHero.name);
        }));
        it(`navigates to ${targetHero.name} details view`, () => __awaiter(void 0, void 0, void 0, function* () {
            const hero = getPageElts().searchResults.get(0);
            expect(yield hero.getText()).toEqual(targetHero.name);
            yield hero.click();
            const page = getPageElts();
            expect(yield page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
            const hero2 = yield Hero.fromDetail(page.heroDetail);
            expect(hero2.id).toEqual(targetHero.id);
            expect(hero2.name).toEqual(targetHero.name.toUpperCase());
        }));
    });
    // Helpers
    function addToHeroName(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, protractor_1.element)(protractor_1.by.css('input')).sendKeys(text);
        });
    }
    function dashboardSelectTargetHero() {
        return __awaiter(this, void 0, void 0, function* () {
            const targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
            expect(yield targetHeroElt.getText()).toEqual(targetHero.name);
            yield targetHeroElt.click();
            yield protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
            const page = getPageElts();
            expect(yield page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
            const hero = yield Hero.fromDetail(page.heroDetail);
            expect(hero.id).toEqual(targetHero.id);
            expect(hero.name).toEqual(targetHero.name.toUpperCase());
        });
    }
    function expectHeading(hLevel, expectedText) {
        return __awaiter(this, void 0, void 0, function* () {
            const hTag = `h${hLevel}`;
            const hText = yield (0, protractor_1.element)(protractor_1.by.css(hTag)).getText();
            expect(hText).toEqual(expectedText, hTag);
        });
    }
    function getHeroAEltById(id) {
        const spanForId = (0, protractor_1.element)(protractor_1.by.cssContainingText('li span.badge', id.toString()));
        return spanForId.element(protractor_1.by.xpath('..'));
    }
    function getHeroLiEltById(id) {
        const spanForId = (0, protractor_1.element)(protractor_1.by.cssContainingText('li span.badge', id.toString()));
        return spanForId.element(protractor_1.by.xpath('../..'));
    }
    function getPageElts() {
        const navElts = protractor_1.element.all(protractor_1.by.css('app-root nav a'));
        return {
            navElts,
            appDashboardHref: navElts.get(0),
            appDashboard: (0, protractor_1.element)(protractor_1.by.css('app-root app-dashboard')),
            topHeroes: protractor_1.element.all(protractor_1.by.css('app-root app-dashboard > div h4')),
            appHeroesHref: navElts.get(1),
            appHeroes: (0, protractor_1.element)(protractor_1.by.css('app-root app-heroes')),
            allHeroes: protractor_1.element.all(protractor_1.by.css('app-root app-heroes li')),
            selectedHeroSubview: (0, protractor_1.element)(protractor_1.by.css('app-root app-heroes > div:last-child')),
            heroDetail: (0, protractor_1.element)(protractor_1.by.css('app-root app-hero-detail > div')),
            searchBox: (0, protractor_1.element)(protractor_1.by.css('#search-box')),
            searchResults: protractor_1.element.all(protractor_1.by.css('.search-result li')),
        };
    }
    function toHeroArray(allHeroes) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield allHeroes.map((hero) => Hero.fromLi(hero));
        });
    }
    function updateHeroNameInDetailView() {
        return __awaiter(this, void 0, void 0, function* () {
            // Assumes that the current view is the hero details view.
            yield addToHeroName(nameSuffix);
            const page = getPageElts();
            const hero = yield Hero.fromDetail(page.heroDetail);
            expect(hero.id).toEqual(targetHero.id);
            expect(hero.name).toEqual(newHeroName.toUpperCase());
        });
    }
});
