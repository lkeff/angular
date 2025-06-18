"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRef = void 0;
exports.injectTemplateRef = injectTemplateRef;
exports.createTemplateRef = createTemplateRef;
const state_1 = require("../render3/state");
const view_manipulation_1 = require("../render3/view_manipulation");
const view_ref_1 = require("../render3/view_ref");
const assert_1 = require("../util/assert");
const element_ref_1 = require("./element_ref");
/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see {@link ViewContainerRef}
 *
 * @publicApi
 */
class TemplateRef {
}
exports.TemplateRef = TemplateRef;
/**
 * @internal
 * @nocollapse
 */
TemplateRef.__NG_ELEMENT_ID__ = injectTemplateRef;
const ViewEngineTemplateRef = TemplateRef;
// TODO(alxhub): combine interface and implementation. Currently this is challenging since something
// in g3 depends on them being separate.
const R3TemplateRef = class TemplateRef extends ViewEngineTemplateRef {
    constructor(_declarationLView, _declarationTContainer, elementRef) {
        super();
        this._declarationLView = _declarationLView;
        this._declarationTContainer = _declarationTContainer;
        this.elementRef = elementRef;
    }
    /**
     * Returns an `ssrId` associated with a TView, which was used to
     * create this instance of the `TemplateRef`.
     *
     * @internal
     */
    get ssrId() {
        var _a;
        return ((_a = this._declarationTContainer.tView) === null || _a === void 0 ? void 0 : _a.ssrId) || null;
    }
    createEmbeddedView(context, injector) {
        return this.createEmbeddedViewImpl(context, injector);
    }
    /**
     * @internal
     */
    createEmbeddedViewImpl(context, injector, dehydratedView) {
        const embeddedLView = (0, view_manipulation_1.createAndRenderEmbeddedLView)(this._declarationLView, this._declarationTContainer, context, { embeddedViewInjector: injector, dehydratedView });
        return new view_ref_1.ViewRef(embeddedLView);
    }
};
/**
 * Creates a TemplateRef given a node.
 *
 * @returns The TemplateRef instance to use
 */
function injectTemplateRef() {
    return createTemplateRef((0, state_1.getCurrentTNode)(), (0, state_1.getLView)());
}
/**
 * Creates a TemplateRef and stores it on the injector.
 *
 * @param hostTNode The node on which a TemplateRef is requested
 * @param hostLView The `LView` to which the node belongs
 * @returns The TemplateRef instance or null if we can't create a TemplateRef on a given node type
 */
function createTemplateRef(hostTNode, hostLView) {
    if (hostTNode.type & 4 /* TNodeType.Container */) {
        ngDevMode && (0, assert_1.assertDefined)(hostTNode.tView, 'TView must be allocated');
        return new R3TemplateRef(hostLView, hostTNode, (0, element_ref_1.createElementRef)(hostTNode, hostLView));
    }
    return null;
}
