"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareTemplate = declareTemplate;
exports.ɵɵtemplate = ɵɵtemplate;
exports.enableLocateOrCreateContainerAnchorImpl = enableLocateOrCreateContainerAnchorImpl;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const error_handling_1 = require("../../hydration/error_handling");
const interfaces_1 = require("../../hydration/interfaces");
const node_lookup_utils_1 = require("../../hydration/node_lookup_utils");
const utils_1 = require("../../hydration/utils");
const utils_2 = require("../../i18n/utils");
const view_container_ref_1 = require("../../linker/view_container_ref");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const hooks_1 = require("../hooks");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const node_manipulation_1 = require("../node_manipulation");
const state_1 = require("../state");
const tnode_manipulation_1 = require("../tnode_manipulation");
const attrs_utils_1 = require("../util/attrs_utils");
const view_utils_1 = require("../util/view_utils");
const construction_1 = require("../view/construction");
const container_1 = require("../view/container");
const directives_1 = require("../view/directives");
const shared_1 = require("./shared");
function templateFirstCreatePass(index, tView, lView, templateFn, decls, vars, tagName, attrs, localRefsIndex) {
    ngDevMode && (0, assert_2.assertFirstCreatePass)(tView);
    const tViewConsts = tView.consts;
    // TODO(pk): refactor getOrCreateTNode to have the "create" only version
    const tNode = (0, tnode_manipulation_1.getOrCreateTNode)(tView, index, 4 /* TNodeType.Container */, tagName || null, attrs || null);
    if ((0, state_1.getBindingsEnabled)()) {
        (0, directives_1.resolveDirectives)(tView, lView, tNode, (0, view_utils_1.getConstant)(tViewConsts, localRefsIndex), shared_1.findDirectiveDefMatches);
    }
    // Merge the template attrs last so that they have the highest priority.
    tNode.mergedAttrs = (0, attrs_utils_1.mergeHostAttrs)(tNode.mergedAttrs, tNode.attrs);
    (0, hooks_1.registerPostOrderHooks)(tView, tNode);
    const embeddedTView = (tNode.tView = (0, construction_1.createTView)(2 /* TViewType.Embedded */, tNode, templateFn, decls, vars, tView.directiveRegistry, tView.pipeRegistry, null, tView.schemas, tViewConsts, null /* ssrId */));
    if (tView.queries !== null) {
        tView.queries.template(tView, tNode);
        embeddedTView.queries = tView.queries.embeddedTView(tNode);
    }
    return tNode;
}
/**
 * Creates an LContainer for an embedded view.
 *
 * @param declarationLView LView in which the template was declared.
 * @param declarationTView TView in which the template wa declared.
 * @param index The index of the container in the data array
 * @param templateFn Inline template
 * @param decls The number of nodes, local refs, and pipes for this template
 * @param vars The number of bindings for this template
 * @param tagName The name of the container element, if applicable
 * @param attrsIndex Index of template attributes in the `consts` array.
 * @param localRefs Index of the local references in the `consts` array.
 * @param localRefExtractor A function which extracts local-refs values from the template.
 *        Defaults to the current element associated with the local-ref.
 */
function declareTemplate(declarationLView, declarationTView, index, templateFn, decls, vars, tagName, attrs, flags, localRefsIndex, localRefExtractor) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const tNode = declarationTView.firstCreatePass
        ? templateFirstCreatePass(adjustedIndex, declarationTView, declarationLView, templateFn, decls, vars, tagName, attrs, localRefsIndex)
        : declarationTView.data[adjustedIndex];
    if (flags) {
        tNode.flags |= flags;
    }
    (0, state_1.setCurrentTNode)(tNode, false);
    const comment = _locateOrCreateContainerAnchor(declarationTView, declarationLView, tNode, index);
    if ((0, state_1.wasLastNodeCreated)()) {
        (0, node_manipulation_1.appendChild)(declarationTView, declarationLView, comment, tNode);
    }
    (0, context_discovery_1.attachPatchData)(comment, declarationLView);
    const lContainer = (0, container_1.createLContainer)(comment, declarationLView, comment, tNode);
    declarationLView[adjustedIndex] = lContainer;
    (0, construction_1.addToEndOfViewTree)(declarationLView, lContainer);
    // If hydration is enabled, looks up dehydrated views in the DOM
    // using hydration annotation info and stores those views on LContainer.
    // In client-only mode, this function is a noop.
    (0, view_container_ref_1.populateDehydratedViewsInLContainer)(lContainer, tNode, declarationLView);
    if ((0, type_checks_1.isDirectiveHost)(tNode)) {
        (0, shared_1.createDirectivesInstances)(declarationTView, declarationLView, tNode);
    }
    if (localRefsIndex != null) {
        (0, shared_1.saveResolvedLocalsInData)(declarationLView, tNode, localRefExtractor);
    }
    return tNode;
}
/**
 * Creates an LContainer for an ng-template (dynamically-inserted view), e.g.
 *
 * <ng-template #foo>
 *    <div></div>
 * </ng-template>
 *
 * @param index The index of the container in the data array
 * @param templateFn Inline template
 * @param decls The number of nodes, local refs, and pipes for this template
 * @param vars The number of bindings for this template
 * @param tagName The name of the container element, if applicable
 * @param attrsIndex Index of template attributes in the `consts` array.
 * @param localRefs Index of the local references in the `consts` array.
 * @param localRefExtractor A function which extracts local-refs values from the template.
 *        Defaults to the current element associated with the local-ref.
 *
 * @codeGenApi
 */
