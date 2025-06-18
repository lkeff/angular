"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptToReuseGeneratedImports = attemptToReuseGeneratedImports;
exports.captureGeneratedImport = captureGeneratedImport;
const typescript_1 = __importDefault(require("typescript"));
/** Attempts to efficiently re-use previous generated import requests. */
function attemptToReuseGeneratedImports(tracker, request) {
    const requestHash = hashImportRequest(request);
    // In case the given import has been already generated previously, we just return
    // the previous generated identifier in order to avoid duplicate generated imports.
    const existingExactImport = tracker.directReuseCache.get(requestHash);
    if (existingExactImport !== undefined) {
        return existingExactImport;
    }
    const potentialNamespaceImport = tracker.namespaceImportReuseCache.get(request.exportModuleSpecifier);
    if (potentialNamespaceImport === undefined) {
        return null;
    }
    if (request.exportSymbolName === null) {
        return potentialNamespaceImport;
    }
    return [potentialNamespaceImport, typescript_1.default.factory.createIdentifier(request.exportSymbolName)];
}
/** Captures the given import request and its generated reference node/path for future re-use. */
function captureGeneratedImport(request, tracker, referenceNode) {
    tracker.directReuseCache.set(hashImportRequest(request), referenceNode);
    if (request.exportSymbolName === null && !Array.isArray(referenceNode)) {
        tracker.namespaceImportReuseCache.set(request.exportModuleSpecifier, referenceNode);
    }
}
/** Generates a unique hash for the given import request. */
function hashImportRequest(req) {
    return `${req.requestedFile.fileName}:${req.exportModuleSpecifier}:${req.exportSymbolName}${req.unsafeAliasOverride ? ':' + req.unsafeAliasOverride : ''}`;
}
