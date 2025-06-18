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
const app_po_1 = require("./app.po");
describe('workspace-project App', () => {
    let page;
    beforeEach(() => {
        page = new app_po_1.AppPage();
    });
    it('should display welcome message', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        expect(yield page.getTitleText()).toEqual('trusted-types app is running!');
    }));
    it('should sanitize and inject bound innerHTML', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        expect(yield page.getBoundHtmlText()).toEqual('Hello from bound HTML');
        expect(yield page.boundHtmlIframeIsPresent()).toBe(false);
    }));
    it('should directly inject SafeHtml bound to innerHTML', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        expect(yield page.getBoundSafeHtmlText()).toEqual('Hello from bound SafeHtml');
        expect(yield page.boundSafeHtmlIframeIsPresent()).toBe(true);
    }));
    it('should replace element with outerHTML contents', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        expect(yield page.getOuterHTMLText()).toBe('Hello from second outerHTML');
    }));
    it('should load iframe', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        yield protractor_1.browser.waitForAngularEnabled(false);
        yield page.switchToIframe();
        expect(yield page.getHeaderText()).toEqual('Hello from iframe');
    }));
    it('should load embed', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        yield protractor_1.browser.waitForAngularEnabled(false);
        yield page.switchToEmbed();
        expect(yield page.getHeaderText()).toEqual('Hello from embed');
    }));
    it('should load object', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.navigateTo();
        yield protractor_1.browser.waitForAngularEnabled(false);
        yield page.switchToObject();
        expect(yield page.getHeaderText()).toEqual('Hello from object');
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Re-enable waiting for Angular in case we disabled it to navigate to a
        // non-Angular page
        yield protractor_1.browser.waitForAngularEnabled(true);
        // Assert that there are no errors emitted from the browser
        const logs = yield protractor_1.browser.manage().logs().get(protractor_1.logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: protractor_1.logging.Level.SEVERE,
        }));
    }));
});
