"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomElement = exports.runOutsideAngular = void 0;
exports.isSignal = isSignal;
exports.unwrapSignal = unwrapSignal;
const ng_debug_api_1 = require("./ng-debug-api/ng-debug-api");
const runOutsideAngular = (f) => {
    const w = window;
    if (!w.Zone || !w.Zone.current) {
        f();
        return;
    }
    if (w.Zone.current._name !== 'angular') {
        w.Zone.current.run(f);
        return;
    }
    const parent = w.Zone.current._parent;
    if (parent && parent.run) {
        parent.run(f);
        return;
    }
    f();
};
exports.runOutsideAngular = runOutsideAngular;
const isCustomElement = (node) => {
    if (typeof customElements === 'undefined') {
        return false;
    }
    if (!(node instanceof HTMLElement)) {
        return false;
    }
    const tagName = node.tagName.toLowerCase();
    return !!customElements.get(tagName);
};
exports.isCustomElement = isCustomElement;
function isSignal(prop) {
    const ng = (0, ng_debug_api_1.ngDebugClient)();
    if (!(0, ng_debug_api_1.ngDebugApiIsSupported)(ng, 'isSignal')) {
        return false;
    }
    return window.ng.isSignal(prop);
}
function unwrapSignal(s) {
    return isSignal(s) ? s() : s;
}
