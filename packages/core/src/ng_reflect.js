"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NG_REFLECT_ATTRS_FLAG = exports.NG_REFLECT_ATTRS_FLAG_DEFAULT = void 0;
exports.provideNgReflectAttributes = provideNgReflectAttributes;
exports.normalizeDebugBindingName = normalizeDebugBindingName;
exports.normalizeDebugBindingValue = normalizeDebugBindingValue;
const index_1 = require("./di/index");
/** Defines the default value of the `NG_REFLECT_ATTRS_FLAG` flag. */
exports.NG_REFLECT_ATTRS_FLAG_DEFAULT = false;
/**
 * Defines an internal flag that indicates whether the runtime code should be
 * producing `ng-reflect-*` attributes.
 */
exports.NG_REFLECT_ATTRS_FLAG = new index_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'NG_REFLECT_FLAG' : '', {
    providedIn: 'root',
    factory: () => exports.NG_REFLECT_ATTRS_FLAG_DEFAULT,
});
/**
 * Enables the logic to produce `ng-reflect-*` attributes on elements with bindings.
 *
 * Note: this is a dev-mode only setting and it will have no effect in production mode.
 * In production mode, the `ng-reflect-*` attributes are *never* produced by Angular.
 *
 * Important: using and relying on the `ng-reflect-*` attributes is not recommended,
 * they are deprecated and only present for backwards compatibility. Angular will stop
 * producing them in one of the future versions.
 *
 * @publicApi
 */
function provideNgReflectAttributes() {
    const providers = typeof ngDevMode === 'undefined' || ngDevMode
        ? [
            {
                provide: exports.NG_REFLECT_ATTRS_FLAG,
                useValue: true,
            },
        ]
        : [];
    return (0, index_1.makeEnvironmentProviders)(providers);
}
function normalizeDebugBindingName(name) {
    // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
    name = camelCaseToDashCase(name.replace(/[$@]/g, '_'));
    return `ng-reflect-${name}`;
}
const CAMEL_CASE_REGEXP = /([A-Z])/g;
function camelCaseToDashCase(input) {
    return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}
function normalizeDebugBindingValue(value) {
    try {
        // Limit the size of the value as otherwise the DOM just gets polluted.
        return value != null ? value.toString().slice(0, 30) : value;
    }
    catch (e) {
        return '[ERROR] Exception while trying to serialize the value';
    }
}
