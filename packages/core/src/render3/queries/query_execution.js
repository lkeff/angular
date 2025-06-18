"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshContentQueries = refreshContentQueries;
exports.executeViewQueryFn = executeViewQueryFn;
exports.executeContentQueries = executeContentQueries;
const signals_1 = require("../../../primitives/signals");
const assert_1 = require("../../util/assert");
const state_1 = require("../state");
const type_checks_1 = require("../interfaces/type_checks");
/** Refreshes all content queries declared by directives in a given view */
function refreshContentQueries(tView, lView) {
    const contentQueries = tView.contentQueries;
    if (contentQueries !== null) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            for (let i = 0; i < contentQueries.length; i += 2) {
                const queryStartIdx = contentQueries[i];
                const directiveDefIdx = contentQueries[i + 1];
                if (directiveDefIdx !== -1) {
                    const directiveDef = tView.data[directiveDefIdx];
                    ngDevMode && (0, assert_1.assertDefined)(directiveDef, 'DirectiveDef not found.');
                    ngDevMode &&
                        (0, assert_1.assertDefined)(directiveDef.contentQueries, 'contentQueries function should be defined');
                    (0, state_1.setCurrentQueryIndex)(queryStartIdx);
                    directiveDef.contentQueries(2 /* RenderFlags.Update */, lView[directiveDefIdx], directiveDefIdx);
                }
            }
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
}
function executeViewQueryFn(flags, viewQueryFn, component) {
    ngDevMode && (0, assert_1.assertDefined)(viewQueryFn, 'View queries function to execute must be defined.');
    (0, state_1.setCurrentQueryIndex)(0);
    const prevConsumer = (0, signals_1.setActiveConsumer)(null);
    try {
        viewQueryFn(flags, component);
    }
    finally {
        (0, signals_1.setActiveConsumer)(prevConsumer);
    }
}
function executeContentQueries(tView, tNode, lView) {
    if ((0, type_checks_1.isContentQueryHost)(tNode)) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            const start = tNode.directiveStart;
            const end = tNode.directiveEnd;
            for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
                const def = tView.data[directiveIndex];
                if (def.contentQueries) {
                    const directiveInstance = lView[directiveIndex];
                    ngDevMode &&
                        (0, assert_1.assertDefined)(directiveIndex, 'Incorrect reference to a directive defining a content query');
                    def.contentQueries(1 /* RenderFlags.Create */, directiveInstance, directiveIndex);
                }
            }
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
}
