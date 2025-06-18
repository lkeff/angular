"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_SEARCH_DIALOG_OPEN = void 0;
const core_1 = require("@angular/core");
exports.IS_SEARCH_DIALOG_OPEN = new core_1.InjectionToken('', {
    providedIn: 'root',
    factory: () => (0, core_1.signal)(false),
});
