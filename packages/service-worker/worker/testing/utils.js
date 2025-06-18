"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.envIsSupported = envIsSupported;
exports.normalizeUrl = normalizeUrl;
exports.parseUrl = parseUrl;
/**
 * Determine whether the current environment provides all necessary APIs to run ServiceWorker tests.
 *
 * @return Whether ServiceWorker tests can be run in the current environment.
 */
function envIsSupported() {
    return typeof URL === 'function';
}
/**
 * Get a normalized representation of a URL relative to a provided base URL.
 *
 * More specifically:
 * 1. Resolve the URL relative to the provided base URL.
 * 2. If the URL is relative to the base URL, then strip the origin (and only return the path and
 *    search parts). Otherwise, return the full URL.
 *
 * @param url The raw URL.
 * @param relativeTo The base URL to resolve `url` relative to.
 *     (This is usually the ServiceWorker's origin or registration scope).
 * @return A normalized representation of the URL.
 */
function normalizeUrl(url, relativeTo) {
    const { origin, path, search } = parseUrl(url, relativeTo);
    const { origin: relativeToOrigin } = parseUrl(relativeTo);
    return (origin === relativeToOrigin ? path + search : url);
}
/**
 * Parse a URL into its different parts, such as `origin`, `path` and `search`.
 */
function parseUrl(url, relativeTo) {
    const parsedUrl = !relativeTo ? new URL(url) : new URL(url, relativeTo);
    return {
        origin: parsedUrl.origin || `${parsedUrl.protocol}//${parsedUrl.host}`,
        path: parsedUrl.pathname,
        search: parsedUrl.search || '',
    };
}
