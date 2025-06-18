"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngularPackagesFromRunfiles = getAngularPackagesFromRunfiles;
exports.resolveFromRunfiles = resolveFromRunfiles;
const runfiles_1 = require("@bazel/runfiles");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Gets all built Angular NPM package artifacts by querying the Bazel runfiles.
 * In case there is a runfiles manifest (e.g. on Windows), the packages are resolved
 * through the manifest because the runfiles are not symlinked and cannot be searched
 * within the real filesystem.
 */
function getAngularPackagesFromRunfiles() {
    // Path to the Bazel runfiles manifest if present. This file is present if runfiles are
    // not symlinked into the runfiles directory.
    const runfilesManifestPath = process.env['RUNFILES_MANIFEST_FILE'];
    if (!runfilesManifestPath) {
        const packageRunfilesDir = path.join(process.env['RUNFILES'], 'angular/packages');
        return fs
            .readdirSync(packageRunfilesDir)
            .map((name) => ({ name, pkgPath: path.join(packageRunfilesDir, name, 'npm_package/') }))
            .filter(({ pkgPath }) => fs.existsSync(pkgPath));
    }
    return fs
        .readFileSync(runfilesManifestPath, 'utf8')
        .split('\n')
        .map((mapping) => mapping.split(' '))
        .filter(([runfilePath]) => runfilePath.match(/^angular\/packages\/[\w-]+\/npm_package$/))
        .map(([runfilePath, realPath]) => ({
        name: path.relative('angular/packages', runfilePath).split(path.sep)[0],
        pkgPath: realPath,
    }));
}
/** Resolves a file or directory from the Bazel runfiles. */
function resolveFromRunfiles(manifestPath) {
    return runfiles_1.runfiles.resolve(manifestPath);
}
