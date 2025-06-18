"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
exports.inputFunction = inputFunction;
exports.inputRequiredFunction = inputRequiredFunction;
const di_1 = require("../../di");
const input_signal_1 = require("./input_signal");
const input_signal_node_1 = require("./input_signal_node");
function inputFunction(initialValue, opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(exports.input);
    return (0, input_signal_1.createInputSignal)(initialValue, opts);
}
function inputRequiredFunction(opts) {
    ngDevMode && (0, di_1.assertInInjectionContext)(exports.input);
    return (0, input_signal_1.createInputSignal)(input_signal_node_1.REQUIRED_UNSET_VALUE, opts);
}
/**
 * The `input` function allows declaration of Angular inputs in directives
 * and components.
 *
 * There are two variants of inputs that can be declared:
 *
 *   1. **Optional inputs** with an initial value.
 *   2. **Required inputs** that consumers need to set.
 *
 * By default, the `input` function will declare optional inputs that
 * always have an initial value. Required inputs can be declared
 * using the `input.required()` function.
 *
 * Inputs are signals. The values of an input are exposed as a `Signal`.
 * The signal always holds the latest value of the input that is bound
 * from the parent.
 *
 * @usageNotes
 * To use signal-based inputs, import `input` from `@angular/core`.
 *
 * ```ts
 * import {input} from '@angular/core`;
 * ```
 *
 * Inside your component, introduce a new class member and initialize
 * it with a call to `input` or `input.required`.
 *
 * ```ts
 * @Component({
 *   ...
 * })
 * export class UserProfileComponent {
 *   firstName = input<string>();             // Signal<string|undefined>
 *   lastName  = input.required<string>();    // Signal<string>
 *   age       = input(0)                     // Signal<number>
 * }
 * ```
 *
 * Inside your component template, you can display values of the inputs
 * by calling the signal.
 *
 * ```html
 * <span>{{firstName()}}</span>
 * ```
 *
 * @publicAPI
 * @initializerApiFunction
 */
exports.input = (() => {
    // Note: This may be considered a side-effect, but nothing will depend on
    // this assignment, unless this `input` constant export is accessed. It's a
    // self-contained side effect that is local to the user facing`input` export.
    inputFunction.required = inputRequiredFunction;
    return inputFunction;
})();
