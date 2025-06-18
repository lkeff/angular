"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectImplementation = getInjectImplementation;
exports.setInjectImplementation = setInjectImplementation;
exports.injectRootLimpMode = injectRootLimpMode;
exports.assertInjectImplementationNotEqual = assertInjectImplementationNotEqual;
const errors_di_1 = require("../render3/errors_di");
const assert_1 = require("../util/assert");
const defs_1 = require("./interface/defs");
/**
 * Current implementation of inject.
 *
 * By default, it is `injectInjectorOnly`, which makes it `Injector`-only aware. It can be changed
 * to `directiveInject`, which brings in the `NodeInjector` system of ivy. It is designed this
 * way for two reasons:
 *  1. `Injector` should not depend on ivy logic.
 *  2. To maintain tree shake-ability we don't want to bring in unnecessary code.
 */
let _injectImplementation;
function getInjectImplementation() {
    return _injectImplementation;
}
/**
 * Sets the current inject implementation.
 */
function setInjectImplementation(impl) {
    const previous = _injectImplementation;
    _injectImplementation = impl;
    return previous;
}
/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * injectable definition.
 */
function injectRootLimpMode(token, notFoundValue, flags) {
    const injectableDef = (0, defs_1.getInjectableDef)(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined
            ? (injectableDef.value = injectableDef.factory())
            : injectableDef.value;
    }
    if (flags & 8 /* InternalInjectFlags.Optional */)
        return null;
    if (notFoundValue !== undefined)
        return notFoundValue;
    (0, errors_di_1.throwProviderNotFoundError)(token, 'Injector');
}
/**
 * Assert that `_injectImplementation` is not `fn`.
 *
 * This is useful, to prevent infinite recursion.
 *
 * @param fn Function which it should not equal to
 */
function assertInjectImplementationNotEqual(fn) {
    ngDevMode &&
        (0, assert_1.assertNotEqual)(_injectImplementation, fn, 'Calling ɵɵinject would cause infinite recursion');
}
