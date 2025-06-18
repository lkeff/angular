"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCheckNoChangesConfig = provideCheckNoChangesConfig;
const di_1 = require("../di");
const use_exhaustive_check_no_changes_1 = require("./use_exhaustive_check_no_changes");
const exhaustive_check_no_changes_1 = require("./scheduling/exhaustive_check_no_changes");
function provideCheckNoChangesConfig(options) {
    return (0, di_1.makeEnvironmentProviders)(typeof ngDevMode === 'undefined' || ngDevMode
        ? [
            {
                provide: use_exhaustive_check_no_changes_1.UseExhaustiveCheckNoChanges,
                useValue: options.exhaustive,
            },
            (options === null || options === void 0 ? void 0 : options.interval) !== undefined ? (0, exhaustive_check_no_changes_1.exhaustiveCheckNoChangesInterval)(options.interval) : [],
        ]
        : []);
}
