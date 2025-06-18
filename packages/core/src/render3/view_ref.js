"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRef = void 0;
exports.isViewDirty = isViewDirty;
exports.markForRefresh = markForRefresh;
const use_exhaustive_check_no_changes_1 = require("../change_detection/use_exhaustive_check_no_changes");
const errors_1 = require("../errors");
const array_utils_1 = require("../util/array_utils");
const assert_1 = require("../util/assert");
const collect_native_nodes_1 = require("./collect_native_nodes");
const change_detection_1 = require("./instructions/change_detection");
const mark_view_dirty_1 = require("./instructions/mark_view_dirty");
const container_1 = require("./interfaces/container");
const type_checks_1 = require("./interfaces/type_checks");
const view_1 = require("./interfaces/view");
const node_manipulation_1 = require("./node_manipulation");
const view_utils_1 = require("./util/view_utils");
const container_2 = require("./view/container");
class ViewRef {
    get rootNodes() {
        const lView = this._lView;
        const tView = lView[view_1.TVIEW];
        return (0, collect_native_nodes_1.collectNativeNodes)(tView, lView, tView.firstChild, []);
    }
    constructor(
    /**
     * This represents `LView` associated with the component when ViewRef is a ChangeDetectorRef.
     *
     * When ViewRef is created for a dynamic component, this also represents the `LView` for the
     * component.
     *
     * For a "regular" ViewRef created for an embedded view, this is the `LView` for the embedded
     * view.
     *
     * @internal
     */
    _lView, 
    /**
     * This represents the `LView` associated with the point where `ChangeDetectorRef` was
     * requested.
     *
     * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
     */
    _cdRefInjectingView) {
        this._lView = _lView;
        this._cdRefInjectingView = _cdRefInjectingView;
        this._appRef = null;
        this._attachedToViewContainer = false;
    }
    get context() {
        return this._lView[view_1.CONTEXT];
    }
    /**
     * @deprecated Replacing the full context object is not supported. Modify the context
     *   directly, or consider using a `Proxy` if you need to replace the full object.
     * // TODO(devversion): Remove this.
     */
    set context(value) {
        if (ngDevMode) {
            // Note: We have a warning message here because the `@deprecated` JSDoc will not be picked
            // up for assignments on the setter. We want to let users know about the deprecated usage.
            console.warn('Angular: Replacing the `context` object of an `EmbeddedViewRef` is deprecated.');
        }
        this._lView[view_1.CONTEXT] = value;
    }
    get destroyed() {
        return (0, type_checks_1.isDestroyed)(this._lView);
    }
    destroy() {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._attachedToViewContainer) {
            const parent = this._lView[view_1.PARENT];
            if ((0, type_checks_1.isLContainer)(parent)) {
                const viewRefs = parent[container_1.VIEW_REFS];
                const index = viewRefs ? viewRefs.indexOf(this) : -1;
                if (index > -1) {
                    ngDevMode &&
                        (0, assert_1.assertEqual)(index, parent.indexOf(this._lView) - container_1.CONTAINER_HEADER_OFFSET, 'An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array.');
                    (0, container_2.detachView)(parent, index);
                    (0, array_utils_1.removeFromArray)(viewRefs, index);
                }
            }
            this._attachedToViewContainer = false;
        }
        (0, node_manipulation_1.destroyLView)(this._lView[view_1.TVIEW], this._lView);
    }
    onDestroy(callback) {
        (0, view_utils_1.storeLViewOnDestroy)(this._lView, callback);
    }
    /**
     * Marks a view and all of its ancestors dirty.
     *
     * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
     * checked when it needs to be re-rendered but the two normal triggers haven't marked it
     * dirty (i.e. inputs haven't changed and events haven't fired in the view).
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @usageNotes
     * ### Example
     *
     * ```ts
     * @Component({
     *   selector: 'app-root',
     *   template: `Number of ticks: {{numberOfTicks}}`
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     * })
     * class AppComponent {
     *   numberOfTicks = 0;
     *
     *   constructor(private ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks++;
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     * ```
     */
    markForCheck() {
        (0, mark_view_dirty_1.markViewDirty)(this._cdRefInjectingView || this._lView, 4 /* NotificationSource.MarkForCheck */);
    }
    /**
     * Detaches the view from the change detection tree.
     *
     * Detached views will not be checked during change detection runs until they are
     * re-attached, even if they are dirty. `detach` can be used in combination with
     * {@link ChangeDetectorRef#detectChanges} to implement local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```ts
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     */
    detach() {
        this._lView[view_1.FLAGS] &= ~128 /* LViewFlags.Attached */;
    }
    /**
     * Re-attaches a view to the change detection tree.
     *
     * This can be used to re-attach views that were previously detached from the tree
     * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```ts
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
     *
     *   set live(value) {
     *     if (value) {
     *       this.ref.reattach();
     *     } else {
     *       this.ref.detach();
     *     }
     *   }
     * }
     *
     * @Component({
     *   selector: 'app-root',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class AppComponent {
     *   live = true;
     * }
     * ```
     */
    reattach() {
        (0, view_utils_1.updateAncestorTraversalFlagsOnAttach)(this._lView);
        this._lView[view_1.FLAGS] |= 128 /* LViewFlags.Attached */;
    }
    /**
     * Checks the view and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
     * local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    detectChanges() {
        // Add `RefreshView` flag to ensure this view is refreshed if not already dirty.
        // `RefreshView` flag is used intentionally over `Dirty` because it gets cleared before
        // executing any of the actual refresh code while the `Dirty` flag doesn't get cleared
        // until the end of the refresh. Using `RefreshView` prevents creating a potential difference
        // in the state of the LViewFlags during template execution.
        this._lView[view_1.FLAGS] |= 1024 /* LViewFlags.RefreshView */;
        (0, change_detection_1.detectChangesInternal)(this._lView);
    }
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't
     * introduce other changes.
     */
    checkNoChanges() {
        var _a;
        if (!ngDevMode)
            return;
        try {
            (_a = this.exhaustive) !== null && _a !== void 0 ? _a : (this.exhaustive = this._lView[view_1.INJECTOR].get(use_exhaustive_check_no_changes_1.UseExhaustiveCheckNoChanges, use_exhaustive_check_no_changes_1.USE_EXHAUSTIVE_CHECK_NO_CHANGES_DEFAULT));
        }
        catch (_b) {
            this.exhaustive = use_exhaustive_check_no_changes_1.USE_EXHAUSTIVE_CHECK_NO_CHANGES_DEFAULT;
        }
        (0, change_detection_1.checkNoChangesInternal)(this._lView, this.exhaustive);
    }
    attachToViewContainerRef() {
        if (this._appRef) {
            throw new errors_1.RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached directly to the ApplicationRef!');
        }
        this._attachedToViewContainer = true;
    }
    detachFromAppRef() {
        this._appRef = null;
        const isRoot = (0, type_checks_1.isRootView)(this._lView);
        const declarationContainer = this._lView[view_1.DECLARATION_LCONTAINER];
        if (declarationContainer !== null && !isRoot) {
            (0, node_manipulation_1.detachMovedView)(declarationContainer, this._lView);
        }
        (0, node_manipulation_1.detachViewFromDOM)(this._lView[view_1.TVIEW], this._lView);
    }
    attachToAppRef(appRef) {
        if (this._attachedToViewContainer) {
            throw new errors_1.RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
        const isRoot = (0, type_checks_1.isRootView)(this._lView);
        const declarationContainer = this._lView[view_1.DECLARATION_LCONTAINER];
        if (declarationContainer !== null && !isRoot) {
            (0, container_2.trackMovedView)(declarationContainer, this._lView);
        }
        (0, view_utils_1.updateAncestorTraversalFlagsOnAttach)(this._lView);
    }
}
exports.ViewRef = ViewRef;
/**
 * Reports whether the given view is considered dirty according to the different marking mechanisms.
 */
function isViewDirty(view) {
    return (0, view_utils_1.requiresRefreshOrTraversal)(view._lView) || !!(view._lView[view_1.FLAGS] & 64 /* LViewFlags.Dirty */);
}
function markForRefresh(view) {
    (0, view_utils_1.markViewForRefresh)(view['_cdRefInjectingView'] || view._lView);
}
