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
describe('cli-signal-inputs App', () => {
    let page;
    beforeEach(() => {
        page = new app_po_1.AppPage();
    });
    it('should show greet message', () => {
        page.navigateTo();
        expect(page.getGreetText()).toEqual('John - transformed-fallback');
        expect(page.getUnboundLastNameGreetText()).toEqual('John - initial-unset');
    });
    it('should update greet message when last name is set', () => {
        page.navigateTo();
        expect(page.getGreetText()).toEqual('John - transformed-fallback');
        page.setLastName();
        expect(page.getGreetText()).toEqual('John - ng-Doe');
        page.unsetLastName();
        expect(page.getGreetText()).toEqual('John - transformed-fallback');
    });
    it('should properly query via `viewChildren`', () => {
        page.navigateTo();
        expect(page.getGreetCount()).toEqual('Greet component count: 2');
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Assert that there are no errors emitted from the browser
        const logs = yield protractor_1.browser.manage().logs().get(protractor_1.logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: protractor_1.logging.Level.SEVERE,
        }));
    }));
});
