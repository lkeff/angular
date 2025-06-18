"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rxResource = exports.pendingUntilEvent = exports.toSignal = exports.toObservable = exports.takeUntilDestroyed = exports.outputToObservable = exports.outputFromObservable = void 0;
var output_from_observable_1 = require("./output_from_observable");
Object.defineProperty(exports, "outputFromObservable", { enumerable: true, get: function () { return output_from_observable_1.outputFromObservable; } });
var output_to_observable_1 = require("./output_to_observable");
Object.defineProperty(exports, "outputToObservable", { enumerable: true, get: function () { return output_to_observable_1.outputToObservable; } });
var take_until_destroyed_1 = require("./take_until_destroyed");
Object.defineProperty(exports, "takeUntilDestroyed", { enumerable: true, get: function () { return take_until_destroyed_1.takeUntilDestroyed; } });
var to_observable_1 = require("./to_observable");
Object.defineProperty(exports, "toObservable", { enumerable: true, get: function () { return to_observable_1.toObservable; } });
var to_signal_1 = require("./to_signal");
Object.defineProperty(exports, "toSignal", { enumerable: true, get: function () { return to_signal_1.toSignal; } });
var pending_until_event_1 = require("./pending_until_event");
Object.defineProperty(exports, "pendingUntilEvent", { enumerable: true, get: function () { return pending_until_event_1.pendingUntilEvent; } });
var rx_resource_1 = require("./rx_resource");
Object.defineProperty(exports, "rxResource", { enumerable: true, get: function () { return rx_resource_1.rxResource; } });
