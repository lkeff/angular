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
exports.Generator = void 0;
exports.processNavigationUrls = processNavigationUrls;
const duration_1 = require("./duration");
const glob_1 = require("./glob");
const DEFAULT_NAVIGATION_URLS = [
    '/**', // Include all URLs.
    '!/**/*.*', // Exclude URLs to files (containing a file extension in the last segment).
    '!/**/*__*', // Exclude URLs containing `__` in the last segment.
    '!/**/*__*/**', // Exclude URLs containing `__` in any other segment.
];
/**
 * Consumes service worker configuration files and processes them into control files.
 *
 * @publicApi
 */
class Generator {
    constructor(fs, baseHref) {
        this.fs = fs;
        this.baseHref = baseHref;
    }
    process(config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const unorderedHashTable = {};
            const assetGroups = yield this.processAssetGroups(config, unorderedHashTable);
            return {
                configVersion: 1,
                timestamp: Date.now(),
                appData: config.appData,
                index: joinUrls(this.baseHref, config.index),
                assetGroups,
                dataGroups: this.processDataGroups(config),
                hashTable: withOrderedKeys(unorderedHashTable),
                navigationUrls: processNavigationUrls(this.baseHref, config.navigationUrls),
                navigationRequestStrategy: (_a = config.navigationRequestStrategy) !== null && _a !== void 0 ? _a : 'performance',
                applicationMaxAge: config.applicationMaxAge
                    ? (0, duration_1.parseDurationToMs)(config.applicationMaxAge)
                    : undefined,
            };
        });
    }
    processAssetGroups(config, hashTable) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve all files of the build.
            const allFiles = yield this.fs.list('/');
            const seenMap = new Set();
            const filesPerGroup = new Map();
            // Computed which files belong to each asset-group.
            for (const group of config.assetGroups || []) {
                if (group.resources.versionedFiles) {
                    throw new Error(`Asset-group '${group.name}' in 'ngsw-config.json' uses the 'versionedFiles' option, ` +
                        "which is no longer supported. Use 'files' instead.");
                }
                const fileMatcher = globListToMatcher(group.resources.files || []);
                const matchedFiles = allFiles
                    .filter(fileMatcher)
                    .filter((file) => !seenMap.has(file))
                    .sort();
                matchedFiles.forEach((file) => seenMap.add(file));
                filesPerGroup.set(group, matchedFiles);
            }
            // Compute hashes for all matched files and add them to the hash-table.
            const allMatchedFiles = [].concat(...Array.from(filesPerGroup.values())).sort();
            const allMatchedHashes = yield processInBatches(allMatchedFiles, 500, (file) => this.fs.hash(file));
            allMatchedFiles.forEach((file, idx) => {
                hashTable[joinUrls(this.baseHref, file)] = allMatchedHashes[idx];
            });
            // Generate and return the processed asset-groups.
            return Array.from(filesPerGroup.entries()).map(([group, matchedFiles]) => ({
                name: group.name,
                installMode: group.installMode || 'prefetch',
                updateMode: group.updateMode || group.installMode || 'prefetch',
                cacheQueryOptions: buildCacheQueryOptions(group.cacheQueryOptions),
                urls: matchedFiles.map((url) => joinUrls(this.baseHref, url)),
                patterns: (group.resources.urls || []).map((url) => urlToRegex(url, this.baseHref, true)),
            }));
        });
    }
    processDataGroups(config) {
        return (config.dataGroups || []).map((group) => {
            return {
                name: group.name,
                patterns: group.urls.map((url) => urlToRegex(url, this.baseHref, true)),
                strategy: group.cacheConfig.strategy || 'performance',
                maxSize: group.cacheConfig.maxSize,
                maxAge: (0, duration_1.parseDurationToMs)(group.cacheConfig.maxAge),
                timeoutMs: group.cacheConfig.timeout && (0, duration_1.parseDurationToMs)(group.cacheConfig.timeout),
                refreshAheadMs: group.cacheConfig.refreshAhead && (0, duration_1.parseDurationToMs)(group.cacheConfig.refreshAhead),
                cacheOpaqueResponses: group.cacheConfig.cacheOpaqueResponses,
                cacheQueryOptions: buildCacheQueryOptions(group.cacheQueryOptions),
                version: group.version !== undefined ? group.version : 1,
            };
        });
    }
}
exports.Generator = Generator;
function processNavigationUrls(baseHref, urls = DEFAULT_NAVIGATION_URLS) {
    return urls.map((url) => {
        const positive = !url.startsWith('!');
        url = positive ? url : url.slice(1);
        return { positive, regex: `^${urlToRegex(url, baseHref)}$` };
    });
}
function processInBatches(items, batchSize, processFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const batches = [];
        for (let i = 0; i < items.length; i += batchSize) {
            batches.push(items.slice(i, i + batchSize));
        }
        return batches.reduce((prev, batch) => __awaiter(this, void 0, void 0, function* () { return (yield prev).concat(yield Promise.all(batch.map((item) => processFn(item)))); }), Promise.resolve([]));
    });
}
function globListToMatcher(globs) {
    const patterns = globs.map((pattern) => {
        if (pattern.startsWith('!')) {
            return {
                positive: false,
                regex: new RegExp('^' + (0, glob_1.globToRegex)(pattern.slice(1)) + '$'),
            };
        }
        else {
            return {
                positive: true,
                regex: new RegExp('^' + (0, glob_1.globToRegex)(pattern) + '$'),
            };
        }
    });
    return (file) => matches(file, patterns);
}
function matches(file, patterns) {
    return patterns.reduce((isMatch, pattern) => {
        if (pattern.positive) {
            return isMatch || pattern.regex.test(file);
        }
        else {
            return isMatch && !pattern.regex.test(file);
        }
    }, false);
}
function urlToRegex(url, baseHref, literalQuestionMark) {
    if (!url.startsWith('/') && url.indexOf('://') === -1) {
        // Prefix relative URLs with `baseHref`.
        // Strip a leading `.` from a relative `baseHref` (e.g. `./foo/`), since it would result in an
        // incorrect regex (matching a literal `.`).
        url = joinUrls(baseHref.replace(/^\.(?=\/)/, ''), url);
    }
    return (0, glob_1.globToRegex)(url, literalQuestionMark);
}
function joinUrls(a, b) {
    if (a.endsWith('/') && b.startsWith('/')) {
        return a + b.slice(1);
    }
    else if (!a.endsWith('/') && !b.startsWith('/')) {
        return a + '/' + b;
    }
    return a + b;
}
function withOrderedKeys(unorderedObj) {
    const orderedObj = {};
    Object.keys(unorderedObj)
        .sort()
        .forEach((key) => (orderedObj[key] = unorderedObj[key]));
    return orderedObj;
}
function buildCacheQueryOptions(inOptions) {
    return Object.assign({ ignoreVary: true }, inOptions);
}
