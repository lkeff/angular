"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndRenderEmbeddedLView = createAndRenderEmbeddedLView;
exports.shouldAddViewToDom = shouldAddViewToDom;
const signals_1 = require("../../primitives/signals");
const skip_hydration_1 = require("../hydration/skip_hydration");
const assert_1 = require("../util/assert");
const assert_2 = require("./assert");
const render_1 = require("./instructions/render");
const view_1 = require("./interfaces/view");
const construction_1 = require("./view/construction");
function createAndRenderEmbeddedLView(declarationLView, templateTNode, context, options) {
    var _a, _b, _c;
    const prevConsumer = (0, signals_1.setActiveConsumer)(null);
    try {
        const embeddedTView = templateTNode.tView;
        ngDevMode && (0, assert_1.assertDefined)(embeddedTView, 'TView must be defined for a template node.');
        ngDevMode && (0, assert_2.assertTNodeForLView)(templateTNode, declarationLView);
        // Embedded views follow the change detection strategy of the view they're declared in.
        const isSignalView = declarationLView[view_1.FLAGS] & 4096 /* LViewFlags.SignalView */;
        const viewFlags = isSignalView ? 4096 /* LViewFlags.SignalView */ : 16 /* LViewFlags.CheckAlways */;
        const embeddedLView = (0, construction_1.createLView)(declarationLView, embeddedTView, context, viewFlags, null, templateTNode, null, null, (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : null, (_b = options === null || options === void 0 ? void 0 : options.embeddedViewInjector) !== null && _b !== void 0 ? _b : null, (_c = options === null || options === void 0 ? void 0 : options.dehydratedView) !== null && _c !== void 0 ? _c : null);
        const declarationLContainer = declarationLView[templateTNode.index];
        ngDevMode && (0, assert_2.assertLContainer)(declarationLContainer);
        embeddedLView[view_1.DECLARATION_LCONTAINER] = declarationLContainer;
        const declarationViewLQueries = declarationLView[view_1.QUERIES];
        if (declarationViewLQueries !== null) {
            embeddedLView[view_1.QUERIES] = declarationViewLQueries.createEmbeddedView(embeddedTView);
        }
        // execute creation mode of a view
        (0, render_1.renderView)(embeddedTView, embeddedLView, context);
        return embeddedLView;
    }
    finally {
        (0, signals_1.setActiveConsumer)(prevConsumer);
    }
}
/**
 * Returns whether an elements that belong to a view should be
 * inserted into the DOM. For client-only cases, DOM elements are
 * always inserted. For hydration cases, we check whether serialized
 * info is available for a view and the view is not in a "skip hydration"
 * block (in which case view contents was re-created, thus needing insertion).
 */
function shouldAddViewToDom(tNode, dehydratedView) {
    return (!dehydratedView || dehydratedView.firstChild === null || (0, skip_hydration_1.hasInSkipHydrationBlockFlag)(tNode));
}
