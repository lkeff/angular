"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trustedHTMLFromString = trustedHTMLFromString;
exports.trustedScriptFromString = trustedScriptFromString;
exports.trustedScriptURLFromString = trustedScriptURLFromString;
exports.newTrustedFunctionForDev = newTrustedFunctionForDev;
/**
 * @fileoverview
 * A module to facilitate use of a Trusted Types policy internally within
 * Angular. It lazily constructs the Trusted Types policy, providing helper
 * utilities for promoting strings to Trusted Types. When Trusted Types are not
 * available, strings are used as a fallback.
 * @security All use of this module is security-sensitive and should go through
 * security review.
 */
const global_1 = require("../global");
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
        if (global_1.global.trustedTypes) {
            try {
                policy = global_1.global.trustedTypes.createPolicy('angular', {
                    createHTML: (s) => s,
                    createScript: (s) => s,
                    createScriptURL: (s) => s,
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
 * Unsafely promote a string to a TrustedHTML, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will be interpreted as HTML by a browser, e.g. when assigning to
 * element.innerHTML.
 */
function trustedHTMLFromString(html) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
/**
 * Unsafely promote a string to a TrustedScript, falling back to strings when
 * Trusted Types are not available.
 * @security In particular, it must be assured that the provided string will
 * never cause an XSS vulnerability if used in a context that will be
 * interpreted and executed as a script by a browser, e.g. when calling eval.
 */
function trustedScriptFromString(script) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScript(script)) || script;
}
/**
 * Unsafely promote a string to a TrustedScriptURL, falling back to strings
 * when Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will cause a browser to load and execute a resource, e.g. when
 * assigning to script.src.
 */
function trustedScriptURLFromString(url) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScriptURL(url)) || url;
}
/**
 * Unsafely call the Function constructor with the given string arguments. It
 * is only available in development mode, and should be stripped out of
 * production code.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that it
 * is only called from development code, as use in production code can lead to
 * XSS vulnerabilities.
 */
function newTrustedFunctionForDev(...args) {
    if (typeof ngDevMode === 'undefined') {
        throw new Error('newTrustedFunctionForDev should never be called in production');
    }
    if (!global_1.global.trustedTypes) {
        // In environments that don't support Trusted Types, fall back to the most
        // straightforward implementation:
        return new Function(...args);
    }
    // Chrome currently does not support passing TrustedScript to the Function
    // constructor. The following implements the workaround proposed on the page
    // below, where the Chromium bug is also referenced:
    // https://github.com/w3c/webappsec-trusted-types/wiki/Trusted-Types-for-function-constructor
    const fnArgs = args.slice(0, -1).join(',');
    const fnBody = args[args.length - 1];
    const body = `(function anonymous(${fnArgs}
) { ${fnBody}
})`;
    // Using eval directly confuses the compiler and prevents this module from
    // being stripped out of JS binaries even if not used. The global['eval']
    // indirection fixes that.
    const fn = global_1.global['eval'](trustedScriptFromString(body));
    if (fn.bind === undefined) {
        // Workaround for a browser bug that only exists in Chrome 83, where passing
        // a TrustedScript to eval just returns the TrustedScript back without
        // evaluating it. In that case, fall back to the most straightforward
        // implementation:
        return new Function(...args);
    }
    // To completely mimic the behavior of calling "new Function", two more
    // things need to happen:
    // 1. Stringifying the resulting function should return its source code
    fn.toString = () => body;
    // 2. When calling the resulting function, `this` should refer to `global`
    return fn.bind(global_1.global);
    // When Trusted Types support in Function constructors is widely available,
    // the implementation of this function can be simplified to:
    // return new Function(...args.map(a => trustedScriptFromString(a)));
}
