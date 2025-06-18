"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveDI = exports.CheckNoChangesMode = void 0;
exports.specOnlyIsInstructionStateEmpty = specOnlyIsInstructionStateEmpty;
exports.getElementDepthCount = getElementDepthCount;
exports.increaseElementDepthCount = increaseElementDepthCount;
exports.decreaseElementDepthCount = decreaseElementDepthCount;
exports.getBindingsEnabled = getBindingsEnabled;
exports.isInSkipHydrationBlock = isInSkipHydrationBlock;
exports.isSkipHydrationRootTNode = isSkipHydrationRootTNode;
exports.ɵɵenableBindings = ɵɵenableBindings;
exports.enterSkipHydrationBlock = enterSkipHydrationBlock;
exports.ɵɵdisableBindings = ɵɵdisableBindings;
exports.leaveSkipHydrationBlock = leaveSkipHydrationBlock;
exports.getLView = getLView;
exports.getTView = getTView;
exports.ɵɵrestoreView = ɵɵrestoreView;
exports.ɵɵresetView = ɵɵresetView;
exports.getCurrentTNode = getCurrentTNode;
exports.getCurrentTNodePlaceholderOk = getCurrentTNodePlaceholderOk;
exports.getCurrentParentTNode = getCurrentParentTNode;
exports.setCurrentTNode = setCurrentTNode;
exports.isCurrentTNodeParent = isCurrentTNodeParent;
exports.setCurrentTNodeAsNotParent = setCurrentTNodeAsNotParent;
exports.getContextLView = getContextLView;
exports.isInCheckNoChangesMode = isInCheckNoChangesMode;
exports.isExhaustiveCheckNoChanges = isExhaustiveCheckNoChanges;
exports.setIsInCheckNoChangesMode = setIsInCheckNoChangesMode;
exports.isRefreshingViews = isRefreshingViews;
exports.setIsRefreshingViews = setIsRefreshingViews;
exports.getBindingRoot = getBindingRoot;
exports.getBindingIndex = getBindingIndex;
exports.setBindingIndex = setBindingIndex;
exports.nextBindingIndex = nextBindingIndex;
exports.incrementBindingIndex = incrementBindingIndex;
exports.isInI18nBlock = isInI18nBlock;
exports.setInI18nBlock = setInI18nBlock;
exports.setBindingRootForHostBindings = setBindingRootForHostBindings;
exports.getCurrentDirectiveIndex = getCurrentDirectiveIndex;
exports.setCurrentDirectiveIndex = setCurrentDirectiveIndex;
exports.getCurrentDirectiveDef = getCurrentDirectiveDef;
exports.getCurrentQueryIndex = getCurrentQueryIndex;
exports.setCurrentQueryIndex = setCurrentQueryIndex;
exports.enterDI = enterDI;
exports.enterView = enterView;
exports.leaveView = leaveView;
exports.nextContextImpl = nextContextImpl;
exports.getSelectedIndex = getSelectedIndex;
exports.setSelectedIndex = setSelectedIndex;
exports.getSelectedTNode = getSelectedTNode;
exports.ɵɵnamespaceSVG = ɵɵnamespaceSVG;
exports.ɵɵnamespaceMathML = ɵɵnamespaceMathML;
exports.ɵɵnamespaceHTML = ɵɵnamespaceHTML;
exports.namespaceHTMLInternal = namespaceHTMLInternal;
exports.getNamespace = getNamespace;
exports.wasLastNodeCreated = wasLastNodeCreated;
exports.lastNodeWasCreated = lastNodeWasCreated;
const assert_1 = require("../util/assert");
const assert_2 = require("./assert");
const view_1 = require("./interfaces/view");
const namespaces_1 = require("./namespaces");
const view_utils_1 = require("./util/view_utils");
const instructionState = {
    lFrame: createLFrame(null),
    bindingsEnabled: true,
    skipHydrationRootTNode: null,
};
var CheckNoChangesMode;
(function (CheckNoChangesMode) {
    CheckNoChangesMode[CheckNoChangesMode["Off"] = 0] = "Off";
    CheckNoChangesMode[CheckNoChangesMode["Exhaustive"] = 1] = "Exhaustive";
    CheckNoChangesMode[CheckNoChangesMode["OnlyDirtyViews"] = 2] = "OnlyDirtyViews";
})(CheckNoChangesMode || (exports.CheckNoChangesMode = CheckNoChangesMode = {}));
/**
 * In this mode, any changes in bindings will throw an ExpressionChangedAfterChecked error.
 *
 * Necessary to support ChangeDetectorRef.checkNoChanges().
 *
 * The `checkNoChanges` function is invoked only in ngDevMode=true and verifies that no unintended
 * changes exist in the change detector or its children.
 */
