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
exports.NamedCacheStorage = void 0;
/**
 * A wrapper around `CacheStorage` to allow interacting with caches more easily and consistently by:
 * - Adding a `name` property to all opened caches, which can be used to easily perform other
 *   operations that require the cache name.
 * - Name-spacing cache names to avoid conflicts with other caches on the same domain.
 */
class NamedCacheStorage {
    constructor(original, cacheNamePrefix) {
        this.original = original;
        this.cacheNamePrefix = cacheNamePrefix;
    }
    delete(cacheName) {
        return this.original.delete(`${this.cacheNamePrefix}:${cacheName}`);
    }
    has(cacheName) {
        return this.original.has(`${this.cacheNamePrefix}:${cacheName}`);
    }
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = `${this.cacheNamePrefix}:`;
            const allCacheNames = yield this.original.keys();
            const ownCacheNames = allCacheNames.filter((name) => name.startsWith(prefix));
            return ownCacheNames.map((name) => name.slice(prefix.length));
        });
    }
    match(request, options) {
        return this.original.match(request, options);
    }
    open(cacheName) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield this.original.open(`${this.cacheNamePrefix}:${cacheName}`);
            return Object.assign(cache, { name: cacheName });
        });
    }
}
exports.NamedCacheStorage = NamedCacheStorage;
