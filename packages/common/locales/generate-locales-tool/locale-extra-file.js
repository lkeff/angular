"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLocaleExtra = generateLocaleExtra;
exports.generateLocaleExtraDataArrayCode = generateLocaleExtraDataArrayCode;
const array_deduplication_1 = require("./array-deduplication");
const day_periods_1 = require("./day-periods");
const file_header_1 = require("./file-header");
const object_stringify_1 = require("./object-stringify");
/**
 * Generate the contents for the extra data file
 */
function generateLocaleExtra(locale, localeData) {
    return `${file_header_1.fileHeader}
const u = undefined;

export default ${generateLocaleExtraDataArrayCode(locale, localeData)};
`;
}
/**
 * Generates the "extra" locale data array (in JS-code as a string) for the given locale.
 *
 * The array follows the data and indices as specified in the `ExtraLocaleDataIndex`
 * enum from `packages/core/src/i18n/locale_data_api.ts`.
 *
 * Extra data currently consists of day period names and rules. The non-extra locale
 * data by default only contains the universal `AM/PM` day period names.
 *
 * NOTE: Instances of `undefined` in the array have been replaced with the `u` identifier.
 *       This identifier is used to shorten the generated code of unprocessed locale files.
 */
function generateLocaleExtraDataArrayCode(locale, localeData) {
    const dayPeriods = (0, day_periods_1.getDayPeriodsNoAmPm)(localeData);
    const dayPeriodRules = (0, day_periods_1.getDayPeriodRules)(localeData);
    // The JSON data for some locales may include `dayPeriods` for which no rule is defined in
    // `dayPeriodRules`. Ignore `dayPeriods` keys that lack a corresponding rule.
    //
    // As of CLDR v41, `hi-Latn` is the only locale that is affected by this issue and it is currently
    // not clear whether it is a bug on intended behavior. This is being tracked in
    // https://unicode-org.atlassian.net/browse/CLDR-15563.
    //
    // TODO(gkalpak): If this turns out to be a bug and is fixed in CLDR, restore the previous logic
    //                of expecting the exact same keys in `dayPeriods` and `dayPeriodRules`.
    const dayPeriodKeys = Object.keys(dayPeriods.format.narrow).filter((key) => dayPeriodRules.hasOwnProperty(key));
    let dayPeriodsSupplemental = [];
    if (dayPeriodKeys.length) {
        if (dayPeriodKeys.length !== Object.keys(dayPeriodRules).length) {
            throw new Error(`Error: locale ${locale} has an incorrect number of day period rules`);
        }
        const dayPeriodsFormat = (0, array_deduplication_1.removeDuplicates)([
            getValuesForKeys(dayPeriodKeys, dayPeriods.format.narrow),
            getValuesForKeys(dayPeriodKeys, dayPeriods.format.abbreviated),
            getValuesForKeys(dayPeriodKeys, dayPeriods.format.wide),
        ]);
        const dayPeriodsStandalone = (0, array_deduplication_1.removeDuplicates)([
            getValuesForKeys(dayPeriodKeys, dayPeriods['stand-alone'].narrow),
            getValuesForKeys(dayPeriodKeys, dayPeriods['stand-alone'].abbreviated),
            getValuesForKeys(dayPeriodKeys, dayPeriods['stand-alone'].wide),
        ]);
        const rules = getValuesForKeys(dayPeriodKeys, dayPeriodRules);
        dayPeriodsSupplemental = [...(0, array_deduplication_1.removeDuplicates)([dayPeriodsFormat, dayPeriodsStandalone]), rules];
    }
    return (0, object_stringify_1.stringify)(dayPeriodsSupplemental).replace(/undefined/g, 'u');
}
function getValuesForKeys(keys, obj) {
    return keys.map((key) => obj[key]);
}
