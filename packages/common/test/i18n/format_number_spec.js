"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const ar_1 = __importDefault(require("../../locales/ar"));
const en_1 = __importDefault(require("../../locales/en"));
const es_US_1 = __importDefault(require("../../locales/es-US"));
const fr_1 = __importDefault(require("../../locales/fr"));
const core_1 = require("@angular/core");
describe('Format number', () => {
    beforeAll(() => {
        (0, core_1.ɵregisterLocaleData)(en_1.default);
        (0, core_1.ɵregisterLocaleData)(es_US_1.default);
        (0, core_1.ɵregisterLocaleData)(fr_1.default);
        (0, core_1.ɵregisterLocaleData)(ar_1.default);
    });
    afterAll(() => (0, core_1.ɵunregisterLocaleData)());
    describe('Number', () => {
        describe('transform', () => {
            it('should return correct value for numbers', () => {
                expect((0, index_1.formatNumber)(12345, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('12,345');
                expect((0, index_1.formatNumber)(123, core_1.ɵDEFAULT_LOCALE_ID, '.2')).toEqual('123.00');
                expect((0, index_1.formatNumber)(1, core_1.ɵDEFAULT_LOCALE_ID, '3.')).toEqual('001');
                expect((0, index_1.formatNumber)(1.1, core_1.ɵDEFAULT_LOCALE_ID, '3.4-5')).toEqual('001.1000');
                expect((0, index_1.formatNumber)(1.123456, core_1.ɵDEFAULT_LOCALE_ID, '3.4-5')).toEqual('001.12346');
                expect((0, index_1.formatNumber)(1.1234, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('1.123');
                expect((0, index_1.formatNumber)(1.123456, core_1.ɵDEFAULT_LOCALE_ID, '.2')).toEqual('1.123');
                expect((0, index_1.formatNumber)(1.123456, core_1.ɵDEFAULT_LOCALE_ID, '.4')).toEqual('1.1235');
                expect((0, index_1.formatNumber)(1e100, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('1E+100');
            });
            it('should throw if minFractionDigits is explicitly higher than maxFractionDigits', () => {
                expect(() => (0, index_1.formatNumber)(1.1, core_1.ɵDEFAULT_LOCALE_ID, '3.4-2')).toThrowError(/is higher than the maximum/);
            });
        });
        describe('transform with custom locales', () => {
            it('should return the correct format for es-US', () => {
                expect((0, index_1.formatNumber)(9999999.99, 'es-US', '1.2-2')).toEqual('9,999,999.99');
            });
            it('should support non-normalized locales', () => {
                expect((0, index_1.formatNumber)(12345, 'en-US')).toEqual('12,345');
                expect((0, index_1.formatNumber)(12345, 'en_US')).toEqual('12,345');
                expect((0, index_1.formatNumber)(12345, 'en_us')).toEqual('12,345');
            });
        });
    });
    describe('Percent', () => {
        describe('transform', () => {
            it('should return correct value for numbers', () => {
                expect((0, index_1.formatPercent)(1.23, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('123%');
                expect((0, index_1.formatPercent)(1.2, core_1.ɵDEFAULT_LOCALE_ID, '.2')).toEqual('120.00%');
                expect((0, index_1.formatPercent)(1.2, core_1.ɵDEFAULT_LOCALE_ID, '4.2')).toEqual('0,120.00%');
                expect((0, index_1.formatPercent)(0, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('0%');
                expect((0, index_1.formatPercent)(-0, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('0%');
                expect((0, index_1.formatPercent)(1.2, 'fr', '4.2')).toEqual('0\u202f120,00 %');
                expect((0, index_1.formatPercent)(1.2, 'ar', '4.2')).toEqual('0,120.00‎%‎');
                // see issue #20136
                expect((0, index_1.formatPercent)(0.12345674, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('12.345674%');
                expect((0, index_1.formatPercent)(0, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('0%');
                expect((0, index_1.formatPercent)(0.0, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('0%');
                expect((0, index_1.formatPercent)(1, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('100%');
                expect((0, index_1.formatPercent)(0.1, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('10%');
                expect((0, index_1.formatPercent)(0.12, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('12%');
                expect((0, index_1.formatPercent)(0.123, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('12.3%');
                expect((0, index_1.formatPercent)(12.3456, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('1,234.56%');
                expect((0, index_1.formatPercent)(12.3456, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('1,234.56%');
                expect((0, index_1.formatPercent)(12.345699999, core_1.ɵDEFAULT_LOCALE_ID, '0.0-6')).toEqual('1,234.57%');
                expect((0, index_1.formatPercent)(12.345699999, core_1.ɵDEFAULT_LOCALE_ID, '0.4-6')).toEqual('1,234.5700%');
                expect((0, index_1.formatPercent)(100, core_1.ɵDEFAULT_LOCALE_ID, '0.4-6')).toEqual('10,000.0000%');
                expect((0, index_1.formatPercent)(100, core_1.ɵDEFAULT_LOCALE_ID, '0.0-10')).toEqual('10,000%');
                expect((0, index_1.formatPercent)(1.5e2, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('15,000%');
                expect((0, index_1.formatPercent)(1e100, core_1.ɵDEFAULT_LOCALE_ID)).toEqual('1E+102%');
            });
            it('should support non-normalized locales', () => {
                expect((0, index_1.formatPercent)(1.23, 'en-US')).toEqual('123%');
                expect((0, index_1.formatPercent)(1.23, 'en_US')).toEqual('123%');
                expect((0, index_1.formatPercent)(1.23, 'en_us')).toEqual('123%');
            });
        });
    });
    describe('Currency', () => {
        const defaultCurrencyCode = 'USD';
        describe('transform', () => {
            it('should return correct value for numbers', () => {
                expect((0, index_1.formatCurrency)(123, core_1.ɵDEFAULT_LOCALE_ID, '$')).toEqual('$123.00');
                expect((0, index_1.formatCurrency)(12, core_1.ɵDEFAULT_LOCALE_ID, 'EUR', 'EUR', '.1')).toEqual('EUR12.0');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, defaultCurrencyCode, defaultCurrencyCode, '.0-3')).toEqual('USD5.123');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, defaultCurrencyCode)).toEqual('USD5.12');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, '$')).toEqual('$5.12');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'CA$')).toEqual('CA$5.12');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, '$')).toEqual('$5.12');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, '$', defaultCurrencyCode, '5.2-2')).toEqual('$00,005.12');
                expect((0, index_1.formatCurrency)(5.1234, 'fr', '$', defaultCurrencyCode, '5.2-2')).toEqual('00\u202f005,12 $');
                expect((0, index_1.formatCurrency)(5, 'fr', '$US', defaultCurrencyCode)).toEqual('5,00 $US');
            });
            it('should support any currency code name', () => {
                // currency code is unknown, default formatting options will be used
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'unexisting_ISO_code')).toEqual('unexisting_ISO_code5.12');
                // currency code is USD, the pipe will format based on USD but will display "Custom name"
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'Custom name')).toEqual('Custom name5.12');
            });
            it('should round to the default number of digits if no digitsInfo', () => {
                // GNF has a default number of digits of 0
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'GNF', 'GNF')).toEqual('GNF5');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'GNF', 'GNF', '.2')).toEqual('GNF5.12');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'Custom name', 'GNF')).toEqual('Custom name5');
                // BHD has a default number of digits of 3
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'BHD', 'BHD')).toEqual('BHD5.123');
                expect((0, index_1.formatCurrency)(5.1234, core_1.ɵDEFAULT_LOCALE_ID, 'BHD', 'BHD', '.1-2')).toEqual('BHD5.12');
            });
            it('should support non-normalized locales', () => {
                expect((0, index_1.formatCurrency)(12345, 'en-US', 'USD')).toEqual('USD12,345.00');
                expect((0, index_1.formatCurrency)(12345, 'en_US', 'USD')).toEqual('USD12,345.00');
                expect((0, index_1.formatCurrency)(12345, 'en_us', 'USD')).toEqual('USD12,345.00');
            });
        });
    });
});
