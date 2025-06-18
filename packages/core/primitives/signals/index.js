"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.untracked = exports.setAlternateWeakRefImpl = exports.createWatch = exports.createSignalTuple = exports.signalUpdateFn = exports.signalSetFn = exports.signalGetFn = exports.setPostSignalSetFn = exports.runPostSignalSetFn = exports.createSignal = exports.SIGNAL_NODE = exports.setPostProducerCreatedFn = exports.setActiveConsumer = exports.runPostProducerCreatedFn = exports.producerUpdatesAllowed = exports.producerUpdateValueVersion = exports.producerNotifyConsumers = exports.producerMarkClean = exports.producerIncrementEpoch = exports.producerAccessed = exports.isReactive = exports.isInNotificationPhase = exports.getActiveConsumer = exports.consumerPollProducersForChange = exports.consumerMarkDirty = exports.consumerDestroy = exports.consumerBeforeComputation = exports.consumerAfterComputation = exports.SIGNAL = exports.REACTIVE_NODE = exports.setThrowInvalidWriteToSignalError = exports.defaultEquals = exports.linkedSignalUpdateFn = exports.linkedSignalSetFn = exports.createLinkedSignal = exports.createComputed = void 0;
var computed_1 = require("./src/computed");
Object.defineProperty(exports, "createComputed", { enumerable: true, get: function () { return computed_1.createComputed; } });
var linked_signal_1 = require("./src/linked_signal");
Object.defineProperty(exports, "createLinkedSignal", { enumerable: true, get: function () { return linked_signal_1.createLinkedSignal; } });
Object.defineProperty(exports, "linkedSignalSetFn", { enumerable: true, get: function () { return linked_signal_1.linkedSignalSetFn; } });
Object.defineProperty(exports, "linkedSignalUpdateFn", { enumerable: true, get: function () { return linked_signal_1.linkedSignalUpdateFn; } });
var equality_1 = require("./src/equality");
Object.defineProperty(exports, "defaultEquals", { enumerable: true, get: function () { return equality_1.defaultEquals; } });
var errors_1 = require("./src/errors");
Object.defineProperty(exports, "setThrowInvalidWriteToSignalError", { enumerable: true, get: function () { return errors_1.setThrowInvalidWriteToSignalError; } });
var graph_1 = require("./src/graph");
Object.defineProperty(exports, "REACTIVE_NODE", { enumerable: true, get: function () { return graph_1.REACTIVE_NODE; } });
Object.defineProperty(exports, "SIGNAL", { enumerable: true, get: function () { return graph_1.SIGNAL; } });
Object.defineProperty(exports, "consumerAfterComputation", { enumerable: true, get: function () { return graph_1.consumerAfterComputation; } });
Object.defineProperty(exports, "consumerBeforeComputation", { enumerable: true, get: function () { return graph_1.consumerBeforeComputation; } });
Object.defineProperty(exports, "consumerDestroy", { enumerable: true, get: function () { return graph_1.consumerDestroy; } });
Object.defineProperty(exports, "consumerMarkDirty", { enumerable: true, get: function () { return graph_1.consumerMarkDirty; } });
Object.defineProperty(exports, "consumerPollProducersForChange", { enumerable: true, get: function () { return graph_1.consumerPollProducersForChange; } });
Object.defineProperty(exports, "getActiveConsumer", { enumerable: true, get: function () { return graph_1.getActiveConsumer; } });
Object.defineProperty(exports, "isInNotificationPhase", { enumerable: true, get: function () { return graph_1.isInNotificationPhase; } });
Object.defineProperty(exports, "isReactive", { enumerable: true, get: function () { return graph_1.isReactive; } });
Object.defineProperty(exports, "producerAccessed", { enumerable: true, get: function () { return graph_1.producerAccessed; } });
Object.defineProperty(exports, "producerIncrementEpoch", { enumerable: true, get: function () { return graph_1.producerIncrementEpoch; } });
Object.defineProperty(exports, "producerMarkClean", { enumerable: true, get: function () { return graph_1.producerMarkClean; } });
Object.defineProperty(exports, "producerNotifyConsumers", { enumerable: true, get: function () { return graph_1.producerNotifyConsumers; } });
Object.defineProperty(exports, "producerUpdateValueVersion", { enumerable: true, get: function () { return graph_1.producerUpdateValueVersion; } });
Object.defineProperty(exports, "producerUpdatesAllowed", { enumerable: true, get: function () { return graph_1.producerUpdatesAllowed; } });
Object.defineProperty(exports, "runPostProducerCreatedFn", { enumerable: true, get: function () { return graph_1.runPostProducerCreatedFn; } });
Object.defineProperty(exports, "setActiveConsumer", { enumerable: true, get: function () { return graph_1.setActiveConsumer; } });
Object.defineProperty(exports, "setPostProducerCreatedFn", { enumerable: true, get: function () { return graph_1.setPostProducerCreatedFn; } });
var signal_1 = require("./src/signal");
Object.defineProperty(exports, "SIGNAL_NODE", { enumerable: true, get: function () { return signal_1.SIGNAL_NODE; } });
Object.defineProperty(exports, "createSignal", { enumerable: true, get: function () { return signal_1.createSignal; } });
Object.defineProperty(exports, "runPostSignalSetFn", { enumerable: true, get: function () { return signal_1.runPostSignalSetFn; } });
Object.defineProperty(exports, "setPostSignalSetFn", { enumerable: true, get: function () { return signal_1.setPostSignalSetFn; } });
Object.defineProperty(exports, "signalGetFn", { enumerable: true, get: function () { return signal_1.signalGetFn; } });
Object.defineProperty(exports, "signalSetFn", { enumerable: true, get: function () { return signal_1.signalSetFn; } });
Object.defineProperty(exports, "signalUpdateFn", { enumerable: true, get: function () { return signal_1.signalUpdateFn; } });
Object.defineProperty(exports, "createSignalTuple", { enumerable: true, get: function () { return signal_1.createSignalTuple; } });
var watch_1 = require("./src/watch");
Object.defineProperty(exports, "createWatch", { enumerable: true, get: function () { return watch_1.createWatch; } });
var weak_ref_1 = require("./src/weak_ref");
Object.defineProperty(exports, "setAlternateWeakRefImpl", { enumerable: true, get: function () { return weak_ref_1.setAlternateWeakRefImpl; } });
var untracked_1 = require("./src/untracked");
Object.defineProperty(exports, "untracked", { enumerable: true, get: function () { return untracked_1.untracked; } });
