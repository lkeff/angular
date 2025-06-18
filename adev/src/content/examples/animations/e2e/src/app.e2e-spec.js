"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const selenium_webdriver_1 = require("selenium-webdriver");
const openClose = __importStar(require("./open-close.po"));
const statusSlider = __importStar(require("./status-slider.po"));
const toggle = __importStar(require("./toggle.po"));
const enterLeave = __importStar(require("./enter-leave.po"));
const auto = __importStar(require("./auto.po"));
const filterStagger = __importStar(require("./filter-stagger.po"));
const heroGroups = __importStar(require("./hero-groups"));
const util_1 = require("./util");
const querying_po_1 = require("./querying.po");
describe('Animation Tests', () => {
    const routingAnimationDuration = 350;
    const openCloseHref = (0, util_1.getLinkById)('open-close');
    const statusSliderHref = (0, util_1.getLinkById)('status');
    const toggleHref = (0, util_1.getLinkById)('toggle');
    const enterLeaveHref = (0, util_1.getLinkById)('enter-leave');
    const autoHref = (0, util_1.getLinkById)('auto');
    const filterHref = (0, util_1.getLinkById)('heroes');
    const heroGroupsHref = (0, util_1.getLinkById)('hero-groups');
    const queryingHref = (0, util_1.getLinkById)('querying');
    const newPageSleepFor = (ms = 0) => (0, util_1.sleepFor)(ms + routingAnimationDuration);
    beforeAll(() => protractor_1.browser.get(''));
    describe('Open/Close Component', () => {
        const closedHeight = '100px';
        const openHeight = '200px';
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield openCloseHref.click();
            yield newPageSleepFor(300);
        }));
        it('should be open', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = openClose.getToggleButton();
            const container = openClose.getComponentContainer();
            let text = yield container.getText();
            if (text.includes('Closed')) {
                yield toggleButton.click();
                yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield container.getCssValue('height')) === openHeight; }), 2000);
            }
            text = yield container.getText();
            const containerHeight = yield container.getCssValue('height');
            expect(text).toContain('The box is now Open!');
            expect(containerHeight).toBe(openHeight);
        }));
        it('should be closed', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = openClose.getToggleButton();
            const container = openClose.getComponentContainer();
            let text = yield container.getText();
            if (text.includes('Open')) {
                yield toggleButton.click();
                yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield container.getCssValue('height')) === closedHeight; }), 2000);
            }
            text = yield container.getText();
            const containerHeight = yield container.getCssValue('height');
            expect(text).toContain('The box is now Closed!');
            expect(containerHeight).toBe(closedHeight);
        }));
        it('should log animation events', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = openClose.getToggleButton();
            const loggingCheckbox = openClose.getLoggingCheckbox();
            yield loggingCheckbox.click();
            yield toggleButton.click();
            const logs = yield protractor_1.browser.manage().logs().get(selenium_webdriver_1.logging.Type.BROWSER);
            const animationMessages = logs.filter(({ message }) => message.includes('Animation'));
            expect(animationMessages.length).toBeGreaterThan(0);
        }));
    });
    describe('Status Slider Component', () => {
        const activeColor = 'rgba(117, 70, 0, 1)';
        const inactiveColor = 'rgba(0, 0, 255, 1)';
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield statusSliderHref.click();
            yield newPageSleepFor(2000);
        }));
        it('should be inactive with a blue background', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = statusSlider.getToggleButton();
            const container = statusSlider.getComponentContainer();
            let text = yield container.getText();
            if (text === 'Active') {
                yield toggleButton.click();
                yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield container.getCssValue('backgroundColor')) === inactiveColor; }), 3000);
            }
            text = yield container.getText();
            const bgColor = yield container.getCssValue('backgroundColor');
            expect(text).toBe('Inactive');
            expect(bgColor).toBe(inactiveColor);
        }));
        it('should be active with an orange background', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = statusSlider.getToggleButton();
            const container = statusSlider.getComponentContainer();
            let text = yield container.getText();
            if (text === 'Inactive') {
                yield toggleButton.click();
                yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield container.getCssValue('backgroundColor')) === activeColor; }), 3000);
            }
            text = yield container.getText();
            const bgColor = yield container.getCssValue('backgroundColor');
            expect(text).toBe('Active');
            expect(bgColor).toBe(activeColor);
        }));
    });
    describe('Toggle Animations Component', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield toggleHref.click();
            yield newPageSleepFor();
        }));
        it('should disabled animations on the child element', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = toggle.getToggleAnimationsButton();
            yield toggleButton.click();
            const container = toggle.getComponentContainer();
            const cssClasses = yield container.getAttribute('class');
            expect(cssClasses).toContain('ng-animate-disabled');
        }));
    });
    describe('Enter/Leave Component', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield enterLeaveHref.click();
            yield newPageSleepFor(100);
        }));
        it('should attach a flyInOut trigger to the list of items', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = enterLeave.getHeroesList();
            const hero = heroesList.get(0);
            const cssClasses = yield hero.getAttribute('class');
            const transform = yield hero.getCssValue('transform');
            expect(cssClasses).toContain('ng-trigger-flyInOut');
            expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
        }));
        it('should remove the hero from the list when clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = enterLeave.getHeroesList();
            const total = yield heroesList.count();
            const hero = heroesList.get(0);
            yield hero.click();
            yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield heroesList.count()) < total; }), 2000);
        }));
    });
    describe('Auto Calculation Component', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield autoHref.click();
            yield newPageSleepFor();
        }));
        it('should attach a shrinkOut trigger to the list of items', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = auto.getHeroesList();
            const hero = heroesList.get(0);
            const cssClasses = yield hero.getAttribute('class');
            expect(cssClasses).toContain('ng-trigger-shrinkOut');
        }));
        it('should remove the hero from the list when clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = auto.getHeroesList();
            const total = yield heroesList.count();
            const hero = heroesList.get(0);
            yield hero.click();
            yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield heroesList.count()) < total; }), 2000);
        }));
    });
    describe('Filter/Stagger Component', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield filterHref.click();
            yield newPageSleepFor();
        }));
        it('should attach a filterAnimations trigger to the list container', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = filterStagger.getComponentContainer();
            const cssClasses = yield heroesList.getAttribute('class');
            expect(cssClasses).toContain('ng-trigger-filterAnimation');
        }));
        it('should filter down the list when a search is performed', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = filterStagger.getHeroesList();
            const total = yield heroesList.count();
            const input = filterStagger.getInput();
            yield input.sendKeys('Mag');
            yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield heroesList.count()) === 2; }), 2000);
            const newTotal = yield heroesList.count();
            expect(newTotal).toBeLessThan(total);
        }));
    });
    describe('Hero Groups Component', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield heroGroupsHref.click();
            yield newPageSleepFor(400);
        }));
        it('should attach a flyInOut trigger to the list of items', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = heroGroups.getHeroesList();
            const hero = heroesList.get(0);
            const cssClasses = yield hero.getAttribute('class');
            const transform = yield hero.getCssValue('transform');
            const opacity = yield hero.getCssValue('opacity');
            expect(cssClasses).toContain('ng-trigger-flyInOut');
            expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
            expect(opacity).toBe('1');
        }));
        it('should remove the hero from the list when clicked', () => __awaiter(void 0, void 0, void 0, function* () {
            const heroesList = heroGroups.getHeroesList();
            const total = yield heroesList.count();
            const hero = heroesList.get(0);
            yield hero.click();
            yield protractor_1.browser.wait(() => __awaiter(void 0, void 0, void 0, function* () { return (yield heroesList.count()) < total; }), 2000);
        }));
    });
    describe('Querying Component', () => {
        const queryingAnimationDuration = 2500;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield queryingHref.click();
            yield newPageSleepFor(queryingAnimationDuration);
        }));
        it('should toggle the section', () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = (0, querying_po_1.getToggleButton)();
            const section = (0, querying_po_1.getComponentSection)();
            expect(yield section.isPresent()).toBe(true);
            // toggling off
            yield toggleButton.click();
            yield newPageSleepFor(queryingAnimationDuration);
            expect(yield section.isPresent()).toBe(false);
            // toggling on
            yield toggleButton.click();
            yield newPageSleepFor(queryingAnimationDuration);
            expect(yield section.isPresent()).toBe(true);
            yield newPageSleepFor(queryingAnimationDuration);
        }));
        it(`should disable the button for the animation's duration`, () => __awaiter(void 0, void 0, void 0, function* () {
            const toggleButton = (0, querying_po_1.getToggleButton)();
            expect(yield toggleButton.isEnabled()).toBe(true);
            // toggling off
            yield toggleButton.click();
            expect(yield toggleButton.isEnabled()).toBe(false);
            yield newPageSleepFor(queryingAnimationDuration);
            expect(yield toggleButton.isEnabled()).toBe(true);
            // toggling on
            yield toggleButton.click();
            expect(yield toggleButton.isEnabled()).toBe(false);
            yield newPageSleepFor(queryingAnimationDuration);
            expect(yield toggleButton.isEnabled()).toBe(true);
        }));
    });
});
