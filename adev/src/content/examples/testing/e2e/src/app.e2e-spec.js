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
describe('Testing Example', () => {
    const expectedViewNames = ['Dashboard', 'Heroes', 'About'];
    beforeAll(() => protractor_1.browser.get(''));
    function getPageElts() {
        return {
            navElts: protractor_1.element.all(protractor_1.by.css('app-root nav a')),
            appDashboard: (0, protractor_1.element)(protractor_1.by.css('app-root app-dashboard')),
        };
    }
    it('has title', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield protractor_1.browser.getTitle()).toEqual('App Under Test');
    }));
    it(`has views ${expectedViewNames}`, () => __awaiter(void 0, void 0, void 0, function* () {
        const viewNames = yield getPageElts().navElts.map((el) => el.getText());
        expect(viewNames).toEqual(expectedViewNames);
    }));
    it('has dashboard as the active view', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = getPageElts();
        expect(yield page.appDashboard.isPresent()).toBeTruthy();
    }));
});
