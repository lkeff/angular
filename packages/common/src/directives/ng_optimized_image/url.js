"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = getUrl;
exports.isAbsoluteUrl = isAbsoluteUrl;
exports.extractHostname = extractHostname;
exports.isValidPath = isValidPath;
exports.normalizePath = normalizePath;
exports.normalizeSrc = normalizeSrc;
// Converts a string that represents a URL into a URL class instance.
function getUrl(src, win) {
    // Don't use a base URL is the URL is absolute.
    return isAbsoluteUrl(src) ? new URL(src) : new URL(src, win.location.href);
}
// Checks whether a URL is absolute (i.e. starts with `http://` or `https://`).
function isAbsoluteUrl(src) {
    return /^https?:\/\//.test(src);
}
// Given a URL, extract the hostname part.
// If a URL is a relative one - the URL is returned as is.
function extractHostname(url) {
    return isAbsoluteUrl(url) ? new URL(url).hostname : url;
}
function isValidPath(path) {
    const isString = typeof path === 'string';
    if (!isString || path.trim() === '') {
        return false;
    }
    // Calling new URL() will throw if the path string is malformed
    try {
        const url = new URL(path);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function normalizePath(path) {
    return path.endsWith('/') ? path.slice(0, -1) : path;
}
function normalizeSrc(src) {
    return src.startsWith('/') ? src.slice(1) : src;
}
