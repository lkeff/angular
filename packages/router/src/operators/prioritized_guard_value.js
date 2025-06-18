"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prioritizedGuardValue = prioritizedGuardValue;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const models_1 = require("../models");
const url_tree_1 = require("../url_tree");
const INITIAL_VALUE = /* @__PURE__ */ Symbol('INITIAL_VALUE');
function prioritizedGuardValue() {
    return (0, operators_1.switchMap)((obs) => {
        return (0, rxjs_1.combineLatest)(obs.map((o) => o.pipe((0, operators_1.take)(1), (0, operators_1.startWith)(INITIAL_VALUE)))).pipe((0, operators_1.map)((results) => {
            for (const result of results) {
                if (result === true) {
                    // If result is true, check the next one
                    continue;
                }
                else if (result === INITIAL_VALUE) {
                    // If guard has not finished, we need to stop processing.
                    return INITIAL_VALUE;
                }
                else if (result === false || isRedirect(result)) {
                    // Result finished and was not true. Return the result.
                    // Note that we only allow false/UrlTree/RedirectCommand. Other values are considered invalid and
                    // ignored.
                    return result;
                }
            }
            // Everything resolved to true. Return true.
            return true;
        }), (0, operators_1.filter)((item) => item !== INITIAL_VALUE), (0, operators_1.take)(1));
    });
}
function isRedirect(val) {
    return (0, url_tree_1.isUrlTree)(val) || val instanceof models_1.RedirectCommand;
}
