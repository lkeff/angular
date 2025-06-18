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
const app_po_1 = require("./app.po");
const protractor_1 = require("protractor");
describe('sw-example App', () => {
    let page;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page = new app_po_1.AppPage();
        yield page.navigateTo();
    }));
    it('should display welcome message', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield page.getTitleText()).toEqual('Welcome to Service Workers!');
    }));
    it('should display the Angular logo', () => __awaiter(void 0, void 0, void 0, function* () {
        const logo = (0, protractor_1.element)(protractor_1.by.css('img'));
        expect(yield logo.isPresent()).toBe(true);
    }));
    it('should show a header for the list of links', () => __awaiter(void 0, void 0, void 0, function* () {
        const listHeader = (0, protractor_1.element)(protractor_1.by.css('app-root > h2'));
        expect(yield listHeader.getText()).toEqual('Here are some links to help you start:');
    }));
    it('should show a list of links', () => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield protractor_1.element.all(protractor_1.by.css('ul > li > h2 > a'));
        expect(items.length).toBe(4);
        expect(yield items[0].getText()).toBe('Angular Service Worker Intro');
        expect(yield items[1].getText()).toBe('Tour of Heroes');
        expect(yield items[2].getText()).toBe('CLI Documentation');
        expect(yield items[3].getText()).toBe('Angular blog');
    }));
    // Check for a rejected promise as the service worker is not enabled
    it('SwUpdate.checkForUpdate() should return a rejected promise', () => __awaiter(void 0, void 0, void 0, function* () {
        const button = (0, protractor_1.element)(protractor_1.by.css('button'));
        const rejectMessage = (0, protractor_1.element)(protractor_1.by.css('p'));
        yield button.click();
        expect(yield rejectMessage.getText()).toContain('rejected: ');
    }));
});
