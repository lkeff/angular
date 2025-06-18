"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵreplaceMetadata = ɵɵreplaceMetadata;
const assert_1 = require("../util/assert");
const assert_2 = require("./assert");
const def_getters_1 = require("./def_getters");
const errors_1 = require("./errors");
const change_detection_1 = require("./instructions/change_detection");
const render_1 = require("./instructions/render");
const container_1 = require("./interfaces/container");
const lview_tracking_1 = require("./interfaces/lview_tracking");
const node_1 = require("./interfaces/node");
const type_checks_1 = require("./interfaces/type_checks");
const view_1 = require("./interfaces/view");
const node_assert_1 = require("./node_assert");
const node_manipulation_1 = require("./node_manipulation");
const zone_1 = require("../zone");
const view_2 = require("../metadata/view");
const fields_1 = require("./fields");
const construction_1 = require("./view/construction");
/**
 * Replaces the metadata of a component type and re-renders all live instances of the component.
 * @param type Class whose metadata will be replaced.
 * @param applyMetadata Callback that will apply a new set of metadata on the `type` when invoked.
 * @param environment Syntehtic namespace imports that need to be passed along to the callback.
 * @param locals Local symbols from the source location that have to be exposed to the callback.
 * @param importMeta `import.meta` from the call site of the replacement function. Optional since
 *   it isn't used internally.
 * @param id ID to the class being replaced. **Not** the same as the component definition ID.
 *   Optional since the ID might not be available internally.
 * @codeGenApi
 */
function ɵɵreplaceMetadata(type, applyMetadata, namespaces, locals, importMeta = null, id = null) {
    ngDevMode && (0, errors_1.assertComponentDef)(type);
    const currentDef = (0, def_getters_1.getComponentDef)(type);
    // The reason `applyMetadata` is a callback that is invoked (almost) immediately is because
    // the compiler usually produces more code than just the component definition, e.g. there
    // can be functions for embedded views, the variables for the constant pool and `setClassMetadata`
    // calls. The callback allows us to keep them isolate from the rest of the app and to invoke
    // them at the right time.
    applyMetadata.apply(null, [type, namespaces, ...locals]);
    const { newDef, oldDef } = mergeWithExistingDefinition(currentDef, (0, def_getters_1.getComponentDef)(type));
    // TODO(crisbeto): the `applyMetadata` call above will replace the definition on the type.
    // Ideally we should adjust the compiler output so the metadata is returned, however that'll
    // require some internal changes. We re-add the metadata here manually.
    type[fields_1.NG_COMP_DEF] = newDef;
    // If a `tView` hasn't been created yet, it means that this component hasn't been instantianted
    // before. In this case there's nothing left for us to do aside from patching it in.
    if (oldDef.tView) {
        const trackedViews = (0, lview_tracking_1.getTrackedLViews)().values();
        for (const root of trackedViews) {
            // Note: we have the additional check, because `IsRoot` can also indicate
            // a component created through something like `createComponent`.
            if ((0, type_checks_1.isRootView)(root) && root[view_1.PARENT] === null) {
                recreateMatchingLViews(importMeta, id, newDef, oldDef, root);
            }
        }
    }
}
/**
 * Merges two component definitions while preseving the original one in place.
 * @param currentDef Definition that should receive the new metadata.
 * @param newDef Source of the new metadata.
 */
function mergeWithExistingDefinition(currentDef, newDef) {
    // Clone the current definition since we reference its original data further
    // down in the replacement process (e.g. when destroying the renderer).
    const clone = Object.assign({}, currentDef);
    // Assign the new metadata in place while preserving the object literal. It's important to
    // Keep the object in place, because there can be references to it, for example in the
    // `directiveDefs` of another definition.
    const replacement = Object.assign(currentDef, newDef, {
        // We need to keep the existing directive and pipe defs, because they can get patched on
        // by a call to `setComponentScope` from a module file. That call won't make it into the
        // HMR replacement function, because it lives in an entirely different file.
        directiveDefs: clone.directiveDefs,
        pipeDefs: clone.pipeDefs,
        // Preserve the old `setInput` function, because it has some state.
        // This is fine, because the component instance is preserved as well.
        setInput: clone.setInput,
        // Externally this is redundant since we redeclare the definition using the original type.
        // Internally we may receive a definition with an alternate, but identical, type so we have
        // to ensure that the original one is preserved.
        type: clone.type,
    });
    ngDevMode && (0, assert_1.assertEqual)(replacement, currentDef, 'Expected definition to be merged in place');
    return { newDef: replacement, oldDef: clone };
}
/**
 * Finds all LViews matching a specific component definition and recreates them.
 * @param importMeta `import.meta` information.
 * @param id HMR ID of the component.
 * @param oldDef Component definition to search for.
 * @param rootLView View from which to start the search.
 */
