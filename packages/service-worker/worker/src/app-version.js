"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersion = void 0;
const api_1 = require("./api");
const assets_1 = require("./assets");
const data_1 = require("./data");
/**
 * A specific version of the application, identified by a unique manifest
 * as determined by its hash.
 *
 * Each `AppVersion` can be thought of as a published version of the app
 * that can be installed as an update to any previously installed versions.
 */
class AppVersion {
    get okay() {
        return this._okay;
    }
    constructor(scope, adapter, database, idle, debugHandler, manifest, manifestHash) {
        this.scope = scope;
        this.adapter = adapter;
        this.database = database;
        this.debugHandler = debugHandler;
        this.manifest = manifest;
        this.manifestHash = manifestHash;
        /**
         * A Map of absolute URL paths (`/foo.txt`) to the known hash of their contents (if available).
         */
        this.hashTable = new Map();
        /**
         * Tracks whether the manifest has encountered any inconsistencies.
         */
        this._okay = true;
        this.indexUrl = this.adapter.normalizeUrl(this.manifest.index);
        // The hashTable within the manifest is an Object - convert it to a Map for easier lookups.
        Object.keys(manifest.hashTable).forEach((url) => {
            this.hashTable.set(adapter.normalizeUrl(url), manifest.hashTable[url]);
        });
        // Process each `AssetGroup` declared in the manifest. Each declared group gets an `AssetGroup`
        // instance created for it, of a type that depends on the configuration mode.
        const assetCacheNamePrefix = `${manifestHash}:assets`;
        this.assetGroups = (manifest.assetGroups || []).map((config) => {
            // Check the caching mode, which determines when resources will be fetched/updated.
            switch (config.installMode) {
                case 'prefetch':
                    return new assets_1.PrefetchAssetGroup(scope, adapter, idle, config, this.hashTable, database, assetCacheNamePrefix);
                case 'lazy':
                    return new assets_1.LazyAssetGroup(scope, adapter, idle, config, this.hashTable, database, assetCacheNamePrefix);
            }
        });
        // Process each `DataGroup` declared in the manifest.
        this.dataGroups = (manifest.dataGroups || []).map((config) => new data_1.DataGroup(scope, adapter, config, database, debugHandler, `${config.version}:data`));
        // Create `include`/`exclude` RegExps for the `navigationUrls` declared in the manifest.
        const includeUrls = manifest.navigationUrls.filter((spec) => spec.positive);
        const excludeUrls = manifest.navigationUrls.filter((spec) => !spec.positive);
        this.navigationUrls = {
            include: includeUrls.map((spec) => new RegExp(spec.regex)),
            exclude: excludeUrls.map((spec) => new RegExp(spec.regex)),
        };
    }
    /**
     * Fully initialize this version of the application. If this Promise resolves successfully, all
     * required
     * data has been safely downloaded.
     */
    initializeFully(updateFrom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fully initialize each asset group, in series. Starts with an empty Promise,
                // and waits for the previous groups to have been initialized before initializing
                // the next one in turn.
                yield this.assetGroups.reduce((previous, group) => __awaiter(this, void 0, void 0, function* () {
                    // Wait for the previous groups to complete initialization. If there is a
                    // failure, this will throw, and each subsequent group will throw, until the
                    // whole sequence fails.
                    yield previous;
                    // Initialize this group.
                    return group.initializeFully(updateFrom);
                }), Promise.resolve());
            }
            catch (err) {
                this._okay = false;
                throw err;
            }
        });
    }
    handleFetch(req, event) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check the request against each `AssetGroup` in sequence. If an `AssetGroup` can't handle the
            // request,
            // it will return `null`. Thus, the first non-null response is the SW's answer to the request.
            // So reduce
            // the group list, keeping track of a possible response. If there is one, it gets passed
            // through, and if
            // not the next group is consulted to produce a candidate response.
            const asset = yield this.assetGroups.reduce((potentialResponse, group) => __awaiter(this, void 0, void 0, function* () {
                // Wait on the previous potential response. If it's not null, it should just be passed
                // through.
                const resp = yield potentialResponse;
                if (resp !== null) {
                    return resp;
                }
                // No response has been found yet. Maybe this group will have one.
                return group.handleFetch(req, event);
            }), Promise.resolve(null));
            // The result of the above is the asset response, if there is any, or null otherwise. Return the
            // asset
            // response if there was one. If not, check with the data caching groups.
            if (asset !== null) {
                return asset;
            }
            // Perform the same reduction operation as above, but this time processing
            // the data caching groups.
            const data = yield this.dataGroups.reduce((potentialResponse, group) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield potentialResponse;
                if (resp !== null) {
                    return resp;
                }
                return group.handleFetch(req, event);
            }), Promise.resolve(null));
            // If the data caching group returned a response, go with it.
            if (data !== null) {
                return data;
            }
            // Next, check if this is a navigation request for a route. Detect circular
            // navigations by checking if the request URL is the same as the index URL.
            if (this.adapter.normalizeUrl(req.url) !== this.indexUrl && this.isNavigationRequest(req)) {
                if (this.manifest.navigationRequestStrategy === 'freshness') {
                    // For navigation requests the freshness was configured. The request will always go trough
                    // the network and fallback to default `handleFetch` behavior in case of failure.
                    try {
                        return yield this.scope.fetch(req);
                    }
                    catch (_a) {
                        // Navigation request failed - application is likely offline.
                        // Proceed forward to the default `handleFetch` behavior, where
                        // `indexUrl` will be requested and it should be available in the cache.
                    }
                }
                // This was a navigation request. Re-enter `handleFetch` with a request for
                // the index URL.
                return this.handleFetch(this.adapter.newRequest(this.indexUrl), event);
            }
            return null;
        });
    }
    /**
     * Determine whether the request is a navigation request.
     * Takes into account: Request method and mode, `Accept` header, `navigationUrls` patterns.
     */
    isNavigationRequest(req) {
        if (req.method !== 'GET' || req.mode !== 'navigate') {
            return false;
        }
        if (!this.acceptsTextHtml(req)) {
            return false;
        }
        const urlPrefix = this.scope.registration.scope.replace(/\/$/, '');
        const url = req.url.startsWith(urlPrefix) ? req.url.slice(urlPrefix.length) : req.url;
        const urlWithoutQueryOrHash = url.replace(/[?#].*$/, '');
        return (this.navigationUrls.include.some((regex) => regex.test(urlWithoutQueryOrHash)) &&
            !this.navigationUrls.exclude.some((regex) => regex.test(urlWithoutQueryOrHash)));
    }
    /**
     * Check this version for a given resource with a particular hash.
     */
    lookupResourceWithHash(url, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify that this version has the requested resource cached. If not,
            // there's no point in trying.
            if (!this.hashTable.has(url)) {
                return null;
            }
            // Next, check whether the resource has the correct hash. If not, any cached
            // response isn't usable.
            if (this.hashTable.get(url) !== hash) {
                return null;
            }
            const cacheState = yield this.lookupResourceWithoutHash(url);
            return cacheState && cacheState.response;
        });
    }
    /**
     * Check this version for a given resource regardless of its hash.
     */
    lookupResourceWithoutHash(url) {
        // Limit the search to asset groups, and only scan the cache, don't
        // load resources from the network.
        return this.assetGroups.reduce((potentialResponse, group) => __awaiter(this, void 0, void 0, function* () {
            const resp = yield potentialResponse;
            if (resp !== null) {
                return resp;
            }
            // fetchFromCacheOnly() avoids any network fetches, and returns the
            // full set of cache data, not just the Response.
            return group.fetchFromCacheOnly(url);
        }), Promise.resolve(null));
    }
    /**
     * List all unhashed resources from all asset groups.
     */
    previouslyCachedResources() {
        return this.assetGroups.reduce((resources, group) => __awaiter(this, void 0, void 0, function* () { return (yield resources).concat(yield group.unhashedResources()); }), Promise.resolve([]));
    }
    recentCacheStatus(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.assetGroups.reduce((current, group) => __awaiter(this, void 0, void 0, function* () {
                const status = yield current;
                if (status === api_1.UpdateCacheStatus.CACHED) {
                    return status;
                }
                const groupStatus = yield group.cacheStatus(url);
                if (groupStatus === api_1.UpdateCacheStatus.NOT_CACHED) {
                    return status;
                }
                return groupStatus;
            }), Promise.resolve(api_1.UpdateCacheStatus.NOT_CACHED));
        });
    }
    /**
     * Return a list of the names of all caches used by this version.
     */
    getCacheNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const allGroupCacheNames = yield Promise.all([
                ...this.assetGroups.map((group) => group.getCacheNames()),
                ...this.dataGroups.map((group) => group.getCacheNames()),
            ]);
            return [].concat(...allGroupCacheNames);
        });
    }
    /**
     * Get the opaque application data which was provided with the manifest.
     */
    get appData() {
        return this.manifest.appData || null;
    }
    /**
     * Check whether a request accepts `text/html` (based on the `Accept` header).
     */
    acceptsTextHtml(req) {
        const accept = req.headers.get('Accept');
        if (accept === null) {
            return false;
        }
        const values = accept.split(',');
        return values.some((value) => value.trim().toLowerCase() === 'text/html');
    }
}
exports.AppVersion = AppVersion;
