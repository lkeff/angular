"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngularVersion = exports.appIsSupportedAngularVersion = exports.appIsAngular = exports.appIsAngularIvy = exports.appIsAngularInDevMode = void 0;
exports.isHydrationEnabled = isHydrationEnabled;
const appIsAngularInDevMode = () => {
    return (0, exports.appIsAngular)() && appHasGlobalNgDebugObject();
};
exports.appIsAngularInDevMode = appIsAngularInDevMode;
const appIsAngularIvy = () => {
    const rootElement = window.document.querySelector('[ng-version]');
    return typeof (rootElement === null || rootElement === void 0 ? void 0 : rootElement.__ngContext__) !== 'undefined';
};
exports.appIsAngularIvy = appIsAngularIvy;
const appIsAngular = () => {
    return !!(0, exports.getAngularVersion)();
};
exports.appIsAngular = appIsAngular;
const appIsSupportedAngularVersion = () => {
    const version = (0, exports.getAngularVersion)();
    if (!version) {
        return false;
    }
    const major = parseInt(version.toString().split('.')[0], 10);
    return (0, exports.appIsAngular)() && (major >= 12 || major === 0);
};
exports.appIsSupportedAngularVersion = appIsSupportedAngularVersion;
/**
 * We check if the global `window.ng` is an object and if this object
 * has the `getComponent` or `probe` methods attached to it.
 *
 * `ng.probe` is a view engine method, but to ensure that we correctly
 * detect development mode we need to consider older rendering engines.
 *
 * In some g3 apps processed with Closure, `ng` is a function,
 * which means that `typeof ng !== 'undefined'` is not a sufficient check.
 *
 * @returns if the app has global ng debug object
 */
const appHasGlobalNgDebugObject = () => {
    return (typeof ng === 'object' &&
        (typeof ng.getComponent === 'function' || typeof ng.probe === 'function'));
};
const getAngularVersion = () => {
    const el = document.querySelector('[ng-version]');
    if (!el) {
        return null;
    }
    return el.getAttribute('ng-version');
};
exports.getAngularVersion = getAngularVersion;
function isHydrationEnabled() {
    return Array.from(document.querySelectorAll('[ng-version]')).some((rootNode) => rootNode === null || rootNode === void 0 ? void 0 : rootNode.__ngDebugHydrationInfo__);
}