let _checkNoChangesMode = 0; /* CheckNoChangesMode.Off */
/**
 * Flag used to indicate that we are in the middle running change detection on a view
 *
 * @see detectChangesInViewWhileDirty
 */
let _isRefreshingViews = false;
/**
 * Returns true if the instruction state stack is empty.
 *
 * Intended to be called from tests only (tree shaken otherwise).
 */
function specOnlyIsInstructionStateEmpty() {
    return instructionState.lFrame.parent === null;
}
function getElementDepthCount() {
    return instructionState.lFrame.elementDepthCount;
}
function increaseElementDepthCount() {
    instructionState.lFrame.elementDepthCount++;
}
function decreaseElementDepthCount() {
    instructionState.lFrame.elementDepthCount--;
}
function getBindingsEnabled() {
    return instructionState.bindingsEnabled;
}
/**
 * Returns true if currently inside a skip hydration block.
 * @returns boolean
 */
function isInSkipHydrationBlock() {
    return instructionState.skipHydrationRootTNode !== null;
}
/**
 * Returns true if this is the root TNode of the skip hydration block.
 * @param tNode the current TNode
 * @returns boolean
 */
function isSkipHydrationRootTNode(tNode) {
    return instructionState.skipHydrationRootTNode === tNode;
}
/**
 * Enables directive matching on elements.
 *
 *  * Example:
 * ```html
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
function ɵɵenableBindings() {
    instructionState.bindingsEnabled = true;
}
/**
 * Sets a flag to specify that the TNode is in a skip hydration block.
 * @param tNode the current TNode
 */
function enterSkipHydrationBlock(tNode) {
    instructionState.skipHydrationRootTNode = tNode;
}
/**
 * Disables directive matching on element.
 *
 *  * Example:
 * ```html
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
function ɵɵdisableBindings() {
    instructionState.bindingsEnabled = false;
}
/**
 * Clears the root skip hydration node when leaving a skip hydration block.
 */
function leaveSkipHydrationBlock() {
    instructionState.skipHydrationRootTNode = null;
}
/**
 * Return the current `LView`.
 */
function getLView() {
    return instructionState.lFrame.lView;
}
/**
 * Return the current `TView`.
 */
function getTView() {
    return instructionState.lFrame.tView;
}
/**
 * Restores `contextViewData` to the given OpaqueViewState instance.
 *
 * Used in conjunction with the getCurrentView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @param viewToRestore The OpaqueViewState instance to restore.
 * @returns Context of the restored OpaqueViewState instance.
 *
 * @codeGenApi
 */
function ɵɵrestoreView(viewToRestore) {
    instructionState.lFrame.contextLView = viewToRestore;
    return viewToRestore[view_1.CONTEXT];
}
/**
 * Clears the view set in `ɵɵrestoreView` from memory. Returns the passed in
 * value so that it can be used as a return value of an instruction.
 *
 * @codeGenApi
 */
