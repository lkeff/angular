"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INJECTOR_SCOPE = void 0;
const injection_token_1 = require("./injection_token");
/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
exports.INJECTOR_SCOPE = new injection_token_1.InjectionToken(ngDevMode ? 'Set Injector scope.' : '');
