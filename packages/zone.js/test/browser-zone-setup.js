"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
if (typeof window !== 'undefined') {
    const zoneSymbol = window.Zone.__symbol__;
    window['__Zone_enable_cross_context_check'] = true;
    window[zoneSymbol('fakeAsyncAutoFakeAsyncWhenClockPatched')] = true;
    window[zoneSymbol('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] = false;
}
require("../lib/common/to-string");
require("../lib/browser/api-util");
require("../lib/browser/browser-legacy");
require("../lib/browser/browser");
require("../lib/browser/canvas");
require("../lib/common/fetch");
require("../lib/browser/webapis-user-media");
require("../lib/browser/webapis-media-query");
require("../lib/testing/zone-testing");
require("../lib/zone-spec/task-tracking");
require("../lib/zone-spec/wtf");
require("../lib/extra/cordova");
require("../lib/testing/promise-testing");
require("../lib/testing/async-testing");
require("../lib/testing/fake-async");
require("../lib/browser/webapis-resize-observer");
require("../lib/rxjs/rxjs-fake-async");
