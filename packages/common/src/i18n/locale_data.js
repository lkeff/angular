"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLocaleData = registerLocaleData;
const core_1 = require("@angular/core");
/**
 * Register global data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n/format-data-locale) to know how to import additional locale
 * data.
 *
 * The signature registerLocaleData(data: any, extraData?: any) is deprecated since v5.1
 *
 * @publicApi
 */
function registerLocaleData(data, localeId, extraData) {
    return (0, core_1.ɵregisterLocaleData)(data, localeId, extraData);
}
