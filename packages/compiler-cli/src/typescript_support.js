"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTypeScriptVersionForTesting = setTypeScriptVersionForTesting;
exports.restoreTypeScriptVersionForTesting = restoreTypeScriptVersionForTesting;
exports.checkVersion = checkVersion;
exports.verifySupportedTypeScriptVersion = verifySupportedTypeScriptVersion;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const version_helpers_1 = require("./version_helpers");
/**
 * Minimum supported TypeScript version
 * ∀ supported typescript version v, v >= MIN_TS_VERSION
 *
 * Note: this check is disabled in g3, search for
 * `angularCompilerOptions.disableTypeScriptVersionCheck` config param value in g3.
 */
const MIN_TS_VERSION = '5.8.0';
/**
 * Supremum of supported TypeScript versions
 * ∀ supported typescript version v, v < MAX_TS_VERSION
 * MAX_TS_VERSION is not considered as a supported TypeScript version
 *
 * Note: this check is disabled in g3, search for
 * `angularCompilerOptions.disableTypeScriptVersionCheck` config param value in g3.
 */
const MAX_TS_VERSION = '5.9.0';
/**
 * The currently used version of TypeScript, which can be adjusted for testing purposes using
 * `setTypeScriptVersionForTesting` and `restoreTypeScriptVersionForTesting` below.
 */
let tsVersion = typescript_1.default.version;
function setTypeScriptVersionForTesting(version) {
    tsVersion = version;
}
function restoreTypeScriptVersionForTesting() {
    tsVersion = typescript_1.default.version;
}
/**
 * Checks whether a given version ∈ [minVersion, maxVersion[.
 * An error will be thrown when the given version ∉ [minVersion, maxVersion[.
 *
 * @param version The version on which the check will be performed
 * @param minVersion The lower bound version. A valid version needs to be greater than minVersion
 * @param maxVersion The upper bound version. A valid version needs to be strictly less than
 * maxVersion
 *
 * @throws Will throw an error if the given version ∉ [minVersion, maxVersion[
 */
function checkVersion(version, minVersion, maxVersion) {
    if ((0, version_helpers_1.compareVersions)(version, minVersion) < 0 || (0, version_helpers_1.compareVersions)(version, maxVersion) >= 0) {
        throw new Error(`The Angular Compiler requires TypeScript >=${minVersion} and <${maxVersion} but ${version} was found instead.`);
    }
}
function verifySupportedTypeScriptVersion() {
    checkVersion(tsVersion, MIN_TS_VERSION, MAX_TS_VERSION);
}
