"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTap = switchTap;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * Perform a side effect through a switchMap for every emission on the source Observable,
 * but return an Observable that is identical to the source. It's essentially the same as
 * the `tap` operator, but if the side effectful `next` function returns an ObservableInput,
 * it will wait before continuing with the original value.
 */
function switchTap(next) {
    return (0, operators_1.switchMap)((v) => {
        const nextResult = next(v);
        if (nextResult) {
            return (0, rxjs_1.from)(nextResult).pipe((0, operators_1.map)(() => v));
        }
        return (0, rxjs_1.of)(v);
    });
}
