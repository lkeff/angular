"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵpureFunction0 = ɵɵpureFunction0;
exports.ɵɵpureFunction1 = ɵɵpureFunction1;
exports.ɵɵpureFunction2 = ɵɵpureFunction2;
exports.ɵɵpureFunction3 = ɵɵpureFunction3;
exports.ɵɵpureFunction4 = ɵɵpureFunction4;
exports.ɵɵpureFunction5 = ɵɵpureFunction5;
exports.ɵɵpureFunction6 = ɵɵpureFunction6;
exports.ɵɵpureFunction7 = ɵɵpureFunction7;
exports.ɵɵpureFunction8 = ɵɵpureFunction8;
exports.ɵɵpureFunctionV = ɵɵpureFunctionV;
exports.pureFunction1Internal = pureFunction1Internal;
exports.pureFunction2Internal = pureFunction2Internal;
exports.pureFunction3Internal = pureFunction3Internal;
exports.pureFunction4Internal = pureFunction4Internal;
exports.pureFunctionVInternal = pureFunctionVInternal;
const assert_1 = require("../util/assert");
const bindings_1 = require("./bindings");
const state_1 = require("./state");
const tokens_1 = require("./tokens");
/**
 * Bindings for pure functions are stored after regular bindings.
 *
 * |-------decls------|---------vars---------|                 |----- hostVars (dir1) ------|
 * ------------------------------------------------------------------------------------------
 * | nodes/refs/pipes | bindings | fn slots  | injector | dir1 | host bindings | host slots |
 * ------------------------------------------------------------------------------------------
 *                    ^                      ^
 *      TView.bindingStartIndex      TView.expandoStartIndex
 *
 * Pure function instructions are given an offset from the binding root. Adding the offset to the
 * binding root gives the first index where the bindings are stored. In component views, the binding
 * root is the bindingStartIndex. In host bindings, the binding root is the expandoStartIndex +
 * any directive instances + any hostVars in directives evaluated before it.
 *
 * See VIEW_DATA.md for more information about host binding resolution.
 */
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns a value
 * @param thisArg Optional calling context of pureFn
 * @returns value
 *
 * @codeGenApi
 */
function ɵɵpureFunction0(slotOffset, pureFn, thisArg) {
    const bindingIndex = (0, state_1.getBindingRoot)() + slotOffset;
    const lView = (0, state_1.getLView)();
    return lView[bindingIndex] === tokens_1.NO_CHANGE
        ? (0, bindings_1.updateBinding)(lView, bindingIndex, thisArg ? pureFn.call(thisArg) : pureFn())
        : (0, bindings_1.getBinding)(lView, bindingIndex);
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction1(slotOffset, pureFn, exp, thisArg) {
    return pureFunction1Internal((0, state_1.getLView)(), (0, state_1.getBindingRoot)(), slotOffset, pureFn, exp, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
    return pureFunction2Internal((0, state_1.getLView)(), (0, state_1.getBindingRoot)(), slotOffset, pureFn, exp1, exp2, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    return pureFunction3Internal((0, state_1.getLView)(), (0, state_1.getBindingRoot)(), slotOffset, pureFn, exp1, exp2, exp3, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    return pureFunction4Internal((0, state_1.getLView)(), (0, state_1.getBindingRoot)(), slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
    const bindingIndex = (0, state_1.getBindingRoot)() + slotOffset;
    const lView = (0, state_1.getLView)();
    const different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return (0, bindings_1.bindingUpdated)(lView, bindingIndex + 4, exp5) || different
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 5, thisArg
            ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5)
            : pureFn(exp1, exp2, exp3, exp4, exp5))
        : (0, bindings_1.getBinding)(lView, bindingIndex + 5);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
    const bindingIndex = (0, state_1.getBindingRoot)() + slotOffset;
    const lView = (0, state_1.getLView)();
    const different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return (0, bindings_1.bindingUpdated2)(lView, bindingIndex + 4, exp5, exp6) || different
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 6, thisArg
            ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6)
            : pureFn(exp1, exp2, exp3, exp4, exp5, exp6))
        : (0, bindings_1.getBinding)(lView, bindingIndex + 6);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
    const bindingIndex = (0, state_1.getBindingRoot)() + slotOffset;
    const lView = (0, state_1.getLView)();
    let different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return (0, bindings_1.bindingUpdated3)(lView, bindingIndex + 4, exp5, exp6, exp7) || different
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 7, thisArg
            ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7)
            : pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7))
        : (0, bindings_1.getBinding)(lView, bindingIndex + 7);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param exp8
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
    const bindingIndex = (0, state_1.getBindingRoot)() + slotOffset;
    const lView = (0, state_1.getLView)();
    const different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return (0, bindings_1.bindingUpdated4)(lView, bindingIndex + 4, exp5, exp6, exp7, exp8) || different
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 8, thisArg
            ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)
            : pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8))
        : (0, bindings_1.getBinding)(lView, bindingIndex + 8);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
function ɵɵpureFunctionV(slotOffset, pureFn, exps, thisArg) {
    return pureFunctionVInternal((0, state_1.getLView)(), (0, state_1.getBindingRoot)(), slotOffset, pureFn, exps, thisArg);
}
/**
 * Results of a pure function invocation are stored in LView in a dedicated slot that is initialized
 * to NO_CHANGE. In rare situations a pure pipe might throw an exception on the very first
 * invocation and not produce any valid results. In this case LView would keep holding the NO_CHANGE
 * value. The NO_CHANGE is not something that we can use in expressions / bindings thus we convert
 * it to `undefined`.
 */
function getPureFunctionReturnValue(lView, returnValueIndex) {
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, returnValueIndex);
    const lastReturnValue = lView[returnValueIndex];
    return lastReturnValue === tokens_1.NO_CHANGE ? undefined : lastReturnValue;
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
function pureFunction1Internal(lView, bindingRoot, slotOffset, pureFn, exp, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return (0, bindings_1.bindingUpdated)(lView, bindingIndex, exp)
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp))
        : getPureFunctionReturnValue(lView, bindingIndex + 1);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
function pureFunction2Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return (0, bindings_1.bindingUpdated2)(lView, bindingIndex, exp1, exp2)
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 2, thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2))
        : getPureFunctionReturnValue(lView, bindingIndex + 2);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
function pureFunction3Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return (0, bindings_1.bindingUpdated3)(lView, bindingIndex, exp1, exp2, exp3)
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 3, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3))
        : getPureFunctionReturnValue(lView, bindingIndex + 3);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 */
function pureFunction4Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return (0, bindings_1.bindingUpdated4)(lView, bindingIndex, exp1, exp2, exp3, exp4)
        ? (0, bindings_1.updateBinding)(lView, bindingIndex + 4, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4))
        : getPureFunctionReturnValue(lView, bindingIndex + 4);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
function pureFunctionVInternal(lView, bindingRoot, slotOffset, pureFn, exps, thisArg) {
    let bindingIndex = bindingRoot + slotOffset;
    let different = false;
    for (let i = 0; i < exps.length; i++) {
        (0, bindings_1.bindingUpdated)(lView, bindingIndex++, exps[i]) && (different = true);
    }
    return different
        ? (0, bindings_1.updateBinding)(lView, bindingIndex, pureFn.apply(thisArg, exps))
        : getPureFunctionReturnValue(lView, bindingIndex);
}
