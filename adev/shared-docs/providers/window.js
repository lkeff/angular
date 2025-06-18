"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WINDOW = void 0;
exports.windowProvider = windowProvider;
const core_1 = require("@angular/core");
// Providing window using injection token could increase testability and portability (i.e SSR don't have a real browser environment).
exports.WINDOW = new core_1.InjectionToken('WINDOW');
// The project uses prerendering, to resolve issue: 'window is not defined', we should get window from DOCUMENT.
// As it is recommended here: https://github.com/angular/universal/blob/main/docs/gotchas.md#strategy-1-injection
function windowProvider(document) {
    return document.defaultView;
}
