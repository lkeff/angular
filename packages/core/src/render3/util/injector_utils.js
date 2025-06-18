"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasParentInjector = hasParentInjector;
exports.getParentInjectorIndex = getParentInjectorIndex;
exports.getParentInjectorViewOffset = getParentInjectorViewOffset;
exports.getParentInjectorView = getParentInjectorView;
const assert_1 = require("../../util/assert");
const injector_1 = require("../interfaces/injector");
const view_1 = require("../interfaces/view");
/// Parent Injector Utils ///////////////////////////////////////////////////////////////
function hasParentInjector(parentLocation) {
    return parentLocation !== injector_1.NO_PARENT_INJECTOR;
}
function getParentInjectorIndex(parentLocation) {
    if (ngDevMode) {
        (0, assert_1.assertNumber)(parentLocation, 'Number expected');
        (0, assert_1.assertNotEqual)(parentLocation, -1, 'Not a valid state.');
        const parentInjectorIndex = parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
        (0, assert_1.assertGreaterThan)(parentInjectorIndex, view_1.HEADER_OFFSET, 'Parent injector must be pointing past HEADER_OFFSET.');
    }
    return parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
}
function getParentInjectorViewOffset(parentLocation) {
    return parentLocation >> 16 /* RelativeInjectorLocationFlags.ViewOffsetShift */;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @returns The LView instance that contains the parent injector
 */
function getParentInjectorView(location, startView) {
    let viewOffset = getParentInjectorViewOffset(location);
    let parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = parentView[view_1.DECLARATION_VIEW];
        viewOffset--;
    }
    return parentView;
}
