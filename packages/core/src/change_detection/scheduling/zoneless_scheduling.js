"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEDULE_IN_ROOT_ZONE = exports.ZONELESS_SCHEDULER_DISABLED = exports.PROVIDED_ZONELESS = exports.ZONELESS_ENABLED = exports.ChangeDetectionScheduler = void 0;
const injection_token_1 = require("../../di/injection_token");
/**
 * Injectable that is notified when an `LView` is made aware of changes to application state.
 */
class ChangeDetectionScheduler {
}
exports.ChangeDetectionScheduler = ChangeDetectionScheduler;
/** Token used to indicate if zoneless was enabled via provideZonelessChangeDetection(). */
exports.ZONELESS_ENABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'Zoneless enabled' : '', { providedIn: 'root', factory: () => false });
/** Token used to indicate `provideZonelessChangeDetection` was used. */
exports.PROVIDED_ZONELESS = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'Zoneless provided' : '', { providedIn: 'root', factory: () => false });
exports.ZONELESS_SCHEDULER_DISABLED = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'scheduler disabled' : '');
// TODO(atscott): Remove in v19. Scheduler should be done with runOutsideAngular.
exports.SCHEDULE_IN_ROOT_ZONE = new injection_token_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'run changes outside zone in root' : '');
