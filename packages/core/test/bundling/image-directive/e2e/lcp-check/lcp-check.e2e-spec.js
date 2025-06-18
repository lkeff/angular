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
describe('NgOptimizedImage directive', () => {
    it('should log a warning when a `priority` is missing on an LCP image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/lcp-check');
        // Wait for ngSrc to be modified
        yield new Promise((resolve) => setTimeout(resolve, 600));
        // Verify that both images were rendered.
        const imgs = protractor_1.element.all(protractor_1.by.css('img'));
        let srcB = yield imgs.get(0).getAttribute('src');
        expect(srcB.endsWith('b.png')).toBe(true);
        const srcA = yield imgs.get(1).getAttribute('src');
        expect(srcA.endsWith('logo-500w.jpg')).toBe(true);
        // The `b.png` image is used twice in a template.
        srcB = yield imgs.get(2).getAttribute('src');
        expect(srcB.endsWith('b.png')).toBe(true);
        // Make sure that only one warning is in the console for image `a.png`,
        // since the `b.png` should be below the fold and not treated as an LCP element.
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.SEVERE);
        expect(logs.length).toEqual(1);
        // Verify that the error code and the image src are present in the error message.
        expect(logs[0].message).toMatch(/NG02955.*?a\.png/);
    }));
});
