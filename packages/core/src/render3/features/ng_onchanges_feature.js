"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵNgOnChangesFeature = void 0;
exports.NgOnChangesFeatureImpl = NgOnChangesFeatureImpl;
const simple_change_1 = require("../../interface/simple_change");
const assert_1 = require("../../util/assert");
const empty_1 = require("../../util/empty");
const apply_value_input_field_1 = require("../apply_value_input_field");
/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```ts
 * static ɵcmp = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature]
 * });
 * ```
 *
 * @codeGenApi
 */
exports.ɵɵNgOnChangesFeature = (() => {
    const ɵɵNgOnChangesFeatureImpl = () => NgOnChangesFeatureImpl;
    // This option ensures that the ngOnChanges lifecycle hook will be inherited
    // from superclasses (in InheritDefinitionFeature).
    /** @nocollapse */
    ɵɵNgOnChangesFeatureImpl.ngInherit = true;
    return ɵɵNgOnChangesFeatureImpl;
})();
function NgOnChangesFeatureImpl(definition) {
    if (definition.type.prototype.ngOnChanges) {
        definition.setInput = ngOnChangesSetInput;
    }
    return rememberChangeHistoryAndInvokeOnChangesHook;
}
/**
 * This is a synthetic lifecycle hook which gets inserted into `TView.preOrderHooks` to simulate
 * `ngOnChanges`.
 *
 * The hook reads the `NgSimpleChangesStore` data from the component instance and if changes are
 * found it invokes `ngOnChanges` on the component instance.
 *
 * @param this Component instance. Because this function gets inserted into `TView.preOrderHooks`,
 *     it is guaranteed to be called with component instance.
 */
function rememberChangeHistoryAndInvokeOnChangesHook() {
    const simpleChangesStore = getSimpleChangesStore(this);
    const current = simpleChangesStore === null || simpleChangesStore === void 0 ? void 0 : simpleChangesStore.current;
    if (current) {
        const previous = simpleChangesStore.previous;
        if (previous === empty_1.EMPTY_OBJ) {
            simpleChangesStore.previous = current;
        }
        else {
            // New changes are copied to the previous store, so that we don't lose history for inputs
            // which were not changed this time
            for (let key in current) {
                previous[key] = current[key];
            }
        }
        simpleChangesStore.current = null;
        this.ngOnChanges(current);
    }
}
function ngOnChangesSetInput(instance, inputSignalNode, value, publicName, privateName) {
    const declaredName = this.declaredInputs[publicName];
    ngDevMode && (0, assert_1.assertString)(declaredName, 'Name of input in ngOnChanges has to be a string');
    const simpleChangesStore = getSimpleChangesStore(instance) ||
        setSimpleChangesStore(instance, { previous: empty_1.EMPTY_OBJ, current: null });
    const current = simpleChangesStore.current || (simpleChangesStore.current = {});
    const previous = simpleChangesStore.previous;
    const previousChange = previous[declaredName];
    current[declaredName] = new simple_change_1.SimpleChange(previousChange && previousChange.currentValue, value, previous === empty_1.EMPTY_OBJ);
    (0, apply_value_input_field_1.applyValueToInputField)(instance, inputSignalNode, privateName, value);
}
const SIMPLE_CHANGES_STORE = '__ngSimpleChanges__';
function getSimpleChangesStore(instance) {
    return instance[SIMPLE_CHANGES_STORE] || null;
}
function setSimpleChangesStore(instance, store) {
    return (instance[SIMPLE_CHANGES_STORE] = store);
}
