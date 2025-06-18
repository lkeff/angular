"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayResponse = delayResponse;
const rxjs_1 = require("rxjs");
// Replaces use of RxJS delay. See v0.5.4.
/** adds specified delay (in ms) to both next and error channels of the response observable */
function delayResponse(response$, delayMs) {
    return new rxjs_1.Observable((observer) => {
        let completePending = false;
        let nextPending = false;
        const subscription = response$.subscribe((value) => {
            nextPending = true;
            setTimeout(() => {
                observer.next(value);
                if (completePending) {
                    observer.complete();
                }
            }, delayMs);
        }, (error) => setTimeout(() => observer.error(error), delayMs), () => {
            completePending = true;
            if (!nextPending) {
                observer.complete();
            }
        });
        return () => {
            return subscription.unsubscribe();
        };
    });
}
