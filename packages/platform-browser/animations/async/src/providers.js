"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideAnimationsAsync = provideAnimationsAsync;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const index_1 = require("../../../index");
const async_animation_renderer_1 = require("./async_animation_renderer");
/**
 * Returns the set of dependency-injection providers
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * When you use this function instead of the eager `provideAnimations()`, animations won't be
 * rendered until the renderer is loaded.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```ts
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimationsAsync()
 *   ]
 * });
 * ```
 *
 * @param type pass `'noop'` as argument to disable animations.
 *
 * @publicApi
 */
function provideAnimationsAsync(type = 'animations') {
    (0, core_1.ɵperformanceMarkFeature)('NgAsyncAnimations');
    // Animations don't work on the server so we switch them over to no-op automatically.
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        type = 'noop';
    }
    return (0, core_1.makeEnvironmentProviders)([
        {
            provide: core_1.RendererFactory2,
            useFactory: (doc, renderer, zone) => {
                return new async_animation_renderer_1.AsyncAnimationRendererFactory(doc, renderer, zone, type);
            },
            deps: [common_1.DOCUMENT, index_1.ɵDomRendererFactory2, core_1.NgZone],
        },
        {
            provide: core_1.ANIMATION_MODULE_TYPE,
            useValue: type === 'noop' ? 'NoopAnimations' : 'BrowserAnimations',
        },
    ]);
}
