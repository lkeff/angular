"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureValues = void 0;
class MeasureValues {
    constructor(runIndex, timeStamp, values) {
        this.runIndex = runIndex;
        this.timeStamp = timeStamp;
        this.values = values;
    }
    toJson() {
        return {
            'timeStamp': this.timeStamp.toJSON(),
            'runIndex': this.runIndex,
            'values': this.values,
        };
    }
}
exports.MeasureValues = MeasureValues;
