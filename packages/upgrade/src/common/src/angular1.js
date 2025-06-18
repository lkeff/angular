"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestability = exports.resumeBootstrap = exports.injector = exports.element = exports.module_ = exports.bootstrap = void 0;
exports.setAngularLib = setAngularLib;
exports.getAngularLib = getAngularLib;
exports.setAngularJSGlobal = setAngularJSGlobal;
exports.getAngularJSGlobal = getAngularJSGlobal;
function noNg() {
    throw new Error('AngularJS v1.x is not loaded!');
}
const noNgElement = (() => noNg());
noNgElement.cleanData = noNg;
let angular = {
    bootstrap: noNg,
    module: noNg,
    element: noNgElement,
    injector: noNg,
    version: undefined,
    resumeBootstrap: noNg,
    getTestability: noNg,
};
try {
    if (window.hasOwnProperty('angular')) {
        angular = window.angular;
    }
}
catch (_a) {
    // ignore in CJS mode.
}
/**
 * @deprecated Use `setAngularJSGlobal` instead.
 *
 * @publicApi
 */
function setAngularLib(ng) {
    setAngularJSGlobal(ng);
}
/**
 * @deprecated Use `getAngularJSGlobal` instead.
 *
 * @publicApi
 */
function getAngularLib() {
    return getAngularJSGlobal();
}
/**
 * Resets the AngularJS global.
 *
 * Used when AngularJS is loaded lazily, and not available on `window`.
 *
 * @publicApi
 */
function setAngularJSGlobal(ng) {
    angular = ng;
}
/**
 * Returns the current AngularJS global.
 *
 * @publicApi
 */
function getAngularJSGlobal() {
    return angular;
}
const bootstrap = (e, modules, config) => angular.bootstrap(e, modules, config);
exports.bootstrap = bootstrap;
// Do not declare as `module` to avoid webpack bug
// (see https://github.com/angular/angular/issues/30050).
const module_ = (prefix, dependencies) => angular.module(prefix, dependencies);
exports.module_ = module_;
exports.element = ((e) => angular.element(e));
exports.element.cleanData = (nodes) => angular.element.cleanData(nodes);
const injector = (modules, strictDi) => angular.injector(modules, strictDi);
exports.injector = injector;
const resumeBootstrap = () => angular.resumeBootstrap();
exports.resumeBootstrap = resumeBootstrap;
const getTestability = (e) => angular.getTestability(e);
exports.getTestability = getTestability;
