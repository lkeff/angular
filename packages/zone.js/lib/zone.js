"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadZone = loadZone;
const zone_impl_1 = require("./zone-impl");
function loadZone() {
    var _a;
    // if global['Zone'] already exists (maybe zone.js was already loaded or
    // some other lib also registered a global object named Zone), we may need
    // to throw an error, but sometimes user may not want this error.
    // For example,
    // we have two web pages, page1 includes zone.js, page2 doesn't.
    // and the 1st time user load page1 and page2, everything work fine,
    // but when user load page2 again, error occurs because global['Zone'] already exists.
    // so we add a flag to let user choose whether to throw this error or not.
    // By default, if existing Zone is from zone.js, we will not throw the error.
    const global = globalThis;
    const checkDuplicate = global[(0, zone_impl_1.__symbol__)('forceDuplicateZoneCheck')] === true;
    if (global['Zone'] && (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function')) {
        throw new Error('Zone already loaded.');
    }
    // Initialize global `Zone` constant.
    (_a = global['Zone']) !== null && _a !== void 0 ? _a : (global['Zone'] = (0, zone_impl_1.initZone)());
    return global['Zone'];
}
