"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputEmitterRef = void 0;
exports.getOutputDestroyRef = getOutputDestroyRef;
const signals_1 = require("../../../primitives/signals");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const error_handler_1 = require("../../error_handler");
const errors_1 = require("../../errors");
const destroy_ref_1 = require("../../linker/destroy_ref");
/**
 * An `OutputEmitterRef` is created by the `output()` function and can be
 * used to emit values to consumers of your directive or component.
 *
 * Consumers of your directive/component can bind to the output and
 * subscribe to changes via the bound event syntax. For example:
 *
 * ```html
 * <my-comp (valueChange)="processNewValue($event)" />
 * ```
 *
 * @publicAPI
 */
class OutputEmitterRef {
    constructor() {
        this.destroyed = false;
        this.listeners = null;
        this.errorHandler = (0, injector_compatibility_1.inject)(error_handler_1.ErrorHandler, { optional: true });
        /** @internal */
        this.destroyRef = (0, injector_compatibility_1.inject)(destroy_ref_1.DestroyRef);
        // Clean-up all listeners and mark as destroyed upon destroy.
        this.destroyRef.onDestroy(() => {
            this.destroyed = true;
            this.listeners = null;
        });
    }
    subscribe(callback) {
        var _a;
        if (this.destroyed) {
            throw new errors_1.RuntimeError(953 /* RuntimeErrorCode.OUTPUT_REF_DESTROYED */, ngDevMode &&
                'Unexpected subscription to destroyed `OutputRef`. ' +
                    'The owning directive/component is destroyed.');
        }
        ((_a = this.listeners) !== null && _a !== void 0 ? _a : (this.listeners = [])).push(callback);
        return {
            unsubscribe: () => {
                var _a, _b;
                const idx = (_a = this.listeners) === null || _a === void 0 ? void 0 : _a.indexOf(callback);
                if (idx !== undefined && idx !== -1) {
                    (_b = this.listeners) === null || _b === void 0 ? void 0 : _b.splice(idx, 1);
                }
            },
        };
    }
    /** Emits a new value to the output. */
    emit(value) {
        var _a;
        if (this.destroyed) {
            console.warn((0, errors_1.formatRuntimeError)(953 /* RuntimeErrorCode.OUTPUT_REF_DESTROYED */, ngDevMode &&
                'Unexpected emit for destroyed `OutputRef`. ' +
                    'The owning directive/component is destroyed.'));
            return;
        }
        if (this.listeners === null) {
            return;
        }
        const previousConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            for (const listenerFn of this.listeners) {
                try {
                    listenerFn(value);
                }
                catch (err) {
                    (_a = this.errorHandler) === null || _a === void 0 ? void 0 : _a.handleError(err);
                }
            }
        }
        finally {
            (0, signals_1.setActiveConsumer)(previousConsumer);
        }
    }
}
exports.OutputEmitterRef = OutputEmitterRef;
/** Gets the owning `DestroyRef` for the given output. */
function getOutputDestroyRef(ref) {
    return ref.destroyRef;
}
