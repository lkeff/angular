"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
const browser_logs_util_1 = require("../browser-logs-util");
// Verifies that both images used in a component were rendered.
function verifyImagesPresent(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgs = element.all(protractor_1.by.css('img'));
        const srcA = yield imgs.get(0).getAttribute('src');
        expect(srcA.endsWith('a.png')).toBe(true);
        const srcB = yield imgs.get(1).getAttribute('src');
        expect(srcB.endsWith('b.png')).toBe(true);
    });
}
describe('NgOptimizedImage directive', () => {
    it('should log a warning when there is no preconnect for priority images', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/preconnect-check');
        yield verifyImagesPresent(protractor_1.element);
        // Make sure that only one warning is in the console for both images,
        // because they both have the same base URL (which is used to look for
        // corresponding `<link rel="preconnect">` tags).
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(1);
        // Verify that the error code and a raw image src are present in the
        // error message.
        expect(logs[0].message).toMatch(/NG02956.*?a\.png/);
    }));
    it('should not produce any warnings in the console when a preconnect tag is present', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/preconnect-check?preconnect');
        yield verifyImagesPresent(protractor_1.element);
        // Make sure there are no browser logs.
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(0);
    }));
});
