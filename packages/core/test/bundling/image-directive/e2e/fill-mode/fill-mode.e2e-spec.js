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
    it('should not warn when an image in the fill mode is rendered correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/fill-mode-passing');
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(0);
    }));
    it('should warn if an image in the fill mode has zero height after rendering', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.get('/e2e/fill-mode-failing');
        const logs = yield (0, browser_logs_util_1.collectBrowserLogs)(selenium_webdriver_1.logging.Level.WARNING);
        expect(logs.length).toEqual(1);
        // Image loading order is not guaranteed, so all logs, rather than single entry
        // needs to be checked in order to test whether a given error message is present.
        const expectErrorMessageInLogs = (logs, message) => {
            expect(logs.some((log) => {
                return log.message.includes(message);
            })).toBeTruthy();
        };
        expectErrorMessageInLogs(logs, 'NG02952: The NgOptimizedImage directive (activated on an \\u003Cimg> element ' +
            'with the `ngSrc=\\"/e2e/logo-500w.jpg\\"`) has detected that the height ' +
            'of the fill-mode image is zero. This is likely because the containing element ' +
            "does not have the CSS 'position' property set to one of the following: " +
            '\\"relative\\", \\"fixed\\", or \\"absolute\\". To fix this problem, ' +
            "make sure the container element has the CSS 'position' " +
            'property defined and the height of the element is not zero.');
    }));
});
