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
exports.verifyNoBrowserErrors = verifyNoBrowserErrors;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/* tslint:disable:no-console  */
const selenium_webdriver_1 = require("selenium-webdriver");
// TODO (juliemr): remove this method once this becomes a protractor plugin
function verifyNoBrowserErrors() {
    return __awaiter(this, void 0, void 0, function* () {
        const browserLog = yield browser.manage().logs().get('browser');
        const collectedErrors = [];
        browserLog.forEach((logEntry) => {
            const msg = logEntry.message;
            console.log('>> ' + msg, logEntry);
            if (logEntry.level.value >= selenium_webdriver_1.logging.Level.INFO.value) {
                collectedErrors.push(msg);
            }
        });
        expect(collectedErrors).toEqual([]);
    });
}
