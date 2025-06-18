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
const util_1 = require("./util");
describe('Http TransferState Lazy', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Don't wait for Angular since it is not bootstrapped automatically.
        yield protractor_1.browser.waitForAngularEnabled(false);
        // Load the page without waiting for Angular since it is not bootstrapped automatically.
        yield (0, util_1.navigateTo)('http-transferstate-lazy');
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure there were no client side errors.
        yield (0, util_1.verifyNoBrowserErrors)();
    }));
    it('should transfer http state in lazy component', () => __awaiter(void 0, void 0, void 0, function* () {
        // Test the contents from the server.
        expect(yield (0, protractor_1.element)(protractor_1.by.css('div.one')).getText()).toBe('API 1 response');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('div.two')).getText()).toBe('API 2 response');
        // Bootstrap the client side app and retest the contents
        yield (0, util_1.bootstrapClientApp)();
        expect(yield (0, protractor_1.element)(protractor_1.by.css('div.one')).getText()).toBe('API 1 response');
        expect(yield (0, protractor_1.element)(protractor_1.by.css('div.two')).getText()).toBe('API 2 response');
        // Validate that there were no HTTP calls to '/api'.
        const requests = yield protractor_1.browser.executeScript(() => {
            return performance.getEntriesByType('resource');
        });
        const apiRequests = requests
            .filter(({ name }) => name.includes('/api'))
            .map(({ name }) => name);
        expect(apiRequests).toEqual([]);
    }));
});
