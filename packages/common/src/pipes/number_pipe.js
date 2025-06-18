"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyPipe = exports.PercentPipe = exports.DecimalPipe = void 0;
const core_1 = require("@angular/core");
const format_number_1 = require("../i18n/format_number");
const locale_data_api_1 = require("../i18n/locale_data_api");
const invalid_pipe_argument_error_1 = require("./invalid_pipe_argument_error");
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a value according to digit options and locale rules.
 * Locale determines group sizing and separator,
 * decimal point character, and other locale-specific configurations.
 *
 * @see {@link formatNumber}
 *
 * @usageNotes
 *
 * ### digitsInfo
 *
 * The value's decimal representation is specified by the `digitsInfo`
 * parameter, written in the following format:<br>
 *
 * ```
 * {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
 * ```
 *
 *  - `minIntegerDigits`:
 * The minimum number of integer digits before the decimal point.
 * Default is 1.
 *
 * - `minFractionDigits`:
 * The minimum number of digits after the decimal point.
 * Default is 0.
 *
 *  - `maxFractionDigits`:
 * The maximum number of digits after the decimal point.
 * Default is 3.
 *
 * If the formatted value is truncated it will be rounded using the "to-nearest" method:
 *
 * ```
 * {{3.6 | number: '1.0-0'}}
 * <!--will output '4'-->
 *
 * {{-3.6 | number:'1.0-0'}}
 * <!--will output '-4'-->
 * ```
 *
 * ### locale
 *
 * `locale` will format a value according to locale rules.
 * Locale determines group sizing and separator,
 * decimal point character, and other locale-specific configurations.
 *
 * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
 *
 * See [Setting your app locale](guide/i18n/locale-id).
 *
 * ### Example
 *
 * The following code shows how the pipe transforms values
 * according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/number_pipe.ts region='NumberPipe'}
 *
 * @publicApi
 */
let DecimalPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'number',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DecimalPipe = _classThis = class {
        constructor(_locale) {
            this._locale = _locale;
        }
        transform(value, digitsInfo, locale) {
            if (!isValue(value))
                return null;
            locale || (locale = this._locale);
            try {
                const num = strToNumber(value);
                return (0, format_number_1.formatNumber)(num, locale, digitsInfo);
            }
            catch (error) {
                throw (0, invalid_pipe_argument_error_1.invalidPipeArgumentError)(DecimalPipe, error.message);
            }
        }
    };
    __setFunctionName(_classThis, "DecimalPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DecimalPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DecimalPipe = _classThis;
})();
exports.DecimalPipe = DecimalPipe;
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a percentage
 * string, formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * @see {@link formatPercent}
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/percent_pipe.ts region='PercentPipe'}
 *
 * @publicApi
 */
let PercentPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'percent',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PercentPipe = _classThis = class {
        constructor(_locale) {
            this._locale = _locale;
        }
        /**
         *
         * @param value The number to be formatted as a percentage.
         * @param digitsInfo Decimal representation options, specified by a string
         * in the following format:<br>
         * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
         *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
         * Default is `1`.
         *   - `minFractionDigits`: The minimum number of digits after the decimal point.
         * Default is `0`.
         *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
         * Default is `0`.
         * @param locale A locale code for the locale format rules to use.
         * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
         * See [Setting your app locale](guide/i18n/locale-id).
         */
        transform(value, digitsInfo, locale) {
            if (!isValue(value))
                return null;
            locale || (locale = this._locale);
            try {
                const num = strToNumber(value);
                return (0, format_number_1.formatPercent)(num, locale, digitsInfo);
            }
            catch (error) {
                throw (0, invalid_pipe_argument_error_1.invalidPipeArgumentError)(PercentPipe, error.message);
            }
        }
    };
    __setFunctionName(_classThis, "PercentPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PercentPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PercentPipe = _classThis;
})();
exports.PercentPipe = PercentPipe;
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a currency string, formatted according to locale rules
 * that determine group sizing and separator, decimal-point character,
 * and other locale-specific configurations.
 *
 *
 * @see {@link getCurrencySymbol}
 * @see {@link formatCurrency}
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/currency_pipe.ts region='CurrencyPipe'}
 *
 * @publicApi
 */
let CurrencyPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'currency',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CurrencyPipe = _classThis = class {
        constructor(_locale, _defaultCurrencyCode = 'USD') {
            this._locale = _locale;
            this._defaultCurrencyCode = _defaultCurrencyCode;
        }
        transform(value, currencyCode = this._defaultCurrencyCode, display = 'symbol', digitsInfo, locale) {
            if (!isValue(value))
                return null;
            locale || (locale = this._locale);
            if (typeof display === 'boolean') {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    console.warn(`Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".`);
                }
                display = display ? 'symbol' : 'code';
            }
            let currency = currencyCode || this._defaultCurrencyCode;
            if (display !== 'code') {
                if (display === 'symbol' || display === 'symbol-narrow') {
                    currency = (0, locale_data_api_1.getCurrencySymbol)(currency, display === 'symbol' ? 'wide' : 'narrow', locale);
                }
                else {
                    currency = display;
                }
            }
            try {
                const num = strToNumber(value);
                return (0, format_number_1.formatCurrency)(num, locale, currency, currencyCode, digitsInfo);
            }
            catch (error) {
                throw (0, invalid_pipe_argument_error_1.invalidPipeArgumentError)(CurrencyPipe, error.message);
            }
        }
    };
    __setFunctionName(_classThis, "CurrencyPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CurrencyPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CurrencyPipe = _classThis;
})();
exports.CurrencyPipe = CurrencyPipe;
function isValue(value) {
    return !(value == null || value === '' || value !== value);
}
/**
 * Transforms a string into a number (if needed).
 */
function strToNumber(value) {
    // Convert strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new core_1.ɵRuntimeError(2309 /* RuntimeErrorCode.VALUE_NOT_A_NUMBER */, ngDevMode && `${value} is not a number`);
    }
    return value;
}
