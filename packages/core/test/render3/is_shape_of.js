"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isShapeOf = isShapeOf;
exports.isTI18n = isTI18n;
exports.isTIcu = isTIcu;
exports.isTView = isTView;
exports.isTNode = isTNode;
exports.isDOMNode = isDOMNode;
exports.isDOMElement = isDOMElement;
exports.isDOMText = isDOMText;
/**
 * Determines if a particular object is of a given shape (duck-type version of `instanceof`.)
 *
 * ```ts
 * isShapeOf(someObj, {foo: true, bar: true});
 * ```
 *
 * The above code will be true if the `someObj` has both `foo` and `bar` property
 *
 * @param obj Object to test for.
 * @param shapeOf Desired shape.
 */
function isShapeOf(obj, shapeOf) {
    if (typeof obj === 'object' && obj) {
        return Object.keys(shapeOf).every((key) => obj.hasOwnProperty(key));
    }
    return false;
}
/**
 * Determines if `obj` matches the shape `TI18n`.
 * @param obj
 */
function isTI18n(obj) {
    return isShapeOf(obj, ShapeOfTI18n);
}
const ShapeOfTI18n = {
    create: true,
    update: true,
    ast: true,
    parentTNodeIndex: true,
};
/**
 * Determines if `obj` matches the shape `TIcu`.
 * @param obj
 */
function isTIcu(obj) {
    return isShapeOf(obj, ShapeOfTIcu);
}
const ShapeOfTIcu = {
    type: true,
    anchorIdx: true,
    currentCaseLViewIndex: true,
    cases: true,
    create: true,
    remove: true,
    update: true,
};
/**
 * Determines if `obj` matches the shape `TView`.
 * @param obj
 */
function isTView(obj) {
    return isShapeOf(obj, ShapeOfTView);
}
const ShapeOfTView = {
    type: true,
    blueprint: true,
    template: true,
    viewQuery: true,
    declTNode: true,
    firstCreatePass: true,
    firstUpdatePass: true,
    data: true,
    bindingStartIndex: true,
    expandoStartIndex: true,
    staticViewQueries: true,
    staticContentQueries: true,
    firstChild: true,
    hostBindingOpCodes: true,
    directiveRegistry: true,
    pipeRegistry: true,
    preOrderHooks: true,
    preOrderCheckHooks: true,
    contentHooks: true,
    contentCheckHooks: true,
    viewHooks: true,
    viewCheckHooks: true,
    destroyHooks: true,
    cleanup: true,
    components: true,
    queries: true,
    contentQueries: true,
    schemas: true,
    consts: true,
    incompleteFirstPass: true,
    ssrId: true,
};
/**
 * Determines if `obj` matches the shape `TI18n`.
 * @param obj
 */
function isTNode(obj) {
    return isShapeOf(obj, ShapeOfTNode);
}
const ShapeOfTNode = {
    type: true,
    index: true,
    insertBeforeIndex: true,
    injectorIndex: true,
    directiveStart: true,
    directiveEnd: true,
    directiveStylingLast: true,
    componentOffset: true,
    propertyBindings: true,
    flags: true,
    providerIndexes: true,
    value: true,
    attrs: true,
    mergedAttrs: true,
    localNames: true,
    initialInputs: true,
    inputs: true,
    hostDirectiveInputs: true,
    outputs: true,
    hostDirectiveOutputs: true,
    directiveToIndex: true,
    tView: true,
    next: true,
    prev: true,
    projectionNext: true,
    child: true,
    parent: true,
    projection: true,
    styles: true,
    stylesWithoutHost: true,
    residualStyles: true,
    classes: true,
    classesWithoutHost: true,
    residualClasses: true,
    classBindings: true,
    styleBindings: true,
};
/**
 * Determines if `obj` is DOM `Node`.
 */
function isDOMNode(obj) {
    return obj instanceof Node;
}
/**
 * Determines if `obj` is DOM `Text`.
 */
function isDOMElement(obj) {
    return obj instanceof Element;
}
/**
 * Determines if `obj` is DOM `Text`.
 */
function isDOMText(obj) {
    return obj instanceof Text;
}
