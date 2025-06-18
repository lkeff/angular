"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDetectorRef = void 0;
exports.injectChangeDetectorRef = injectChangeDetectorRef;
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const state_1 = require("../render3/state");
const view_utils_1 = require("../render3/util/view_utils");
const view_ref_1 = require("../render3/view_ref");
/**
 * Base class that provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be re-rendered.
 *
 * @see [Using change detection hooks](guide/components/lifecycle#using-change-detection-hooks)
 * @see [Defining custom change detection](guide/components/lifecycle#defining-custom-change-detection)
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval.
 *
 * {@example core/ts/change_detect/change-detection.ts region='mark-for-check'}
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * {@example core/ts/change_detect/change-detection.ts region='detach'}
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * {@example core/ts/change_detect/change-detection.ts region='reattach'}
 *
 * @publicApi
 */
class ChangeDetectorRef {
}
exports.ChangeDetectorRef = ChangeDetectorRef;
/**
 * @internal
 * @nocollapse
 */
ChangeDetectorRef.__NG_ELEMENT_ID__ = injectChangeDetectorRef;
/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
function injectChangeDetectorRef(flags) {
    return createViewRef((0, state_1.getCurrentTNode)(), (0, state_1.getLView)(), (flags & 16 /* InternalInjectFlags.ForPipe */) === 16 /* InternalInjectFlags.ForPipe */);
}
/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 *
 * @param tNode The node that is requesting a ChangeDetectorRef
 * @param lView The view to which the node belongs
 * @param isPipe Whether the view is being injected into a pipe.
 * @returns The ChangeDetectorRef to use
 */
function createViewRef(tNode, lView, isPipe) {
    if ((0, type_checks_1.isComponentHost)(tNode) && !isPipe) {
        // The LView represents the location where the component is declared.
        // Instead we want the LView for the component View and so we need to look it up.
        const componentView = (0, view_utils_1.getComponentLViewByIndex)(tNode.index, lView); // look down
        return new view_ref_1.ViewRef(componentView, componentView);
    }
    else if (tNode.type &
        (3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 32 /* TNodeType.Icu */ | 128 /* TNodeType.LetDeclaration */)) {
        // The LView represents the location where the injection is requested from.
        // We need to locate the containing LView (in case where the `lView` is an embedded view)
        const hostComponentView = lView[view_1.DECLARATION_COMPONENT_VIEW]; // look up
        return new view_ref_1.ViewRef(hostComponentView, lView);
    }
    return null;
}
