"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderComponent = renderComponent;
exports.syncViewWithBlueprint = syncViewWithBlueprint;
exports.renderView = renderView;
const utils_1 = require("../../hydration/utils");
const assert_1 = require("../../util/assert");
const view_1 = require("../interfaces/view");
const profiler_1 = require("../profiler");
const query_execution_1 = require("../queries/query_execution");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
const shared_1 = require("./shared");
function renderComponent(hostLView, componentHostIdx) {
    ngDevMode && (0, assert_1.assertEqual)((0, view_utils_1.isCreationMode)(hostLView), true, 'Should be run in creation mode');
    const componentView = (0, view_utils_1.getComponentLViewByIndex)(componentHostIdx, hostLView);
    const componentTView = componentView[view_1.TVIEW];
    syncViewWithBlueprint(componentTView, componentView);
    const hostRNode = componentView[view_1.HOST];
    // Populate an LView with hydration info retrieved from the DOM via TransferState.
    if (hostRNode !== null && componentView[view_1.HYDRATION] === null) {
        componentView[view_1.HYDRATION] = (0, utils_1.retrieveHydrationInfo)(hostRNode, componentView[view_1.INJECTOR]);
    }
    (0, profiler_1.profiler)(18 /* ProfilerEvent.ComponentStart */);
    renderView(componentTView, componentView, componentView[view_1.CONTEXT]);
    (0, profiler_1.profiler)(19 /* ProfilerEvent.ComponentEnd */, componentView[view_1.CONTEXT]);
}
/**
 * Syncs an LView instance with its blueprint if they have gotten out of sync.
 *
 * Typically, blueprints and their view instances should always be in sync, so the loop here
 * will be skipped. However, consider this case of two components side-by-side:
 *
 * App template:
 * ```html
 * <comp></comp>
 * <comp></comp>
 * ```
 *
 * The following will happen:
 * 1. App template begins processing.
 * 2. First <comp> is matched as a component and its LView is created.
 * 3. Second <comp> is matched as a component and its LView is created.
 * 4. App template completes processing, so it's time to check child templates.
 * 5. First <comp> template is checked. It has a directive, so its def is pushed to blueprint.
 * 6. Second <comp> template is checked. Its blueprint has been updated by the first
 * <comp> template, but its LView was created before this update, so it is out of sync.
 *
 * Note that embedded views inside ngFor loops will never be out of sync because these views
 * are processed as soon as they are created.
 *
 * @param tView The `TView` that contains the blueprint for syncing
 * @param lView The view to sync
 */
function syncViewWithBlueprint(tView, lView) {
    for (let i = lView.length; i < tView.blueprint.length; i++) {
        lView.push(tView.blueprint[i]);
    }
}
/**
 * Processes a view in the creation mode. This includes a number of steps in a specific order:
 * - creating view query functions (if any);
 * - executing a template function in the creation mode;
 * - updating static queries (if any);
 * - creating child components defined in a given view.
 */
function renderView(tView, lView, context) {
    var _a;
    ngDevMode && (0, assert_1.assertEqual)((0, view_utils_1.isCreationMode)(lView), true, 'Should be run in creation mode');
    ngDevMode && (0, assert_1.assertNotReactive)(renderView.name);
    (0, state_1.enterView)(lView);
    try {
        const viewQuery = tView.viewQuery;
        if (viewQuery !== null) {
            (0, query_execution_1.executeViewQueryFn)(1 /* RenderFlags.Create */, viewQuery, context);
        }
        // Execute a template associated with this view, if it exists. A template function might not be
        // defined for the root component views.
        const templateFn = tView.template;
        if (templateFn !== null) {
            (0, shared_1.executeTemplate)(tView, lView, templateFn, 1 /* RenderFlags.Create */, context);
        }
        // This needs to be set before children are processed to support recursive components.
        // This must be set to false immediately after the first creation run because in an
        // ngFor loop, all the views will be created together before update mode runs and turns
        // off firstCreatePass. If we don't set it here, instances will perform directive
        // matching, etc again and again.
        if (tView.firstCreatePass) {
            tView.firstCreatePass = false;
        }
        // Mark all queries active in this view as dirty. This is necessary for signal-based queries to
        // have a clear marking point where we can read query results atomically (for a given view).
        (_a = lView[view_1.QUERIES]) === null || _a === void 0 ? void 0 : _a.finishViewCreation(tView);
        // We resolve content queries specifically marked as `static` in creation mode. Dynamic
        // content queries are resolved during change detection (i.e. update mode), after embedded
        // views are refreshed (see block above).
        if (tView.staticContentQueries) {
            (0, query_execution_1.refreshContentQueries)(tView, lView);
        }
        // We must materialize query results before child components are processed
        // in case a child component has projected a container. The LContainer needs
        // to exist so the embedded views are properly attached by the container.
        if (tView.staticViewQueries) {
            (0, query_execution_1.executeViewQueryFn)(2 /* RenderFlags.Update */, tView.viewQuery, context);
        }
        // Render child component views.
        const components = tView.components;
        if (components !== null) {
            renderChildComponents(lView, components);
        }
    }
    catch (error) {
        // If we didn't manage to get past the first template pass due to
        // an error, mark the view as corrupted so we can try to recover.
        if (tView.firstCreatePass) {
            tView.incompleteFirstPass = true;
            tView.firstCreatePass = false;
        }
        throw error;
    }
    finally {
        lView[view_1.FLAGS] &= ~4 /* LViewFlags.CreationMode */;
        (0, state_1.leaveView)();
    }
}
/** Renders child components in the current view (creation mode). */
function renderChildComponents(hostLView, components) {
    for (let i = 0; i < components.length; i++) {
        renderComponent(hostLView, components[i]);
    }
}
