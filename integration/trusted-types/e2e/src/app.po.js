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
exports.AppPage = void 0;
const protractor_1 = require("protractor");
class AppPage {
    navigateTo() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.get(protractor_1.browser.baseUrl);
        });
    }
    switchToIframe() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.switchTo().frame(yield (0, protractor_1.element)(protractor_1.by.id('trusted-types-iframe')).getWebElement());
        });
    }
    switchToObject() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.switchTo().frame(yield (0, protractor_1.element)(protractor_1.by.id('trusted-types-object')).getWebElement());
        });
    }
    switchToEmbed() {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.browser.switchTo().frame(yield (0, protractor_1.element)(protractor_1.by.id('trusted-types-embed')).getWebElement());
        });
    }
    getTitleText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.css('app-root .content span')).getText();
        });
    }
    getBoundHtmlText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.css('#bound-html span')).getText();
        });
    }
    getBoundSafeHtmlText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.css('#bound-safehtml span')).getText();
        });
    }
    getOuterHTMLText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.id('outerhtml')).getText();
        });
    }
    boundHtmlIframeIsPresent() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.id('bound-html-iframe')).isPresent();
        });
    }
    boundSafeHtmlIframeIsPresent() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.id('bound-safehtml-iframe')).isPresent();
        });
    }
    getHeaderText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, protractor_1.element)(protractor_1.by.css('h1')).getText();
        });
    }
}
exports.AppPage = AppPage;
