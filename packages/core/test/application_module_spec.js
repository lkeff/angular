"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../src/core");
const localization_1 = require("../src/i18n/localization");
const render3_1 = require("../src/render3");
const global_1 = require("../src/util/global");
const testing_1 = require("../testing");
describe('Application module', () => {
    beforeEach(() => {
        (0, render3_1.setLocaleId)(localization_1.DEFAULT_LOCALE_ID);
    });
    it('should set the default locale to "en-US"', (0, testing_1.inject)([core_1.LOCALE_ID], (defaultLocale) => {
        expect(defaultLocale).toEqual('en-US');
    }));
    it('should set the default currency code to "USD"', (0, testing_1.inject)([core_1.DEFAULT_CURRENCY_CODE], (defaultCurrencyCode) => {
        expect(defaultCurrencyCode).toEqual('USD');
    }));
    it('should set the ivy locale with the configured LOCALE_ID', () => {
        testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.LOCALE_ID, useValue: 'fr' }] });
        const before = (0, render3_1.getLocaleId)();
        const locale = testing_1.TestBed.inject(core_1.LOCALE_ID);
        const after = (0, render3_1.getLocaleId)();
        expect(before).toEqual('en-us');
        expect(locale).toEqual('fr');
        expect(after).toEqual('fr');
    });
    describe('$localize.locale', () => {
        beforeEach(() => initLocale('de'));
        afterEach(() => restoreLocale());
        it('should set the ivy locale to `$localize.locale` value if it is defined', () => {
            // Injecting `LOCALE_ID` should also initialize the ivy locale
            const locale = testing_1.TestBed.inject(core_1.LOCALE_ID);
            expect(locale).toEqual('de');
            expect((0, render3_1.getLocaleId)()).toEqual('de');
        });
        it('should set the ivy locale to an application provided LOCALE_ID even if `$localize.locale` is defined', () => {
            testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.LOCALE_ID, useValue: 'fr' }] });
            const locale = testing_1.TestBed.inject(core_1.LOCALE_ID);
            expect(locale).toEqual('fr');
            expect((0, render3_1.getLocaleId)()).toEqual('fr');
        });
    });
});
let hasGlobalLocalize;
let hasGlobalLocale;
let originalLocale;
function initLocale(locale) {
    hasGlobalLocalize = Object.getOwnPropertyNames(global_1.global).includes('$localize');
    if (!hasGlobalLocalize) {
        global_1.global.$localize = {};
    }
    hasGlobalLocale = Object.getOwnPropertyNames(global_1.global.$localize).includes('locale');
    originalLocale = global_1.global.$localize.locale;
    global_1.global.$localize.locale = locale;
}
function restoreLocale() {
    if (hasGlobalLocale) {
        global_1.global.$localize.locale = originalLocale;
    }
    else {
        delete global_1.global.$localize.locale;
    }
    if (!hasGlobalLocalize) {
        delete global_1.global.$localize;
    }
}
