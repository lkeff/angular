"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./test-env-setup-jasmine");
require("./wtf_mock");
const jasmine_1 = require("../lib/jasmine/jasmine");
const main_1 = require("../lib/node/main");
const rxjs_1 = require("../lib/rxjs/rxjs");
const rxjs_fake_async_1 = require("../lib/rxjs/rxjs-fake-async");
const zone_testing_1 = require("../lib/testing/zone-testing");
const task_tracking_1 = require("../lib/zone-spec/task-tracking");
const wtf_1 = require("../lib/zone-spec/wtf");
const node_env_setup_1 = require("./node-env-setup");
const test_fake_polyfill_1 = require("./test_fake_polyfill");
// Must be loaded before zone loads, so that zone can detect WTF.
(0, node_env_setup_1.setupNodeEnv)();
(0, test_fake_polyfill_1.setupFakePolyfill)();
// Setup tests for Zone without microtask support
const Zone = (0, main_1.rollupMain)();
// Zone symbol prefix is set to '__zone_symbol2__' in node-env-setup.ts.
(0, zone_testing_1.rollupTesting)(Zone);
(0, task_tracking_1.patchTaskTracking)(Zone);
(0, wtf_1.patchWtf)(Zone);
(0, rxjs_1.patchRxJs)(Zone);
(0, rxjs_fake_async_1.patchRxJsFakeAsync)(Zone);
(0, jasmine_1.patchJasmine)(Zone);
