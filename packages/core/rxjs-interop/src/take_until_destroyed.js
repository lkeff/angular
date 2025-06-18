"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeUntilDestroyed = takeUntilDestroyed;
const core_1 = require("../../src/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * Operator which completes the Observable when the calling context (component, directive, service,
 * etc) is destroyed.
 *
 * @param destroyRef optionally, the `DestroyRef` representing the current context. This can be
 *     passed explicitly to use `takeUntilDestroyed` outside of an [injection
 * context](guide/di/dependency-injection-context). Otherwise, the current `DestroyRef` is injected.
 *
 * @publicApi 19.0
 */
function takeUntilDestroyed(destroyRef) {
    if (!destroyRef) {
        (0, core_1.assertInInjectionContext)(takeUntilDestroyed);
        destroyRef = (0, core_1.inject)(core_1.DestroyRef);
    }
    const destroyed$ = new rxjs_1.Observable((observer) => {
        const unregisterFn = destroyRef.onDestroy(observer.next.bind(observer));
        return unregisterFn;
    });
    return (source) => {
        return source.pipe((0, operators_1.takeUntil)(destroyed$));
    };
}