function ɵɵresetView(value) {
    instructionState.lFrame.contextLView = null;
    return value;
}
function getCurrentTNode() {
    let currentTNode = getCurrentTNodePlaceholderOk();
    while (currentTNode !== null && currentTNode.type === 64 /* TNodeType.Placeholder */) {
        currentTNode = currentTNode.parent;
    }
    return currentTNode;
}
function getCurrentTNodePlaceholderOk() {
    return instructionState.lFrame.currentTNode;
}
function getCurrentParentTNode() {
    const lFrame = instructionState.lFrame;
    const currentTNode = lFrame.currentTNode;
    return lFrame.isParent ? currentTNode : currentTNode.parent;
}
function setCurrentTNode(tNode, isParent) {
    ngDevMode && tNode && (0, assert_2.assertTNodeForTView)(tNode, instructionState.lFrame.tView);
    const lFrame = instructionState.lFrame;
    lFrame.currentTNode = tNode;
    lFrame.isParent = isParent;
}
function isCurrentTNodeParent() {
    return instructionState.lFrame.isParent;
}
function setCurrentTNodeAsNotParent() {
    instructionState.lFrame.isParent = false;
}
function getContextLView() {
    const contextLView = instructionState.lFrame.contextLView;
    ngDevMode && (0, assert_1.assertDefined)(contextLView, 'contextLView must be defined.');
    return contextLView;
}
function isInCheckNoChangesMode() {
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    return _checkNoChangesMode !== CheckNoChangesMode.Off;
}
function isExhaustiveCheckNoChanges() {
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    return _checkNoChangesMode === CheckNoChangesMode.Exhaustive;
}
function setIsInCheckNoChangesMode(mode) {
    !ngDevMode && (0, assert_1.throwError)('Must never be called in production mode');
    _checkNoChangesMode = mode;
}
function isRefreshingViews() {
    return _isRefreshingViews;
}
function setIsRefreshingViews(mode) {
    const prev = _isRefreshingViews;
    _isRefreshingViews = mode;
    return prev;
}
// top level variables should not be exported for performance reasons (PERF_NOTES.md)
function getBindingRoot() {
    const lFrame = instructionState.lFrame;
    let index = lFrame.bindingRootIndex;
    if (index === -1) {
        index = lFrame.bindingRootIndex = lFrame.tView.bindingStartIndex;
    }
    return index;
}
function getBindingIndex() {
    return instructionState.lFrame.bindingIndex;
}
function setBindingIndex(value) {
    return (instructionState.lFrame.bindingIndex = value);
}
function nextBindingIndex() {
    return instructionState.lFrame.bindingIndex++;
}
function incrementBindingIndex(count) {
    const lFrame = instructionState.lFrame;
    const index = lFrame.bindingIndex;
    lFrame.bindingIndex = lFrame.bindingIndex + count;
    return index;
}
function isInI18nBlock() {
    return instructionState.lFrame.inI18n;
}
function setInI18nBlock(isInI18nBlock) {
    instructionState.lFrame.inI18n = isInI18nBlock;
}
/**
 * Set a new binding root index so that host template functions can execute.
 *
 * Bindings inside the host template are 0 index. But because we don't know ahead of time
 * how many host bindings we have we can't pre-compute them. For this reason they are all
 * 0 index and we just shift the root so that they match next available location in the LView.
 *
 * @param bindingRootIndex Root index for `hostBindings`
 * @param currentDirectiveIndex `TData[currentDirectiveIndex]` will point to the current directive
 *        whose `hostBindings` are being processed.
 */
function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
    const lFrame = instructionState.lFrame;
    lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex;
    setCurrentDirectiveIndex(currentDirectiveIndex);
}
/**
 * When host binding is executing this points to the directive index.
 * `TView.data[getCurrentDirectiveIndex()]` is `DirectiveDef`
 * `LView[getCurrentDirectiveIndex()]` is directive instance.
 */
function getCurrentDirectiveIndex() {
    return instructionState.lFrame.currentDirectiveIndex;
}
/**
 * Sets an index of a directive whose `hostBindings` are being processed.
 *
 * @param currentDirectiveIndex `TData` index where current directive instance can be found.
 */
function setCurrentDirectiveIndex(currentDirectiveIndex) {
    instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
}
/**
 * Retrieve the current `DirectiveDef` which is active when `hostBindings` instruction is being
 * executed.
 *
 * @param tData Current `TData` where the `DirectiveDef` will be looked up at.
 */
function getCurrentDirectiveDef(tData) {
    const currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
    return currentDirectiveIndex === -1 ? null : tData[currentDirectiveIndex];
}
function getCurrentQueryIndex() {
    return instructionState.lFrame.currentQueryIndex;
}
function setCurrentQueryIndex(value) {
    instructionState.lFrame.currentQueryIndex = value;
}
/**
 * Returns a `TNode` of the location where the current `LView` is declared at.
 *
 * @param lView an `LView` that we want to find parent `TNode` for.
 */
function getDeclarationTNode(lView) {
    const tView = lView[view_1.TVIEW];
    // Return the declaration parent for embedded views
    if (tView.type === 2 /* TViewType.Embedded */) {
        ngDevMode && (0, assert_1.assertDefined)(tView.declTNode, 'Embedded TNodes should have declaration parents.');
        return tView.declTNode;
    }
    // Components don't have `TView.declTNode` because each instance of component could be
    // inserted in different location, hence `TView.declTNode` is meaningless.
    // Falling back to `T_HOST` in case we cross component boundary.
    if (tView.type === 1 /* TViewType.Component */) {
        return lView[view_1.T_HOST];
    }
    // Remaining TNode type is `TViewType.Root` which doesn't have a parent TNode.
    return null;
}
/**
 * This is a light weight version of the `enterView` which is needed by the DI system.
 *
 * @param lView `LView` location of the DI context.
 * @param tNode `TNode` for DI context
 * @param flags DI context flags. if `SkipSelf` flag is set than we walk up the declaration
 *     tree from `tNode`  until we find parent declared `TElementNode`.
 * @returns `true` if we have successfully entered DI associated with `tNode` (or with declared
 *     `TNode` if `flags` has  `SkipSelf`). Failing to enter DI implies that no associated
 *     `NodeInjector` can be found and we should instead use `ModuleInjector`.
 *     - If `true` than this call must be fallowed by `leaveDI`
 *     - If `false` than this call failed and we should NOT call `leaveDI`
 */
