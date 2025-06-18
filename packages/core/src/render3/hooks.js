"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPreOrderHooks = registerPreOrderHooks;
exports.registerPostOrderHooks = registerPostOrderHooks;
exports.executeCheckHooks = executeCheckHooks;
exports.executeInitAndCheckHooks = executeInitAndCheckHooks;
exports.incrementInitPhaseFlags = incrementInitPhaseFlags;
const signals_1 = require("../../primitives/signals");
const assert_1 = require("../util/assert");
const assert_2 = require("./assert");
const ng_onchanges_feature_1 = require("./features/ng_onchanges_feature");
const view_1 = require("./interfaces/view");
const profiler_1 = require("./profiler");
const state_1 = require("./state");
/**
 * Adds all directive lifecycle hooks from the given `DirectiveDef` to the given `TView`.
 *
 * Must be run *only* on the first template pass.
 *
 * Sets up the pre-order hooks on the provided `tView`,
 * see {@link HookData} for details about the data structure.
 *
 * @param directiveIndex The index of the directive in LView
 * @param directiveDef The definition containing the hooks to setup in tView
 * @param tView The current TView
 */
function registerPreOrderHooks(directiveIndex, directiveDef, tView) {
    var _a, _b, _c, _d, _e;
    ngDevMode && (0, assert_2.assertFirstCreatePass)(tView);
    const { ngOnChanges, ngOnInit, ngDoCheck } = directiveDef.type.prototype;
    if (ngOnChanges) {
        const wrappedOnChanges = (0, ng_onchanges_feature_1.NgOnChangesFeatureImpl)(directiveDef);
        ((_a = tView.preOrderHooks) !== null && _a !== void 0 ? _a : (tView.preOrderHooks = [])).push(directiveIndex, wrappedOnChanges);
        ((_b = tView.preOrderCheckHooks) !== null && _b !== void 0 ? _b : (tView.preOrderCheckHooks = [])).push(directiveIndex, wrappedOnChanges);
    }
    if (ngOnInit) {
        ((_c = tView.preOrderHooks) !== null && _c !== void 0 ? _c : (tView.preOrderHooks = [])).push(0 - directiveIndex, ngOnInit);
    }
    if (ngDoCheck) {
        ((_d = tView.preOrderHooks) !== null && _d !== void 0 ? _d : (tView.preOrderHooks = [])).push(directiveIndex, ngDoCheck);
        ((_e = tView.preOrderCheckHooks) !== null && _e !== void 0 ? _e : (tView.preOrderCheckHooks = [])).push(directiveIndex, ngDoCheck);
    }
}
/**
 *
 * Loops through the directives on the provided `tNode` and queues hooks to be
 * run that are not initialization hooks.
 *
 * Should be executed during `elementEnd()` and similar to
 * preserve hook execution order. Content, view, and destroy hooks for projected
 * components and directives must be called *before* their hosts.
 *
 * Sets up the content, view, and destroy hooks on the provided `tView`,
 * see {@link HookData} for details about the data structure.
 *
 * NOTE: This does not set up `onChanges`, `onInit` or `doCheck`, those are set up
 * separately at `elementStart`.
 *
 * @param tView The current TView
 * @param tNode The TNode whose directives are to be searched for hooks to queue
 */
