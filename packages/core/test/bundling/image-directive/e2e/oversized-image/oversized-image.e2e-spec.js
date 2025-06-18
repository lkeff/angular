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
    it('should not warn if there is no oversized image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/oversized-image-passing');
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(0);
    }));
    it('should warn if rendered image size is much smaller than intrinsic size', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/oversized-image-failing');
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(1);
        const expectedMessageRegex = /the intrinsic image is significantly larger than necessary\./;
        expect(expectedMessageRegex.test(logs[0].message)).toBeTruthy();
    }));
});