function ɵɵtemplate(index, templateFn, decls, vars, tagName, attrsIndex, localRefsIndex, localRefExtractor) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const attrs = (0, view_utils_1.getConstant)(tView.consts, attrsIndex);
    declareTemplate(lView, tView, index, templateFn, decls, vars, tagName, attrs, undefined, localRefsIndex, localRefExtractor);
    return ɵɵtemplate;
}
let _locateOrCreateContainerAnchor = createContainerAnchorImpl;
/**
 * Regular creation mode for LContainers and their anchor (comment) nodes.
 */
function createContainerAnchorImpl(tView, lView, tNode, index) {
    (0, state_1.lastNodeWasCreated)(true);
    return lView[view_1.RENDERER].createComment(ngDevMode ? 'container' : '');
}
/**
 * Enables hydration code path (to lookup existing elements in DOM)
 * in addition to the regular creation mode for LContainers and their
 * anchor (comment) nodes.
 */
function locateOrCreateContainerAnchorImpl(tView, lView, tNode, index) {
    var _a, _b;
    const hydrationInfo = lView[view_1.HYDRATION];
    const isNodeCreationMode = !hydrationInfo ||
        (0, state_1.isInSkipHydrationBlock)() ||
        (0, utils_2.isDetachedByI18n)(tNode) ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, index);
    (0, state_1.lastNodeWasCreated)(isNodeCreationMode);
    // Regular creation mode.
    if (isNodeCreationMode) {
        return createContainerAnchorImpl(tView, lView, tNode, index);
    }
    const ssrId = (_b = (_a = hydrationInfo.data[interfaces_1.TEMPLATES]) === null || _a === void 0 ? void 0 : _a[index]) !== null && _b !== void 0 ? _b : null;
    // Apply `ssrId` value to the underlying TView if it was not previously set.
    //
    // There might be situations when the same component is present in a template
    // multiple times and some instances are opted-out of using hydration via
    // `ngSkipHydration` attribute. In this scenario, at the time a TView is created,
    // the `ssrId` might be `null` (if the first component is opted-out of hydration).
    // The code below makes sure that the `ssrId` is applied to the TView if it's still
    // `null` and verifies we never try to override it with a different value.
    if (ssrId !== null && tNode.tView !== null) {
        if (tNode.tView.ssrId === null) {
            tNode.tView.ssrId = ssrId;
        }
        else {
            ngDevMode &&
                (0, assert_1.assertEqual)(tNode.tView.ssrId, ssrId, 'Unexpected value of the `ssrId` for this TView');
        }
    }
    // Hydration mode, looking up existing elements in DOM.
    const currentRNode = (0, node_lookup_utils_1.locateNextRNode)(hydrationInfo, tView, lView, tNode);
    ngDevMode && (0, error_handling_1.validateNodeExists)(currentRNode, lView, tNode);
    (0, utils_1.setSegmentHead)(hydrationInfo, index, currentRNode);
    const viewContainerSize = (0, utils_1.calcSerializedContainerSize)(hydrationInfo, index);
    const comment = (0, node_lookup_utils_1.siblingAfter)(viewContainerSize, currentRNode);
    if (ngDevMode) {
        (0, error_handling_1.validateMatchingNode)(comment, Node.COMMENT_NODE, null, lView, tNode);
        (0, utils_1.markRNodeAsClaimedByHydration)(comment);
    }
    return comment;
}
function enableLocateOrCreateContainerAnchorImpl() {
    _locateOrCreateContainerAnchor = locateOrCreateContainerAnchorImpl;
}
