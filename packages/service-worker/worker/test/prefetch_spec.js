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
const assets_1 = require("../src/assets");
const db_cache_1 = require("../src/db-cache");
const idle_1 = require("../src/idle");
const cache_1 = require("../testing/cache");
const events_1 = require("../testing/events");
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
        .addFile('/foo.txt', 'this is foo', { Vary: 'Accept' })
        .addFile('/bar.txt', 'this is bar')
        .build();
    const manifest = (0, mock_1.tmpManifestSingleAssetGroup)(dist);
    const server = new mock_1.MockServerStateBuilder().withStaticFiles(dist).withManifest(manifest).build();
    const scope = new scope_1.SwTestHarnessBuilder().withServerState(server).build();
    const db = new db_cache_1.CacheDatabase(scope);
    const testEvent = new events_1.MockExtendableEvent('test');
    describe('prefetch assets', () => {
        let group;
        let idle;
        beforeEach(() => {
            idle = new idle_1.IdleScheduler(null, 3000, 30000, {
                log: (v, ctx = '') => console.error(v, ctx),
            });
            group = new assets_1.PrefetchAssetGroup(scope, scope, idle, manifest.assetGroups[0], (0, mock_1.tmpHashTable)(manifest), db, 'test');
        });
        it('initializes without crashing', () => __awaiter(this, void 0, void 0, function* () {
            yield group.initializeFully();
        }));
        it('fully caches the two files', () => __awaiter(this, void 0, void 0, function* () {
            yield group.initializeFully();
            scope.updateServerState();
            const res1 = yield group.handleFetch(scope.newRequest('/foo.txt'), testEvent);
            const res2 = yield group.handleFetch(scope.newRequest('/bar.txt'), testEvent);
            expect(yield res1.text()).toEqual('this is foo');
            expect(yield res2.text()).toEqual('this is bar');
        }));
        it('persists the cache across restarts', () => __awaiter(this, void 0, void 0, function* () {
            yield group.initializeFully();
            const freshScope = new scope_1.SwTestHarnessBuilder()
                .withCacheState(scope.caches.original.dehydrate())
                .build();
            group = new assets_1.PrefetchAssetGroup(freshScope, freshScope, idle, manifest.assetGroups[0], (0, mock_1.tmpHashTable)(manifest), new db_cache_1.CacheDatabase(freshScope), 'test');
            yield group.initializeFully();
            const res1 = yield group.handleFetch(scope.newRequest('/foo.txt'), testEvent);
            const res2 = yield group.handleFetch(scope.newRequest('/bar.txt'), testEvent);
            expect(yield res1.text()).toEqual('this is foo');
            expect(yield res2.text()).toEqual('this is bar');
        }));
        it('caches properly if resources are requested before initialization', () => __awaiter(this, void 0, void 0, function* () {
            const res1 = yield group.handleFetch(scope.newRequest('/foo.txt'), testEvent);
            const res2 = yield group.handleFetch(scope.newRequest('/bar.txt'), testEvent);
            expect(yield res1.text()).toEqual('this is foo');
            expect(yield res2.text()).toEqual('this is bar');
            scope.updateServerState();
            yield group.initializeFully();
        }));
        it('throws if the server-side content does not match the manifest hash', () => __awaiter(this, void 0, void 0, function* () {
            const badHashFs = dist.extend().addFile('/foo.txt', 'corrupted file').build();
            const badServer = new mock_1.MockServerStateBuilder()
                .withManifest(manifest)
                .withStaticFiles(badHashFs)
                .build();
            const badScope = new scope_1.SwTestHarnessBuilder().withServerState(badServer).build();
            group = new assets_1.PrefetchAssetGroup(badScope, badScope, idle, manifest.assetGroups[0], (0, mock_1.tmpHashTable)(manifest), new db_cache_1.CacheDatabase(badScope), 'test');
            const err = yield errorFrom(group.initializeFully());
            expect(err.message).toContain('Hash mismatch');
        }));
        it('CacheQueryOptions are passed through', () => __awaiter(this, void 0, void 0, function* () {
            yield group.initializeFully();
            const matchSpy = spyOn(cache_1.MockCache.prototype, 'match').and.callThrough();
            yield group.handleFetch(scope.newRequest('/foo.txt'), testEvent);
            expect(matchSpy).toHaveBeenCalledWith(new fetch_1.MockRequest('/foo.txt'), { ignoreVary: true });
        }));
    });
})();
function errorFrom(promise) {
    return promise.catch((err) => err);
}
