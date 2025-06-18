"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./common/microtasks.spec");
require("./common/zone.spec");
require("./common/task.spec");
require("./common/util.spec");
require("./common/Promise.spec");
require("./common/queue-microtask.spec");
require("./common/fetch.spec");
require("./common/Error.spec");
require("./common/setInterval.spec");
require("./common/setTimeout.spec");
require("./common/toString.spec");
require("./zone-spec/long-stack-trace-zone.spec");
require("./zone-spec/async-test.spec");
require("./zone-spec/sync-test.spec");
require("./zone-spec/fake-async-test.spec");
require("./zone-spec/proxy.spec");
require("./zone-spec/task-tracking.spec");
require("./rxjs/rxjs.spec");
Error.stackTraceLimit = Number.POSITIVE_INFINITY;
