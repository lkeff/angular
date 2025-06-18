"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_TRANSITION_OPTIONS = exports.CREATE_VIEW_TRANSITION = void 0;
exports.createViewTransition = createViewTransition;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
exports.CREATE_VIEW_TRANSITION = new core_1.InjectionToken(ngDevMode ? 'view transition helper' : '');
exports.VIEW_TRANSITION_OPTIONS = new core_1.InjectionToken(ngDevMode ? 'view transition options' : '');
/**
 * A helper function for using browser view transitions. This function skips the call to
 * `startViewTransition` if the browser does not support it.
 *
 * @returns A Promise that resolves when the view transition callback begins.
 */
function createViewTransition(injector, from, to) {
    const transitionOptions = injector.get(exports.VIEW_TRANSITION_OPTIONS);
    const document = injector.get(common_1.DOCUMENT);
    if (!document.startViewTransition || transitionOptions.skipNextTransition) {
        transitionOptions.skipNextTransition = false;
        // The timing of `startViewTransition` is closer to a macrotask. It won't be called
        // until the current event loop exits so we use a promise resolved in a timeout instead
        // of Promise.resolve().
        return new Promise((resolve) => setTimeout(resolve));
    }
    let resolveViewTransitionStarted;
    const viewTransitionStarted = new Promise((resolve) => {
        resolveViewTransitionStarted = resolve;
    });
    const transition = document.startViewTransition(() => {
        resolveViewTransitionStarted();
        // We don't actually update dom within the transition callback. The resolving of the above
        // promise unblocks the Router navigation, which synchronously activates and deactivates
        // routes (the DOM update). This view transition waits for the next change detection to
        // complete (below), which includes the update phase of the routed components.
        return createRenderPromise(injector);
    });
    const { onViewTransitionCreated } = transitionOptions;
    if (onViewTransitionCreated) {
        (0, core_1.runInInjectionContext)(injector, () => onViewTransitionCreated({ transition, from, to }));
    }
    return viewTransitionStarted;
}
/**
 * Creates a promise that resolves after next render.
 */
function createRenderPromise(injector) {
    return new Promise((resolve) => {
        // Wait for the microtask queue to empty after the next render happens (by waiting a macrotask).
        // This ensures any follow-up renders in the microtask queue are completed before the
        // view transition starts animating.
        (0, core_1.afterNextRender)({ read: () => setTimeout(resolve) }, { injector });
    });
}
