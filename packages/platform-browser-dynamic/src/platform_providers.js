"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformBrowserDynamic = exports.INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const compiler_1 = require("@angular/compiler");
const resource_loader_impl_1 = require("./resource_loader/resource_loader_impl");
const compiler_factory_1 = require("./compiler_factory");
exports.INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    {
        provide: core_1.COMPILER_OPTIONS,
        useValue: { providers: [{ provide: compiler_1.ResourceLoader, useClass: resource_loader_impl_1.ResourceLoaderImpl, deps: [] }] },
        multi: true,
    },
    { provide: core_1.CompilerFactory, useClass: compiler_factory_1.JitCompilerFactory, deps: [core_1.COMPILER_OPTIONS] },
];
/**
 * @publicApi
 */
exports.platformBrowserDynamic = (0, core_1.createPlatformFactory)(platform_browser_1.platformBrowser, 'browserDynamic', exports.INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
