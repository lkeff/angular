"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSACTION_BLOCK_ELEMENT_MAP = exports.IS_INCREMENTAL_HYDRATION_ENABLED = exports.EVENT_REPLAY_ENABLED_DEFAULT = exports.IS_EVENT_REPLAY_ENABLED = exports.IS_I18N_HYDRATION_ENABLED = exports.PRESERVE_HOST_CONTENT = exports.PRESERVE_HOST_CONTENT_DEFAULT = exports.IS_HYDRATION_DOM_REUSE_ENABLED = void 0;
const injection_token_1 = require("../di/injection_token");
/**
 * Internal token that specifies whether DOM reuse logic
 * during hydration is enabled.
 */
exports.IS_HYDRATION_DOM_REUSE_ENABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || !!ngDevMode ? 'IS_HYDRATION_DOM_REUSE_ENABLED' : '');
// By default (in client rendering mode), we remove all the contents
// of the host element and render an application after that.
exports.PRESERVE_HOST_CONTENT_DEFAULT = false;
/**
 * Internal token that indicates whether host element content should be
 * retained during the bootstrap.
 */
exports.PRESERVE_HOST_CONTENT = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || !!ngDevMode ? 'PRESERVE_HOST_CONTENT' : '', {
    providedIn: 'root',
    factory: () => exports.PRESERVE_HOST_CONTENT_DEFAULT,
});
/**
 * Internal token that indicates whether hydration support for i18n
 * is enabled.
 */
exports.IS_I18N_HYDRATION_ENABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || !!ngDevMode ? 'IS_I18N_HYDRATION_ENABLED' : '');
/**
 * Internal token that indicates whether event replay support for SSR
 * is enabled.
 */
exports.IS_EVENT_REPLAY_ENABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || !!ngDevMode ? 'IS_EVENT_REPLAY_ENABLED' : '');
exports.EVENT_REPLAY_ENABLED_DEFAULT = false;
/**
 * Internal token that indicates whether incremental hydration support
 * is enabled.
 */
exports.IS_INCREMENTAL_HYDRATION_ENABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || !!ngDevMode ? 'IS_INCREMENTAL_HYDRATION_ENABLED' : '');
/**
 * A map of DOM elements with `jsaction` attributes grouped by action names.
 */
exports.JSACTION_BLOCK_ELEMENT_MAP = new injection_token_1.InjectionToken(ngDevMode ? 'JSACTION_BLOCK_ELEMENT_MAP' : '', {
    providedIn: 'root',
    factory: () => new Map(),
});
