"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObservable = toObservable;
const core_1 = require("../../src/core");
const rxjs_1 = require("rxjs");
/**
 * Exposes the value of an Angular `Signal` as an RxJS `Observable`.
 *
 * The signal's value will be propagated into the `Observable`'s subscribers using an `effect`.
 *
 * `toObservable` must be called in an injection context unless an injector is provided via options.
 *
 * @publicApi 20.0
 */
function toObservable(source, options) {
    var _a;
    !(options === null || options === void 0 ? void 0 : options.injector) && (0, core_1.assertInInjectionContext)(toObservable);
    const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, core_1.inject)(core_1.Injector);
    const subject = new rxjs_1.ReplaySubject(1);
    const watcher = (0, core_1.effect)(() => {
        let value;
        try {
            value = source();
        }
        catch (err) {
            (0, core_1.untracked)(() => subject.error(err));
            return;
        }
        (0, core_1.untracked)(() => subject.next(value));
    }, { injector, manualCleanup: true });
    injector.get(core_1.DestroyRef).onDestroy(() => {
        watcher.destroy();
        subject.complete();
    });
    return subject.asObservable();
}
