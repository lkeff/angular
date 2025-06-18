"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceMarkFeature = performanceMarkFeature;
const markedFeatures = new Set();
// tslint:disable:ban
/**
 * A guarded `performance.mark` for feature marking.
 *
 * This method exists because while all supported browser and node.js version supported by Angular
 * support performance.mark API. This is not the case for other environments such as JSDOM and
 * Cloudflare workers.
 */
function performanceMarkFeature(feature) {
    var _a;
    if (markedFeatures.has(feature)) {
        return;
    }
    markedFeatures.add(feature);
    (_a = performance === null || performance === void 0 ? void 0 : performance.mark) === null || _a === void 0 ? void 0 : _a.call(performance, 'mark_feature_usage', { detail: { feature } });
}