function recreateMatchingLViews(importMeta, id, newDef, oldDef, rootLView) {
    ngDevMode &&
        (0, assert_1.assertDefined)(oldDef.tView, 'Expected a component definition that has been instantiated at least once');
    const tView = rootLView[view_1.TVIEW];
    // Use `tView` to match the LView since `instanceof` can
    // produce false positives when using inheritance.
    if (tView === oldDef.tView) {
        ngDevMode && (0, errors_1.assertComponentDef)(oldDef.type);
        recreateLView(importMeta, id, newDef, oldDef, rootLView);
        return;
    }
    for (let i = view_1.HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        const current = rootLView[i];
        if ((0, type_checks_1.isLContainer)(current)) {
            // The host can be an LView if a component is injecting `ViewContainerRef`.
            if ((0, type_checks_1.isLView)(current[view_1.HOST])) {
                recreateMatchingLViews(importMeta, id, newDef, oldDef, current[view_1.HOST]);
            }
            for (let j = container_1.CONTAINER_HEADER_OFFSET; j < current.length; j++) {
                recreateMatchingLViews(importMeta, id, newDef, oldDef, current[j]);
            }
        }
        else if ((0, type_checks_1.isLView)(current)) {
            recreateMatchingLViews(importMeta, id, newDef, oldDef, current);
        }
    }
}
/**
 * Removes any cached renderers from the factory for the provided type.
 * This is currently used by the HMR logic to ensure Renderers are kept
 * synchronized with any definition metadata updates.
 * @param factory A RendererFactory2 instance.
 * @param def A ComponentDef instance.
 */
function clearRendererCache(factory, def) {
    var _a, _b;
    // Cast to read a private field.
    // NOTE: This must be kept synchronized with the renderer factory implementation in
    // platform-browser and platform-browser/animations.
    (_b = (_a = factory).componentReplaced) === null || _b === void 0 ? void 0 : _b.call(_a, def.id);
}
/**
 * Recreates an LView in-place from a new component definition.
 * @param importMeta `import.meta` information.
 * @param id HMR ID for the component.
 * @param newDef Definition from which to recreate the view.
 * @param oldDef Previous component definition being swapped out.
 * @param lView View to be recreated.
 */
function recreateLView(importMeta, id, newDef, oldDef, lView) {
    const instance = lView[view_1.CONTEXT];
    let host = lView[view_1.HOST];
    // In theory the parent can also be an LContainer, but it appears like that's
    // only the case for embedded views which we won't be replacing here.
    const parentLView = lView[view_1.PARENT];
    ngDevMode && (0, assert_2.assertLView)(parentLView);
    const tNode = lView[view_1.T_HOST];
    ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 2 /* TNodeType.Element */);
    ngDevMode && (0, assert_1.assertNotEqual)(newDef, oldDef, 'Expected different component definition');
    const zone = lView[view_1.INJECTOR].get(zone_1.NgZone, null);
    const recreate = () => {
        // If we're recreating a component with shadow DOM encapsulation, it will have attached a
        // shadow root. The browser will throw if we attempt to attach another one and there's no way
        // to detach it. Our only option is to make a clone only of the root node, replace the node
        // with the clone and use it for the newly-created LView.
        if (oldDef.encapsulation === view_2.ViewEncapsulation.ShadowDom) {
            const newHost = host.cloneNode(false);
            host.replaceWith(newHost);
            host = newHost;
        }
        // Recreate the TView since the template might've changed.
        const newTView = (0, construction_1.getOrCreateComponentTView)(newDef);
        // Create a new LView from the new TView, but reusing the existing TNode and DOM node.
        const newLView = (0, construction_1.createLView)(parentLView, newTView, instance, (0, construction_1.getInitialLViewFlagsFromDef)(newDef), host, tNode, null, null, // The renderer will be created a bit further down once the old one is destroyed.
        null, null, null);
        // Detach the LView from its current place in the tree so we don't
        // start traversing any siblings and modifying their structure.
        replaceLViewInTree(parentLView, lView, newLView, tNode.index);
        // Destroy the detached LView.
        (0, node_manipulation_1.destroyLView)(lView[view_1.TVIEW], lView);
        // Always force the creation of a new renderer to ensure state captured during construction
        // stays consistent with the new component definition by clearing any old ached factories.
        const rendererFactory = lView[view_1.ENVIRONMENT].rendererFactory;
        clearRendererCache(rendererFactory, oldDef);
        // Patch a brand-new renderer onto the new view only after the old
        // view is destroyed so that the runtime doesn't try to reuse it.
        newLView[view_1.RENDERER] = rendererFactory.createRenderer(host, newDef);
        // Remove the nodes associated with the destroyed LView. This removes the
        // descendants, but not the host which we want to stay in place.
        (0, node_manipulation_1.removeViewFromDOM)(lView[view_1.TVIEW], lView);
        // Reset the content projection state of the TNode before the first render.
        // Note that this has to happen after the LView has been destroyed or we
        // risk some projected nodes not being removed correctly.
        resetProjectionState(tNode);
        // Creation pass for the new view.
        (0, render_1.renderView)(newTView, newLView, instance);
        // Update pass for the new view.
        (0, change_detection_1.refreshView)(newTView, newLView, newTView.template, instance);
    };
    // The callback isn't guaranteed to be inside the Zone so we need to bring it in ourselves.
    if (zone === null) {
        executeWithInvalidateFallback(importMeta, id, recreate);
    }
    else {
        zone.run(() => executeWithInvalidateFallback(importMeta, id, recreate));
    }
}
/**
 * Runs an HMR-related function and falls back to
 * invalidating the HMR data if it throws an error.
 */
