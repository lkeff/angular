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
const db_cache_1 = require("../src/db-cache");
const driver_1 = require("../src/driver");
const cache_1 = require("../testing/cache");
const fetch_1 = require("../testing/fetch");
const mock_1 = require("../testing/mock");
const scope_1 = require("../testing/scope");
const utils_1 = require("../testing/utils");
(function () {
    // Skip environments that don't support the minimum APIs needed to run the SW tests.
    if (!(0, utils_1.envIsSupported)()) {
        return;
    }
    const dist = new mock_1.MockFileSystemBuilder()
        .addFile('/foo.txt', 'this is foo')
        .addFile('/bar.txt', 'this is bar')
        .addFile('/api/test', 'version 1')
        .addFile('/api/a', 'version A')
        .addFile('/api/b', 'version B')
        .addFile('/api/c', 'version C')
        .addFile('/api/d', 'version D')
        .addFile('/api/e', 'version E')
        .addFile('/fresh/data', 'this is fresh data')
        .addFile('/refresh/data', 'this is some data')
        .addFile('/fresh-opaque/data', 'this is some fresh data')
        .addFile('/perf-opaque/data', 'this is some perf data')
        .build();
    const distUpdate = new mock_1.MockFileSystemBuilder()
        .addFile('/foo.txt', 'this is foo v2')
        .addFile('/bar.txt', 'this is bar')
        .addFile('/api/test', 'version 2')
        .addFile('/fresh/data', 'this is fresher data')
        .addFile('/refresh/data', 'this is refreshed data')
        .build();
    const manifest = {
        configVersion: 1,
        timestamp: 1234567890123,
        index: '/index.html',
        assetGroups: [
            {
                name: 'assets',
                installMode: 'prefetch',
                updateMode: 'prefetch',
                urls: ['/foo.txt', '/bar.txt'],
                patterns: [],
                cacheQueryOptions: { ignoreVary: true },
            },
        ],
        dataGroups: [
            {
                name: 'testPerf',
                maxSize: 3,
                strategy: 'performance',
                patterns: ['^/api/.*$'],
                timeoutMs: 1000,
                maxAge: 5000,
                version: 1,
                cacheQueryOptions: { ignoreVary: true, ignoreSearch: true },
            },
            {
                name: 'testRefresh',
                maxSize: 3,
                strategy: 'performance',
                patterns: ['^/refresh/.*$'],
                timeoutMs: 1000,
                refreshAheadMs: 1000,
                maxAge: 5000,
                version: 1,
                cacheQueryOptions: { ignoreVary: true },
            },
            {
                name: 'testFresh',
                maxSize: 3,
                strategy: 'freshness',
                patterns: ['^/fresh/.*$'],
                timeoutMs: 1000,
                maxAge: 5000,
                version: 1,
                cacheQueryOptions: { ignoreVary: true },
            },
            {
                name: 'testFreshOpaque',
                maxSize: 3,
                strategy: 'freshness',
                patterns: ['^/fresh-opaque/.*$'],
                timeoutMs: 1000,
                maxAge: 5000,
                version: 1,
                cacheOpaqueResponses: false,
                cacheQueryOptions: { ignoreVary: true },
            },
            {
                name: 'testPerfOpaque',
                maxSize: 3,
                strategy: 'performance',
                patterns: ['^/perf-opaque/.*$'],
                timeoutMs: 1000,
                maxAge: 5000,
                version: 1,
                cacheOpaqueResponses: true,
                cacheQueryOptions: { ignoreVary: true },
            },
        ],
        navigationUrls: [],
        navigationRequestStrategy: 'performance',
        hashTable: (0, mock_1.tmpHashTableForFs)(dist),
    };
    const seqIncreasedManifest = Object.assign(Object.assign({}, manifest), { dataGroups: [
            Object.assign(Object.assign({}, manifest.dataGroups[0]), { version: 2 }),
            manifest.dataGroups[1],
            manifest.dataGroups[2],
        ] });
    const server = new mock_1.MockServerStateBuilder().withStaticFiles(dist).withManifest(manifest).build();
    const serverUpdate = new mock_1.MockServerStateBuilder()
        .withStaticFiles(distUpdate)
        .withManifest(manifest)
        .build();
    const serverSeqUpdate = new mock_1.MockServerStateBuilder()
        .withStaticFiles(distUpdate)
        .withManifest(seqIncreasedManifest)
        .build();
    describe('data cache', () => {
        let scope;
        let driver;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            scope = new scope_1.SwTestHarnessBuilder().withServerState(server).build();
            driver = new driver_1.Driver(scope, scope, new db_cache_1.CacheDatabase(scope));
            // Initialize.
            expect(yield makeRequest(scope, '/foo.txt')).toEqual('this is foo');
            yield driver.initialized;
            server.clearRequests();
            serverUpdate.clearRequests();
            serverSeqUpdate.clearRequests();
        }));
        afterEach(() => {
            server.reset();
            serverUpdate.reset();
            serverSeqUpdate.reset();
        });
        describe('in performance mode', () => {
            it('names the caches correctly', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 1');
                const keys = yield scope.caches.original.keys();
                expect(keys.every((key) => key.startsWith('ngsw:/:'))).toEqual(true);
            }));
            it('caches a basic request', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 1');
                server.assertSawRequestFor('/api/test');
                scope.advance(1000);
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 1');
                server.assertNoOtherRequests();
            }));
            it('does not cache opaque responses by default', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeNoCorsRequest(scope, '/api/test')).toBe('');
                server.assertSawRequestFor('/api/test');
                expect(yield makeNoCorsRequest(scope, '/api/test')).toBe('');
                server.assertSawRequestFor('/api/test');
            }));
            it('caches opaque responses when configured to do so', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeNoCorsRequest(scope, '/perf-opaque/data')).toBe('');
                server.assertSawRequestFor('/perf-opaque/data');
                expect(yield makeNoCorsRequest(scope, '/perf-opaque/data')).toBe('');
                server.assertNoOtherRequests();
            }));
            it('refreshes after awhile', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 1');
                server.clearRequests();
                scope.advance(10000);
                scope.updateServerState(serverUpdate);
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 2');
            }));
            it('expires the least recently used entry', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/api/a')).toEqual('version A');
                expect(yield makeRequest(scope, '/api/b')).toEqual('version B');
                expect(yield makeRequest(scope, '/api/c')).toEqual('version C');
                expect(yield makeRequest(scope, '/api/d')).toEqual('version D');
                expect(yield makeRequest(scope, '/api/e')).toEqual('version E');
                server.clearRequests();
                expect(yield makeRequest(scope, '/api/c')).toEqual('version C');
                expect(yield makeRequest(scope, '/api/d')).toEqual('version D');
                expect(yield makeRequest(scope, '/api/e')).toEqual('version E');
                server.assertNoOtherRequests();
                expect(yield makeRequest(scope, '/api/a')).toEqual('version A');
                expect(yield makeRequest(scope, '/api/b')).toEqual('version B');
                server.assertSawRequestFor('/api/a');
                server.assertSawRequestFor('/api/b');
                server.assertNoOtherRequests();
            }));
            it('does not carry over cache with new version', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 1');
                scope.updateServerState(serverSeqUpdate);
                expect(yield driver.checkForUpdate()).toEqual(true);
                yield driver.updateClient(yield scope.clients.get('default'));
                expect(yield makeRequest(scope, '/api/test')).toEqual('version 2');
            }));
            it('CacheQueryOptions are passed through', () => __awaiter(this, void 0, void 0, function* () {
                yield driver.initialized;
                const matchSpy = spyOn(cache_1.MockCache.prototype, 'match').and.callThrough();
                // the first request fetches the resource from the server
                yield makeRequest(scope, '/api/a');
                // the second one will be loaded from the cache
                yield makeRequest(scope, '/api/a');
                expect(matchSpy).toHaveBeenCalledWith(new fetch_1.MockRequest('/api/a'), {
                    ignoreVary: true,
                    ignoreSearch: true,
                });
            }));
            it('still matches if search differs but ignoreSearch is enabled', () => __awaiter(this, void 0, void 0, function* () {
                yield driver.initialized;
                const matchSpy = spyOn(cache_1.MockCache.prototype, 'match').and.callThrough();
                // the first request fetches the resource from the server
                yield makeRequest(scope, '/api/a?v=1');
                // the second one will be loaded from the cache
                server.clearRequests();
                yield makeRequest(scope, '/api/a?v=2');
                server.assertNoOtherRequests();
            }));
        });
        describe('in freshness mode', () => {
            it('goes to the server first', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/fresh/data')).toEqual('this is fresh data');
                server.assertSawRequestFor('/fresh/data');
                server.clearRequests();
                expect(yield makeRequest(scope, '/fresh/data')).toEqual('this is fresh data');
                server.assertSawRequestFor('/fresh/data');
                server.assertNoOtherRequests();
                scope.updateServerState(serverUpdate);
                expect(yield makeRequest(scope, '/fresh/data')).toEqual('this is fresher data');
                serverUpdate.assertSawRequestFor('/fresh/data');
                serverUpdate.assertNoOtherRequests();
            }));
            it('caches opaque responses', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeNoCorsRequest(scope, '/fresh/data')).toBe('');
                server.assertSawRequestFor('/fresh/data');
                server.online = false;
                expect(yield makeRequest(scope, '/fresh/data')).toBe('');
                server.assertNoOtherRequests();
            }));
            it('falls back on the cache when server times out', () => __awaiter(this, void 0, void 0, function* () {
                expect(yield makeRequest(scope, '/fresh/data')).toEqual('this is fresh data');
                server.assertSawRequestFor('/fresh/data');
                server.clearRequests();
                scope.updateServerState(serverUpdate);
                serverUpdate.pause();
                const [res, done] = makePendingRequest(scope, '/fresh/data');
                yield serverUpdate.nextRequest;
                // Since the network request doesn't return within the timeout of 1,000ms,
                // this should return cached data.
                scope.advance(2000);
                expect(yield res).toEqual('this is fresh data');
                // Unpausing allows the worker to continue with caching.
                serverUpdate.unpause();
                yield done;
                serverUpdate.pause();
                const [res2, done2] = makePendingRequest(scope, '/fresh/data');
                yield serverUpdate.nextRequest;
                scope.advance(2000);
                expect(yield res2).toEqual('this is fresher data');
            }));
            it('refreshes ahead', () => __awaiter(this, void 0, void 0, function* () {
                server.assertNoOtherRequests();
                serverUpdate.assertNoOtherRequests();
                expect(yield makeRequest(scope, '/refresh/data')).toEqual('this is some data');
                server.assertSawRequestFor('/refresh/data');
                server.clearRequests();
                expect(yield makeRequest(scope, '/refresh/data')).toEqual('this is some data');
                server.assertNoOtherRequests();
                scope.updateServerState(serverUpdate);
                scope.advance(1500);
                expect(yield makeRequest(scope, '/refresh/data')).toEqual('this is some data');
                serverUpdate.assertSawRequestFor('/refresh/data');
                expect(yield makeRequest(scope, '/refresh/data')).toEqual('this is refreshed data');
                serverUpdate.assertNoOtherRequests();
            }));
            it('caches opaque responses on refresh by default', () => __awaiter(this, void 0, void 0, function* () {
                // Make the initial request and populate the cache.
                expect(yield makeRequest(scope, '/fresh/data')).toBe('this is fresh data');
                server.assertSawRequestFor('/fresh/data');
                server.clearRequests();
                // Update the server state and pause the server, so the next request times out.
                scope.updateServerState(serverUpdate);
                serverUpdate.pause();
                const [res, done] = makePendingRequest(scope, new fetch_1.MockRequest('/fresh/data', { mode: 'no-cors' }));
                // The network request times out after 1,000ms and the cached response is returned.
                yield serverUpdate.nextRequest;
                scope.advance(2000);
                expect(yield res).toBe('this is fresh data');
                // Unpause the server to allow the network request to complete and be cached.
                serverUpdate.unpause();
                yield done;
                // Pause the server to force the cached (opaque) response to be returned.
                serverUpdate.pause();
                const [res2] = makePendingRequest(scope, '/fresh/data');
                yield serverUpdate.nextRequest;
                scope.advance(2000);
                expect(yield res2).toBe('');
            }));
            it('does not cache opaque responses when configured not to do so', () => __awaiter(this, void 0, void 0, function* () {
                // Make an initial no-cors request.
                expect(yield makeNoCorsRequest(scope, '/fresh-opaque/data')).toBe('');
                server.assertSawRequestFor('/fresh-opaque/data');
                // Pause the server, so the next request times out.
                server.pause();
                const [res] = makePendingRequest(scope, '/fresh-opaque/data');
                // The network request should time out after 1,000ms and thus return a cached response if
                // available. Since there is no cached response, however, the promise will not be resolved
                // until the server returns a response.
                let resolved = false;
                res.then(() => (resolved = true));
                yield server.nextRequest;
                scope.advance(2000);
                yield new Promise((resolve) => setTimeout(resolve)); // Drain the microtask queue.
                expect(resolved).toBe(false);
                // Unpause the server, to allow the network request to complete.
                server.unpause();
                yield new Promise((resolve) => setTimeout(resolve)); // Drain the microtask queue.
                expect(resolved).toBe(true);
            }));
            it('CacheQueryOptions are passed through when falling back to cache', () => __awaiter(this, void 0, void 0, function* () {
                const matchSpy = spyOn(cache_1.MockCache.prototype, 'match').and.callThrough();
                yield makeRequest(scope, '/fresh/data');
                server.clearRequests();
                scope.updateServerState(serverUpdate);
                serverUpdate.pause();
                const [res, done] = makePendingRequest(scope, '/fresh/data');
                yield serverUpdate.nextRequest;
                // Since the network request doesn't return within the timeout of 1,000ms,
                // this should return cached data.
                scope.advance(2000);
                yield res;
                expect(matchSpy).toHaveBeenCalledWith(new fetch_1.MockRequest('/fresh/data'), { ignoreVary: true });
                // Unpausing allows the worker to continue with caching.
                serverUpdate.unpause();
                yield done;
            }));
        });
    });
})();
function makeRequest(scope, url, clientId) {
    const [resTextPromise, done] = makePendingRequest(scope, url, clientId);
    return done.then(() => resTextPromise);
}
function makeNoCorsRequest(scope, url, clientId) {
    const req = new fetch_1.MockRequest(url, { mode: 'no-cors' });
    const [resTextPromise, done] = makePendingRequest(scope, req, clientId);
    return done.then(() => resTextPromise);
}
function makePendingRequest(scope, urlOrReq, clientId) {
    const req = typeof urlOrReq === 'string' ? new fetch_1.MockRequest(urlOrReq) : urlOrReq;
    const [resPromise, done] = scope.handleFetch(req, clientId || 'default');
    return [resPromise.then((res) => (res ? res.text() : null)), done];
}
