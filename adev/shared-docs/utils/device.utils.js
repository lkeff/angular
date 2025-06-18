"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirefox = exports.isIos = exports.isIpad = exports.isApple = exports.isMobile = void 0;
exports.isMobile = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('mobi');
exports.isApple = typeof window !== 'undefined' &&
    (/iPad|iPhone/.test(window.navigator.userAgent) || window.navigator.userAgent.includes('Mac'));
exports.isIpad = typeof window !== 'undefined' &&
    exports.isApple &&
    !!window.navigator.maxTouchPoints &&
    window.navigator.maxTouchPoints > 1;
exports.isIos = (exports.isMobile && exports.isApple) || exports.isIpad;
exports.isFirefox = typeof window !== 'undefined' && window.navigator.userAgent.includes('Firefox/');