function executeWithInvalidateFallback(importMeta, id, callback) {
    var _a, _b;
    try {
        callback();
    }
    catch (e) {
        const error = e;
        // If we have all the necessary information and APIs to send off the invalidation
        // request, send it before rethrowing so the dev server can decide what to do.
        if (id !== null && error.message) {
            const toLog = error.message + (error.stack ? '\n' + error.stack : '');
            (_b = (_a = importMeta === null || importMeta === void 0 ? void 0 : importMeta.hot) === null || _a === void 0 ? void 0 : _a.send) === null || _b === void 0 ? void 0 : _b.call(_a, 'angular:invalidate', { id, message: toLog, error: true });
        }
        // Throw the error in case the page doesn't get refreshed.
        throw e;
    }
}
/**
 * Replaces one LView in the tree with another one.
 * @param parentLView Parent of the LView being replaced.
 * @param oldLView LView being replaced.
 * @param newLView Replacement LView to be inserted.
 * @param index Index at which the LView should be inserted.
 */
function replaceLViewInTree(parentLView, oldLView, newLView, index) {
    // Update the sibling whose `NEXT` pointer refers to the old view.
    for (let i = view_1.HEADER_OFFSET; i < parentLView[view_1.TVIEW].bindingStartIndex; i++) {
        const current = parentLView[i];
        if (((0, type_checks_1.isLView)(current) || (0, type_checks_1.isLContainer)(current)) && current[view_1.NEXT] === oldLView) {
            current[view_1.NEXT] = newLView;
            break;
        }
    }
    // Set the new view as the head, if the old view was first.
    if (parentLView[view_1.CHILD_HEAD] === oldLView) {
        parentLView[view_1.CHILD_HEAD] = newLView;
    }
    // Set the new view as the tail, if the old view was last.
    if (parentLView[view_1.CHILD_TAIL] === oldLView) {
        parentLView[view_1.CHILD_TAIL] = newLView;
    }
    // Update the `NEXT` pointer to the same as the old view.
    newLView[view_1.NEXT] = oldLView[view_1.NEXT];
    // Clear out the `NEXT` of the old view.
    oldLView[view_1.NEXT] = null;
    // Insert the new LView at the correct index.
    parentLView[index] = newLView;
}
/**
 * Child nodes mutate the `projection` state of their parent node as they're being projected.
 * This function resets the `project` back to its initial state.
 * @param tNode
 */
function resetProjectionState(tNode) {
    // The `projection` is mutated by child nodes as they're being projected. We need to
    // reset it to the initial state so projection works after the template is swapped out.
    if (tNode.projection !== null) {
        for (const current of tNode.projection) {
            if ((0, node_1.isTNodeShape)(current)) {
                // Reset `projectionNext` since it can affect the traversal order during projection.
                current.projectionNext = null;
                current.flags &= ~2 /* TNodeFlags.isProjected */;
            }
        }
        tNode.projection = null;
    }
}
