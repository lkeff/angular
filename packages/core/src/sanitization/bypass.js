"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapSafeValue = unwrapSafeValue;
exports.allowSanitizationBypassAndThrow = allowSanitizationBypassAndThrow;
exports.getSanitizationBypassType = getSanitizationBypassType;
exports.bypassSanitizationTrustHtml = bypassSanitizationTrustHtml;
exports.bypassSanitizationTrustStyle = bypassSanitizationTrustStyle;
exports.bypassSanitizationTrustScript = bypassSanitizationTrustScript;
exports.bypassSanitizationTrustUrl = bypassSanitizationTrustUrl;
exports.bypassSanitizationTrustResourceUrl = bypassSanitizationTrustResourceUrl;
const error_details_base_url_1 = require("../error_details_base_url");
class SafeValueImpl {
    constructor(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
    }
    toString() {
        return (`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            ` (see ${error_details_base_url_1.XSS_SECURITY_URL})`);
    }
}
class SafeHtmlImpl extends SafeValueImpl {
    getTypeName() {
        return "HTML" /* BypassType.Html */;
    }
}
class SafeStyleImpl extends SafeValueImpl {
    getTypeName() {
        return "Style" /* BypassType.Style */;
    }
}
class SafeScriptImpl extends SafeValueImpl {
    getTypeName() {
        return "Script" /* BypassType.Script */;
    }
}
class SafeUrlImpl extends SafeValueImpl {
    getTypeName() {
        return "URL" /* BypassType.Url */;
    }
}
class SafeResourceUrlImpl extends SafeValueImpl {
    getTypeName() {
        return "ResourceURL" /* BypassType.ResourceUrl */;
    }
}
function unwrapSafeValue(value) {
    return value instanceof SafeValueImpl
        ? value.changingThisBreaksApplicationSecurity
        : value;
}
function allowSanitizationBypassAndThrow(value, type) {
    const actualType = getSanitizationBypassType(value);
    if (actualType != null && actualType !== type) {
        // Allow ResourceURLs in URL contexts, they are strictly more trusted.
        if (actualType === "ResourceURL" /* BypassType.ResourceUrl */ && type === "URL" /* BypassType.Url */)
            return true;
        throw new Error(`Required a safe ${type}, got a ${actualType} (see ${error_details_base_url_1.XSS_SECURITY_URL})`);
    }
    return actualType === type;
}
function getSanitizationBypassType(value) {
    return (value instanceof SafeValueImpl && value.getTypeName()) || null;
}
/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link htmlSanitizer} to be trusted implicitly.
 *
 * @param trustedHtml `html` string which needs to be implicitly trusted.
 * @returns a `html` which has been branded to be implicitly trusted.
 */
function bypassSanitizationTrustHtml(trustedHtml) {
    return new SafeHtmlImpl(trustedHtml);
}
/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link styleSanitizer} to be trusted implicitly.
 *
 * @param trustedStyle `style` string which needs to be implicitly trusted.
 * @returns a `style` hich has been branded to be implicitly trusted.
 */
function bypassSanitizationTrustStyle(trustedStyle) {
    return new SafeStyleImpl(trustedStyle);
}
/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link scriptSanitizer} to be trusted implicitly.
 *
 * @param trustedScript `script` string which needs to be implicitly trusted.
 * @returns a `script` which has been branded to be implicitly trusted.
 */
function bypassSanitizationTrustScript(trustedScript) {
    return new SafeScriptImpl(trustedScript);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link urlSanitizer} to be trusted implicitly.
 *
 * @param trustedUrl `url` string which needs to be implicitly trusted.
 * @returns a `url`  which has been branded to be implicitly trusted.
 */
function bypassSanitizationTrustUrl(trustedUrl) {
    return new SafeUrlImpl(trustedUrl);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` which has been branded to be implicitly trusted.
 */
function bypassSanitizationTrustResourceUrl(trustedResourceUrl) {
    return new SafeResourceUrlImpl(trustedResourceUrl);
}