function enterDI(lView, tNode, flags) {
    ngDevMode && (0, assert_2.assertLViewOrUndefined)(lView);
    if (flags & 4 /* InternalInjectFlags.SkipSelf */) {
        ngDevMode && (0, assert_2.assertTNodeForTView)(tNode, lView[view_1.TVIEW]);
        let parentTNode = tNode;
        let parentLView = lView;
        while (true) {
            ngDevMode && (0, assert_1.assertDefined)(parentTNode, 'Parent TNode should be defined');
            parentTNode = parentTNode.parent;
            if (parentTNode === null && !(flags & 1 /* InternalInjectFlags.Host */)) {
                parentTNode = getDeclarationTNode(parentLView);
                if (parentTNode === null)
                    break;
                // In this case, a parent exists and is definitely an element. So it will definitely
                // have an existing lView as the declaration view, which is why we can assume it's defined.
                ngDevMode && (0, assert_1.assertDefined)(parentLView, 'Parent LView should be defined');
                parentLView = parentLView[view_1.DECLARATION_VIEW];
                // In Ivy there are Comment nodes that correspond to ngIf and NgFor embedded directives
                // We want to skip those and look only at Elements and ElementContainers to ensure
                // we're looking at true parent nodes, and not content or other types.
                if (parentTNode.type & (2 /* TNodeType.Element */ | 8 /* TNodeType.ElementContainer */)) {
                    break;
                }
            }
            else {
                break;
            }
        }
        if (parentTNode === null) {
            // If we failed to find a parent TNode this means that we should use module injector.
            return false;
        }
        else {
            tNode = parentTNode;
            lView = parentLView;
        }
    }
    ngDevMode && (0, assert_2.assertTNodeForLView)(tNode, lView);
    const lFrame = (instructionState.lFrame = allocLFrame());
    lFrame.currentTNode = tNode;
    lFrame.lView = lView;
    return true;
}
/**
 * Swap the current lView with a new lView.
 *
 * For performance reasons we store the lView in the top level of the module.
 * This way we minimize the number of properties to read. Whenever a new view
 * is entered we have to store the lView for later, and when the view is
 * exited the state has to be restored
 *
 * @param newView New lView to become active
 * @returns the previously active lView;
 */
function enterView(newView) {
    ngDevMode && (0, assert_1.assertNotEqual)(newView[0], newView[1], '????');
    ngDevMode && (0, assert_2.assertLViewOrUndefined)(newView);
    const newLFrame = allocLFrame();
    if (ngDevMode) {
        (0, assert_1.assertEqual)(newLFrame.isParent, true, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.lView, null, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.tView, null, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.selectedIndex, -1, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.elementDepthCount, 0, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.currentDirectiveIndex, -1, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.currentNamespace, null, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.bindingRootIndex, -1, 'Expected clean LFrame');
        (0, assert_1.assertEqual)(newLFrame.currentQueryIndex, 0, 'Expected clean LFrame');
    }
    const tView = newView[view_1.TVIEW];
    instructionState.lFrame = newLFrame;
    ngDevMode && tView.firstChild && (0, assert_2.assertTNodeForTView)(tView.firstChild, tView);
    newLFrame.currentTNode = tView.firstChild;
    newLFrame.lView = newView;
    newLFrame.tView = tView;
    newLFrame.contextLView = newView;
    newLFrame.bindingIndex = tView.bindingStartIndex;
    newLFrame.inI18n = false;
}
/**
 * Allocates next free LFrame. This function tries to reuse the `LFrame`s to lower memory pressure.
 */
