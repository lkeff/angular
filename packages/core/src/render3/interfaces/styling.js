"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTStylingRange = toTStylingRange;
exports.getTStylingRangePrev = getTStylingRangePrev;
exports.getTStylingRangePrevDuplicate = getTStylingRangePrevDuplicate;
exports.setTStylingRangePrev = setTStylingRangePrev;
exports.setTStylingRangePrevDuplicate = setTStylingRangePrevDuplicate;
exports.getTStylingRangeNext = getTStylingRangeNext;
exports.setTStylingRangeNext = setTStylingRangeNext;
exports.getTStylingRangeNextDuplicate = getTStylingRangeNextDuplicate;
exports.setTStylingRangeNextDuplicate = setTStylingRangeNextDuplicate;
exports.getTStylingRangeTail = getTStylingRangeTail;
const assert_1 = require("../../util/assert");
function toTStylingRange(prev, next) {
    ngDevMode && (0, assert_1.assertNumberInRange)(prev, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    ngDevMode && (0, assert_1.assertNumberInRange)(next, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return ((prev << 17 /* StylingRange.PREV_SHIFT */) | (next << 2 /* StylingRange.NEXT_SHIFT */));
}
function getTStylingRangePrev(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange >> 17 /* StylingRange.PREV_SHIFT */) & 32767 /* StylingRange.UNSIGNED_MASK */;
}
function getTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange & 2 /* StylingRange.PREV_DUPLICATE */) == 2 /* StylingRange.PREV_DUPLICATE */;
}
function setTStylingRangePrev(tStylingRange, previous) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    ngDevMode && (0, assert_1.assertNumberInRange)(previous, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return ((tStylingRange & ~4294836224 /* StylingRange.PREV_MASK */) |
        (previous << 17 /* StylingRange.PREV_SHIFT */));
}
function setTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange | 2 /* StylingRange.PREV_DUPLICATE */);
}
function getTStylingRangeNext(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange & 131068 /* StylingRange.NEXT_MASK */) >> 2 /* StylingRange.NEXT_SHIFT */;
}
function setTStylingRangeNext(tStylingRange, next) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    ngDevMode && (0, assert_1.assertNumberInRange)(next, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return ((tStylingRange & ~131068 /* StylingRange.NEXT_MASK */) | //
        (next << 2 /* StylingRange.NEXT_SHIFT */));
}
function getTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange & 1 /* StylingRange.NEXT_DUPLICATE */) === 1 /* StylingRange.NEXT_DUPLICATE */;
}
function setTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    return (tStylingRange | 1 /* StylingRange.NEXT_DUPLICATE */);
}
function getTStylingRangeTail(tStylingRange) {
    ngDevMode && (0, assert_1.assertNumber)(tStylingRange, 'expected number');
    const next = getTStylingRangeNext(tStylingRange);
    return next === 0 ? getTStylingRangePrev(tStylingRange) : next;
}
