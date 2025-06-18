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
exports.collectBrowserLogs = collectBrowserLogs;
exports.verifyNoBrowserErrors = verifyNoBrowserErrors;
/* tslint:disable:no-console  */
const protractor_1 = require("protractor");
const selenium_webdriver_1 = require("selenium-webdriver");
function collectBrowserLogs(loggingLevel_1) {
    return __awaiter(this, arguments, void 0, function* (loggingLevel, collectMoreSevereErrors = false) {
        const browserLog = yield protractor_1.browser.manage().logs().get('browser');
        const collectedLogs = [];
        browserLog.forEach((logEntry) => {
            const msg = logEntry.message;
            console.log('>> ' + msg, logEntry);
            if ((!collectMoreSevereErrors && logEntry.level.value === loggingLevel.value) ||
                (collectMoreSevereErrors && logEntry.level.value >= loggingLevel.value)) {
                collectedLogs.push(logEntry);
            }
        });
        return collectedLogs;
    });
}
function verifyNoBrowserErrors() {
    return __awaiter(this, void 0, void 0, function* () {
        const logs = yield collectBrowserLogs(selenium_webdriver_1.logging.Level.INFO, true /* collect more severe errors too */);
        expect(logs).toEqual([]);
    });
}