function registerPostOrderHooks(tView, tNode) {
    var _a, _b, _c, _d, _e, _f, _g;
    ngDevMode && (0, assert_2.assertFirstCreatePass)(tView);
    // It's necessary to loop through the directives at elementEnd() (rather than processing in
    // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
    // hooks for projected components and directives must be called *before* their hosts.
    for (let i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
        const directiveDef = tView.data[i];
        ngDevMode && (0, assert_1.assertDefined)(directiveDef, 'Expecting DirectiveDef');
        const lifecycleHooks = directiveDef.type.prototype;
        const { ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy, } = lifecycleHooks;
        if (ngAfterContentInit) {
            ((_a = tView.contentHooks) !== null && _a !== void 0 ? _a : (tView.contentHooks = [])).push(-i, ngAfterContentInit);
        }
        if (ngAfterContentChecked) {
            ((_b = tView.contentHooks) !== null && _b !== void 0 ? _b : (tView.contentHooks = [])).push(i, ngAfterContentChecked);
            ((_c = tView.contentCheckHooks) !== null && _c !== void 0 ? _c : (tView.contentCheckHooks = [])).push(i, ngAfterContentChecked);
        }
        if (ngAfterViewInit) {
            ((_d = tView.viewHooks) !== null && _d !== void 0 ? _d : (tView.viewHooks = [])).push(-i, ngAfterViewInit);
        }
        if (ngAfterViewChecked) {
            ((_e = tView.viewHooks) !== null && _e !== void 0 ? _e : (tView.viewHooks = [])).push(i, ngAfterViewChecked);
            ((_f = tView.viewCheckHooks) !== null && _f !== void 0 ? _f : (tView.viewCheckHooks = [])).push(i, ngAfterViewChecked);
        }
        if (ngOnDestroy != null) {
            ((_g = tView.destroyHooks) !== null && _g !== void 0 ? _g : (tView.destroyHooks = [])).push(i, ngOnDestroy);
        }
    }
}
/**
 * Executing hooks requires complex logic as we need to deal with 2 constraints.
 *
 * 1. Init hooks (ngOnInit, ngAfterContentInit, ngAfterViewInit) must all be executed once and only
 * once, across many change detection cycles. This must be true even if some hooks throw, or if
 * some recursively trigger a change detection cycle.
 * To solve that, it is required to track the state of the execution of these init hooks.
 * This is done by storing and maintaining flags in the view: the {@link InitPhaseState},
 * and the index within that phase. They can be seen as a cursor in the following structure:
 * [[onInit1, onInit2], [afterContentInit1], [afterViewInit1, afterViewInit2, afterViewInit3]]
 * They are stored as flags in LView[FLAGS].
 *
 * 2. Pre-order hooks can be executed in batches, because of the select instruction.
 * To be able to pause and resume their execution, we also need some state about the hook's array
 * that is being processed:
 * - the index of the next hook to be executed
 * - the number of init hooks already found in the processed part of the  array
 * They are stored as flags in LView[PREORDER_HOOK_FLAGS].
 */
