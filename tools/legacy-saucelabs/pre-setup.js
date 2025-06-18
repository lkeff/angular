"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// ZoneJS configuration needed for some event manager tests. This config could
// affect all legacy tests but in reality is scoped to certain special tests.
const zone_event_unpatched_init_mjs_1 = require("../../packages/platform-browser/test/dom/events/zone_event_unpatched.init.mjs");
// Increase the timeout for specs as Saucelabs devices can be slow.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
(0, zone_event_unpatched_init_mjs_1.configureZoneUnpatchedEvent)();
