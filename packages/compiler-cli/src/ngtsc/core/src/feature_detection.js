"use strict";
/*!
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
exports.coreVersionSupportsFeature = coreVersionSupportsFeature;
// Note: semver isn't available internally so this import will be commented out.
// When adding more dependencies here, the caretaker may have to update a patch internally.
const semver_1 = __importDefault(require("semver"));
/**
 * Whether a version of `@angular/core` supports a specific feature.
 * @param coreVersion Current version of core.
 * @param minVersion Minimum required version for the feature.
 */
function coreVersionSupportsFeature(coreVersion, minVersion) {
    // A version of `0.0.0-PLACEHOLDER` usually means that core is at head so it supports
    // all features. Use string interpolation prevent the placeholder from being replaced
    // with the current version during build time.
    if (coreVersion === `0.0.0-${'PLACEHOLDER'}`) {
        return true;
    }
    return semver_1.default.satisfies(coreVersion, minVersion, { includePrerelease: true });
}
