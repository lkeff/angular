"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppPage = void 0;
const protractor_1 = require("protractor");
class AppPage {
    navigateTo() {
        return protractor_1.browser.get(protractor_1.browser.baseUrl);
    }
    getGreetText() {
        return (0, protractor_1.element)(protractor_1.by.css('.greet-text')).getText();
    }
    getUnboundLastNameGreetText() {
        return (0, protractor_1.element)(protractor_1.by.css('.unbound-last-name .greet-text')).getText();
    }
    setLastName() {
        return (0, protractor_1.element)(protractor_1.by.css('.set-last-name-btn')).click();
    }
    unsetLastName() {
        return (0, protractor_1.element)(protractor_1.by.css('.unset-last-name-btn')).click();
    }
    getGreetCount() {
        return (0, protractor_1.element)(protractor_1.by.id('greet-count')).getText();
    }
}
exports.AppPage = AppPage;
