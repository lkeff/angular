"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSegments = compareSegments;
exports.offsetSegment = offsetSegment;
/**
 * Compare two segment-markers, for use in a search or sorting algorithm.
 *
 * @returns a positive number if `a` is after `b`, a negative number if `b` is after `a`
 * and zero if they are at the same position.
 */
function compareSegments(a, b) {
    return a.position - b.position;
}
/**
 * Return a new segment-marker that is offset by the given number of characters.
 *
 * @param startOfLinePositions the position of the start of each line of content of the source file
 * whose segment-marker we are offsetting.
 * @param marker the segment to offset.
 * @param offset the number of character to offset by.
 */
function offsetSegment(startOfLinePositions, marker, offset) {
    if (offset === 0) {
        return marker;
    }
    let line = marker.line;
    const position = marker.position + offset;
    while (line < startOfLinePositions.length - 1 && startOfLinePositions[line + 1] <= position) {
        line++;
    }
    while (line > 0 && startOfLinePositions[line] > position) {
        line--;
    }
    const column = position - startOfLinePositions[line];
    return { line, column, position, next: undefined };
}
