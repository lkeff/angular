"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XSS_SECURITY_URL = exports.ERROR_DETAILS_PAGE_BASE_URL = void 0;
/**
 * Base URL for the error details page.
 *
 * Keep this constant in sync across:
 *  - packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.ts
 *  - packages/core/src/error_details_base_url.ts
 */
exports.ERROR_DETAILS_PAGE_BASE_URL = 'https://angular.dev/errors';
/**
 * URL for the XSS security documentation.
 */
exports.XSS_SECURITY_URL = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss';