/**
 * Executes pre-order check hooks ( OnChanges, DoChanges) given a view where all the init hooks were
 * executed once. This is a light version of executeInitAndCheckPreOrderHooks where we can skip read
 * / write of the init-hooks related flags.
 * @param lView The LView where hooks are defined
 * @param hooks Hooks to be run
 * @param nodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function executeCheckHooks(lView, hooks, nodeIndex) {
    callHooks(lView, hooks, 3 /* InitPhaseState.InitPhaseCompleted */, nodeIndex);
}
/**
 * Executes post-order init and check hooks (one of AfterContentInit, AfterContentChecked,
 * AfterViewInit, AfterViewChecked) given a view where there are pending init hooks to be executed.
 * @param lView The LView where hooks are defined
 * @param hooks Hooks to be run
 * @param initPhase A phase for which hooks should be run
 * @param nodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
    ngDevMode &&
        (0, assert_1.assertNotEqual)(initPhase, 3 /* InitPhaseState.InitPhaseCompleted */, 'Init pre-order hooks should not be called more than once');
    if ((lView[view_1.FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
        callHooks(lView, hooks, initPhase, nodeIndex);
    }
}
function incrementInitPhaseFlags(lView, initPhase) {
    ngDevMode &&
        (0, assert_1.assertNotEqual)(initPhase, 3 /* InitPhaseState.InitPhaseCompleted */, 'Init hooks phase should not be incremented after all init hooks have been run.');
    let flags = lView[view_1.FLAGS];
    if ((flags & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
        flags &= 16383 /* LViewFlags.IndexWithinInitPhaseReset */;
        flags += 1 /* LViewFlags.InitPhaseStateIncrementer */;
        lView[view_1.FLAGS] = flags;
    }
}
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * the first LView pass
 *
 * @param currentView The current view
 * @param arr The array in which the hooks are found
 * @param initPhaseState the current state of the init phase
 * @param currentNodeIndex 3 cases depending on the value:
 * - undefined: all hooks from the array should be executed (post-order case)
 * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
 * flushing the remaining hooks)
 * - number: execute hooks only from the saved index until that node index exclusive (pre-order
 * case, when executing select(number))
 */
function callHooks(currentView, arr, initPhase, currentNodeIndex) {
    ngDevMode &&
        (0, assert_1.assertEqual)((0, state_1.isInCheckNoChangesMode)(), false, 'Hooks should never be run when in check no changes mode.');
    const startIndex = currentNodeIndex !== undefined
        ? currentView[view_1.PREORDER_HOOK_FLAGS] & 65535 /* PreOrderHookFlags.IndexOfTheNextPreOrderHookMaskMask */
        : 0;
    const nodeIndexLimit = currentNodeIndex != null ? currentNodeIndex : -1;
    const max = arr.length - 1; // Stop the loop at length - 1, because we look for the hook at i + 1
    let lastNodeIndexFound = 0;
    for (let i = startIndex; i < max; i++) {
        const hook = arr[i + 1];
        if (typeof hook === 'number') {
            lastNodeIndexFound = arr[i];
            if (currentNodeIndex != null && lastNodeIndexFound >= currentNodeIndex) {
                break;
            }
        }
        else {
            const isInitHook = arr[i] < 0;
            if (isInitHook) {
                currentView[view_1.PREORDER_HOOK_FLAGS] += 65536 /* PreOrderHookFlags.NumberOfInitHooksCalledIncrementer */;
            }
            if (lastNodeIndexFound < nodeIndexLimit || nodeIndexLimit == -1) {
                callHook(currentView, initPhase, arr, i);
                currentView[view_1.PREORDER_HOOK_FLAGS] =
                    (currentView[view_1.PREORDER_HOOK_FLAGS] & 4294901760 /* PreOrderHookFlags.NumberOfInitHooksCalledMask */) +
                        i +
                        2;
            }
            i++;
        }
    }
}
/**
 * Executes a single lifecycle hook, making sure that:
 * - it is called in the non-reactive context;
 * - profiling data are registered.
 */
function callHookInternal(directive, hook) {
    (0, profiler_1.profiler)(4 /* ProfilerEvent.LifecycleHookStart */, directive, hook);
    const prevConsumer = (0, signals_1.setActiveConsumer)(null);
    try {
        hook.call(directive);
    }
    finally {
        (0, signals_1.setActiveConsumer)(prevConsumer);
        (0, profiler_1.profiler)(5 /* ProfilerEvent.LifecycleHookEnd */, directive, hook);
    }
}
/**
 * Execute one hook against the current `LView`.
 *
 * @param currentView The current view
 * @param initPhaseState the current state of the init phase
 * @param arr The array in which the hooks are found
 * @param i The current index within the hook data array
 */
function callHook(currentView, initPhase, arr, i) {
    const isInitHook = arr[i] < 0;
    const hook = arr[i + 1];
    const directiveIndex = isInitHook ? -arr[i] : arr[i];
    const directive = currentView[directiveIndex];
    if (isInitHook) {
        const indexWithintInitPhase = currentView[view_1.FLAGS] >> 14 /* LViewFlags.IndexWithinInitPhaseShift */;
        // The init phase state must be always checked here as it may have been recursively updated.
        if (indexWithintInitPhase <
            currentView[view_1.PREORDER_HOOK_FLAGS] >> 16 /* PreOrderHookFlags.NumberOfInitHooksCalledShift */ &&
            (currentView[view_1.FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
            currentView[view_1.FLAGS] += 16384 /* LViewFlags.IndexWithinInitPhaseIncrementer */;
            callHookInternal(directive, hook);
        }
    }
    else {
        callHookInternal(directive, hook);
    }
}
