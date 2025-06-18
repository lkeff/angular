"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPORARY_CONSUMER_NODE = exports.REACTIVE_LVIEW_CONSUMER_NODE = void 0;
exports.getOrBorrowReactiveLViewConsumer = getOrBorrowReactiveLViewConsumer;
exports.maybeReturnReactiveLViewConsumer = maybeReturnReactiveLViewConsumer;
exports.getOrCreateTemporaryConsumer = getOrCreateTemporaryConsumer;
exports.viewShouldHaveReactiveConsumer = viewShouldHaveReactiveConsumer;
exports.isReactiveLViewConsumer = isReactiveLViewConsumer;
const signals_1 = require("../../primitives/signals");
const view_1 = require("./interfaces/view");
const view_utils_1 = require("./util/view_utils");
let freeConsumers = [];
/**
 * Create a new template consumer pointing at the specified LView.
 * Sometimes, a previously created consumer may be reused, in order to save on allocations. In that
 * case, the LView will be updated.
 */
function getOrBorrowReactiveLViewConsumer(lView) {
    var _a;
    return (_a = lView[view_1.REACTIVE_TEMPLATE_CONSUMER]) !== null && _a !== void 0 ? _a : borrowReactiveLViewConsumer(lView);
}
function borrowReactiveLViewConsumer(lView) {
    var _a;
    const consumer = (_a = freeConsumers.pop()) !== null && _a !== void 0 ? _a : Object.create(exports.REACTIVE_LVIEW_CONSUMER_NODE);
    consumer.lView = lView;
    return consumer;
}
function maybeReturnReactiveLViewConsumer(consumer) {
    if (consumer.lView[view_1.REACTIVE_TEMPLATE_CONSUMER] === consumer) {
        // The consumer got committed.
        return;
    }
    consumer.lView = null;
    freeConsumers.push(consumer);
}
exports.REACTIVE_LVIEW_CONSUMER_NODE = Object.assign(Object.assign({}, signals_1.REACTIVE_NODE), { consumerIsAlwaysLive: true, kind: 'template', consumerMarkedDirty: (node) => {
        (0, view_utils_1.markAncestorsForTraversal)(node.lView);
    }, consumerOnSignalRead() {
        this.lView[view_1.REACTIVE_TEMPLATE_CONSUMER] = this;
    } });
/**
 * Creates a temporary consumer for use with `LView`s that should not have consumers.
 * If the LView already has a consumer, returns the existing one instead.
 *
 * This is necessary because some APIs may cause change detection directly on an LView
 * that we do not want to have a consumer (Embedded views today). As a result, there
 * would be no active consumer from running change detection on its host component
 * and any signals in the LView template would be untracked. Instead, we create
 * this temporary consumer that marks the first parent that _should_ have a consumer
 * for refresh. Once change detection runs as part of that refresh, we throw away
 * this consumer because its signals will then be tracked by the parent's consumer.
 */
function getOrCreateTemporaryConsumer(lView) {
    var _a;
    const consumer = (_a = lView[view_1.REACTIVE_TEMPLATE_CONSUMER]) !== null && _a !== void 0 ? _a : Object.create(exports.TEMPORARY_CONSUMER_NODE);
    consumer.lView = lView;
    return consumer;
}
exports.TEMPORARY_CONSUMER_NODE = Object.assign(Object.assign({}, signals_1.REACTIVE_NODE), { consumerIsAlwaysLive: true, kind: 'template', consumerMarkedDirty: (node) => {
        let parent = (0, view_utils_1.getLViewParent)(node.lView);
        while (parent && !viewShouldHaveReactiveConsumer(parent[view_1.TVIEW])) {
            parent = (0, view_utils_1.getLViewParent)(parent);
        }
        if (!parent) {
            // If we can't find an appropriate parent that should have a consumer, we
            // don't have a way of appropriately refreshing this LView as part of application synchronization.
            return;
        }
        (0, view_utils_1.markViewForRefresh)(parent);
    }, consumerOnSignalRead() {
        this.lView[view_1.REACTIVE_TEMPLATE_CONSUMER] = this;
    } });
/**
 * Indicates if the view should get its own reactive consumer node.
 *
 * In the current design, all embedded views share a consumer with the component view. This allows
 * us to refresh at the component level rather than at a per-view level. In addition, root views get
 * their own reactive node because root component will have a host view that executes the
 * component's host bindings. This needs to be tracked in a consumer as well.
 *
 * To get a more granular change detection than per-component, all we would just need to update the
 * condition here so that a given view gets a reactive consumer which can become dirty independently
 * from its parent component. For example embedded views for signal components could be created with
 * a new type "SignalEmbeddedView" and the condition here wouldn't even need updating in order to
 * get granular per-view change detection for signal components.
 */
function viewShouldHaveReactiveConsumer(tView) {
    return tView.type !== 2 /* TViewType.Embedded */;
}
function isReactiveLViewConsumer(node) {
    return node.kind === 'template';
}
