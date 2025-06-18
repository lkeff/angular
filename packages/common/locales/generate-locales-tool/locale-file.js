"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLocale = generateLocale;
exports.generateBasicLocaleString = generateBasicLocaleString;
const array_deduplication_1 = require("./array-deduplication");
const day_periods_1 = require("./day-periods");
const file_header_1 = require("./file-header");
const locale_currencies_1 = require("./locale-currencies");
const object_stringify_1 = require("./object-stringify");
const plural_function_1 = require("./plural-function");
const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
/** Generate contents for the basic locale data file */
function generateLocale(locale, localeData, baseCurrencies) {
    return `${file_header_1.fileHeader}
const u = undefined;

${(0, plural_function_1.getPluralFunction)(localeData)}

export default ${generateBasicLocaleString(locale, localeData, baseCurrencies)};
`;
}
/**
 * Collect up the basic locale data [ localeId, dateTime, number, currency, directionality,
 * pluralCase ].
 */
function generateBasicLocaleString(locale, localeData, baseCurrencies) {
    let data = (0, object_stringify_1.stringify)([
        locale,
        ...getDateTimeTranslations(localeData),
        ...getDateTimeSettings(localeData),
        ...getNumberSettings(localeData),
        ...(0, locale_currencies_1.getCurrencySettings)(locale, localeData),
        (0, locale_currencies_1.generateLocaleCurrencies)(localeData, baseCurrencies),
        getDirectionality(localeData),
    ])
        // We remove "undefined" added by spreading arrays when there is no value
        .replace(/undefined/g, 'u');
    // adding plural function after, because we don't want it as a string. The function named `plural`
    // is expected to be available in the file. See `generateLocale` above.
    data = data.replace(/\]$/, ', plural]');
    return data;
}
/**
 * Returns the writing direction for a locale
 * @returns 'rtl' | 'ltr'
 */
function getDirectionality(localeData) {
    const rtl = localeData.get('scriptMetadata/{script}/rtl');
    return rtl === 'YES' ? 'rtl' : 'ltr';
}
/**
 * Returns dateTime data for a locale
 * @returns [ firstDayOfWeek, weekendRange, formats ]
 */
function getDateTimeSettings(localeData) {
    return [
        getFirstDayOfWeek(localeData),
        getWeekendRange(localeData),
        ...getDateTimeFormats(localeData),
    ];
}
/**
 * Returns the number symbols and formats for a locale
 * @returns [ symbols, formats ]
 * symbols: [ decimal, group, list, percentSign, plusSign, minusSign, exponential,
 * superscriptingExponent, perMille, infinity, nan, timeSeparator, currencyDecimal?, currencyGroup?
 * ]
 * formats: [ currency, decimal, percent, scientific ]
 */
function getNumberSettings(localeData) {
    const decimalFormat = localeData.main('numbers/decimalFormats-numberSystem-latn/standard');
    const percentFormat = localeData.main('numbers/percentFormats-numberSystem-latn/standard');
    const scientificFormat = localeData.main('numbers/scientificFormats-numberSystem-latn/standard');
    const currencyFormat = localeData.main('numbers/currencyFormats-numberSystem-latn/standard');
    const symbols = localeData.main('numbers/symbols-numberSystem-latn');
    const symbolValues = [
        symbols.decimal,
        symbols.group,
        symbols.list,
        symbols.percentSign,
        symbols.plusSign,
        symbols.minusSign,
        symbols.exponential,
        symbols.superscriptingExponent,
        symbols.perMille,
        symbols.infinity,
        symbols.nan,
        symbols.timeSeparator,
    ];
    if (symbols.currencyDecimal || symbols.currencyGroup) {
        symbolValues.push(symbols.currencyDecimal);
    }
    if (symbols.currencyGroup) {
        symbolValues.push(symbols.currencyGroup);
    }
    return [symbolValues, [decimalFormat, percentFormat, currencyFormat, scientificFormat]];
}
/**
 * Returns week-end range for a locale, based on US week days
 * @returns [number, number]
 */
