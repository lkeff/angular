"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapApiManifestToRoutes = mapApiManifestToRoutes;
exports.getApiNavigationItems = getApiNavigationItems;
exports.getApiUrl = getApiUrl;
const manifest_json_1 = __importDefault(require("../../../../../src/assets/api/manifest.json"));
const pages_1 = require("../../../core/enums/pages");
const docs_1 = require("@angular/docs");
const manifest = manifest_json_1.default;
function mapApiManifestToRoutes() {
    const apiRoutes = [];
    for (const packageEntry of manifest) {
        for (const api of packageEntry.entries) {
            apiRoutes.push({
                path: getApiUrl(packageEntry, api.name),
                loadComponent: () => Promise.resolve().then(() => __importStar(require('./../api-reference-details-page/api-reference-details-page.component'))),
                resolve: {
                    docContent: (0, docs_1.contentResolver)(`api/${getNormalizedFilename(packageEntry, api)}`),
                },
                data: {
                    label: api.name,
                    displaySecondaryNav: true,
                },
            });
        }
    }
    return apiRoutes;
}
function getApiNavigationItems() {
    const apiNavigationItems = [];
    for (const packageEntry of manifest) {
        const packageNavigationItem = {
            label: packageEntry.moduleLabel,
            children: packageEntry.entries.map((api) => ({
                path: getApiUrl(packageEntry, api.name),
                label: api.name,
            })),
        };
        apiNavigationItems.push(packageNavigationItem);
    }
    return apiNavigationItems;
}
function getApiUrl(packageEntry, apiName) {
    const packageName = packageEntry.normalizedModuleName
        // packages like `angular_core` should be `core`
        // packages like `angular_animation_browser` should be `animation/browser`
        .replace('angular_', '')
        .replaceAll('_', '/');
    return `${pages_1.PagePrefix.API}/${packageName}/${apiName}`;
}
function getNormalizedFilename(manifestPackage, entry) {
    return `${manifestPackage.normalizedModuleName}_${entry.name}_${entry.type}.html`;
}
