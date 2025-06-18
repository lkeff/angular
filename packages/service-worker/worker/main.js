"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./src/adapter");
const db_cache_1 = require("./src/db-cache");
const driver_1 = require("./src/driver");
const scope = self;
const adapter = new adapter_1.Adapter(scope.registration.scope, self.caches);
new driver_1.Driver(scope, adapter, new db_cache_1.CacheDatabase(adapter));
