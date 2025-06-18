"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BINDING = void 0;
exports.inputBinding = inputBinding;
exports.outputBinding = outputBinding;
exports.twoWayBinding = twoWayBinding;
const errors_1 = require("../errors");
const assert_1 = require("../util/assert");
const bindings_1 = require("./bindings");
const shared_1 = require("./instructions/shared");
const view_1 = require("./interfaces/view");
const state_1 = require("./state");
const stringify_utils_1 = require("./util/stringify_utils");
const directive_outputs_1 = require("./view/directive_outputs");
/** Symbol used to store and retrieve metadata about a binding. */
exports.BINDING = Symbol('BINDING');
// These are constant between all the bindings so we can reuse the objects.
const INPUT_BINDING_METADATA = { kind: 'input', requiredVars: 1 };
const OUTPUT_BINDING_METADATA = { kind: 'output', requiredVars: 0 };
// TODO(pk): this is a sketch of an input binding instruction that still needs some cleanups
// - take an index of a directive on TNode (as matched), review all the index mappings that we need to do
// - move more logic to the first creation pass
// - move this function to under the instructions folder
function inputBindingUpdate(targetDirectiveIdx, publicName, value) {
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = lView[view_1.TVIEW];
        const tNode = (0, state_1.getSelectedTNode)();
        // TODO(pk): don't check on each and every binding, just assert in dev mode
        const targetDef = tView.directiveRegistry[targetDirectiveIdx];
        if (ngDevMode && !targetDef) {
            throw new errors_1.RuntimeError(315 /* RuntimeErrorCode.NO_BINDING_TARGET */, `Input binding to property "${publicName}" does not have a target.`);
        }
        // TODO(pk): the hasSet check should be replaced by one-off check in the first creation pass
        const hasSet = (0, shared_1.setDirectiveInput)(tNode, tView, lView, targetDef, publicName, value);
        if (ngDevMode) {
            if (!hasSet) {
                throw new errors_1.RuntimeError(315 /* RuntimeErrorCode.NO_BINDING_TARGET */, `${(0, stringify_utils_1.stringifyForError)(targetDef.type)} does not have an input with a public name of "${publicName}".`);
            }
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, publicName, bindingIndex);
        }
    }
}
/**
 * Creates an input binding.
 * @param publicName Public name of the input to bind to.
 * @param value Callback that returns the current value for the binding. Can be either a signal or
 *   a plain getter function.
 *
 * ### Usage Example
 * In this example we create an instance of the `MyButton` component and bind the value of
 * the `isDisabled` signal to its `disabled` input.
 *
 * ```
 * const isDisabled = signal(false);
 *
 * createComponent(MyButton, {
 *   bindings: [inputBinding('disabled', isDisabled)]
 * });
 * ```
 */
function inputBinding(publicName, value) {
    // Note: ideally we would use a class here, but it seems like they
    // don't get tree shaken when constructed by a function like this.
    const binding = {
        [exports.BINDING]: INPUT_BINDING_METADATA,
        update: () => inputBindingUpdate(binding.targetIdx, publicName, value()),
    };
    return binding;
}
/**
 * Creates an output binding.
 * @param eventName Public name of the output to listen to.
 * @param listener Function to be called when the output emits.
 *
 * ### Usage example
 * In this example we create an instance of the `MyCheckbox` component and listen
 * to its `onChange` event.
 *
 * ```
 * interface CheckboxChange {
 *   value: string;
 * }
 *
 * createComponent(MyCheckbox, {
 *   bindings: [
 *    outputBinding<CheckboxChange>('onChange', event => console.log(event.value))
 *   ],
 * });
 * ```
 */
function outputBinding(eventName, listener) {
    // Note: ideally we would use a class here, but it seems like they
    // don't get tree shaken when constructed by a function like this.
    const binding = {
        [exports.BINDING]: OUTPUT_BINDING_METADATA,
        create: () => {
            const lView = (0, state_1.getLView)();
            const tNode = (0, state_1.getCurrentTNode)();
            const tView = lView[view_1.TVIEW];
            const targetDef = tView.directiveRegistry[binding.targetIdx];
            (0, directive_outputs_1.createOutputListener)(tNode, lView, listener, targetDef, eventName);
        },
    };
    return binding;
}
/**
 * Creates a two-way binding.
 * @param eventName Public name of the two-way compatible input.
 * @param value Writable signal from which to get the current value and to which to write new
 * values.
 *
 * ### Usage example
 * In this example we create an instance of the `MyCheckbox` component and bind to its `value`
 * input using a two-way binding.
 *
 * ```
 * const checkboxValue = signal('');
 *
 * createComponent(MyCheckbox, {
 *   bindings: [
 *    twoWayBinding('value', checkboxValue),
 *   ],
 * });
 * ```
 */
function twoWayBinding(publicName, value) {
    const input = inputBinding(publicName, value);
    const output = outputBinding(publicName + 'Change', (eventValue) => value.set(eventValue));
    // We take advantage of inputs only having a `create` block and outputs only having an `update`
    // block by passing them through directly instead of creating dedicated functions here. This
    // assumption can break down if one of them starts targeting both blocks. These assertions
    // are here to help us catch it if something changes in the future.
    ngDevMode && (0, assert_1.assertNotDefined)(input.create, 'Unexpected `create` callback in inputBinding');
    ngDevMode && (0, assert_1.assertNotDefined)(output.update, 'Unexpected `update` callback in outputBinding');
    return {
        [exports.BINDING]: {
            kind: 'twoWay',
            requiredVars: input[exports.BINDING].requiredVars + output[exports.BINDING].requiredVars,
        },
        set targetIdx(idx) {
            input.targetIdx = idx;
            output.targetIdx = idx;
        },
        create: output.create,
        update: input.update,
    };
}
