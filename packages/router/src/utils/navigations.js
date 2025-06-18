"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterNextNavigation = afterNextNavigation;
const operators_1 = require("rxjs/operators");
const events_1 = require("../events");
/**
 * Performs the given action once the router finishes its next/current navigation.
 *
 * The navigation is considered complete under the following conditions:
 * - `NavigationCancel` event emits and the code is not `NavigationCancellationCode.Redirect` or
 * `NavigationCancellationCode.SupersededByNewNavigation`. In these cases, the
 * redirecting/superseding navigation must finish.
 * - `NavigationError`, `NavigationEnd`, or `NavigationSkipped` event emits
 */
function afterNextNavigation(router, action) {
    router.events
        .pipe((0, operators_1.filter)((e) => e instanceof events_1.NavigationEnd ||
        e instanceof events_1.NavigationCancel ||
        e instanceof events_1.NavigationError ||
        e instanceof events_1.NavigationSkipped), (0, operators_1.map)((e) => {
        if (e instanceof events_1.NavigationEnd || e instanceof events_1.NavigationSkipped) {
            return 0 /* NavigationResult.COMPLETE */;
        }
        const redirecting = e instanceof events_1.NavigationCancel
            ? e.code === events_1.NavigationCancellationCode.Redirect ||
                e.code === events_1.NavigationCancellationCode.SupersededByNewNavigation
            : false;
        return redirecting ? 2 /* NavigationResult.REDIRECTING */ : 1 /* NavigationResult.FAILED */;
    }), (0, operators_1.filter)((result) => result !== 2 /* NavigationResult.REDIRECTING */), (0, operators_1.take)(1))
        .subscribe(() => {
        action();
    });
}
