"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_SERVER_ID = exports.PLATFORM_BROWSER_ID = void 0;
exports.isPlatformBrowser = isPlatformBrowser;
exports.isPlatformServer = isPlatformServer;
exports.PLATFORM_BROWSER_ID = 'browser';
exports.PLATFORM_SERVER_ID = 'server';
/**
 * Returns whether a platform id represents a browser platform.
 * @publicApi
 */
function isPlatformBrowser(platformId) {
    return platformId === exports.PLATFORM_BROWSER_ID;
}
/**
 * Returns whether a platform id represents a server platform.
 * @publicApi
 */
function isPlatformServer(platformId) {
    return platformId === exports.PLATFORM_SERVER_ID;
}
