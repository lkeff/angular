"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAVIGATION_CANCELING_ERROR = void 0;
exports.redirectingNavigationError = redirectingNavigationError;
exports.navigationCancelingError = navigationCancelingError;
exports.isRedirectingNavigationCancelingError = isRedirectingNavigationCancelingError;
exports.isNavigationCancelingError = isNavigationCancelingError;
const events_1 = require("./events");
const url_tree_1 = require("./url_tree");
exports.NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
function redirectingNavigationError(urlSerializer, redirect) {
    const { redirectTo, navigationBehaviorOptions } = (0, url_tree_1.isUrlTree)(redirect)
        ? { redirectTo: redirect, navigationBehaviorOptions: undefined }
        : redirect;
    const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, events_1.NavigationCancellationCode.Redirect);
    error.url = redirectTo;
    error.navigationBehaviorOptions = navigationBehaviorOptions;
    return error;
}
function navigationCancelingError(message, code) {
    const error = new Error(`NavigationCancelingError: ${message || ''}`);
    error[exports.NAVIGATION_CANCELING_ERROR] = true;
    error.cancellationCode = code;
    return error;
}
function isRedirectingNavigationCancelingError(error) {
    return (isNavigationCancelingError(error) &&
        (0, url_tree_1.isUrlTree)(error.url));
}
function isNavigationCancelingError(error) {
    return !!error && error[exports.NAVIGATION_CANCELING_ERROR];
}
