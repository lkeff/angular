"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENABLE_DOM_EMULATION = exports.BEFORE_APP_SERIALIZED = exports.INITIAL_CONFIG = void 0;
const core_1 = require("@angular/core");
/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
exports.INITIAL_CONFIG = new core_1.InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderApplication` or
 * `renderModule` just before current platform state is rendered to string.
 *
 * @publicApi
 */
exports.BEFORE_APP_SERIALIZED = new core_1.InjectionToken('Server.RENDER_MODULE_HOOK');
exports.ENABLE_DOM_EMULATION = new core_1.InjectionToken('ENABLE_DOM_EMULATION');
