"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkedSignal = linkedSignal;
const signals_1 = require("../../../primitives/signals");
const signal_1 = require("./signal");
const identityFn = (v) => v;
function linkedSignal(optionsOrComputation, options) {
    if (typeof optionsOrComputation === 'function') {
        const getter = (0, signals_1.createLinkedSignal)(optionsOrComputation, (identityFn), options === null || options === void 0 ? void 0 : options.equal);
        return upgradeLinkedSignalGetter(getter);
    }
    else {
        const getter = (0, signals_1.createLinkedSignal)(optionsOrComputation.source, optionsOrComputation.computation, optionsOrComputation.equal);
        return upgradeLinkedSignalGetter(getter);
    }
}
function upgradeLinkedSignalGetter(getter) {
    if (ngDevMode) {
        getter.toString = () => `[LinkedSignal: ${getter()}]`;
    }
    const node = getter[signals_1.SIGNAL];
    const upgradedGetter = getter;
    upgradedGetter.set = (newValue) => (0, signals_1.linkedSignalSetFn)(node, newValue);
    upgradedGetter.update = (updateFn) => (0, signals_1.linkedSignalUpdateFn)(node, updateFn);
    upgradedGetter.asReadonly = signal_1.signalAsReadonlyFn.bind(getter);
    return upgradedGetter;
}
