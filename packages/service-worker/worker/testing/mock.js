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
exports.MockServerState = exports.MockServerStateBuilder = exports.MockFileSystem = exports.MockFileSystemBuilder = exports.MockFile = void 0;
exports.tmpManifestSingleAssetGroup = tmpManifestSingleAssetGroup;
exports.tmpHashTableForFs = tmpHashTableForFs;
exports.tmpHashTable = tmpHashTable;
const sha1_1 = require("../src/sha1");
const fetch_1 = require("./fetch");
class MockFile {
    constructor(path, contents, headers = {}, hashThisFile) {
        this.path = path;
        this.contents = contents;
        this.headers = headers;
        this.hashThisFile = hashThisFile;
    }
    get hash() {
        return (0, sha1_1.sha1)(this.contents);
    }
}
exports.MockFile = MockFile;
class MockFileSystemBuilder {
    constructor() {
        this.resources = new Map();
    }
    addFile(path, contents, headers) {
        this.resources.set(path, new MockFile(path, contents, headers, true));
        return this;
    }
    addUnhashedFile(path, contents, headers) {
        this.resources.set(path, new MockFile(path, contents, headers, false));
        return this;
    }
    build() {
        return new MockFileSystem(this.resources);
    }
}
exports.MockFileSystemBuilder = MockFileSystemBuilder;
class MockFileSystem {
    constructor(resources) {
        this.resources = resources;
    }
    lookup(path) {
        return this.resources.get(path);
    }
    extend() {
        const builder = new MockFileSystemBuilder();
        Array.from(this.resources.keys()).forEach((path) => {
            const res = this.resources.get(path);
            if (res.hashThisFile) {
                builder.addFile(path, res.contents, res.headers);
            }
            else {
                builder.addUnhashedFile(path, res.contents, res.headers);
            }
        });
        return builder;
    }
    list() {
        return Array.from(this.resources.keys());
    }
}
exports.MockFileSystem = MockFileSystem;
class MockServerStateBuilder {
    constructor() {
        this.rootDir = '/';
        this.resources = new Map();
        this.errors = new Set();
    }
    withRootDirectory(newRootDir) {
        // Update existing resources/errors.
        const oldRootDir = this.rootDir;
        const updateRootDir = (path) => path.startsWith(oldRootDir) ? joinPaths(newRootDir, path.slice(oldRootDir.length)) : path;
        this.resources = new Map([...this.resources].map(([path, contents]) => [updateRootDir(path), contents.clone()]));
        this.errors = new Set([...this.errors].map((url) => updateRootDir(url)));
        // Set `rootDir` for future resource/error additions.
        this.rootDir = newRootDir;
        return this;
    }
    withStaticFiles(dir) {
        dir.list().forEach((path) => {
            const file = dir.lookup(path);
            this.resources.set(joinPaths(this.rootDir, path), new fetch_1.MockResponse(file.contents, { headers: file.headers }));
        });
        return this;
    }
    withManifest(manifest) {
        const manifestPath = joinPaths(this.rootDir, 'ngsw.json');
        this.resources.set(manifestPath, new fetch_1.MockResponse(JSON.stringify(manifest)));
        return this;
    }
    withRedirect(from, to) {
        this.resources.set(from, new fetch_1.MockResponse('', { redirected: true, url: to }));
        return this;
    }
    withError(url) {
        this.errors.add(url);
        return this;
    }
    build() {
        // Take a "snapshot" of the current `resources` and `errors`.
        const resources = new Map(this.resources.entries());
        const errors = new Set(this.errors.values());
        return new MockServerState(resources, errors);
    }
}
exports.MockServerStateBuilder = MockServerStateBuilder;
class MockServerState {
    constructor(resources, errors) {
        this.resources = resources;
        this.errors = errors;
        this.requests = [];
        this.gate = Promise.resolve();
        this.resolve = null;
        this.online = true;
        this.nextRequest = new Promise((resolve) => {
            this.resolveNextRequest = resolve;
        });
    }
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.resolveNextRequest) === null || _a === void 0 ? void 0 : _a.call(this, req);
            this.nextRequest = new Promise((resolve) => {
                this.resolveNextRequest = resolve;
            });
            yield this.gate;
            if (!this.online) {
                throw new Error('Offline.');
            }
            this.requests.push(req);
            if (req.credentials === 'include' || req.mode === 'no-cors') {
                return new fetch_1.MockResponse(null, { status: 0, statusText: '', type: 'opaque' });
            }
            const url = req.url.split('?')[0];
            if (this.resources.has(url)) {
                return this.resources.get(url).clone();
            }
            if (this.errors.has(url)) {
                throw new Error('Intentional failure!');
            }
            return new fetch_1.MockResponse(null, { status: 404, statusText: 'Not Found' });
        });
    }
    pause() {
        this.gate = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
    unpause() {
        if (this.resolve === null) {
            return;
        }
        this.resolve();
        this.resolve = null;
    }
    getRequestsFor(url) {
        return this.requests.filter((req) => req.url.split('?')[0] === url);
    }
    assertSawRequestFor(url) {
        if (!this.sawRequestFor(url)) {
            throw new Error(`Expected request for ${url}, got none.`);
        }
    }
    assertNoRequestFor(url) {
        if (this.sawRequestFor(url)) {
            throw new Error(`Expected no request for ${url} but saw one.`);
        }
    }
    sawRequestFor(url) {
        const matching = this.getRequestsFor(url);
        if (matching.length > 0) {
            this.requests = this.requests.filter((req) => req !== matching[0]);
            return true;
        }
        return false;
    }
    assertNoOtherRequests() {
        if (!this.noOtherRequests()) {
            throw new Error(`Expected no other requests, got requests for ${this.requests
                .map((req) => req.url.split('?')[0])
                .join(', ')}`);
        }
    }
    noOtherRequests() {
        return this.requests.length === 0;
    }
    clearRequests() {
        this.requests = [];
    }
    reset() {
        this.clearRequests();
        this.nextRequest = new Promise((resolve) => {
            this.resolveNextRequest = resolve;
        });
        this.gate = Promise.resolve();
        this.resolve = null;
        this.online = true;
    }
}
exports.MockServerState = MockServerState;
function tmpManifestSingleAssetGroup(fs) {
    const files = fs.list();
    const hashTable = {};
    files.forEach((path) => {
        hashTable[path] = fs.lookup(path).hash;
    });
    return {
        configVersion: 1,
        timestamp: 1234567890123,
        index: '/index.html',
        assetGroups: [
            {
                name: 'group',
                installMode: 'prefetch',
                updateMode: 'prefetch',
                urls: files,
                patterns: [],
                cacheQueryOptions: { ignoreVary: true },
            },
        ],
        navigationUrls: [],
        navigationRequestStrategy: 'performance',
        hashTable,
    };
}
function tmpHashTableForFs(fs, breakHashes = {}, baseHref = '/') {
    const table = {};
    fs.list().forEach((filePath) => {
        const urlPath = joinPaths(baseHref, filePath);
        const file = fs.lookup(filePath);
        if (file.hashThisFile) {
            table[urlPath] = file.hash;
            if (breakHashes[filePath]) {
                table[urlPath] = table[urlPath].split('').reverse().join('');
            }
        }
    });
    return table;
}
function tmpHashTable(manifest) {
    const map = new Map();
    Object.keys(manifest.hashTable).forEach((url) => {
        const hash = manifest.hashTable[url];
        map.set(url, hash);
    });
    return map;
}
// Helpers
/**
 * Join two path segments, ensuring that there is exactly one slash (`/`) between them.
 */
function joinPaths(path1, path2) {
    return `${path1.replace(/\/$/, '')}/${path2.replace(/^\//, '')}`;
}
