"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const named_cache_storage_1 = require("./named-cache-storage");
/**
 * Adapts the service worker to its runtime environment.
 *
 * Mostly, this is used to mock out identifiers which are otherwise read
 * from the global scope.
 */
class Adapter {
    constructor(scopeUrl, caches) {
        this.scopeUrl = scopeUrl;
        const parsedScopeUrl = this.parseUrl(this.scopeUrl);
        // Determine the origin from the registration scope. This is used to differentiate between
        // relative and absolute URLs.
        this.origin = parsedScopeUrl.origin;
        // Use the baseHref in the cache name prefix to avoid clash of cache names for SWs with
        // different scopes on the same domain.
        this.caches = new named_cache_storage_1.NamedCacheStorage(caches, `ngsw:${parsedScopeUrl.path}`);
    }
    /**
     * Wrapper around the `Request` constructor.
     */
    newRequest(input, init) {
        return new Request(input, init);
    }
    /**
     * Wrapper around the `Response` constructor.
     */
    newResponse(body, init) {
        return new Response(body, init);
    }
    /**
     * Wrapper around the `Headers` constructor.
     */
    newHeaders(headers) {
        return new Headers(headers);
    }
    /**
     * Test if a given object is an instance of `Client`.
     */
    isClient(source) {
        return source instanceof Client;
    }
    /**
     * Read the current UNIX time in milliseconds.
     */
    get time() {
        return Date.now();
    }
    /**
     * Get a normalized representation of a URL such as those found in the ServiceWorker's `ngsw.json`
     * configuration.
     *
     * More specifically:
     * 1. Resolve the URL relative to the ServiceWorker's scope.
     * 2. If the URL is relative to the ServiceWorker's own origin, then only return the path part.
     *    Otherwise, return the full URL.
     *
     * @param url The raw request URL.
     * @return A normalized representation of the URL.
     */
    normalizeUrl(url) {
        // Check the URL's origin against the ServiceWorker's.
        const parsed = this.parseUrl(url, this.scopeUrl);
        return (parsed.origin === this.origin ? parsed.path : url);
    }
    /**
     * Parse a URL into its different parts, such as `origin`, `path` and `search`.
     */
    parseUrl(url, relativeTo) {
        // Workaround a Safari bug, see
        // https://github.com/angular/angular/issues/31061#issuecomment-503637978
        const parsed = !relativeTo ? new URL(url) : new URL(url, relativeTo);
        return { origin: parsed.origin, path: parsed.pathname, search: parsed.search };
    }
    /**
     * Wait for a given amount of time before completing a Promise.
     */
    timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }
}
exports.Adapter = Adapter;
