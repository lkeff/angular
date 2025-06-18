"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INJECTOR = void 0;
const injection_token_1 = require("./injection_token");
/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * @publicApi
 */
exports.INJECTOR = new injection_token_1.InjectionToken(ngDevMode ? 'INJECTOR' : '', 
// Disable tslint because this is const enum which gets inlined not top level prop access.
// tslint:disable-next-line: no-toplevel-property-access
-1 /* InjectorMarkers.Injector */);
