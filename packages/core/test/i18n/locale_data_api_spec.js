"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const locale_data_api_1 = require("../../src/i18n/locale_data_api");
const global_1 = require("../../src/util/global");
describe('locale data api', () => {
    const localeCaESVALENCIA = ['ca-ES-VALENCIA'];
    const localeDe = ['de'];
    const localeDeCH = ['de-CH'];
    const localeEn = ['en'];
    const localeFr = ['fr'];
    localeFr[locale_data_api_1.LocaleDataIndex.CurrencyCode] = 'EUR';
    const localeFrCA = ['fr-CA'];
    const localeZh = ['zh'];
    const localeEnAU = ['en-AU'];
    const fakeGlobalFr = ['fr'];
    beforeAll(() => {
        // Sumulate manually registering some locale data
        (0, locale_data_api_1.registerLocaleData)(localeCaESVALENCIA);
        (0, locale_data_api_1.registerLocaleData)(localeEn);
        (0, locale_data_api_1.registerLocaleData)(localeFr);
        (0, locale_data_api_1.registerLocaleData)(localeFrCA);
        (0, locale_data_api_1.registerLocaleData)(localeFr, 'fake-id');
        (0, locale_data_api_1.registerLocaleData)(localeFrCA, 'fake_Id2');
        (0, locale_data_api_1.registerLocaleData)(localeZh);
        (0, locale_data_api_1.registerLocaleData)(localeEnAU);
        // Simulate some locale data existing on the global already
        global_1.global.ng = global_1.global.ng || {};
        global_1.global.ng.common = global_1.global.ng.common || { locales: {} };
        global_1.global.ng.common.locales = global_1.global.ng.common.locales || {};
        global_1.global.ng.common.locales['fr'] = fakeGlobalFr;
        global_1.global.ng.common.locales['de'] = localeDe;
        global_1.global.ng.common.locales['de-ch'] = localeDeCH;
    });
    afterAll(() => {
        (0, locale_data_api_1.unregisterAllLocaleData)();
        global_1.global.ng.common.locales = undefined;
    });
    describe('findLocaleData', () => {
        it('should throw if the LOCALE_DATA for the chosen locale or its parent locale is not available', () => {
            expect(() => (0, locale_data_api_1.findLocaleData)('pt-AO')).toThrowError(/Missing locale data for the locale "pt-AO"/);
        });
        it('should return english data if the locale is en-US', () => {
            expect((0, locale_data_api_1.findLocaleData)('en-US')).toEqual(localeEn);
        });
        it('should return the exact LOCALE_DATA if it is available', () => {
            expect((0, locale_data_api_1.findLocaleData)('fr-CA')).toEqual(localeFrCA);
        });
        it('should return the parent LOCALE_DATA if it exists and exact locale is not available', () => {
            expect((0, locale_data_api_1.findLocaleData)('fr-BE')).toEqual(localeFr);
        });
        it(`should find the LOCALE_DATA even if the locale id is badly formatted`, () => {
            expect((0, locale_data_api_1.findLocaleData)('ca-ES-VALENCIA')).toEqual(localeCaESVALENCIA);
            expect((0, locale_data_api_1.findLocaleData)('CA_es_Valencia')).toEqual(localeCaESVALENCIA);
        });
        it(`should find the LOCALE_DATA if the locale id was registered`, () => {
            expect((0, locale_data_api_1.findLocaleData)('fake-id')).toEqual(localeFr);
            expect((0, locale_data_api_1.findLocaleData)('fake_iD')).toEqual(localeFr);
            expect((0, locale_data_api_1.findLocaleData)('fake-id2')).toEqual(localeFrCA);
        });
        it('should find the exact LOCALE_DATA if the locale is on the global object', () => {
            expect((0, locale_data_api_1.findLocaleData)('de-CH')).toEqual(localeDeCH);
        });
        it('should find the parent LOCALE_DATA if the exact locale is not available and the parent locale is on the global object', () => {
            expect((0, locale_data_api_1.findLocaleData)('de-BE')).toEqual(localeDe);
        });
        it('should find the registered LOCALE_DATA even if the same locale is on the global object', () => {
            expect((0, locale_data_api_1.findLocaleData)('fr')).not.toBe(fakeGlobalFr);
        });
    });
    describe('getLocaleCurrencyCode()', () => {
        it('should return `null` if the given locale does not provide a currency code', () => {
            expect((0, locale_data_api_1.getLocaleCurrencyCode)('de')).toBe(null);
        });
        it('should return the code at the `LocaleDataIndex.CurrencyCode` of the given locale`s data', () => {
            expect((0, locale_data_api_1.getLocaleCurrencyCode)('fr')).toEqual('EUR');
        });
    });
});
