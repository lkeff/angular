"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_PIPES = exports.UpperCasePipe = exports.TitleCasePipe = exports.SlicePipe = exports.PercentPipe = exports.LowerCasePipe = exports.KeyValuePipe = exports.JsonPipe = exports.I18nSelectPipe = exports.I18nPluralPipe = exports.DecimalPipe = exports.DatePipe = exports.DATE_PIPE_DEFAULT_TIMEZONE = exports.DATE_PIPE_DEFAULT_OPTIONS = exports.CurrencyPipe = exports.AsyncPipe = void 0;
/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
const async_pipe_1 = require("./async_pipe");
Object.defineProperty(exports, "AsyncPipe", { enumerable: true, get: function () { return async_pipe_1.AsyncPipe; } });
const case_conversion_pipes_1 = require("./case_conversion_pipes");
Object.defineProperty(exports, "LowerCasePipe", { enumerable: true, get: function () { return case_conversion_pipes_1.LowerCasePipe; } });
Object.defineProperty(exports, "TitleCasePipe", { enumerable: true, get: function () { return case_conversion_pipes_1.TitleCasePipe; } });
Object.defineProperty(exports, "UpperCasePipe", { enumerable: true, get: function () { return case_conversion_pipes_1.UpperCasePipe; } });
const date_pipe_1 = require("./date_pipe");
Object.defineProperty(exports, "DATE_PIPE_DEFAULT_OPTIONS", { enumerable: true, get: function () { return date_pipe_1.DATE_PIPE_DEFAULT_OPTIONS; } });
Object.defineProperty(exports, "DATE_PIPE_DEFAULT_TIMEZONE", { enumerable: true, get: function () { return date_pipe_1.DATE_PIPE_DEFAULT_TIMEZONE; } });
Object.defineProperty(exports, "DatePipe", { enumerable: true, get: function () { return date_pipe_1.DatePipe; } });
const i18n_plural_pipe_1 = require("./i18n_plural_pipe");
Object.defineProperty(exports, "I18nPluralPipe", { enumerable: true, get: function () { return i18n_plural_pipe_1.I18nPluralPipe; } });
const i18n_select_pipe_1 = require("./i18n_select_pipe");
Object.defineProperty(exports, "I18nSelectPipe", { enumerable: true, get: function () { return i18n_select_pipe_1.I18nSelectPipe; } });
const json_pipe_1 = require("./json_pipe");
Object.defineProperty(exports, "JsonPipe", { enumerable: true, get: function () { return json_pipe_1.JsonPipe; } });
const keyvalue_pipe_1 = require("./keyvalue_pipe");
Object.defineProperty(exports, "KeyValuePipe", { enumerable: true, get: function () { return keyvalue_pipe_1.KeyValuePipe; } });
const number_pipe_1 = require("./number_pipe");
Object.defineProperty(exports, "CurrencyPipe", { enumerable: true, get: function () { return number_pipe_1.CurrencyPipe; } });
Object.defineProperty(exports, "DecimalPipe", { enumerable: true, get: function () { return number_pipe_1.DecimalPipe; } });
Object.defineProperty(exports, "PercentPipe", { enumerable: true, get: function () { return number_pipe_1.PercentPipe; } });
const slice_pipe_1 = require("./slice_pipe");
Object.defineProperty(exports, "SlicePipe", { enumerable: true, get: function () { return slice_pipe_1.SlicePipe; } });
/**
 * A collection of Angular pipes that are likely to be used in each and every application.
 */
exports.COMMON_PIPES = [
    async_pipe_1.AsyncPipe,
    case_conversion_pipes_1.UpperCasePipe,
    case_conversion_pipes_1.LowerCasePipe,
    json_pipe_1.JsonPipe,
    slice_pipe_1.SlicePipe,
    number_pipe_1.DecimalPipe,
    number_pipe_1.PercentPipe,
    case_conversion_pipes_1.TitleCasePipe,
    number_pipe_1.CurrencyPipe,
    date_pipe_1.DatePipe,
    i18n_plural_pipe_1.I18nPluralPipe,
    i18n_select_pipe_1.I18nSelectPipe,
    keyvalue_pipe_1.KeyValuePipe,
];
