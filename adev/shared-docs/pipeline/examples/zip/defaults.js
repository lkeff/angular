"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCLUDE_FILES = exports.CONFIG_FILENAME = exports.EXAMPLE_CONFIG_FILENAME = exports.BUILD_BAZEL_FILENAME = exports.TEST_FILES_E2E_EXTENSION_SUFFIX = exports.TEST_FILES_EXTENSION_SUFFIX = void 0;
exports.TEST_FILES_EXTENSION_SUFFIX = '.spec.ts';
exports.TEST_FILES_E2E_EXTENSION_SUFFIX = '.e2e-spec.ts';
exports.BUILD_BAZEL_FILENAME = 'BUILD.bazel';
exports.EXAMPLE_CONFIG_FILENAME = 'example-config.json';
exports.CONFIG_FILENAME = 'zip.json';
/** Default file paths to be excluded from stackblitz examples. */
exports.EXCLUDE_FILES = [
    exports.CONFIG_FILENAME,
    exports.BUILD_BAZEL_FILENAME,
    exports.EXAMPLE_CONFIG_FILENAME,
    exports.TEST_FILES_EXTENSION_SUFFIX,
    exports.TEST_FILES_E2E_EXTENSION_SUFFIX,
];