function allocLFrame() {
    const currentLFrame = instructionState.lFrame;
    const childLFrame = currentLFrame === null ? null : currentLFrame.child;
    const newLFrame = childLFrame === null ? createLFrame(currentLFrame) : childLFrame;
    return newLFrame;
}
function createLFrame(parent) {
    const lFrame = {
        currentTNode: null,
        isParent: true,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: parent,
        child: null,
        inI18n: false,
    };
    parent !== null && (parent.child = lFrame); // link the new LFrame for reuse.
    return lFrame;
}
/**
 * A lightweight version of leave which is used with DI.
 *
 * This function only resets `currentTNode` and `LView` as those are the only properties
 * used with DI (`enterDI()`).
 *
 * NOTE: This function is reexported as `leaveDI`. However `leaveDI` has return type of `void` where
 * as `leaveViewLight` has `LFrame`. This is so that `leaveViewLight` can be used in `leaveView`.
 */
function leaveViewLight() {
    const oldLFrame = instructionState.lFrame;
    instructionState.lFrame = oldLFrame.parent;
    oldLFrame.currentTNode = null;
    oldLFrame.lView = null;
    return oldLFrame;
}
/**
 * This is a lightweight version of the `leaveView` which is needed by the DI system.
 *
 * NOTE: this function is an alias so that we can change the type of the function to have `void`
 * return type.
 */
exports.leaveDI = leaveViewLight;
/**
 * Leave the current `LView`
 *
 * This pops the `LFrame` with the associated `LView` from the stack.
 *
 * IMPORTANT: We must zero out the `LFrame` values here otherwise they will be retained. This is
 * because for performance reasons we don't release `LFrame` but rather keep it for next use.
 */
function leaveView() {
    const oldLFrame = leaveViewLight();
    oldLFrame.isParent = true;
    oldLFrame.tView = null;
    oldLFrame.selectedIndex = -1;
    oldLFrame.contextLView = null;
    oldLFrame.elementDepthCount = 0;
    oldLFrame.currentDirectiveIndex = -1;
    oldLFrame.currentNamespace = null;
    oldLFrame.bindingRootIndex = -1;
    oldLFrame.bindingIndex = -1;
    oldLFrame.currentQueryIndex = 0;
}
function nextContextImpl(level) {
    const contextLView = (instructionState.lFrame.contextLView = (0, view_utils_1.walkUpViews)(level, instructionState.lFrame.contextLView));
    return contextLView[view_1.CONTEXT];
}
/**
 * Gets the currently selected element index.
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 */
function getSelectedIndex() {
    return instructionState.lFrame.selectedIndex;
}
/**
 * Sets the most recent index passed to {@link select}
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 *
 * (Note that if an "exit function" was set earlier (via `setElementExitFn()`) then that will be
 * run if and when the provided `index` value is different from the current selected index value.)
 */
function setSelectedIndex(index) {
    ngDevMode &&
        index !== -1 &&
        (0, assert_1.assertGreaterThanOrEqual)(index, view_1.HEADER_OFFSET, 'Index must be past HEADER_OFFSET (or -1).');
    ngDevMode &&
        (0, assert_1.assertLessThan)(index, instructionState.lFrame.lView.length, "Can't set index passed end of LView");
    instructionState.lFrame.selectedIndex = index;
}
/**
 * Gets the `tNode` that represents currently selected element.
 */
function getSelectedTNode() {
    const lFrame = instructionState.lFrame;
    return (0, view_utils_1.getTNode)(lFrame.tView, lFrame.selectedIndex);
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/2000/svg'` in global state.
 *
 * @codeGenApi
 */
function ɵɵnamespaceSVG() {
    instructionState.lFrame.currentNamespace = namespaces_1.SVG_NAMESPACE;
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/1998/MathML/'` in global state.
 *
 * @codeGenApi
 */
function ɵɵnamespaceMathML() {
    instructionState.lFrame.currentNamespace = namespaces_1.MATH_ML_NAMESPACE;
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 *
 * @codeGenApi
 */
function ɵɵnamespaceHTML() {
    namespaceHTMLInternal();
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 */
function namespaceHTMLInternal() {
    instructionState.lFrame.currentNamespace = null;
}
function getNamespace() {
    return instructionState.lFrame.currentNamespace;
}
let _wasLastNodeCreated = true;
/**
 * Retrieves a global flag that indicates whether the most recent DOM node
 * was created or hydrated.
 */
function wasLastNodeCreated() {
    return _wasLastNodeCreated;
}
/**
 * Sets a global flag to indicate whether the most recent DOM node
 * was created or hydrated.
 */
function lastNodeWasCreated(flag) {
    _wasLastNodeCreated = flag;
}
