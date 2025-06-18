"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONTAINER_BLOCKS = exports.DEFAULT_INTERPOLATION_CONFIG = exports.InterpolationConfig = void 0;
const assertions_1 = require("../assertions");
class InterpolationConfig {
    static fromArray(markers) {
        if (!markers) {
            return exports.DEFAULT_INTERPOLATION_CONFIG;
        }
        (0, assertions_1.assertInterpolationSymbols)('interpolation', markers);
        return new InterpolationConfig(markers[0], markers[1]);
    }
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.InterpolationConfig = InterpolationConfig;
exports.DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig('{{', '}}');
exports.DEFAULT_CONTAINER_BLOCKS = new Set(['switch']);
