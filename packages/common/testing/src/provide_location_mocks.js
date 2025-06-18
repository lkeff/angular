"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideLocationMocks = provideLocationMocks;
const index_1 = require("../../index");
const location_mock_1 = require("./location_mock");
const mock_location_strategy_1 = require("./mock_location_strategy");
/**
 * Returns mock providers for the `Location` and `LocationStrategy` classes.
 * The mocks are helpful in tests to fire simulated location events.
 *
 * @publicApi
 */
function provideLocationMocks() {
    return [
        { provide: index_1.Location, useClass: location_mock_1.SpyLocation },
        { provide: index_1.LocationStrategy, useClass: mock_location_strategy_1.MockLocationStrategy },
    ];
}
