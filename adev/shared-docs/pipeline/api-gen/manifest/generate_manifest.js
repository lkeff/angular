"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHiddenEntry = isHiddenEntry;
exports.generateManifest = generateManifest;
/**
 * @returns the JsDocTagEntry for the given tag name
 */
function getTag(entry, tag, every = false) {
    var _a, _b, _c, _d;
    const hasTagName = (t) => t.name === tag;
    if (every && 'signatures' in entry && entry.signatures.length > 1) {
        // For overloads we need to check all signatures.
        return entry.signatures.every((s) => s.jsdocTags.some(hasTagName))
            ? entry.signatures[0].jsdocTags.find(hasTagName)
            : undefined;
    }
    const jsdocTags = [
        ...entry.jsdocTags,
        ...((_b = (_a = entry.signatures) === null || _a === void 0 ? void 0 : _a.flatMap((s) => s.jsdocTags)) !== null && _b !== void 0 ? _b : []),
        ...((_d = (_c = entry.implementation) === null || _c === void 0 ? void 0 : _c.jsdocTags) !== null && _d !== void 0 ? _d : []),
    ];
    return jsdocTags.find(hasTagName);
}
/** Gets whether the given entry is hidden. */
function isHiddenEntry(entry) {
    return getTag(entry, 'docs-private', /* every */ true) ? true : false;
}
function getTagSinceVersion(entry, tagName, every = false) {
    var _a;
    const tag = getTag(entry, tagName, every);
    if (!tag) {
        return undefined;
    }
    // In case of deprecated tag we need to separate the version from the deprecation message.
    const version = (_a = tag.comment.match(/\d+(\.\d+)?/)) === null || _a === void 0 ? void 0 : _a[0];
    return { version };
}
/**
 * Generates an API manifest for a set of API collections extracted by
 * extract_api_to_json.
 */
function generateManifest(apiCollections) {
    var _a;
    const manifest = [];
    for (const collection of apiCollections) {
        const entries = collection.entries
            .filter((entry) => !isHiddenEntry(entry))
            .map((entry) => ({
            name: entry.name,
            type: entry.entryType,
            deprecated: getTagSinceVersion(entry, 'deprecated', true),
            developerPreview: getTagSinceVersion(entry, 'developerPreview'),
            experimental: getTagSinceVersion(entry, 'experimental'),
            stable: getTagSinceVersion(entry, 'publicApi'),
        }));
        const existingEntry = manifest.find((entry) => entry.moduleName === collection.moduleName);
        if (existingEntry) {
            existingEntry.entries.push(...entries);
        }
        else {
            manifest.push({
                moduleName: collection.moduleName,
                normalizedModuleName: collection.normalizedModuleName,
                moduleLabel: (_a = collection.moduleLabel) !== null && _a !== void 0 ? _a : collection.moduleName,
                entries,
            });
        }
    }
    // We sort the API entries alphabetically by name to ensure a stable order in the manifest.
    manifest.forEach((entry) => {
        entry.entries.sort((entry1, entry2) => entry1.name.localeCompare(entry2.name));
    });
    manifest.sort((entry1, entry2) => {
        // Ensure that labels that start with a `code` tag like `window.ng` are last
        if (entry1.moduleLabel.startsWith('<')) {
            return 1;
        }
        else if (entry2.moduleLabel.startsWith('<')) {
            return -1;
        }
        return entry1.moduleLabel.localeCompare(entry2.moduleLabel);
    });
    return manifest;
}
