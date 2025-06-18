"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideServerRendering = provideServerRendering;
const core_1 = require("@angular/core");
const server_1 = require("./server");
/**
 * Sets up providers necessary to enable server rendering functionality for the application.
 *
 * @usageNotes
 *
 * Basic example of how you can add server support to your application:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideServerRendering()]
 * });
 * ```
 *
 * @publicApi
 * @returns A set of providers to setup the server.
 */
function provideServerRendering() {
    if (typeof ngServerMode === 'undefined') {
        globalThis['ngServerMode'] = true;
    }
    return (0, core_1.makeEnvironmentProviders)([...server_1.PLATFORM_SERVER_PROVIDERS]);
}
