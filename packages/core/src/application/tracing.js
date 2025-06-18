"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingService = exports.TracingAction = void 0;
const injection_token_1 = require("../di/injection_token");
/** Actions that are supported by the tracing framework. */
var TracingAction;
(function (TracingAction) {
    TracingAction[TracingAction["CHANGE_DETECTION"] = 0] = "CHANGE_DETECTION";
    TracingAction[TracingAction["AFTER_NEXT_RENDER"] = 1] = "AFTER_NEXT_RENDER";
})(TracingAction || (exports.TracingAction = TracingAction = {}));
/**
 * Injection token for a `TracingService`, optionally provided.
 */
exports.TracingService = new injection_token_1.InjectionToken(ngDevMode ? 'TracingService' : '');
