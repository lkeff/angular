"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵcontentQuery = ɵɵcontentQuery;
exports.ɵɵviewQuery = ɵɵviewQuery;
exports.ɵɵqueryRefresh = ɵɵqueryRefresh;
exports.ɵɵloadQuery = ɵɵloadQuery;
const element_ref_1 = require("../../linker/element_ref");
const query_1 = require("../queries/query");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
function ɵɵcontentQuery(directiveIndex, predicate, flags, read) {
    (0, query_1.createContentQuery)(directiveIndex, predicate, flags, read);
}
/**
 * Creates a new view query by initializing internal data structures.
 *
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
function ɵɵviewQuery(predicate, flags, read) {
    (0, query_1.createViewQuery)(predicate, flags, read);
}
/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 *
 * @returns `true` if a query got dirty during change detection or if this is a static query
 * resolving in creation mode, `false` otherwise.
 *
 * @codeGenApi
 */
function ɵɵqueryRefresh(queryList) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const queryIndex = (0, state_1.getCurrentQueryIndex)();
    (0, state_1.setCurrentQueryIndex)(queryIndex + 1);
    const tQuery = (0, query_1.getTQuery)(tView, queryIndex);
    if (queryList.dirty &&
        (0, view_utils_1.isCreationMode)(lView) ===
            ((tQuery.metadata.flags & 2 /* QueryFlags.isStatic */) === 2 /* QueryFlags.isStatic */)) {
        if (tQuery.matches === null) {
            queryList.reset([]);
        }
        else {
            const result = (0, query_1.getQueryResults)(lView, queryIndex);
            queryList.reset(result, element_ref_1.unwrapElementRef);
            queryList.notifyOnChanges();
        }
        return true;
    }
    return false;
}
/**
 * Loads a QueryList corresponding to the current view or content query.
 *
 * @codeGenApi
 */
function ɵɵloadQuery() {
    return (0, query_1.loadQueryInternal)((0, state_1.getLView)(), (0, state_1.getCurrentQueryIndex)());
}
