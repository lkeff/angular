"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputToObservable = outputToObservable;
const core_1 = require("../../src/core");
const rxjs_1 = require("rxjs");
/**
 * Converts an Angular output declared via `output()` or `outputFromObservable()`
 * to an observable.
 *
 * You can subscribe to the output via `Observable.subscribe` then.
 *
 * @publicApi 19.0
 */
function outputToObservable(ref) {
    const destroyRef = (0, core_1.ɵgetOutputDestroyRef)(ref);
    return new rxjs_1.Observable((observer) => {
        // Complete the observable upon directive/component destroy.
        // Note: May be `undefined` if an `EventEmitter` is declared outside
        // of an injection context.
        destroyRef === null || destroyRef === void 0 ? void 0 : destroyRef.onDestroy(() => observer.complete());
        const subscription = ref.subscribe((v) => observer.next(v));
        return () => subscription.unsubscribe();
    });
}
