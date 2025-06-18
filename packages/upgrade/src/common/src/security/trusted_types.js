"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trustedHTMLFromLegacyTemplate = trustedHTMLFromLegacyTemplate;
/**
 * The Trusted Types policy, or null if Trusted Types are not
 * enabled/supported, or undefined if the policy has not been created yet.
 */
let policy;
/**
 * Returns the Trusted Types policy, or null if Trusted Types are not
 * enabled/supported. The first call to this function will create the policy.
 */
function getPolicy() {
    if (policy === undefined) {
        policy = null;
        const windowWithTrustedTypes = window;
        if (windowWithTrustedTypes.trustedTypes) {
            try {
                policy = windowWithTrustedTypes.trustedTypes.createPolicy('angular#unsafe-upgrade', {
                    createHTML: (s) => s,
                });
            }
            catch (_a) {
                // trustedTypes.createPolicy throws if called with a name that is
                // already registered, even in report-only mode. Until the API changes,
                // catch the error not to break the applications functionally. In such
                // cases, the code will fall back to using strings.
            }
        }
    }
    return policy;
}
/**
 * Unsafely promote a legacy AngularJS template to a TrustedHTML, falling back
 * to strings when Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, the template string should
 * always be under full control of the application author, as untrusted input
 * can cause an XSS vulnerability.
 */
function trustedHTMLFromLegacyTemplate(html) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
