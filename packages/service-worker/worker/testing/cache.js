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
exports.MockCache = exports.MockCacheStorage = void 0;
exports.clearAllCaches = clearAllCaches;
const fetch_1 = require("./fetch");
const utils_1 = require("./utils");
class MockCacheStorage {
    constructor(origin, hydrateFrom) {
        this.origin = origin;
        this.caches = new Map();
        if (hydrateFrom !== undefined) {
            const hydrated = JSON.parse(hydrateFrom);
            Object.keys(hydrated).forEach((name) => {
                this.caches.set(name, new MockCache(this.origin, hydrated[name]));
            });
        }
    }
    has(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.caches.has(name);
        });
    }
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.caches.keys());
        });
    }
    open(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.caches.has(name)) {
                this.caches.set(name, new MockCache(this.origin));
            }
            return this.caches.get(name);
        });
    }
    match(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Array.from(this.caches.values()).reduce((answer, cache) => __awaiter(this, void 0, void 0, function* () {
                const curr = yield answer;
                if (curr !== undefined) {
                    return curr;
                }
                return cache.match(req);
            }), Promise.resolve(undefined));
        });
    }
    'delete'(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.caches.has(name)) {
                this.caches.delete(name);
                return true;
            }
            return false;
        });
    }
    dehydrate() {
        const dehydrated = {};
        Array.from(this.caches.keys()).forEach((name) => {
            const cache = this.caches.get(name);
            dehydrated[name] = cache.dehydrate();
        });
        return JSON.stringify(dehydrated);
    }
}
exports.MockCacheStorage = MockCacheStorage;
class MockCache {
    constructor(origin, hydrated) {
        this.origin = origin;
        this.cache = new Map();
        if (hydrated !== undefined) {
            Object.keys(hydrated).forEach((url) => {
                const resp = hydrated[url];
                this.cache.set(url, new fetch_1.MockResponse(resp.body, {
                    status: resp.status,
                    statusText: resp.statusText,
                    headers: resp.headers,
                }));
            });
        }
    }
    add(request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw 'Not implemented';
        });
    }
    addAll(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            throw 'Not implemented';
        });
    }
    'delete'(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.getRequestUrl(request);
            if (this.cache.has(url)) {
                this.cache.delete(url);
                return true;
            }
            else if (options === null || options === void 0 ? void 0 : options.ignoreSearch) {
                url = this.stripQueryAndHash(url);
                const cachedUrl = [...this.cache.keys()].find((key) => url === this.stripQueryAndHash(key));
                if (cachedUrl) {
                    this.cache.delete(cachedUrl);
                    return true;
                }
            }
            return false;
        });
    }
    keys(match) {
        return __awaiter(this, void 0, void 0, function* () {
            if (match !== undefined) {
                throw 'Not implemented';
            }
            return Array.from(this.cache.keys());
        });
    }
    match(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.getRequestUrl(request);
            let res = this.cache.get(url);
            if (!res && (options === null || options === void 0 ? void 0 : options.ignoreSearch)) {
                // check if cache has url by ignoring search
                url = this.stripQueryAndHash(url);
                const matchingReq = [...this.cache.keys()].find((key) => url === this.stripQueryAndHash(key));
                if (matchingReq !== undefined)
                    res = this.cache.get(matchingReq);
            }
            if (res !== undefined) {
                res = res.clone();
            }
            return res;
        });
    }
    matchAll(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request === undefined) {
                return Array.from(this.cache.values());
            }
            const res = yield this.match(request, options);
            if (res) {
                return [res];
            }
            else {
                return [];
            }
        });
    }
    put(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getRequestUrl(request);
            this.cache.set(url, response.clone());
            // Even though the body above is cloned, consume it here because the
            // real cache consumes the body.
            yield response.text();
            return;
        });
    }
    dehydrate() {
        const dehydrated = {};
        Array.from(this.cache.keys()).forEach((url) => {
            const resp = this.cache.get(url);
            const dehydratedResp = {
                body: resp._body,
                status: resp.status,
                statusText: resp.statusText,
                headers: {},
            };
            resp.headers.forEach((value, name) => {
                dehydratedResp.headers[name] = value;
            });
            dehydrated[url] = dehydratedResp;
        });
        return dehydrated;
    }
    /** Get the normalized URL from a `RequestInfo` value. */
    getRequestUrl(request) {
        const url = typeof request === 'string' ? request : request.url;
        return (0, utils_1.normalizeUrl)(url, this.origin);
    }
    /** remove the query/hash part from a url*/
    stripQueryAndHash(url) {
        return url.replace(/[?#].*/, '');
    }
}
exports.MockCache = MockCache;
// This can be used to simulate a situation (bug?), where the user clears the caches from DevTools,
// while the SW is still running (e.g. serving another tab) and keeps references to the deleted
// caches.
function clearAllCaches(caches) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheNames = yield caches.keys();
        const cacheInstances = yield Promise.all(cacheNames.map((name) => caches.open(name)));
        // Delete all cache instances from `CacheStorage`.
        yield Promise.all(cacheNames.map((name) => caches.delete(name)));
        // Delete all entries from each cache instance.
        yield Promise.all(cacheInstances.map((cache) => __awaiter(this, void 0, void 0, function* () {
            const keys = yield cache.keys();
            yield Promise.all(keys.map((key) => cache.delete(key)));
        })));
    });
}
