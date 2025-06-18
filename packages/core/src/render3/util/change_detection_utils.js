"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyChanges = applyChanges;
const assert_1 = require("../../util/assert");
const context_discovery_1 = require("../context_discovery");
const change_detection_1 = require("../instructions/change_detection");
const mark_view_dirty_1 = require("../instructions/mark_view_dirty");
const view_1 = require("../interfaces/view");
const discovery_utils_1 = require("./discovery_utils");
/**
 * Marks a component for check (in case of OnPush components) and synchronously
 * performs change detection on the application this component belongs to.
 *
 * @param component Component to {@link /api/core/ChangeDetectorRef#markForCheck mark for check}
 *
 * @publicApi
 */
function applyChanges(component) {
    ngDevMode && (0, assert_1.assertDefined)(component, 'component');
    (0, mark_view_dirty_1.markViewDirty)((0, context_discovery_1.getComponentViewByInstance)(component), 3 /* NotificationSource.DebugApplyChanges */);
    (0, discovery_utils_1.getRootComponents)(component).forEach((rootComponent) => detectChanges(rootComponent));
}
/**
 * Synchronously perform change detection on a component (and possibly its sub-components).
 *
 * This function triggers change detection in a synchronous way on a component.
 *
 * @param component The component which the change detection should be performed on.
 */
function detectChanges(component) {
    const view = (0, context_discovery_1.getComponentViewByInstance)(component);
    view[view_1.FLAGS] |= 1024 /* LViewFlags.RefreshView */;
    (0, change_detection_1.detectChangesInternal)(view);
}
