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
const en_1 = __importDefault(require("../../locales/en"));
const en_AU_1 = __importDefault(require("../../locales/en-AU"));
const fr_1 = __importDefault(require("../../locales/fr"));
const he_1 = __importDefault(require("../../locales/he"));
const zh_1 = __importDefault(require("../../locales/zh"));
const core_1 = require("@angular/core");
const __1 = require("../..");
describe('locale data api', () => {
    beforeAll(() => {
        (0, core_1.ɵregisterLocaleData)(en_1.default);
        (0, core_1.ɵregisterLocaleData)(fr_1.default);
        (0, core_1.ɵregisterLocaleData)(zh_1.default);
        (0, core_1.ɵregisterLocaleData)(en_AU_1.default);
        (0, core_1.ɵregisterLocaleData)(he_1.default);
    });
    afterAll(() => {
        (0, core_1.ɵunregisterLocaleData)();
    });
    describe('getting currency symbol', () => {
        it('should return the correct symbol', () => {
            expect((0, __1.getCurrencySymbol)('USD', 'wide')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('USD', 'narrow')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('AUD', 'wide')).toEqual('A$');
            expect((0, __1.getCurrencySymbol)('AUD', 'narrow')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('CRC', 'wide')).toEqual('CRC');
            expect((0, __1.getCurrencySymbol)('CRC', 'narrow')).toEqual('₡');
            expect((0, __1.getCurrencySymbol)('unexisting_ISO_code', 'wide')).toEqual('unexisting_ISO_code');
            expect((0, __1.getCurrencySymbol)('unexisting_ISO_code', 'narrow')).toEqual('unexisting_ISO_code');
            expect((0, __1.getCurrencySymbol)('USD', 'wide', 'en-AU')).toEqual('USD');
            expect((0, __1.getCurrencySymbol)('USD', 'narrow', 'en-AU')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('AUD', 'wide', 'en-AU')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('AUD', 'narrow', 'en-AU')).toEqual('$');
            expect((0, __1.getCurrencySymbol)('USD', 'wide', 'fr')).toEqual('$US');
        });
    });
    describe('getNbOfCurrencyDigits', () => {
        it('should return the correct value', () => {
            expect((0, __1.getNumberOfCurrencyDigits)('USD')).toEqual(2);
            expect((0, __1.getNumberOfCurrencyDigits)('GNF')).toEqual(0);
            expect((0, __1.getNumberOfCurrencyDigits)('BHD')).toEqual(3);
            expect((0, __1.getNumberOfCurrencyDigits)('unexisting_ISO_code')).toEqual(2);
        });
    });
    describe('getLastDefinedValue', () => {
        it('should find the last defined date format when format not defined', () => {
            expect((0, __1.getLocaleDateFormat)('zh', __1.FormatWidth.Long)).toEqual('y年M月d日');
        });
    });
    describe('getDirectionality', () => {
        it('should have correct direction for rtl languages', () => {
            expect((0, __1.getLocaleDirection)('he')).toEqual('rtl');
        });
        it('should have correct direction for ltr languages', () => {
            expect((0, __1.getLocaleDirection)('en')).toEqual('ltr');
        });
    });
    describe('getLocaleDayNames', () => {
        it('should return english short list of days', () => {
            expect((0, __1.getLocaleDayNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Short)).toEqual([
                'Su',
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa',
            ]);
        });
        it('should return french short list of days', () => {
            expect((0, __1.getLocaleDayNames)('fr-CA', __1.FormStyle.Format, __1.TranslationWidth.Short)).toEqual([
                'di',
                'lu',
                'ma',
                'me',
                'je',
                've',
                'sa',
            ]);
        });
        it('should return english wide list of days', () => {
            expect((0, __1.getLocaleDayNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Wide)).toEqual([
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ]);
        });
        it('should return french wide list of days', () => {
            expect((0, __1.getLocaleDayNames)('fr-CA', __1.FormStyle.Format, __1.TranslationWidth.Wide)).toEqual([
                'dimanche',
                'lundi',
                'mardi',
                'mercredi',
                'jeudi',
                'vendredi',
                'samedi',
            ]);
        });
        it('should return the full short list of days after manipulations', () => {
            const days = Array.from((0, __1.getLocaleDayNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Short));
            days.splice(2);
            days.push('unexisting_day');
            const newDays = (0, __1.getLocaleDayNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Short);
            expect(newDays.length).toBe(7);
            expect(newDays).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
        });
    });
    describe('getLocaleMonthNames', () => {
        it('should return english abbreviated list of month', () => {
            expect((0, __1.getLocaleMonthNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Abbreviated)).toEqual([
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ]);
        });
        it('should return french abbreviated list of month', () => {
            expect((0, __1.getLocaleMonthNames)('fr-CA', __1.FormStyle.Format, __1.TranslationWidth.Abbreviated)).toEqual([
                'janv.',
                'févr.',
                'mars',
                'avr.',
                'mai',
                'juin',
                'juil.',
                'août',
                'sept.',
                'oct.',
                'nov.',
                'déc.',
            ]);
        });
        it('should return english wide list of month', () => {
            expect((0, __1.getLocaleMonthNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Wide)).toEqual([
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]);
        });
        it('should return french wide list of month', () => {
            expect((0, __1.getLocaleMonthNames)('fr-CA', __1.FormStyle.Format, __1.TranslationWidth.Wide)).toEqual([
                'janvier',
                'février',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre',
            ]);
        });
        it('should return the full abbreviated list of month after manipulations', () => {
            const month = Array.from((0, __1.getLocaleMonthNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Abbreviated));
            month.splice(2);
            month.push('unexisting_month');
            const newMonth = (0, __1.getLocaleMonthNames)('en-US', __1.FormStyle.Format, __1.TranslationWidth.Abbreviated);
            expect(newMonth.length).toBe(12);
            expect(newMonth).toEqual([
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ]);
        });
    });
});
