"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterableDifferToString = iterableDifferToString;
exports.iterableChangesAsString = iterableChangesAsString;
exports.kvChangesAsString = kvChangesAsString;
exports.testChangesAsString = testChangesAsString;
const stringify_1 = require("../../src/util/stringify");
function iterableDifferToString(iterableChanges) {
    const collection = [];
    iterableChanges.forEachItem((record) => collection.push(icrAsString(record)));
    const previous = [];
    iterableChanges.forEachPreviousItem((record) => previous.push(icrAsString(record)));
    const additions = [];
    iterableChanges.forEachAddedItem((record) => additions.push(icrAsString(record)));
    const moves = [];
    iterableChanges.forEachMovedItem((record) => moves.push(icrAsString(record)));
    const removals = [];
    iterableChanges.forEachRemovedItem((record) => removals.push(icrAsString(record)));
    const identityChanges = [];
    iterableChanges.forEachIdentityChange((record) => identityChanges.push(icrAsString(record)));
    return iterableChangesAsString({
        collection,
        previous,
        additions,
        moves,
        removals,
        identityChanges,
    });
}
function icrAsString(icr) {
    return icr.previousIndex === icr.currentIndex
        ? (0, stringify_1.stringify)(icr.item)
        : (0, stringify_1.stringify)(icr.item) +
            '[' +
            (0, stringify_1.stringify)(icr.previousIndex) +
            '->' +
            (0, stringify_1.stringify)(icr.currentIndex) +
            ']';
}
function iterableChangesAsString({ collection = [], previous = [], additions = [], moves = [], removals = [], identityChanges = [], }) {
    return ('collection: ' +
        collection.join(', ') +
        '\n' +
        'previous: ' +
        previous.join(', ') +
        '\n' +
        'additions: ' +
        additions.join(', ') +
        '\n' +
        'moves: ' +
        moves.join(', ') +
        '\n' +
        'removals: ' +
        removals.join(', ') +
        '\n' +
        'identityChanges: ' +
        identityChanges.join(', ') +
        '\n');
}
function kvcrAsString(kvcr) {
    return Object.is(kvcr.previousValue, kvcr.currentValue)
        ? (0, stringify_1.stringify)(kvcr.key)
        : (0, stringify_1.stringify)(kvcr.key) +
            '[' +
            (0, stringify_1.stringify)(kvcr.previousValue) +
            '->' +
            (0, stringify_1.stringify)(kvcr.currentValue) +
            ']';
}
function kvChangesAsString(kvChanges) {
    const map = [];
    const previous = [];
    const changes = [];
    const additions = [];
    const removals = [];
    kvChanges.forEachItem((r) => map.push(kvcrAsString(r)));
    kvChanges.forEachPreviousItem((r) => previous.push(kvcrAsString(r)));
    kvChanges.forEachChangedItem((r) => changes.push(kvcrAsString(r)));
    kvChanges.forEachAddedItem((r) => additions.push(kvcrAsString(r)));
    kvChanges.forEachRemovedItem((r) => removals.push(kvcrAsString(r)));
    return testChangesAsString({ map, previous, additions, changes, removals });
}
function testChangesAsString({ map, previous, additions, changes, removals, }) {
    if (!map)
        map = [];
    if (!previous)
        previous = [];
    if (!additions)
        additions = [];
    if (!changes)
        changes = [];
    if (!removals)
        removals = [];
    return ('map: ' +
        map.join(', ') +
        '\n' +
        'previous: ' +
        previous.join(', ') +
        '\n' +
        'additions: ' +
        additions.join(', ') +
        '\n' +
        'changes: ' +
        changes.join(', ') +
        '\n' +
        'removals: ' +
        removals.join(', ') +
        '\n');
}