function getWeekendRange(localeData) {
    const startDay = localeData.get(`supplemental/weekData/weekendStart/${localeData.attributes.territory}`) ||
        localeData.get('supplemental/weekData/weekendStart/001');
    const endDay = localeData.get(`supplemental/weekData/weekendEnd/${localeData.attributes.territory}`) ||
        localeData.get('supplemental/weekData/weekendEnd/001');
    return [WEEK_DAYS.indexOf(startDay), WEEK_DAYS.indexOf(endDay)];
}
/**
 * Returns date-related translations for a locale
 * @returns [ dayPeriodsFormat, dayPeriodsStandalone, daysFormat, dayStandalone, monthsFormat,
 * monthsStandalone, eras ]
 * each value: [ narrow, abbreviated, wide, short? ]
 */
function getDateTimeTranslations(localeData) {
    const dayNames = localeData.main(`dates/calendars/gregorian/days`);
    const monthNames = localeData.main(`dates/calendars/gregorian/months`);
    const erasNames = localeData.main(`dates/calendars/gregorian/eras`);
    const dayPeriods = (0, day_periods_1.getDayPeriodsAmPm)(localeData);
    const dayPeriodsFormat = (0, array_deduplication_1.removeDuplicates)([
        Object.values(dayPeriods.format.narrow),
        Object.values(dayPeriods.format.abbreviated),
        Object.values(dayPeriods.format.wide),
    ]);
    const dayPeriodsStandalone = (0, array_deduplication_1.removeDuplicates)([
        Object.values(dayPeriods['stand-alone'].narrow),
        Object.values(dayPeriods['stand-alone'].abbreviated),
        Object.values(dayPeriods['stand-alone'].wide),
    ]);
    const daysFormat = (0, array_deduplication_1.removeDuplicates)([
        Object.values(dayNames.format.narrow),
        Object.values(dayNames.format.abbreviated),
        Object.values(dayNames.format.wide),
        Object.values(dayNames.format.short),
    ]);
    const daysStandalone = (0, array_deduplication_1.removeDuplicates)([
        Object.values(dayNames['stand-alone'].narrow),
        Object.values(dayNames['stand-alone'].abbreviated),
        Object.values(dayNames['stand-alone'].wide),
        Object.values(dayNames['stand-alone'].short),
    ]);
    const monthsFormat = (0, array_deduplication_1.removeDuplicates)([
        Object.values(monthNames.format.narrow),
        Object.values(monthNames.format.abbreviated),
        Object.values(monthNames.format.wide),
    ]);
    const monthsStandalone = (0, array_deduplication_1.removeDuplicates)([
        Object.values(monthNames['stand-alone'].narrow),
        Object.values(monthNames['stand-alone'].abbreviated),
        Object.values(monthNames['stand-alone'].wide),
    ]);
    const eras = (0, array_deduplication_1.removeDuplicates)([
        [erasNames.eraNarrow['0'], erasNames.eraNarrow['1']],
        [erasNames.eraAbbr['0'], erasNames.eraAbbr['1']],
        [erasNames.eraNames['0'], erasNames.eraNames['1']],
    ]);
    const dateTimeTranslations = [
        ...(0, array_deduplication_1.removeDuplicates)([dayPeriodsFormat, dayPeriodsStandalone]),
        ...(0, array_deduplication_1.removeDuplicates)([daysFormat, daysStandalone]),
        ...(0, array_deduplication_1.removeDuplicates)([monthsFormat, monthsStandalone]),
        eras,
    ];
    return dateTimeTranslations;
}
/**
 * Returns date, time and dateTime formats for a locale
 * @returns [dateFormats, timeFormats, dateTimeFormats]
 * each format: [ short, medium, long, full ]
 */
function getDateTimeFormats(localeData) {
    function getFormats(data) {
        return (0, array_deduplication_1.removeDuplicates)([
            data.short._value || data.short,
            data.medium._value || data.medium,
            data.long._value || data.long,
            data.full._value || data.full,
        ]);
    }
    const dateFormats = localeData.main('dates/calendars/gregorian/dateFormats');
    const timeFormats = localeData.main('dates/calendars/gregorian/timeFormats');
    const dateTimeFormats = localeData.main('dates/calendars/gregorian/dateTimeFormats');
    return [getFormats(dateFormats), getFormats(timeFormats), getFormats(dateTimeFormats)];
}
/**
 * Returns the first day of the week, based on US week days
 * @returns number
 */
function getFirstDayOfWeek(localeData) {
    // The `cldrjs` package does not provide proper types for `supplemental`. The
    // types are part of the package but embedded incorrectly and not usable.
    return WEEK_DAYS.indexOf(localeData.supplemental.weekData.firstDay());
}
