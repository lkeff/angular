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
describe('Image performance warnings', () => {
    it('should warn if rendered image size is much smaller than intrinsic size', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/image-perf-warnings-oversized');
        // Wait for load event
        yield new Promise((resolve) => setTimeout(resolve, 600));
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(1);
        const expectedMessageRegex = /has intrinsic file dimensions much larger than/;
        expect(expectedMessageRegex.test(logs[0].message)).toBeTruthy();
    }));
    // https://github.com/angular/angular/issues/57941
    it('should NOT warn if rendered SVG image size is much smaller that intrinsic size', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/svg-no-perf-oversized-warnings');
        // Wait for load event
        yield new Promise((resolve) => setTimeout(resolve, 600));
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        // Please note that prior to shipping the fix, it was logging a warning
        // for the SVG image (see the attached issue above).
        expect(logs.length).toEqual(0);
    }));
});
