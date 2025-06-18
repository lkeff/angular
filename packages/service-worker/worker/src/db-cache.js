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
exports.CacheTable = exports.CacheDatabase = void 0;
const database_1 = require("./database");
/**
 * An implementation of a `Database` that uses the `CacheStorage` API to serialize
 * state within mock `Response` objects.
 */
class CacheDatabase {
    constructor(adapter) {
        this.adapter = adapter;
        this.cacheNamePrefix = 'db';
        this.tables = new Map();
    }
    'delete'(name) {
        if (this.tables.has(name)) {
            this.tables.delete(name);
        }
        return this.adapter.caches.delete(`${this.cacheNamePrefix}:${name}`);
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = `${this.cacheNamePrefix}:`;
            const allCacheNames = yield this.adapter.caches.keys();
            const dbCacheNames = allCacheNames.filter((name) => name.startsWith(prefix));
            // Return the un-prefixed table names, so they can be used with other `CacheDatabase` methods
            // (for example, for opening/deleting a table).
            return dbCacheNames.map((name) => name.slice(prefix.length));
        });
    }
    open(name, cacheQueryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tables.has(name)) {
                const cache = yield this.adapter.caches.open(`${this.cacheNamePrefix}:${name}`);
                const table = new CacheTable(name, cache, this.adapter, cacheQueryOptions);
                this.tables.set(name, table);
            }
            return this.tables.get(name);
        });
    }
}
exports.CacheDatabase = CacheDatabase;
/**
 * A `Table` backed by a `Cache`.
 */
class CacheTable {
    constructor(name, cache, adapter, cacheQueryOptions) {
        this.name = name;
        this.cache = cache;
        this.adapter = adapter;
        this.cacheQueryOptions = cacheQueryOptions;
        this.cacheName = this.cache.name;
    }
    request(key) {
        return this.adapter.newRequest('/' + key);
    }
    'delete'(key) {
        return this.cache.delete(this.request(key), this.cacheQueryOptions);
    }
    keys() {
        return this.cache.keys().then((requests) => requests.map((req) => req.url.slice(1)));
    }
    read(key) {
        return this.cache.match(this.request(key), this.cacheQueryOptions).then((res) => {
            if (res === undefined) {
                return Promise.reject(new database_1.NotFound(this.name, key));
            }
            return res.json();
        });
    }
    write(key, value) {
        return this.cache.put(this.request(key), this.adapter.newResponse(JSON.stringify(value)));
    }
}
exports.CacheTable = CacheTable;
