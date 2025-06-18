"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.topologicalSort = topologicalSort;
/**
 * Sorts the inheritance graph topologically, so that
 * nodes without incoming edges are returned first.
 *
 * I.e. The returned list is sorted, so that dependencies
 * of a given class are guaranteed to be included at
 * an earlier position than the inspected class.
 *
 * This sort is helpful for detecting inheritance problems
 * for the migration in simpler ways, without having to
 * check in both directions (base classes, and derived classes).
 */
function topologicalSort(graph) {
    // All nodes without incoming edges.
    const S = graph.filter((n) => n.incoming.size === 0);
    const result = [];
    const invalidatedEdges = new WeakMap();
    const invalidateEdge = (from, to) => {
        if (!invalidatedEdges.has(from)) {
            invalidatedEdges.set(from, new Set());
        }
        invalidatedEdges.get(from).add(to);
    };
    const filterEdges = (from, edges) => {
        return Array.from(edges).filter((e) => !invalidatedEdges.has(from) || !invalidatedEdges.get(from).has(e));
    };
    while (S.length) {
        const node = S.pop();
        result.push(node);
        for (const next of filterEdges(node, node.outgoing)) {
            // Remove edge from "node -> next".
            invalidateEdge(node, next);
            // Remove edge from "next -> node".
            invalidateEdge(next, node);
            // if there are no incoming edges for `next`. add it to `S`.
            if (filterEdges(next, next.incoming).length === 0) {
                S.push(next);
            }
        }
    }
    return result;
}
