"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRELOADED_IMAGES = exports.DEFAULT_PRELOADED_IMAGES_LIMIT = void 0;
const core_1 = require("@angular/core");
/**
 * In SSR scenarios, a preload `<link>` element is generated for priority images.
 * Having a large number of preload tags may negatively affect the performance,
 * so we warn developers (by throwing an error) if the number of preloaded images
 * is above a certain threshold. This const specifies this threshold.
 */
exports.DEFAULT_PRELOADED_IMAGES_LIMIT = 5;
/**
 * Helps to keep track of priority images that already have a corresponding
 * preload tag (to avoid generating multiple preload tags with the same URL).
 *
 * This Set tracks the original src passed into the `ngSrc` input not the src after it has been
 * run through the specified `IMAGE_LOADER`.
 */
exports.PRELOADED_IMAGES = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'NG_OPTIMIZED_PRELOADED_IMAGES' : '', {
    providedIn: 'root',
    factory: () => new Set(),
});
