"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertTNodeForLView = assertTNodeForLView;
exports.assertTNodeForTView = assertTNodeForTView;
exports.assertTNode = assertTNode;
exports.assertTIcu = assertTIcu;
exports.assertComponentType = assertComponentType;
exports.assertNgModuleType = assertNgModuleType;
exports.assertCurrentTNodeIsParent = assertCurrentTNodeIsParent;
exports.assertHasParent = assertHasParent;
exports.assertLContainer = assertLContainer;
exports.assertLViewOrUndefined = assertLViewOrUndefined;
exports.assertLView = assertLView;
exports.assertFirstCreatePass = assertFirstCreatePass;
exports.assertFirstUpdatePass = assertFirstUpdatePass;
exports.assertDirectiveDef = assertDirectiveDef;
exports.assertIndexInDeclRange = assertIndexInDeclRange;
exports.assertIndexInExpandoRange = assertIndexInExpandoRange;
exports.assertBetween = assertBetween;
exports.assertProjectionSlots = assertProjectionSlots;
exports.assertParentView = assertParentView;
exports.assertNoDuplicateDirectives = assertNoDuplicateDirectives;
exports.assertNodeInjector = assertNodeInjector;
const errors_1 = require("../errors");
const assert_1 = require("../util/assert");
const def_getters_1 = require("./def_getters");
const type_checks_1 = require("./interfaces/type_checks");
const view_1 = require("./interfaces/view");
// [Assert functions do not constraint type when they are guarded by a truthy
// expression.](https://github.com/microsoft/TypeScript/issues/37295)
function assertTNodeForLView(tNode, lView) {
    assertTNodeForTView(tNode, lView[view_1.TVIEW]);
}
function assertTNodeForTView(tNode, tView) {
    assertTNode(tNode);
    const tData = tView.data;
    for (let i = view_1.HEADER_OFFSET; i < tData.length; i++) {
        if (tData[i] === tNode) {
            return;
        }
    }
    (0, assert_1.throwError)('This TNode does not belong to this TView.');
}
function assertTNode(tNode) {
    (0, assert_1.assertDefined)(tNode, 'TNode must be defined');
    if (!(tNode && typeof tNode === 'object' && tNode.hasOwnProperty('directiveStylingLast'))) {
        (0, assert_1.throwError)('Not of type TNode, got: ' + tNode);
    }
}
function assertTIcu(tIcu) {
    (0, assert_1.assertDefined)(tIcu, 'Expected TIcu to be defined');
    if (!(typeof tIcu.currentCaseLViewIndex === 'number')) {
        (0, assert_1.throwError)('Object is not of TIcu type.');
    }
}
function assertComponentType(actual, msg = "Type passed in is not ComponentType, it does not have 'ɵcmp' property.") {
    if (!(0, def_getters_1.getComponentDef)(actual)) {
        (0, assert_1.throwError)(msg);
    }
}
function assertNgModuleType(actual, msg = "Type passed in is not NgModuleType, it does not have 'ɵmod' property.") {
    if (!(0, def_getters_1.getNgModuleDef)(actual)) {
        (0, assert_1.throwError)(msg);
    }
}
function assertCurrentTNodeIsParent(isParent) {
    (0, assert_1.assertEqual)(isParent, true, 'currentTNode should be a parent');
}
function assertHasParent(tNode) {
    (0, assert_1.assertDefined)(tNode, 'currentTNode should exist!');
    (0, assert_1.assertDefined)(tNode.parent, 'currentTNode should have a parent');
}
function assertLContainer(value) {
    (0, assert_1.assertDefined)(value, 'LContainer must be defined');
    (0, assert_1.assertEqual)((0, type_checks_1.isLContainer)(value), true, 'Expecting LContainer');
}
function assertLViewOrUndefined(value) {
    value && (0, assert_1.assertEqual)((0, type_checks_1.isLView)(value), true, 'Expecting LView or undefined or null');
}
function assertLView(value) {
    (0, assert_1.assertDefined)(value, 'LView must be defined');
    (0, assert_1.assertEqual)((0, type_checks_1.isLView)(value), true, 'Expecting LView');
}
function assertFirstCreatePass(tView, errMessage) {
    (0, assert_1.assertEqual)(tView.firstCreatePass, true, errMessage || 'Should only be called in first create pass.');
}
function assertFirstUpdatePass(tView, errMessage) {
    (0, assert_1.assertEqual)(tView.firstUpdatePass, true, errMessage || 'Should only be called in first update pass.');
}
/**
 * This is a basic sanity check that an object is probably a directive def. DirectiveDef is
 * an interface, so we can't do a direct instanceof check.
 */
function assertDirectiveDef(obj) {
    if (obj.type === undefined || obj.selectors == undefined || obj.inputs === undefined) {
        (0, assert_1.throwError)(`Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.`);
    }
}
function assertIndexInDeclRange(tView, index) {
    assertBetween(view_1.HEADER_OFFSET, tView.bindingStartIndex, index);
}
function assertIndexInExpandoRange(lView, index) {
    const tView = lView[1];
    assertBetween(tView.expandoStartIndex, lView.length, index);
}
function assertBetween(lower, upper, index) {
    if (!(lower <= index && index < upper)) {
        (0, assert_1.throwError)(`Index out of range (expecting ${lower} <= ${index} < ${upper})`);
    }
}
function assertProjectionSlots(lView, errMessage) {
    (0, assert_1.assertDefined)(lView[view_1.DECLARATION_COMPONENT_VIEW], 'Component views should exist.');
    (0, assert_1.assertDefined)(lView[view_1.DECLARATION_COMPONENT_VIEW][view_1.T_HOST].projection, errMessage ||
        'Components with projection nodes (<ng-content>) must have projection slots defined.');
}
function assertParentView(lView, errMessage) {
    (0, assert_1.assertDefined)(lView, errMessage || "Component views should always have a parent view (component's host view)");
}
function assertNoDuplicateDirectives(directives) {
    // The array needs at least two elements in order to have duplicates.
    if (directives.length < 2) {
        return;
    }
    const seenDirectives = new Set();
    for (const current of directives) {
        if (seenDirectives.has(current)) {
            throw new errors_1.RuntimeError(309 /* RuntimeErrorCode.DUPLICATE_DIRECTIVE */, `Directive ${current.type.name} matches multiple times on the same element. ` +
                `Directives can only match an element once.`);
        }
        seenDirectives.add(current);
    }
}
/**
 * This is a basic sanity check that the `injectorIndex` seems to point to what looks like a
 * NodeInjector data structure.
 *
 * @param lView `LView` which should be checked.
 * @param injectorIndex index into the `LView` where the `NodeInjector` is expected.
 */
function assertNodeInjector(lView, injectorIndex) {
    assertIndexInExpandoRange(lView, injectorIndex);
    assertIndexInExpandoRange(lView, injectorIndex + 8 /* NodeInjectorOffset.PARENT */);
    (0, assert_1.assertNumber)(lView[injectorIndex + 0], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 1], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 2], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 3], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 4], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 5], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 6], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 7], 'injectorIndex should point to a bloom filter');
    (0, assert_1.assertNumber)(lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */], 'injectorIndex should point to parent injector');
}
