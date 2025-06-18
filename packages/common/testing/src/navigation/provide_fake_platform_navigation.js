"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideFakePlatformNavigation = provideFakePlatformNavigation;
const index_1 = require("../../../index");
const core_1 = require("@angular/core");
const mock_platform_location_1 = require("../mock_platform_location");
const fake_navigation_1 = require("./fake_navigation");
const FAKE_NAVIGATION = new core_1.InjectionToken('fakeNavigation', {
    providedIn: 'root',
    factory: () => {
        const config = (0, core_1.inject)(mock_platform_location_1.MOCK_PLATFORM_LOCATION_CONFIG, { optional: true });
        const baseFallback = 'http://_empty_/';
        const startUrl = new URL((config === null || config === void 0 ? void 0 : config.startUrl) || baseFallback, baseFallback);
        const fakeNavigation = new fake_navigation_1.FakeNavigation((0, core_1.inject)(index_1.DOCUMENT), startUrl.href);
        fakeNavigation.setSynchronousTraversalsForTesting(true);
        return fakeNavigation;
    },
});
/**
 * Return a provider for the `FakeNavigation` in place of the real Navigation API.
 */
function provideFakePlatformNavigation() {
    return [
        {
            provide: index_1.ɵPlatformNavigation,
            useFactory: () => (0, core_1.inject)(FAKE_NAVIGATION),
        },
        { provide: index_1.PlatformLocation, useClass: mock_platform_location_1.FakeNavigationPlatformLocation },
    ];
}
