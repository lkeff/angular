"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRxJsFakeAsync = patchRxJsFakeAsync;
const rxjs_1 = require("rxjs");
function patchRxJsFakeAsync(Zone) {
    Zone.__load_patch('rxjs.Scheduler.now', (global, Zone, api) => {
        api.patchMethod(rxjs_1.Scheduler, 'now', (delegate) => (self, args) => {
            return Date.now.call(self);
        });
        api.patchMethod(rxjs_1.asyncScheduler, 'now', (delegate) => (self, args) => {
            return Date.now.call(self);
        });
        api.patchMethod(rxjs_1.asapScheduler, 'now', (delegate) => (self, args) => {
            return Date.now.call(self);
        });
    });
}
