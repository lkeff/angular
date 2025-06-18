"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgTemplateOutlet = exports.NgSwitchDefault = exports.NgSwitchCase = exports.NgSwitch = exports.NgStyle = exports.NgPluralCase = exports.NgPlural = exports.NgIfContext = exports.NgIf = exports.NgForOfContext = exports.NgForOf = exports.NgFor = exports.NgClass = exports.CommonModule = exports.ɵparseCookieValue = exports.getLocaleDirection = exports.getLocaleCurrencySymbol = exports.getLocaleCurrencyName = exports.getLocaleCurrencyCode = exports.getLocaleNumberFormat = exports.getLocaleNumberSymbol = exports.getLocaleTimeFormat = exports.getLocalePluralCase = exports.getLocaleExtraDayPeriods = exports.getLocaleExtraDayPeriodRules = exports.getLocaleDateTimeFormat = exports.getLocaleDateFormat = exports.getLocaleFirstDayOfWeek = exports.getLocaleWeekEndRange = exports.getLocaleEraNames = exports.getLocaleId = exports.getLocaleMonthNames = exports.getLocaleDayNames = exports.getLocaleDayPeriods = exports.getCurrencySymbol = exports.getNumberOfCurrencyDigits = exports.WeekDay = exports.NumberSymbol = exports.FormatWidth = exports.TranslationWidth = exports.FormStyle = exports.NumberFormatStyle = exports.Plural = exports.registerLocaleData = exports.NgLocalization = exports.NgLocaleLocalization = exports.formatPercent = exports.formatNumber = exports.formatCurrency = exports.formatDate = void 0;
exports.DOCUMENT = exports.ɵnormalizeQueryParams = exports.provideNetlifyLoader = exports.provideImgixLoader = exports.provideImageKitLoader = exports.provideCloudinaryLoader = exports.provideCloudflareLoader = exports.PRECONNECT_CHECK_BLOCKLIST = exports.NgOptimizedImage = exports.IMAGE_LOADER = exports.ImageConfig = exports.IMAGE_CONFIG = exports.XhrFactory = exports.ɵNullViewportScroller = exports.ViewportScroller = exports.VERSION = exports.isPlatformServer = exports.isPlatformBrowser = exports.ɵPLATFORM_SERVER_ID = exports.ɵPLATFORM_BROWSER_ID = exports.KeyValuePipe = exports.TitleCasePipe = exports.UpperCasePipe = exports.SlicePipe = exports.PercentPipe = exports.DecimalPipe = exports.CurrencyPipe = exports.LowerCasePipe = exports.JsonPipe = exports.I18nSelectPipe = exports.I18nPluralPipe = exports.DATE_PIPE_DEFAULT_OPTIONS = exports.DATE_PIPE_DEFAULT_TIMEZONE = exports.DatePipe = exports.AsyncPipe = exports.NgComponentOutlet = void 0;
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
__exportStar(require("./private_export"), exports);
__exportStar(require("./location/index"), exports);
var format_date_1 = require("./i18n/format_date");
Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return format_date_1.formatDate; } });
var format_number_1 = require("./i18n/format_number");
Object.defineProperty(exports, "formatCurrency", { enumerable: true, get: function () { return format_number_1.formatCurrency; } });
Object.defineProperty(exports, "formatNumber", { enumerable: true, get: function () { return format_number_1.formatNumber; } });
Object.defineProperty(exports, "formatPercent", { enumerable: true, get: function () { return format_number_1.formatPercent; } });
var localization_1 = require("./i18n/localization");
Object.defineProperty(exports, "NgLocaleLocalization", { enumerable: true, get: function () { return localization_1.NgLocaleLocalization; } });
Object.defineProperty(exports, "NgLocalization", { enumerable: true, get: function () { return localization_1.NgLocalization; } });
var locale_data_1 = require("./i18n/locale_data");
Object.defineProperty(exports, "registerLocaleData", { enumerable: true, get: function () { return locale_data_1.registerLocaleData; } });
var locale_data_api_1 = require("./i18n/locale_data_api");
Object.defineProperty(exports, "Plural", { enumerable: true, get: function () { return locale_data_api_1.Plural; } });
Object.defineProperty(exports, "NumberFormatStyle", { enumerable: true, get: function () { return locale_data_api_1.NumberFormatStyle; } });
Object.defineProperty(exports, "FormStyle", { enumerable: true, get: function () { return locale_data_api_1.FormStyle; } });
Object.defineProperty(exports, "TranslationWidth", { enumerable: true, get: function () { return locale_data_api_1.TranslationWidth; } });
Object.defineProperty(exports, "FormatWidth", { enumerable: true, get: function () { return locale_data_api_1.FormatWidth; } });
Object.defineProperty(exports, "NumberSymbol", { enumerable: true, get: function () { return locale_data_api_1.NumberSymbol; } });
Object.defineProperty(exports, "WeekDay", { enumerable: true, get: function () { return locale_data_api_1.WeekDay; } });
Object.defineProperty(exports, "getNumberOfCurrencyDigits", { enumerable: true, get: function () { return locale_data_api_1.getNumberOfCurrencyDigits; } });
Object.defineProperty(exports, "getCurrencySymbol", { enumerable: true, get: function () { return locale_data_api_1.getCurrencySymbol; } });
Object.defineProperty(exports, "getLocaleDayPeriods", { enumerable: true, get: function () { return locale_data_api_1.getLocaleDayPeriods; } });
Object.defineProperty(exports, "getLocaleDayNames", { enumerable: true, get: function () { return locale_data_api_1.getLocaleDayNames; } });
Object.defineProperty(exports, "getLocaleMonthNames", { enumerable: true, get: function () { return locale_data_api_1.getLocaleMonthNames; } });
Object.defineProperty(exports, "getLocaleId", { enumerable: true, get: function () { return locale_data_api_1.getLocaleId; } });
Object.defineProperty(exports, "getLocaleEraNames", { enumerable: true, get: function () { return locale_data_api_1.getLocaleEraNames; } });
Object.defineProperty(exports, "getLocaleWeekEndRange", { enumerable: true, get: function () { return locale_data_api_1.getLocaleWeekEndRange; } });
Object.defineProperty(exports, "getLocaleFirstDayOfWeek", { enumerable: true, get: function () { return locale_data_api_1.getLocaleFirstDayOfWeek; } });
Object.defineProperty(exports, "getLocaleDateFormat", { enumerable: true, get: function () { return locale_data_api_1.getLocaleDateFormat; } });
Object.defineProperty(exports, "getLocaleDateTimeFormat", { enumerable: true, get: function () { return locale_data_api_1.getLocaleDateTimeFormat; } });
Object.defineProperty(exports, "getLocaleExtraDayPeriodRules", { enumerable: true, get: function () { return locale_data_api_1.getLocaleExtraDayPeriodRules; } });
Object.defineProperty(exports, "getLocaleExtraDayPeriods", { enumerable: true, get: function () { return locale_data_api_1.getLocaleExtraDayPeriods; } });
Object.defineProperty(exports, "getLocalePluralCase", { enumerable: true, get: function () { return locale_data_api_1.getLocalePluralCase; } });
Object.defineProperty(exports, "getLocaleTimeFormat", { enumerable: true, get: function () { return locale_data_api_1.getLocaleTimeFormat; } });
Object.defineProperty(exports, "getLocaleNumberSymbol", { enumerable: true, get: function () { return locale_data_api_1.getLocaleNumberSymbol; } });
Object.defineProperty(exports, "getLocaleNumberFormat", { enumerable: true, get: function () { return locale_data_api_1.getLocaleNumberFormat; } });
Object.defineProperty(exports, "getLocaleCurrencyCode", { enumerable: true, get: function () { return locale_data_api_1.getLocaleCurrencyCode; } });
Object.defineProperty(exports, "getLocaleCurrencyName", { enumerable: true, get: function () { return locale_data_api_1.getLocaleCurrencyName; } });
Object.defineProperty(exports, "getLocaleCurrencySymbol", { enumerable: true, get: function () { return locale_data_api_1.getLocaleCurrencySymbol; } });
Object.defineProperty(exports, "getLocaleDirection", { enumerable: true, get: function () { return locale_data_api_1.getLocaleDirection; } });
var cookie_1 = require("./cookie");
Object.defineProperty(exports, "\u0275parseCookieValue", { enumerable: true, get: function () { return cookie_1.parseCookieValue; } });
var common_module_1 = require("./common_module");
Object.defineProperty(exports, "CommonModule", { enumerable: true, get: function () { return common_module_1.CommonModule; } });
var index_1 = require("./directives/index");
Object.defineProperty(exports, "NgClass", { enumerable: true, get: function () { return index_1.NgClass; } });
Object.defineProperty(exports, "NgFor", { enumerable: true, get: function () { return index_1.NgFor; } });
Object.defineProperty(exports, "NgForOf", { enumerable: true, get: function () { return index_1.NgForOf; } });
Object.defineProperty(exports, "NgForOfContext", { enumerable: true, get: function () { return index_1.NgForOfContext; } });
Object.defineProperty(exports, "NgIf", { enumerable: true, get: function () { return index_1.NgIf; } });
Object.defineProperty(exports, "NgIfContext", { enumerable: true, get: function () { return index_1.NgIfContext; } });
Object.defineProperty(exports, "NgPlural", { enumerable: true, get: function () { return index_1.NgPlural; } });
Object.defineProperty(exports, "NgPluralCase", { enumerable: true, get: function () { return index_1.NgPluralCase; } });
Object.defineProperty(exports, "NgStyle", { enumerable: true, get: function () { return index_1.NgStyle; } });
Object.defineProperty(exports, "NgSwitch", { enumerable: true, get: function () { return index_1.NgSwitch; } });
Object.defineProperty(exports, "NgSwitchCase", { enumerable: true, get: function () { return index_1.NgSwitchCase; } });
Object.defineProperty(exports, "NgSwitchDefault", { enumerable: true, get: function () { return index_1.NgSwitchDefault; } });
Object.defineProperty(exports, "NgTemplateOutlet", { enumerable: true, get: function () { return index_1.NgTemplateOutlet; } });
Object.defineProperty(exports, "NgComponentOutlet", { enumerable: true, get: function () { return index_1.NgComponentOutlet; } });
var index_2 = require("./pipes/index");
Object.defineProperty(exports, "AsyncPipe", { enumerable: true, get: function () { return index_2.AsyncPipe; } });
Object.defineProperty(exports, "DatePipe", { enumerable: true, get: function () { return index_2.DatePipe; } });
Object.defineProperty(exports, "DATE_PIPE_DEFAULT_TIMEZONE", { enumerable: true, get: function () { return index_2.DATE_PIPE_DEFAULT_TIMEZONE; } });
Object.defineProperty(exports, "DATE_PIPE_DEFAULT_OPTIONS", { enumerable: true, get: function () { return index_2.DATE_PIPE_DEFAULT_OPTIONS; } });
Object.defineProperty(exports, "I18nPluralPipe", { enumerable: true, get: function () { return index_2.I18nPluralPipe; } });
Object.defineProperty(exports, "I18nSelectPipe", { enumerable: true, get: function () { return index_2.I18nSelectPipe; } });
Object.defineProperty(exports, "JsonPipe", { enumerable: true, get: function () { return index_2.JsonPipe; } });
Object.defineProperty(exports, "LowerCasePipe", { enumerable: true, get: function () { return index_2.LowerCasePipe; } });
Object.defineProperty(exports, "CurrencyPipe", { enumerable: true, get: function () { return index_2.CurrencyPipe; } });
Object.defineProperty(exports, "DecimalPipe", { enumerable: true, get: function () { return index_2.DecimalPipe; } });
Object.defineProperty(exports, "PercentPipe", { enumerable: true, get: function () { return index_2.PercentPipe; } });
Object.defineProperty(exports, "SlicePipe", { enumerable: true, get: function () { return index_2.SlicePipe; } });
Object.defineProperty(exports, "UpperCasePipe", { enumerable: true, get: function () { return index_2.UpperCasePipe; } });
Object.defineProperty(exports, "TitleCasePipe", { enumerable: true, get: function () { return index_2.TitleCasePipe; } });
Object.defineProperty(exports, "KeyValuePipe", { enumerable: true, get: function () { return index_2.KeyValuePipe; } });
var platform_id_1 = require("./platform_id");
Object.defineProperty(exports, "\u0275PLATFORM_BROWSER_ID", { enumerable: true, get: function () { return platform_id_1.PLATFORM_BROWSER_ID; } });
Object.defineProperty(exports, "\u0275PLATFORM_SERVER_ID", { enumerable: true, get: function () { return platform_id_1.PLATFORM_SERVER_ID; } });
Object.defineProperty(exports, "isPlatformBrowser", { enumerable: true, get: function () { return platform_id_1.isPlatformBrowser; } });
Object.defineProperty(exports, "isPlatformServer", { enumerable: true, get: function () { return platform_id_1.isPlatformServer; } });
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var viewport_scroller_1 = require("./viewport_scroller");
Object.defineProperty(exports, "ViewportScroller", { enumerable: true, get: function () { return viewport_scroller_1.ViewportScroller; } });
Object.defineProperty(exports, "\u0275NullViewportScroller", { enumerable: true, get: function () { return viewport_scroller_1.NullViewportScroller; } });
var xhr_1 = require("./xhr");
Object.defineProperty(exports, "XhrFactory", { enumerable: true, get: function () { return xhr_1.XhrFactory; } });
var ng_optimized_image_1 = require("./directives/ng_optimized_image");
Object.defineProperty(exports, "IMAGE_CONFIG", { enumerable: true, get: function () { return ng_optimized_image_1.IMAGE_CONFIG; } });
Object.defineProperty(exports, "ImageConfig", { enumerable: true, get: function () { return ng_optimized_image_1.ImageConfig; } });
Object.defineProperty(exports, "IMAGE_LOADER", { enumerable: true, get: function () { return ng_optimized_image_1.IMAGE_LOADER; } });
Object.defineProperty(exports, "NgOptimizedImage", { enumerable: true, get: function () { return ng_optimized_image_1.NgOptimizedImage; } });
Object.defineProperty(exports, "PRECONNECT_CHECK_BLOCKLIST", { enumerable: true, get: function () { return ng_optimized_image_1.PRECONNECT_CHECK_BLOCKLIST; } });
Object.defineProperty(exports, "provideCloudflareLoader", { enumerable: true, get: function () { return ng_optimized_image_1.provideCloudflareLoader; } });
Object.defineProperty(exports, "provideCloudinaryLoader", { enumerable: true, get: function () { return ng_optimized_image_1.provideCloudinaryLoader; } });
Object.defineProperty(exports, "provideImageKitLoader", { enumerable: true, get: function () { return ng_optimized_image_1.provideImageKitLoader; } });
Object.defineProperty(exports, "provideImgixLoader", { enumerable: true, get: function () { return ng_optimized_image_1.provideImgixLoader; } });
Object.defineProperty(exports, "provideNetlifyLoader", { enumerable: true, get: function () { return ng_optimized_image_1.provideNetlifyLoader; } });
var util_1 = require("./location/util");
Object.defineProperty(exports, "\u0275normalizeQueryParams", { enumerable: true, get: function () { return util_1.normalizeQueryParams; } });
// Backwards compatibility re-export.
var core_1 = require("@angular/core");
Object.defineProperty(exports, "DOCUMENT", { enumerable: true, get: function () { return core_1.DOCUMENT; } });
