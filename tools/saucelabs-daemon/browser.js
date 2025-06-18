"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = getUniqueId;
/**
 * Gets a unique id for the specified browser. This id can be shared
 * across the background service and launcher using IPC.
 */
function getUniqueId(browser) {
    let result = Object.keys(browser)
        .sort()
        .map((key) => `${key}=${browser[key]}`);
    return result.join(':');
}
