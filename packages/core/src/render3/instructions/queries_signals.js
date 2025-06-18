"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵcontentQuerySignal = ɵɵcontentQuerySignal;
exports.ɵɵviewQuerySignal = ɵɵviewQuerySignal;
exports.ɵɵqueryAdvance = ɵɵqueryAdvance;
const query_1 = require("../queries/query");
const query_reactive_1 = require("../queries/query_reactive");
const state_1 = require("../state");
/**
 * Creates a new content query and binds it to a signal created by an authoring function.
 *
 * @param directiveIndex Current directive index
 * @param target The target signal to which the query should be bound
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
function ɵɵcontentQuerySignal(directiveIndex, target, predicate, flags, read) {
    (0, query_reactive_1.bindQueryToSignal)(target, (0, query_1.createContentQuery)(directiveIndex, predicate, flags, read));
}
/**
 * Creates a new view query by initializing internal data structures and binding a new query to the
 * target signal.
 *
 * @param target The target signal to assign the query results to.
 * @param predicate The type or label that should match a given query
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
function ɵɵviewQuerySignal(target, predicate, flags, read) {
    (0, query_reactive_1.bindQueryToSignal)(target, (0, query_1.createViewQuery)(predicate, flags, read));
}
/**
 * Advances the current query index by a specified offset.
 *
 * Adjusting the current query index is necessary in cases where a given directive has a mix of
 * zone-based and signal-based queries. The signal-based queries don't require tracking of the
 * current index (those are refreshed on demand and not during change detection) so this instruction
 * is only necessary for backward-compatibility.
 *
 * @param index offset to apply to the current query index (defaults to 1)
 *
 * @codeGenApi
 */
function ɵɵqueryAdvance(indexOffset = 1) {
    (0, state_1.setCurrentQueryIndex)((0, state_1.getCurrentQueryIndex)() + indexOffset);
}
